# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :campaigns, [Types::CampaignType], null: false

    field :factions, [Types::FactionType], null: false do
      argument :campaign_id, ID, required: true
    end

    field :worlds, [Types::WorldType], null: false do
      argument :campaign_id, ID, required: true
    end

    def campaigns
      Campaign.where(owner_id: context[:current_user_id]).select(:id, :name).order(:name)
    end

    def factions(campaign_id:)
      Faction.where(campaign_id: campaign_id).order(:name)
    end

    def worlds(campaign_id:)
      World.where(campaign_id: campaign_id).select(:id, :name).order(:name)
    end
  end
end
