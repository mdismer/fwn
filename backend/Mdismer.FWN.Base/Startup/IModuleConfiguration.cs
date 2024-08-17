using Mdismer.FWN.Base.Configuration;

namespace Mdismer.FWN.Base.Startup;

public interface IModuleConfiguration
{
    void Configure(IServiceCollection services, ApplicationConfiguration appConfig);
}
