import { JSONContent } from "@tiptap/react";

export type FactionSize = "Minor" | "Major" | "Regional Hegemon";

export type AssetDto = {
  type: string;
  world: {
    name: string;
    id: string;
  };
};

export type WorldDto = {
  name: string;
  id: string;
};

export type FactionForm = {
  name: string;
  size: FactionSize;
  description: JSONContent;
  wealth: string;
  cunning: string;
  force: string;
  homeWorld?: {
    name: string;
    id: string;
  };
  goal: string;
  assets: AssetDto[];
};
