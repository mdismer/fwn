using Mdismer.FWN.Base.Startup;
using Mdismer.FWN.Factions.Database;

namespace Mdismer.FWN.Factions;

public class FactionModuleConfiguration : ModuleConfigurationBase<FactionsDbContext>
{
    protected override string SchemaName => "factions";
}