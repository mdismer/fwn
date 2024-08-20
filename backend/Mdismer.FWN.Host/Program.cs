using System.Reflection;
using System.Security.Claims;
using System.Security.Principal;
using System.Text.Json.Serialization;
using Keycloak.AuthServices.Authentication;
using Keycloak.Client.Extensions;
using Mdismer.FWN.Base.Configuration;
using Mdismer.FWN.Base.Extensions;
using Mdismer.FWN.Campaigns;
using Mdismer.FWN.Campaigns.Database;
using Mdismer.FWN.Factions;
using Mdismer.FWN.Factions.Database;
using Mdismer.FWN.Host.ModuleRegistration;
using Mdismer.FWN.Worlds;
using Mdismer.FWN.Worlds.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

services.AddControllers();

var env = builder.Environment;
var configuration = LoadConfiguration();

var appConfig = ApplicationConfiguration.From(configuration);
var modules = RegisterModules();

ConfigureModules();
RegisterModules();
ConfigureControllers();

services.AddKeycloakWebApiAuthentication(configuration);


services.AddHttpContextAccessor();

services.AddTransient<IPrincipal>(
    provider => provider.GetService<IHttpContextAccessor>().HttpContext.User);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();



app.Run();

ConfigurationManager LoadConfiguration()
{
    var config = builder.Configuration;
    config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
    config.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
    config.AddJsonFile("appsettings.json.user", optional: true, reloadOnChange: true);
    config.AddEnvironmentVariables();

    return config;
}

Mdismer.FWN.Host.ModuleRegistration.Module[] RegisterModules()
{
    var moduleList = new List<Mdismer.FWN.Host.ModuleRegistration.Module>()
    {
        new ("Worlds", new WorldsModuleConfiguration(), typeof(WorldsDbContext)),
        new ("Campaigns", new CampaignsModuleConfiguration(), typeof(CampaignsDbContext)),
        new ("Factions", new FactionModuleConfiguration(), typeof(FactionsDbContext)),
    };


    return [.. moduleList];
}

void ConfigureModules()
{
    foreach (var module in modules)
    {
        module.Configure(services, appConfig);
    }
}


void ConfigureControllers()
{
    var modulesConventions = modules.Select(m => new ModuleRouteConvention(m));
    services.AddControllers(options =>
                            {
                                modulesConventions.ForEach(options.Conventions.Add);                                
                                // options.Filters.Add<EntityNotFoundExceptionFilter>();
                                // options.Filters.Add<ValidationExceptionFilter>();
                                // options.Filters.Add<UnauthorizedAccessExceptionFilter>();
                                // options.Filters.Add<ExceptionFilter>();
                            })
            .ConfigureApplicationPartManager(manager =>
                                                 manager.ApplicationParts.Add(new AssemblyPart(Assembly
                                                                                                   .GetExecutingAssembly())))
            .AddJsonOptions(options =>
                            {
                                options.JsonSerializerOptions.AllowTrailingCommas = true;
                                options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                                var converters = options.JsonSerializerOptions.Converters;
                                converters.Add(new JsonStringEnumConverter());
                            });
}