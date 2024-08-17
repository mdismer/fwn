using Mdismer.FWN.Base.Domain;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Mdismer.FWN.Base.Database;

public class TimestampInterceptor : ISaveChangesInterceptor
{
    public InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        UpdateTimeStamps(eventData.Context!.ChangeTracker.Entries());

        return result;
    }

    public ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData,
                                                                 InterceptionResult<int> result,
                                                                 CancellationToken cancellationToken = new())
    {
        UpdateTimeStamps(eventData.Context!.ChangeTracker.Entries());

        return ValueTask.FromResult(result);
    }


    private static void UpdateTimeStamps(IEnumerable<EntityEntry> entries)
    {
        foreach (var entry in entries.Where(x => x.Entity is IHasTimestamps))
        {
            var entity = (IHasTimestamps)entry.Entity;

            if (entry.State == EntityState.Added)
            {
                entity.CreationTimestamp = DateTime.UtcNow;
                entity.LastModifiedTimestamp = DateTime.UtcNow;
            }

            if (entry.State == EntityState.Modified)
            {
                entity.LastModifiedTimestamp = DateTime.UtcNow;
            }
        }
    }
}