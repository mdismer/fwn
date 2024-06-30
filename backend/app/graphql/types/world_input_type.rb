# frozen_string_literal: true

module Types
  class WorldInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :name, String, required: true
    argument :campaign_id, ID, required: true
  end
end
