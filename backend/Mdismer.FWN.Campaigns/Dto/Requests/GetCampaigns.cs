using Mdismer.FWN.Campaigns.Dto.Results;
using MediatR;

namespace Mdismer.FWN.Campaigns.Dto.Requests;

public record GetCampaigns : IRequest<GetCampaignsResult[]>;