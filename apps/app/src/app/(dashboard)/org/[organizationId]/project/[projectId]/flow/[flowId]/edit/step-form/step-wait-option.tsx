import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Close16 } from "icons";
import type { FC } from "react";
import { t } from "translations";
import { Button, Icon, Input, Text } from "ui";

import { useFlowEditForm, type WaitOptions } from "../edit-constants";
import { StepWaitChange } from "./step-wait-change";
import { StepWaitForm } from "./step-wait-submit";
import { TargetBranchInput } from "./target-branch-input";

type FieldName =
  | `steps.${number}.wait.${number}`
  | `steps.${number}.${number}.${number}.wait.${number}`
  | `start.${number}`;

type Props = {
  fieldName: FieldName;
  onRemove: () => void;
  index: number;
};

export const StepWaitOption: FC<Props> = ({ fieldName, index, onRemove }) => {
  const { setValue, register, watch } = useFlowEditForm();
  const value = watch(fieldName);

  const isStart = fieldName.startsWith("start.");

  const currentVariant = (() => {
    if (value.element !== undefined) return "element";
    if (value.clickElement !== undefined) return "click";
    if (value.form) return "submit";
    if (value.change) return "change";
    return "empty";
  })();
  const handleVariantChange = (variant: typeof currentVariant): void => {
    let newValue: WaitOptions | null = null;
    if (variant === "change")
      newValue = {
        location: value.location,
        targetBranch: value.targetBranch,
        change: [],
      };
    if (variant === "submit")
      newValue = {
        location: value.location,
        targetBranch: value.targetBranch,
        form: { formElement: "", values: [] },
      };
    if (variant === "click")
      newValue = {
        location: value.location,
        targetBranch: value.targetBranch,
        clickElement: "",
      };
    if (variant === "element")
      newValue = {
        location: value.location,
        targetBranch: value.targetBranch,
        element: "",
      };
    if (variant === "empty")
      newValue = { location: value.location, targetBranch: value.targetBranch };
    if (newValue) setValue(fieldName, newValue, { shouldDirty: true });
  };

  const title = isStart ? `Start option ${index + 1}` : `Wait option ${index + 1}`;

  return (
    <Box>
      <Flex align="center" justify="space-between" mb="space8">
        <Text variant="titleS">{title}</Text>
        <Button onClick={onRemove} size="small" variant="ghost">
          <Icon icon={Close16} />
        </Button>
      </Flex>
      <Input
        {...register(`${fieldName}.location`)}
        defaultValue={value.location}
        description="Wait for the user to navigate to this location. Leave empty for any location"
        label="Location"
        placeholder="^/path$ (uses regex)"
      />

      <Flex flexDirection="column" alignItems="flex-start" my="space16">
        <Text weight="600">Action</Text>
        <Text color="muted" mb="space8" variant="bodyXs">
          What should happen to trigger this step?
        </Text>
        <Flex cardWrap="-" overflowX="auto">
          {(["empty", "click", "element", "change", "submit"] as const).map((variant) => (
            <Button
              key={variant}
              onClick={() => handleVariantChange(variant)}
              size="small"
              variant={currentVariant === variant ? "black" : "ghost"}
            >
              {t.steps.wait.variant[variant]}
            </Button>
          ))}
        </Flex>
      </Flex>

      {currentVariant === "click" && (
        <Input
          {...register(`${fieldName}.clickElement`)}
          defaultValue={value.clickElement}
          description="Wait for the user to click on this element, can be combined with 'location'"
          label="Click element"
          placeholder=".element"
        />
      )}
      {currentVariant === "element" && (
        <Input
          {...register(`${fieldName}.element`)}
          defaultValue={value.element}
          description="Wait for the element to appear on the page, can be combined with 'location'"
          label="Existing element"
          placeholder=".element"
        />
      )}

      {currentVariant === "change" && <StepWaitChange fieldName={fieldName} />}
      {currentVariant === "submit" && <StepWaitForm fieldName={fieldName} />}

      {isNotStart(fieldName) && <TargetBranchInput fieldName={fieldName} />}

      <hr className={css({ borderColor: "border", my: "space16", mx: "-space16" })} />
    </Box>
  );
};

function isNotStart(
  fieldName: FieldName,
): fieldName is
  | `steps.${number}.wait.${number}`
  | `steps.${number}.${number}.${number}.wait.${number}` {
  return fieldName.startsWith("steps.");
}
