namespace Mdismer.FWN.Base.Configuration;

public class ApplicationConfiguration
{
    private const string SectionName = "fwn";

    public string ConnectionString { get; init; } = null!;


    public string MeilisearchUrl { get; init; } = null!;

    public string MeilisearchMasterKey { get; init; } = null!;

  

    public static ApplicationConfiguration From(IConfiguration configuration)
    {

        var appConfig = new ApplicationConfiguration();
        configuration.GetSection(SectionName).Bind(appConfig);
        return appConfig;
    }
}
