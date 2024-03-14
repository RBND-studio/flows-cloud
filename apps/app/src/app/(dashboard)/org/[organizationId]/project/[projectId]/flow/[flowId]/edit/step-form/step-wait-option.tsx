import type { WaitStepOptions } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Close16 } from "icons";
import type { FC } from "react";
import { Controller } from "react-hook-form";
import { t } from "translations";
import { Button, Icon, Input, Text } from "ui";

import { useStepsForm } from "../edit-constants";
import { StepWaitChange } from "./step-wait-change";
import { StepWaitForm } from "./step-wait-submit";

type Props = {
  fieldName:
    | `steps.${number}.wait.${number}`
    | `steps.${number}.${number}.${number}.wait.${number}`;
  onRemove: () => void;
  index: number;
};

export const StepWaitOption: FC<Props> = ({ fieldName, index, onRemove }) => {
  const { setValue, register, watch, control } = useStepsForm();
  const value = watch(fieldName);

  const currentVariant = (() => {
    if (value.form) return "submit";
    if (value.change) return "change";
    return "click";
  })();
  const handleVariantChange = (variant: typeof currentVariant): void => {
    let newValue: WaitStepOptions | null = null;
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
    if (newValue) setValue(fieldName, newValue, { shouldDirty: true });
  };

  return (
    <Box>
      <Flex align="center" justify="space-between" mb="space8">
        <Text variant="titleS">Wait option {index + 1}</Text>
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

      <Flex gap="space4" my="space16">
        {(["click", "change", "submit"] as const).map((variant) => (
          <Button
            key={variant}
            onClick={() => handleVariantChange(variant)}
            size="small"
            variant={currentVariant === variant ? "black" : "secondary"}
          >
            {t.steps.wait.variant[variant]}
          </Button>
        ))}
      </Flex>

      {currentVariant === "click" && (
        <Input
          {...register(`${fieldName}.clickElement`)}
          defaultValue={value.clickElement}
          description="Wait for the user to click on this element can be combined with 'location'"
          label="Click element"
          placeholder=".element"
        />
      )}

      {currentVariant === "change" && <StepWaitChange fieldName={fieldName} />}
      {currentVariant === "submit" && <StepWaitForm fieldName={fieldName} />}

      <Controller
        control={control}
        name={`${fieldName}.targetBranch`}
        render={({ field }) => (
          <Input
            className={css({ my: "space16" })}
            description={t.steps.targetBranchDescription}
            label={t.steps.targetBranchLabel}
            onChange={(e) => field.onChange(Number(e.target.value))}
            placeholder="0"
            type="number"
            value={field.value}
          />
        )}
      />
      <hr className={css({ borderColor: "border", mb: "space16", mx: "-space16" })} />
    </Box>
  );
};
