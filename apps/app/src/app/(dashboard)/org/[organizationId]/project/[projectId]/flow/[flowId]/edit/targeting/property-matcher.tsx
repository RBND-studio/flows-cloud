import { Flex, Wrap } from "@flows/styled-system/jsx";
import { Close16 } from "icons";
import { type FC, useState } from "react";
import { useController } from "react-hook-form";
import { Icon, IconButton, Input, Select, Text } from "ui";

import { useFlowEditForm } from "../edit-constants";
import { CompareValueInput } from "./compare-value-input";
import { PrimitiveValueInput } from "./primitive-value-input";
import { StringValueInput } from "./string-value-input";

type Props = {
  groupIndex: number;
  matcherIndex: number;
  onRemove: () => void;
};

const matcherOptions = [
  { label: "Equals", value: "eq" },
  { label: "Not equals", value: "ne" },
  { label: "Grater than", value: "gt" },
  { label: "Grater than or equals", value: "gte" },
  { label: "Less than", value: "lt" },
  { label: "Less than or equals", value: "lte" },
  { label: "Contains", value: "contains" },
  { label: "Does not contain", value: "notContains" },
  { label: "Regular expression", value: "regex" },
] as const;

export type MatcherKey = (typeof matcherOptions)[number]["value"];

const isPrimitiveKey = (key: MatcherKey): key is "eq" | "ne" => ["eq", "ne"].includes(key);
const isCompareKey = (key: MatcherKey): key is "gt" | "gte" | "lt" | "lte" =>
  ["gt", "gte", "lt", "lte"].includes(key);
const isStringArrayKey = (key: MatcherKey): key is "contains" | "notContains" =>
  ["contains", "notContains"].includes(key);

export const PropertyMatcher: FC<Props> = ({ groupIndex, matcherIndex, onRemove }) => {
  const { control } = useFlowEditForm();
  const { field } = useController({
    control,
    name: `userProperties.${groupIndex}.${matcherIndex}`,
  });

  const title = matcherIndex === 0 ? "where" : "and";

  const defaultVariant =
    matcherOptions.find(
      (opt) => opt.value === Object.keys(field.value).filter((key) => key !== "key")[0],
    )?.value ?? matcherOptions[0].value;

  const [variant, setVariant] = useState<MatcherKey>(defaultVariant);

  return (
    <Flex alignItems="flex-start" gap="space8">
      <Flex justifyContent="flex-end" minW="40px" mt="6px">
        <Text color="subtle">{title}</Text>
      </Flex>
      <Wrap alignItems="center" columnGap="space8" rowGap="space8">
        <Input
          onChange={(e) => field.onChange({ ...field.value, key: e.target.value })}
          placeholder="Property"
          value={field.value.key}
        />

        <Select<MatcherKey>
          buttonSize="default"
          onChange={setVariant}
          options={matcherOptions}
          value={variant}
        />

        {isPrimitiveKey(variant) && (
          <PrimitiveValueInput
            onChange={(v) => field.onChange({ key: field.value.key, [variant]: v })}
            value={field.value[variant]}
          />
        )}
        {isCompareKey(variant) && (
          <CompareValueInput
            onChange={(v) => field.onChange({ key: field.value.key, [variant]: v })}
            value={field.value[variant]}
          />
        )}
        {isStringArrayKey(variant) && (
          <StringValueInput
            allowArray
            onChange={(v) => field.onChange({ key: field.value.key, [variant]: v })}
            value={field.value[variant]}
          />
        )}
        {variant === "regex" && (
          <StringValueInput
            onChange={(v) => field.onChange({ key: field.value.key, [variant]: v })}
            value={field.value[variant]}
          />
        )}
        <IconButton onClick={onRemove} variant="ghost" tooltip="Remove filter">
          <Icon icon={Close16} />
        </IconButton>
      </Wrap>
    </Flex>
  );
};
