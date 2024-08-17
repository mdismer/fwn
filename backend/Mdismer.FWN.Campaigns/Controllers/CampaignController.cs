using Mdismer.FWN.Campaigns.Dto.Requests;
using Mdismer.FWN.Campaigns.Dto.Results;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mdismer.FWN.Campaigns.Controllers
{
    [Route("/campaigns")]
    public class CampaignController(ISender sender) : Controller
    {
        [HttpGet]
        [Authorize]
        [ProducesResponseType(typeof(IEnumerable<GetCampaignsResult>), 200)]
        public async Task<IActionResult> Index()
        {
            return Ok(await sender.Send(new GetCampaigns()));
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(CreateCampaignResult), 201)]
        public async Task<IActionResult> Create([FromBody]CreateCampaign parameters)
        {
            var result = await sender.Send(parameters);

            return Created($"/campaigns/{result.Id}", result);
        }
    }
}
