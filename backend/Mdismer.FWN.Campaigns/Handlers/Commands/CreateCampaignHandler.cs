using System.Security.Principal;
using JetBrains.Annotations;
using Mdismer.FWN.Campaigns.Database;
using Mdismer.FWN.Campaigns.Domain;
using Mdismer.FWN.Campaigns.Dto.Requests;
using Mdismer.FWN.Campaigns.Dto.Results;
using MediatR;

namespace Mdismer.FWN.Campaigns.Handlers.Commands;

[UsedImplicitly]
public class CreateCampaignHandler(CampaignsDbContext context, IPrincipal user) : IRequestHandler<CreateCampaign, CreateCampaignResult>
{
    public async Task<CreateCampaignResult> Handle(CreateCampaign request, CancellationToken cancellationToken)
    {
        if (user?.Identity is null)
        {
            throw new NullReferenceException();
        }

        var campaign = new Campaign()
        {
            Name = request.Name,
            Memberships = [new CampaignMembership { Permission = Permission.Owner, UserId = user.Identity.Name!}]
        };

        context.Campaigns.Add(campaign);
        await context.SaveChangesAsync(cancellationToken);

        return new CreateCampaignResult(campaign.Id);
    }
}