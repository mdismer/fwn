using JetBrains.Annotations;
using Mdismer.FWN.Base.Domain;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Mdismer.FWN.Base.Database;

[MeansImplicitUse]
[AttributeUsage(AttributeTargets.Constructor)]
public class EntityFrameworkConstructorAttribute : Attribute;


public class MarkEntityAsDeletedInterceptor : SaveChangesInterceptor
{
    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
    {
        if (eventData.Context == null)
        {
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        foreach (var entry in eventData.Context.ChangeTracker.Entries())
        {
            if (entry.State != Microsoft.EntityFrameworkCore.EntityState.Deleted)
            {
                continue;
            }

            if (entry.Entity is not IHasDeleteMarker markedForDeletion)
            {
                continue;
            }

            if (markedForDeletion is IDoHardDelete { DoHardDelete: true })
            {
                continue;
            }

            markedForDeletion.DeletedAt = DateTime.UtcNow;
            entry.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }
}
