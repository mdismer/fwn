using Microsoft.EntityFrameworkCore;

namespace Mdismer.FWN.Base.Database;

public abstract class DbContextBase<TDbContext> : DbContext
    where TDbContext : DbContext
{
    private readonly ILogger? logger;

    protected abstract string SchemaName { get; }


    protected DbContextBase(DbContextOptions<TDbContext> options) : base(options)
    {
        // ReSharper disable once VirtualMemberCallInConstructor
        // needed by RaiseDomainEventInterceptor, otherwise domain events will not always be triggered and run in the same transaction
        Database.AutoTransactionBehavior = AutoTransactionBehavior.Always;
    }

    protected DbContextBase(DbContextOptions<TDbContext> options, ILogger<TDbContext> logger) : this(options)
    {
        this.logger = logger;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (logger != null)
        {
            #if DEBUG
            optionsBuilder.LogTo(s => logger.LogTrace("{message}", s));
            #else
            optionsBuilder.LogTo(s => logger.LogWarning("{message}", s), LogLevel.Warning);
            #endif
        }

        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema(SchemaName);

        modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);

        ConfigureGlobalQueryFilters(modelBuilder);

        ConfigureContextSpecificModel(modelBuilder);
    }

    protected virtual void ConfigureContextSpecificModel(ModelBuilder modelBuilder)
    { }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        ConfigureContextSpecificConventions(configurationBuilder);
    }

    protected virtual void ConfigureContextSpecificConventions(ModelConfigurationBuilder configurationBuilder)
    { }

    protected virtual void ConfigureGlobalQueryFilters(ModelBuilder modelBuilder)
    {
        // FYI: must not be an interface type, so the following would not work
        // modelBuilder.Entity<IHasDeleteMarker>().HasQueryFilter(p => p...)
    }
}