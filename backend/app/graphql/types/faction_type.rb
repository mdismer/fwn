# frozen_string_literal: true

module Types
  class FactionType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: false
    field :max_hp, Integer, null: false
    field :current_hp, Integer, null: false
    field :force, Integer, null: false
    field :wealth, Integer, null: false
    field :cunning, Integer, null: false
    field :experience, Integer, null: false
    field :goal, GraphQL::Types::JSON
  end
end
