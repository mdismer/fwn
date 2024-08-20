using JetBrains.Annotations;
using Mdismer.FWN.Worlds.Database;
using Mdismer.FWN.Worlds.Domain;
using Mdismer.FWN.Worlds.Dtos.Requests;
using Mdismer.FWN.Worlds.Dtos.Results;
using MediatR;

namespace Mdismer.FWN.Worlds.Handlers.Commands;

[UsedImplicitly]
public class CreateWorldHandler(WorldsDbContext context) : IRequestHandler<CreateWorld, CreateWorldResult>
{
    public async Task<CreateWorldResult> Handle(CreateWorld request, CancellationToken cancellationToken)
    {
        var world = new World()
        {
            CampaignId = request.CampaignId,
            Name = request.Name
        };

        context.Worlds.Add(world);

        await context.SaveChangesAsync(cancellationToken);

        return new CreateWorldResult(world.Id);
    }
}