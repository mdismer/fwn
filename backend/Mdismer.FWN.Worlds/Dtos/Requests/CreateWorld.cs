using Mdismer.FWN.Worlds.Dtos.Results;
using MediatR;

namespace Mdismer.FWN.Worlds.Dtos.Requests;

public record CreateWorld(Guid CampaignId, string Name) : IRequest<CreateWorldResult>;