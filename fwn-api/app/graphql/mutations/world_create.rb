# frozen_string_literal: true

module Mutations
  class WorldCreate < BaseMutation
    description "Creates a new world"

    field :world, Types::WorldType, null: false

    argument :input, Types::WorldInputType, required: true

    def resolve(input:)
      world = ::World.new(**input)
      raise GraphQL::ExecutionError.new "Error creating world", extensions: world.errors.to_hash unless world.save

      { world: world }
    end
  end
end
