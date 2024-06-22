# frozen_string_literal: true

module Mutations
  class FactionDelete < BaseMutation
    description "Deletes a faction by ID"

    field :faction, Types::FactionType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      faction = ::Faction.find(id)
      raise GraphQL::ExecutionError.new "Error deleting faction", extensions: faction.errors.to_hash unless faction.destroy!

      { faction: faction }
    end
  end
end
