using Mdismer.FWN.Base.Database;
using Mdismer.FWN.Campaigns.Domain;
using Microsoft.EntityFrameworkCore;

namespace Mdismer.FWN.Campaigns.Database;

public class CampaignsDbContext : DbContextBase<CampaignsDbContext>
{
    public DbSet<Campaign> Campaigns { get; set; }

    public CampaignsDbContext(DbContextOptions<CampaignsDbContext> options) : base(options)
    {
    }

    public CampaignsDbContext(DbContextOptions<CampaignsDbContext> options, ILogger<CampaignsDbContext> logger) : base(options, logger)
    {
    }

    protected override string SchemaName => "campaigns";

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var campaign = modelBuilder.Entity<Campaign>();
        campaign.HasKey(c => c.Id);
        campaign.Property(c => c.Name).IsRequired().HasMaxLength(255);

        campaign.HasMany(c => c.Memberships).WithOne(m => m.Campaign).HasForeignKey(m => m.CampaignId);


        modelBuilder.Entity<CampaignMembership>().HasKey(m => new { m.CampaignId, m.UserId });

        base.OnModelCreating(modelBuilder);
    }
}