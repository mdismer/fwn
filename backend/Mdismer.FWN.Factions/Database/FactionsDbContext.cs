using Mdismer.FWN.Base.Database;
using Mdismer.FWN.Factions.Domain;
using Microsoft.EntityFrameworkCore;

namespace Mdismer.FWN.Factions.Database;

public class FactionsDbContext : DbContextBase<FactionsDbContext>
{
    public DbSet<Faction> Factions { get; set; }

    public FactionsDbContext(DbContextOptions<FactionsDbContext> options) : base(options)
    {
    }

    public FactionsDbContext(DbContextOptions<FactionsDbContext> options, ILogger<FactionsDbContext> logger) : base(options, logger)
    {
    }

    protected override string SchemaName => "factions";

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        var faction = modelBuilder.Entity<Faction>();

        faction.HasKey(x => x.Id);
        faction.Property(x => x.Name).IsRequired().HasMaxLength(255);
        faction.Property(x => x.Description).IsRequired().HasMaxLength(20000);
        faction.Property(x => x.CampaignId).IsRequired();
        faction.Property(x => x.HomeworldId).IsRequired();

        base.OnModelCreating(modelBuilder);
    }
}

