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

export type TargetingForm = {
  userProperties: MatchGroup[];
};
