using Mdismer.FWN.Factions.Dtos.Results;
using MediatR;

namespace Mdismer.FWN.Factions.Dtos.Requests;

public record ListFactions(Guid CampaignId) : IRequest<FactionListDto[]>;