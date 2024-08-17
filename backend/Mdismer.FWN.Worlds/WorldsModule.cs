using Mdismer.FWN.Base.Configuration;
using Mdismer.FWN.Base.Startup;
using Mdismer.FWN.Worlds.Database;
using Microsoft.Extensions.DependencyInjection;

namespace Mdismer.FWN.Worlds;

public class WorldsModuleConfiguration : ModuleConfigurationBase<WorldsDbContext>
{
    protected override string SchemaName => "worlds";


}
