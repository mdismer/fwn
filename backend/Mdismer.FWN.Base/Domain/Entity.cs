using System.Diagnostics.CodeAnalysis;
using Mdismer.FWN.Base.Database;

namespace Mdismer.FWN.Base.Domain;

public abstract class Entity : IEntity
{
    public Guid Id { get; } = Guid.NewGuid();

    [EntityFrameworkConstructor, ExcludeFromCodeCoverage]
    protected Entity() { }

    protected Entity(Guid id)
    {
        Id = id;
    }

    public override bool Equals(object? obj)
    {
        if (obj is not Entity other)
        {
            return false;
        }

        if (obj.GetType() != GetType())
        {
            return false;
        }

        if (ReferenceEquals(this, other))
        {
            return true;
        }

        if (Id.Equals(default) || other.Id.Equals(default))
        {
            return false;
        }

        return Id.Equals(other.Id);
    }

    public static bool operator ==(Entity? a, Entity? b)
    {
        if (a is null && b is null)
        {
            return true;
        }

        if (a is null || b is null)
        {
            return false;
        }

        return a.Equals(b);
    }

    public static bool operator !=(Entity? a, Entity? b)
    {
        return !(a == b);
    }

    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }

    public override string ToString()
    {
        return $"[{this.GetType()}] Id: {Id}";
    }
}