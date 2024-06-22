# frozen_string_literal: true

module Mutations
  class FactionCreate < BaseMutation
    description "Creates a new faction"

    field :faction, Types::FactionType, null: false

    argument :faction_input, Types::FactionInputType, required: true

    def resolve(faction_input:)
      faction = ::Faction.new(**faction_input)
      raise GraphQL::ExecutionError.new "Error creating faction", extensions: faction.errors.to_hash unless faction.save

      { faction: faction }
    end
  end
end
