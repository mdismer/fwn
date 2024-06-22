# frozen_string_literal: true

module Mutations
  class FactionUpdate < BaseMutation
    description "Updates a faction by id"

    field :faction, Types::FactionType, null: false

    argument :id, ID, required: true
    argument :faction_input, Types::FactionInputType, required: true

    def resolve(id:, faction_input:)
      faction = ::Faction.find(id)
      raise GraphQL::ExecutionError.new "Error updating faction", extensions: faction.errors.to_hash unless faction.update(**faction_input)

      { faction: faction }
    end
  end
end
