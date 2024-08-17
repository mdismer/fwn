using System.Reflection;
using Mdismer.FWN.Base.Configuration;
using Mdismer.FWN.Base.Startup;

namespace Mdismer.FWN.Host.ModuleRegistration;

internal record Module(string Name, IModuleConfiguration ModuleConfiguration, Type? DbContextType = null)
{
    internal Assembly Assembly => ModuleConfiguration.GetType().Assembly;

    internal void Configure(IServiceCollection services, ApplicationConfiguration appConfig)
    {
        ModuleConfiguration.Configure(services, appConfig);
    }
}
