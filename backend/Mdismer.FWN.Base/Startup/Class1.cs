using Mdismer.FWN.Base.Configuration;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Mdismer.FWN.Base.Handlers;
using Mdismer.FWN.Base.Extensions;
using Mdismer.FWN.Base.Mappers;
using Mdismer.FWN.Base.Validation;
using Mdismer.FWN.Base.Validation.Rules;
using Mdismer.FWN.Base.Database;

namespace Mdismer.FWN.Base.Startup;

public abstract class ModuleConfigurationBase<TDbContext> : IModuleConfiguration
where TDbContext : DbContext
{
    protected Assembly Assembly => GetType().Assembly;

    protected abstract string SchemaName { get; }

    public void Configure(IServiceCollection services, ApplicationConfiguration appConfig)
    {
        ConfigureDbContext(services, appConfig);
        ConfigureMediator(services);
        ConfigureHandlers(services);
        ConfigureValidators(services);
        ConfigureMappers(services);

        ConfigureAppSpecific(services, appConfig);
    }

    private void ConfigureDbContext(IServiceCollection services, ApplicationConfiguration appConfig)
    {
     
        services
            .AddDbContext<TDbContext>((provider, options) =>
            {
                var connectionString = appConfig.ConnectionString;
                options.UseNpgsql(connectionString, x => x.MigrationsHistoryTable("__MigrationsHistory", SchemaName));

                var logger = provider.GetRequiredService<ILogger<RaiseDomainEventInterceptor>>();
                var mediator = provider.GetRequiredService<IMediator>();

                options.AddInterceptors(
                                        new RaiseDomainEventInterceptor(logger, mediator),
                                        new MarkEntityAsDeletedInterceptor(),
                                        new TimestampInterceptor(),
                                        new ConcurrencyTokenInterceptor()
                                       );
            });
    }

    private void ConfigureMediator(IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly));
    }

    private void ConfigureHandlers(IServiceCollection services)
    {
        services.AddAllImplementing(typeof(IQueryHandler<>), ServiceLifetime.Scoped, Assembly);
        services.AddAllImplementing(typeof(IQueryHandler<,>), ServiceLifetime.Scoped, Assembly);
        services.AddAllImplementing(typeof(ICommandHandler<>), ServiceLifetime.Scoped, Assembly);
        services.AddAllImplementing(typeof(ICommandHandler<,>), ServiceLifetime.Scoped, Assembly);
    }

    protected virtual void ConfigureValidators(IServiceCollection services)
    {
        services.AddAllImplementing(typeof(ICompoundValidator<>), ServiceLifetime.Transient, Assembly);
        services.AddAllImplementing(typeof(IValidator<>), ServiceLifetime.Transient, Assembly);
        services.AddAllImplementing(typeof(IValidationRule<>), ServiceLifetime.Transient, Assembly);
    }

    private void ConfigureMappers(IServiceCollection services)
    {
        services.AddAllImplementing(typeof(IMapper<,>), ServiceLifetime.Transient, Assembly);
        services.AddAllImplementing(typeof(IIntoMapper<,>), ServiceLifetime.Transient, Assembly);
    }

    protected virtual void ConfigureAppSpecific(IServiceCollection services, ApplicationConfiguration appConfig)
    { }
}
