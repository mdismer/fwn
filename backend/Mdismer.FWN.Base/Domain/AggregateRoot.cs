using System.Diagnostics.CodeAnalysis;
using Mdismer.FWN.Base.Database;

namespace Mdismer.FWN.Base.Domain;

public abstract class AggregateRoot : Entity
{
    private readonly List<DomainEvent> domainEvents = [];

    public IEnumerable<DomainEvent> DomainEvents => domainEvents;

    [EntityFrameworkConstructor, ExcludeFromCodeCoverage]
    protected AggregateRoot() { }

    protected AggregateRoot(Guid id) : base(id)
    {
    }

    protected void AddDomainEvent(DomainEvent domainEvent)
    {
        domainEvents.Add(domainEvent);
    }

    public void ClearDomainEvents()
    {
        domainEvents.Clear();
    }
}
