using Mdismer.FWN.Base.Startup;
using Mdismer.FWN.Worlds.Database;

namespace Mdismer.FWN.Worlds;

public class WorldsModuleConfiguration : ModuleConfigurationBase<WorldsDbContext>
{
    protected override string SchemaName => "worlds";
}
