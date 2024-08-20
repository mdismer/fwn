using JetBrains.Annotations;
using Mdismer.FWN.Worlds.Database;
using Mdismer.FWN.Worlds.Dtos.Requests;
using Mdismer.FWN.Worlds.Dtos.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Mdismer.FWN.Worlds.Handlers.Queries;

[UsedImplicitly]
public class ListWorldsHandler(WorldsDbContext context) : IRequestHandler<ListWorlds, WorldListDto[]>
{
    public async Task<WorldListDto[]> Handle(ListWorlds request, CancellationToken cancellationToken)
    {
        var result = await context.Worlds.Where(x => x.CampaignId == request.CampaignId).OrderBy(x => x.Name)
            .Select(x => new WorldListDto(x.Id, x.Name)).ToArrayAsync(cancellationToken);

        return result;
    }
}