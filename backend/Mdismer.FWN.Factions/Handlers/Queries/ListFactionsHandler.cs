using JetBrains.Annotations;
using Mdismer.FWN.Factions.Database;
using Mdismer.FWN.Factions.Dtos.Requests;
using Mdismer.FWN.Factions.Dtos.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Mdismer.FWN.Factions.Handlers.Queries;

[UsedImplicitly]
public class ListFactionsHandler(FactionsDbContext context) : IRequestHandler<ListFactions, FactionListDto[]>
{
    public async Task<FactionListDto[]> Handle(ListFactions request, CancellationToken cancellationToken)
    {
        var factions = await context.Factions.Where(x => x.CampaignId == request.CampaignId)
            .Select(x => new FactionListDto(x.Id, x.Name)).OrderBy(x => x.Name).ToArrayAsync(cancellationToken);

        return factions;
    }
}