# frozen_string_literal: true

module Types
  class FactionInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :name, String, required: true
    argument :description, String, required: false
    argument :campaign_id, ID, required: true
    argument :max_hp, Integer, required: true
    argument :current_hp, Integer, required: false
    argument :force, Integer, required: true
    argument :wealth, Integer, required: true
    argument :cunning, Integer, required: true
    argument :experience, Integer, required: false
    argument :goal, GraphQL::Types::JSON, required: false
    argument :world_id, ID, required: true
  end
end
