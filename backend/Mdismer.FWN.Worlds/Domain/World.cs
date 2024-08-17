using Mdismer.FWN.Base.Domain;

namespace Mdismer.FWN.Worlds.Domain;

public class World : Entity, IHasTimestamps
{
    public string Name { get; set; }

    public Guid CampaignId { get; set; }

    public DateTime CreationTimestamp { get; set; }
    public DateTime LastModifiedTimestamp { get; set; }
}