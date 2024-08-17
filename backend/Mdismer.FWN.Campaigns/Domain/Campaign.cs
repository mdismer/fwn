using Mdismer.FWN.Base.Domain;

namespace Mdismer.FWN.Campaigns.Domain;

public class Campaign : Entity, IHasTimestamps
{
    public string Name { get; set; } = string.Empty;

    public DateTime CreationTimestamp { get; set; }
    public DateTime LastModifiedTimestamp { get; set; }

    public ICollection<CampaignMembership> Memberships { get; set; } = [];
}