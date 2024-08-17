using Mdismer.FWN.Base.Configuration;
using Mdismer.FWN.Base.Startup;
using Mdismer.FWN.Campaigns.Database;

namespace Mdismer.FWN.Campaigns;

public class CampaignsModuleConfiguration : ModuleConfigurationBase<CampaignsDbContext>
{
    protected override string SchemaName => "campaigns";

    public override bool Equals(object? obj)
    {
        return base.Equals(obj);
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

    public override string? ToString()
    {
        return base.ToString();
    }

    protected override void ConfigureAppSpecific(IServiceCollection services, ApplicationConfiguration appConfig)
    {
        base.ConfigureAppSpecific(services, appConfig);
    }

    protected override void ConfigureValidators(IServiceCollection services)
    {
        base.ConfigureValidators(services);
    }
}