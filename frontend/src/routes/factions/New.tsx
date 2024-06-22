import {gql, useMutation} from "@apollo/client";

const CREATE_FACTION = gql(`
mutation createFaction(
  $campaignId: ID!
  $name: String!
  $description: String
  $force: Int!
  $wealth: Int!
  $cunning: Int!
  $maxHp: Int!
  $worldId: ID!
) {
  factionCreate(
    input: {
      clientMutationId: "createFaction"
      factionInput: {
        force: $force
        name: $name
        description: $description
        wealth: $wealth
        cunning: $cunning
        maxHp: $maxHp
        campaignId: $campaignId
        worldId: $worldId
      }
    }
  ) {
    faction {
      id
    }
  }
}`)

export default function NewFaction() {
    const [createFaction] = useMutation(CREATE_FACTION)

    return (
        <div>New Faction</div>
    )
}