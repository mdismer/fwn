using Mdismer.FWN.Worlds.Dtos.Requests;
using Mdismer.FWN.Worlds.Dtos.Results;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mdismer.FWN.Worlds.Controllers;

[Route("/worlds")]
public class WorldsController(ISender sender) : Controller
{
    [HttpGet, Authorize, ProducesResponseType(typeof(IEnumerable<WorldListDto>), 200)]
    public async Task<IActionResult> Index([FromQuery] ListWorlds parameters)
    {
        var result = await sender.Send(parameters);

        return Ok(result);
    }

    [HttpPost, Authorize, ProducesResponseType(typeof(CreateWorldResult), 201)]
    public async Task<IActionResult> Create([FromBody] CreateWorld parameters)
    {
        var result = await sender.Send(parameters);

        return Created("/worlds/" + result.Id, result);
    }
}