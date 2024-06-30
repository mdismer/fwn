# frozen_string_literal: true

module Mutations
  class CampaignDelete < BaseMutation
    description "Deletes a campaign by ID"

    field :campaign, Types::CampaignType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      campaign = ::Campaign.find(id)
      raise GraphQL::ExecutionError.new "Error deleting campaign", extensions: campaign.errors.to_hash unless campaign.destroy!

      { campaign: campaign }
    end
  end
end
