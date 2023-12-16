import type { UpdateFlow } from "lib/api";

interface UserPropertyMatch {
  key: string;
  regex?: string;
  eq?: PrimitiveValue | PrimitiveValue[];
  ne?: PrimitiveValue | PrimitiveValue[];
  gt?: CompareValue;
  gte?: CompareValue;
  lt?: CompareValue;
  lte?: CompareValue;
  contains?: string | string[];
  notContains?: string | string[];
}

export type MatchGroup = UserPropertyMatch[];

export type FlowEditFormData = {
  name: string;
  description: string;
  human_id: string;
  human_id_alias: string;
  published: boolean;
  frequency?: UpdateFlow["frequency"];
  userProperties: MatchGroup[];
};

export const primitiveValueOptions = [
  { label: "String", value: "string" },
  { label: "Number", value: "number" },
  { label: "Boolean", value: "boolean" },
  { label: "Null", value: "null" },
] as const;
export type PrimitiveValue = string | number | boolean | null;
export type PrimitiveValueKey = (typeof primitiveValueOptions)[number]["value"];

export const compareValueOptions = [
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
  { label: "String", value: "string" },
] as const;
export type CompareValue = number | string;
export type CompareValueKey = (typeof compareValueOptions)[number]["value"];
