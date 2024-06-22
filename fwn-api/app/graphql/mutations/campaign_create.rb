# frozen_string_literal: true

module Mutations
  class CampaignCreate < BaseMutation
    description "Creates a new campaign"

    field :campaign, Types::CampaignType, null: false

    argument :name, String, required: true

    def resolve(name:)
      campaign = Campaign.new
      campaign.name = name
      campaign.owner_id = context[:current_user_id]
      raise GraphQL::ExecutionError.new "Error creating campaign", extensions: campaign.errors.to_hash unless campaign.save

      { campaign: campaign }
    end
  end
end
