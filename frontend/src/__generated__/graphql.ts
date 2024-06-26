/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Represents untyped JSON */
  JSON: { input: any; output: any; }
};

export type Campaign = {
  __typename?: 'Campaign';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

/** Autogenerated input type of CampaignCreate */
export type CampaignCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** Autogenerated return type of CampaignCreate. */
export type CampaignCreatePayload = {
  __typename?: 'CampaignCreatePayload';
  campaign: Campaign;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Autogenerated input type of CampaignDelete */
export type CampaignDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Autogenerated return type of CampaignDelete. */
export type CampaignDeletePayload = {
  __typename?: 'CampaignDeletePayload';
  campaign: Campaign;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

/** Autogenerated input type of CampaignUpdate */
export type CampaignUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

/** Autogenerated return type of CampaignUpdate. */
export type CampaignUpdatePayload = {
  __typename?: 'CampaignUpdatePayload';
  campaign: Campaign;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type Faction = {
  __typename?: 'Faction';
  cunning: Scalars['Int']['output'];
  currentHp: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  experience: Scalars['Int']['output'];
  force: Scalars['Int']['output'];
  goal?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  maxHp: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  wealth: Scalars['Int']['output'];
};

/** Autogenerated input type of FactionCreate */
export type FactionCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  factionInput: FactionInput;
};

/** Autogenerated return type of FactionCreate. */
export type FactionCreatePayload = {
  __typename?: 'FactionCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  faction: Faction;
};

/** Autogenerated input type of FactionDelete */
export type FactionDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Autogenerated return type of FactionDelete. */
export type FactionDeletePayload = {
  __typename?: 'FactionDeletePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  faction: Faction;
};

export type FactionInput = {
  campaignId: Scalars['ID']['input'];
  cunning: Scalars['Int']['input'];
  currentHp?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  experience?: InputMaybe<Scalars['Int']['input']>;
  force: Scalars['Int']['input'];
  goal?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  maxHp: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  wealth: Scalars['Int']['input'];
  worldId: Scalars['ID']['input'];
};

/** Autogenerated input type of FactionUpdate */
export type FactionUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  factionInput: FactionInput;
  id: Scalars['ID']['input'];
};

/** Autogenerated return type of FactionUpdate. */
export type FactionUpdatePayload = {
  __typename?: 'FactionUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  faction: Faction;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new campaign */
  campaignCreate?: Maybe<CampaignCreatePayload>;
  /** Deletes a campaign by ID */
  campaignDelete?: Maybe<CampaignDeletePayload>;
  /** Updates a campaign by id */
  campaignUpdate?: Maybe<CampaignUpdatePayload>;
  /** Creates a new faction */
  factionCreate?: Maybe<FactionCreatePayload>;
  /** Deletes a faction by ID */
  factionDelete?: Maybe<FactionDeletePayload>;
  /** Updates a faction by id */
  factionUpdate?: Maybe<FactionUpdatePayload>;
  /** Creates a new world */
  worldCreate?: Maybe<WorldCreatePayload>;
};


export type MutationCampaignCreateArgs = {
  input: CampaignCreateInput;
};


export type MutationCampaignDeleteArgs = {
  input: CampaignDeleteInput;
};


export type MutationCampaignUpdateArgs = {
  input: CampaignUpdateInput;
};


export type MutationFactionCreateArgs = {
  input: FactionCreateInput;
};


export type MutationFactionDeleteArgs = {
  input: FactionDeleteInput;
};


export type MutationFactionUpdateArgs = {
  input: FactionUpdateInput;
};


export type MutationWorldCreateArgs = {
  input: WorldCreateInput;
};

export type Query = {
  __typename?: 'Query';
  campaigns: Array<Campaign>;
  factions: Array<Faction>;
  worlds: Array<World>;
};


export type QueryFactionsArgs = {
  campaignId: Scalars['ID']['input'];
};


export type QueryWorldsArgs = {
  campaignId: Scalars['ID']['input'];
};

export type World = {
  __typename?: 'World';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** Autogenerated input type of WorldCreate */
export type WorldCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  input: WorldInput;
};

/** Autogenerated return type of WorldCreate. */
export type WorldCreatePayload = {
  __typename?: 'WorldCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  world: World;
};

export type WorldInput = {
  campaignId: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

export type GetWorldsQueryVariables = Exact<{
  campaignId: Scalars['ID']['input'];
}>;


export type GetWorldsQuery = { __typename?: 'Query', worlds: Array<{ __typename?: 'World', id: string, name: string }> };

export type CreateWorldMutationVariables = Exact<{
  campaignId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateWorldMutation = { __typename?: 'Mutation', worldCreate?: { __typename?: 'WorldCreatePayload', world: { __typename?: 'World', id: string, name: string } } | null };

export type NewWorldFragment = { __typename?: 'World', id: string, name: string } & { ' $fragmentName'?: 'NewWorldFragment' };

export type LoadFactionsQueryVariables = Exact<{
  campaignId: Scalars['ID']['input'];
}>;


export type LoadFactionsQuery = { __typename?: 'Query', factions: Array<{ __typename?: 'Faction', id: string, name: string }> };

export type GetCampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCampaignsQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', id: string, name?: string | null }> };

export type CreateCampaignMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', campaignCreate?: { __typename?: 'CampaignCreatePayload', campaign: { __typename?: 'Campaign', id: string, name?: string | null } } | null };

export type CreateFactionMutationVariables = Exact<{
  campaignId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  force: Scalars['Int']['input'];
  wealth: Scalars['Int']['input'];
  cunning: Scalars['Int']['input'];
  maxHp: Scalars['Int']['input'];
  worldId: Scalars['ID']['input'];
}>;


export type CreateFactionMutation = { __typename?: 'Mutation', factionCreate?: { __typename?: 'FactionCreatePayload', faction: { __typename?: 'Faction', id: string } } | null };

export const NewWorldFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NewWorld"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"World"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<NewWorldFragment, unknown>;
export const GetWorldsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorlds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"worlds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaignId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetWorldsQuery, GetWorldsQueryVariables>;
export const CreateWorldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorld"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"worldCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clientMutationId"},"value":{"kind":"StringValue","value":"CreateWorld","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"campaignId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"world"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateWorldMutation, CreateWorldMutationVariables>;
export const LoadFactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"loadFactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"campaignId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<LoadFactionsQuery, LoadFactionsQueryVariables>;
export const GetCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCampaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaigns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCampaignsQuery, GetCampaignsQueryVariables>;
export const CreateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaignCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clientMutationId"},"value":{"kind":"StringValue","value":"CreateCampaign","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCampaignMutation, CreateCampaignMutationVariables>;
export const CreateFactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createFaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"force"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wealth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cunning"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxHp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"worldId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factionCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"clientMutationId"},"value":{"kind":"StringValue","value":"createFaction","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"factionInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"force"},"value":{"kind":"Variable","name":{"kind":"Name","value":"force"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"wealth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wealth"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"cunning"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cunning"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"maxHp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxHp"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"campaignId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"campaignId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"worldId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"worldId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"faction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateFactionMutation, CreateFactionMutationVariables>;