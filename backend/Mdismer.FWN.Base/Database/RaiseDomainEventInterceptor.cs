using Mdismer.FWN.Base.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Mdismer.FWN.Base.Extensions;

namespace Mdismer.FWN.Base.Database;

/// <summary>
/// Intercept commiting of transactions of <see cref="AggregateRoot"/>s to check if there are any <see cref="DomainEvent"/>s added.
/// It will dispatch about those events via <see cref="IMediator" /> right before the transaction is committed.
/// For consistency reasons these events are run in the same transaction. Otherwise, we have to implement eventual consistency
/// e.g. with the outbox pattern (easy to implement, no overhead caused by more infrastructure) or message queue (reliable, more overhead caused by infrastructure)
///
/// inspired by 
/// https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/domain-events-design-implementation
/// but using this interceptor to be able to roll back larger transaction using SaveChanges multiple times.
/// </summary>
public class RaiseDomainEventInterceptor(ILogger<RaiseDomainEventInterceptor> logger, IMediator mediator)
    : DbTransactionInterceptor
{
    public override async ValueTask<InterceptionResult> TransactionCommittingAsync(
        DbTransaction transaction,
        TransactionEventData eventData,
        InterceptionResult result,
        CancellationToken cancellationToken = new())
    {
        var context = eventData.Context;
        if (context != null)
        {
            await PublishAllDomainEventsInChangeSet(context, cancellationToken);
        }

        return await base.TransactionCommittingAsync(transaction, eventData, result, cancellationToken);
    }

    private async Task PublishAllDomainEventsInChangeSet(DbContext context, CancellationToken cancellationToken)
    {
        var aggregateRoots = GetAggregateRootsWithDomainEvents(context);

        try
        {
            await PublishAllDomainEvents(aggregateRoots, cancellationToken);
            ClearDomainEvents(aggregateRoots);
        }
        catch
        {
            await context.Database.RollbackTransactionAsync(cancellationToken);
            throw;
        }
    }

    private static AggregateRoot[] GetAggregateRootsWithDomainEvents(DbContext context)
    {
        return context
               .ChangeTracker
               .Entries<AggregateRoot>()
               .Where(x => x.Entity.DomainEvents.Any())
               .Select(x => x.Entity)
               .ToArray();
    }

    private async Task PublishAllDomainEvents(AggregateRoot[] aggregateRoots, CancellationToken cancellationToken)
    {
        foreach (var domainEvent in aggregateRoots.SelectMany(x => x.DomainEvents))
        {
            await Publish(domainEvent, cancellationToken);
        }
    }

    private async Task Publish(DomainEvent domainEvent, CancellationToken cancellationToken)
    {
        try
        {
            await mediator.Publish(domainEvent, cancellationToken);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Publishing of Domain Event [{domainEvent}] failed, rollback transaction", domainEvent);

            throw;
        }
    }

    private static void ClearDomainEvents(AggregateRoot[] aggregateRoots)
    {
        foreach (var aggregate in aggregateRoots)
        {
            aggregate.ClearDomainEvents();
        }
    }
}

public class ConcurrencyTokenInterceptor : ISaveChangesInterceptor
{
    public InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        UpdateToken(eventData.Context!.ChangeTracker.Entries());

        return result;
    }

    public ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData,
                                                                 InterceptionResult<int> result,
                                                                 CancellationToken cancellationToken = new())
    {
        UpdateToken(eventData.Context!.ChangeTracker.Entries());

        return ValueTask.FromResult(result);
    }

    private static void UpdateToken(IEnumerable<EntityEntry> entries)
    {
        entries.Where(x => x.Entity is IHasConcurrencyToken)
               .Where(x => x.State != EntityState.Unchanged)
               .Select(x => (IHasConcurrencyToken)x.Entity)
               .ForEach(x => x.ConcurrencyToken = Guid.NewGuid());
    }
}