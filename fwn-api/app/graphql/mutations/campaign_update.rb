# frozen_string_literal: true

module Mutations
  class CampaignUpdate < BaseMutation
    description "Updates a campaign by id"

    field :campaign, Types::CampaignType, null: false

    argument :id, ID, required: true
    argument :name, String, required: true

    def resolve(id:, name:)
      campaign = ::Campaign.find(id)
      raise GraphQL::ExecutionError.new "Error updating campaign", extensions: campaign.errors.to_hash unless campaign.update(name: name)
      { campaign: campaign }
    end
  end
end
