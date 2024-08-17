using System.Security.Principal;
using JetBrains.Annotations;
using Mdismer.FWN.Campaigns.Database;
using Mdismer.FWN.Campaigns.Dto.Requests;
using Mdismer.FWN.Campaigns.Dto.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Mdismer.FWN.Campaigns.Handlers.Queries;

[UsedImplicitly]
public class GetCampaignsHandler(CampaignsDbContext context, IPrincipal user) : IRequestHandler<GetCampaigns, GetCampaignsResult[]>
{
    public async Task<GetCampaignsResult[]> Handle(GetCampaigns request, CancellationToken cancellationToken)
    {
        var campaigns = await context.Campaigns
           // .Where(c=> c.Memberships.Any(m => m.UserId == user.Identity.Name))
            .Select(c => new GetCampaignsResult(c.Id, c.Name)).ToArrayAsync(cancellationToken);

        return campaigns;
    }
}