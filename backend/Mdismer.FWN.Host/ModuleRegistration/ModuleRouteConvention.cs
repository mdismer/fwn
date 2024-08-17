using System.Reflection;
using Mdismer.FWN.Base.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace Mdismer.FWN.Host.ModuleRegistration;

internal class ModuleRouteConvention : IApplicationModelConvention
{
    private readonly Assembly assembly;
    private readonly AttributeRouteModel prefixRoute;

    public ModuleRouteConvention(Module module)
    {
        assembly = module.Assembly;

        var route = new RouteAttribute($"/api/{module.Name}");
        prefixRoute = new AttributeRouteModel(route);
    }

    public void Apply(ApplicationModel application)
    {
        var controllers = application.Controllers
                                     .Where(x => x.ControllerType.Assembly == assembly);
        controllers.ForEach(PrependRoutePrefix);

    }

    private void PrependRoutePrefix(ControllerModel controller)
    {
        foreach (var selector in controller.Selectors)
        {
            if (EqualsRootRoute(selector.AttributeRouteModel))
            {
                selector.AttributeRouteModel = prefixRoute;
            }
            else
            {
                selector.AttributeRouteModel = AttributeRouteModel
                    .CombineAttributeRouteModel(prefixRoute, selector.AttributeRouteModel);
            }
        }
    }

    private static bool EqualsRootRoute(AttributeRouteModel? routeModel)
    {
        if (routeModel == null)
        {
            return true;
        }

        return routeModel.Template is "" or "/";
    }
}
