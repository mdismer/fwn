# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :faction_delete, mutation: Mutations::FactionDelete
    field :faction_update, mutation: Mutations::FactionUpdate
    field :faction_create, mutation: Mutations::FactionCreate
    field :campaign_delete, mutation: Mutations::CampaignDelete
    field :campaign_update, mutation: Mutations::CampaignUpdate
    field :campaign_create, mutation: Mutations::CampaignCreate
  end
end
