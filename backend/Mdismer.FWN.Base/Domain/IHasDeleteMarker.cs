namespace Mdismer.FWN.Base.Domain;

public interface IHasDeleteMarker : IEntity
{
    DateTime? DeletedAt { get; set; }
}
