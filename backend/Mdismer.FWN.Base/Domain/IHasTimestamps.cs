namespace Mdismer.FWN.Base.Domain;

public interface IHasTimestamps
{
    DateTime CreationTimestamp { get; set; }

    DateTime LastModifiedTimestamp { get; set; }
}
