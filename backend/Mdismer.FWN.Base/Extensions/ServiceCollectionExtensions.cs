using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace Mdismer.FWN.Base.Extensions;

[ExcludeFromCodeCoverage]
public static class ServiceCollectionExtensions
{
    public static void AddAllImplementing(this IServiceCollection services, Type serviceType, ServiceLifetime lifetime, Assembly assembly, params Assembly[] moreAssemblies)
    {
        var assemblies = new[] { assembly }.Concat(moreAssemblies);

        assemblies
            .SelectMany(a => a.DefinedTypes)
            .SelectMany(t => t.GetInterfaces()
                              .Select(i => new
                              {
                                  Interface = i,
                                  Type = t
                              })
                       )
            .Where(x => GetTypeDefinition(x.Interface) == serviceType)
            .Where(x => !x.Type.IsAbstract)
            .Where(x => !x.Type.IsInterface)
            .ForEach(x =>
            {
                services.Add(new ServiceDescriptor(x.Type, x.Type, lifetime));
                services.Add(new ServiceDescriptor(x.Interface, x.Type, lifetime));
            });
    }

    private static Type GetTypeDefinition(Type type)
    {
        return type.IsGenericType ? type.GetGenericTypeDefinition() : type;
    }
}
