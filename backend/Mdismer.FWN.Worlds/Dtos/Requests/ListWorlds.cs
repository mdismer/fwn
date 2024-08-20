using Mdismer.FWN.Worlds.Dtos.Results;
using MediatR;

namespace Mdismer.FWN.Worlds.Dtos.Requests;

public record ListWorlds(Guid CampaignId) : IRequest<WorldListDto[]>;