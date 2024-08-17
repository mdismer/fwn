namespace Mdismer.FWN.Campaigns.Domain;

public enum Permission
{
    Owner,
    Write,
    Read
}

public class CampaignMembership
{
    public string UserId { get; set; } = string.Empty;

    public Permission Permission { get; set; } = Permission.Read;
    public Campaign Campaign { get; set; }

    public Guid CampaignId { get; set; } = Guid.NewGuid();
}
