using Mdismer.FWN.Factions.Dtos.Requests;
using Mdismer.FWN.Factions.Dtos.Results;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mdismer.FWN.Factions.Controllers;

[Route("/factions")]
public class FactionsController(ISender sender) : Controller
{
    [HttpGet, Authorize, ProducesResponseType(typeof(IEnumerable<FactionListDto>), 200)]
    public async Task<ActionResult> GetFactions([FromQuery] ListFactions parameters)
    {
        var result = await sender.Send(parameters);

        return Ok(result);
    }
}