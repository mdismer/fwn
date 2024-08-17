using Mdismer.FWN.Base.Database;
using Mdismer.FWN.Worlds.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Mdismer.FWN.Worlds.Database;

public class WorldsDbContext : DbContextBase<WorldsDbContext>
{
    public DbSet<World> Worlds { get; set; }

    public WorldsDbContext(DbContextOptions<WorldsDbContext> options) : base(options)
    {
    }

    public WorldsDbContext(DbContextOptions<WorldsDbContext> options, ILogger<WorldsDbContext> logger
    ) : base(options, logger)
    {
    }

    protected override string SchemaName => "worlds";

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var world = modelBuilder.Entity<World>();
        world.HasKey(w => w.Id);
        world.Property(w => w.CampaignId).IsRequired();
        world.Property(w => w.Name).IsRequired().HasMaxLength(255);
        world.Property(w => w.CampaignId).IsRequired();
        base.OnModelCreating(modelBuilder);
    }
}

