/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery GetWorlds($campaignId: ID!) {\n  worlds(campaignId: $campaignId) {\n    id\n    name\n  }\n}\n": types.GetWorldsDocument,
    "\nmutation CreateWorld($campaignId: ID!, $name: String!) {\n  worldCreate(\n    input: {\n      clientMutationId: \"CreateWorld\"\n      input: { campaignId: $campaignId, name: $name }\n    }\n  ) {\n    world {\n      id\n      name\n    }\n  }\n}\n\n": types.CreateWorldDocument,
    "\n                          fragment NewWorld on World {\n                          id\n                          name\n                          }\n                          ": types.NewWorldFragmentDoc,
    "\nquery loadFactions($campaignId: ID!) {\n  factions(campaignId: $campaignId) {\n    id\n    name\n  }\n}\n": types.LoadFactionsDocument,
    "\n  query GetCampaigns {\n  campaigns {\n    id\n    name\n  }\n}\n\n": types.GetCampaignsDocument,
    "\nmutation CreateCampaign($name: String!) {\n  campaignCreate(input: { clientMutationId: \"CreateCampaign\", name: $name }) {\n    campaign {\n      id\n      name\n    }\n  }\n}\n": types.CreateCampaignDocument,
    "\nmutation createFaction(\n  $campaignId: ID!\n  $name: String!\n  $description: String\n  $force: Int!\n  $wealth: Int!\n  $cunning: Int!\n  $maxHp: Int!\n  $worldId: ID!\n) {\n  factionCreate(\n    input: {\n      clientMutationId: \"createFaction\"\n      factionInput: {\n        force: $force\n        name: $name\n        description: $description\n        wealth: $wealth\n        cunning: $cunning\n        maxHp: $maxHp\n        campaignId: $campaignId\n        worldId: $worldId\n      }\n    }\n  ) {\n    faction {\n      id\n    }\n  }\n}": types.CreateFactionDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetWorlds($campaignId: ID!) {\n  worlds(campaignId: $campaignId) {\n    id\n    name\n  }\n}\n"): (typeof documents)["\nquery GetWorlds($campaignId: ID!) {\n  worlds(campaignId: $campaignId) {\n    id\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateWorld($campaignId: ID!, $name: String!) {\n  worldCreate(\n    input: {\n      clientMutationId: \"CreateWorld\"\n      input: { campaignId: $campaignId, name: $name }\n    }\n  ) {\n    world {\n      id\n      name\n    }\n  }\n}\n\n"): (typeof documents)["\nmutation CreateWorld($campaignId: ID!, $name: String!) {\n  worldCreate(\n    input: {\n      clientMutationId: \"CreateWorld\"\n      input: { campaignId: $campaignId, name: $name }\n    }\n  ) {\n    world {\n      id\n      name\n    }\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n                          fragment NewWorld on World {\n                          id\n                          name\n                          }\n                          "): (typeof documents)["\n                          fragment NewWorld on World {\n                          id\n                          name\n                          }\n                          "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery loadFactions($campaignId: ID!) {\n  factions(campaignId: $campaignId) {\n    id\n    name\n  }\n}\n"): (typeof documents)["\nquery loadFactions($campaignId: ID!) {\n  factions(campaignId: $campaignId) {\n    id\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCampaigns {\n  campaigns {\n    id\n    name\n  }\n}\n\n"): (typeof documents)["\n  query GetCampaigns {\n  campaigns {\n    id\n    name\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateCampaign($name: String!) {\n  campaignCreate(input: { clientMutationId: \"CreateCampaign\", name: $name }) {\n    campaign {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\nmutation CreateCampaign($name: String!) {\n  campaignCreate(input: { clientMutationId: \"CreateCampaign\", name: $name }) {\n    campaign {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation createFaction(\n  $campaignId: ID!\n  $name: String!\n  $description: String\n  $force: Int!\n  $wealth: Int!\n  $cunning: Int!\n  $maxHp: Int!\n  $worldId: ID!\n) {\n  factionCreate(\n    input: {\n      clientMutationId: \"createFaction\"\n      factionInput: {\n        force: $force\n        name: $name\n        description: $description\n        wealth: $wealth\n        cunning: $cunning\n        maxHp: $maxHp\n        campaignId: $campaignId\n        worldId: $worldId\n      }\n    }\n  ) {\n    faction {\n      id\n    }\n  }\n}"): (typeof documents)["\nmutation createFaction(\n  $campaignId: ID!\n  $name: String!\n  $description: String\n  $force: Int!\n  $wealth: Int!\n  $cunning: Int!\n  $maxHp: Int!\n  $worldId: ID!\n) {\n  factionCreate(\n    input: {\n      clientMutationId: \"createFaction\"\n      factionInput: {\n        force: $force\n        name: $name\n        description: $description\n        wealth: $wealth\n        cunning: $cunning\n        maxHp: $maxHp\n        campaignId: $campaignId\n        worldId: $worldId\n      }\n    }\n  ) {\n    faction {\n      id\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;