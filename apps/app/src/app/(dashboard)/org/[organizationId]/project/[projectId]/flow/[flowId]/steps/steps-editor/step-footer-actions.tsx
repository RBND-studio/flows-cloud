import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Close16, Plus16 } from "icons";
import type { FC } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { t } from "translations";
import { Button, Checkbox, Icon, Input, Label, Text } from "ui";

import { useStepsForm } from "./steps-editor.types";

type Placement = "left" | "center" | "right";

type Props = {
  index: number | `${number}.${number}.${number}`;
  placement: Placement;
};

export const StepFooterActions: FC<Props> = ({ index, placement }) => {
  const { control } = useStepsForm();
  const fieldName = `steps.${index}.footerActions.${placement}` as const;
  const fieldArray = useFieldArray({ name: fieldName, control });

  return (
    <Box bor="1px" borderRadius="radius8">
      <Box borBottom="1px" padding="space12">
        <Text>{t.steps.footer.buttonAlignment[placement]} actions</Text>
      </Box>
      {fieldArray.fields.map((field, i) => (
        <Option
          fieldName={`${fieldName}.${i}`}
          index={i}
          key={field.id}
          onRemove={() => fieldArray.remove(i)}
        />
      ))}
      <Box padding="space12">
        <Button
          onClick={() => fieldArray.append({ label: "" })}
          shadow={false}
          size="small"
          startIcon={<Plus16 />}
          variant="secondary"
        >
          Add button
        </Button>
      </Box>
    </Box>
  );
};

type OptionProps = {
  fieldName:
    | `steps.${number}.footerActions.${Placement}.${number}`
    | `steps.${number}.${number}.${number}.footerActions.${Placement}.${number}`;
  onRemove: () => void;
  index: number;
};

const Option: FC<OptionProps> = ({ fieldName, onRemove, index }) => {
  const { control, setValue, watch } = useStepsForm();
  const value = watch(fieldName);

  const currentVariant = (() => {
    if (value.href !== undefined) return "href";
    if (value.prev) return "prev";
    if (value.next) return "next";
    return "targetBranch";
  })();
  const handleSwitchVariant = (variant: typeof currentVariant): void => {
    if (variant === "href") return setValue(fieldName, { label: value.label, href: "" });
    if (variant === "prev") return setValue(fieldName, { label: value.label, prev: true });
    if (variant === "next") return setValue(fieldName, { label: value.label, next: true });
    return setValue(fieldName, { label: value.label, targetBranch: 0 });
  };

  return (
    <Box borBottom="1px" padding="space12">
      <Flex alignItems="center" gap="space8" justifyContent="space-between" mb="space8">
        <Text variant="titleS">Button {index + 1}</Text>
        <Button onClick={onRemove} size="small" variant="ghost">
          <Icon icon={Close16} />
        </Button>
      </Flex>
      <Input
        {...control.register(`${fieldName}.label`)}
        className={css({ mb: "space16" })}
        defaultValue={value.label}
        label="Text"
      />

      <Flex gap="space4" mb="space16">
        {(["href", "targetBranch", "prev", "next"] as const).map((variant) => (
          <Button
            className={css({ flex: 1 })}
            key={variant}
            onClick={() => handleSwitchVariant(variant)}
            size="small"
            variant={currentVariant === variant ? "black" : "secondary"}
          >
            {t.steps.footer.variant[variant]}
          </Button>
        ))}
      </Flex>

      {currentVariant === "href" && (
        <Box>
          <Flex justifyContent="space-between" mb="space4">
            <Label htmlFor={`${fieldName}.href`}>Href</Label>
            <Controller
              control={control}
              name={`${fieldName}.external`}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  label="External link"
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </Flex>
          <Input
            id={`${fieldName}.href`}
            {...control.register(`${fieldName}.href`)}
            defaultValue={value.href}
            placeholder="https://example.com"
          />
        </Box>
      )}

      {currentVariant === "targetBranch" && (
        <Controller
          control={control}
          name={`${fieldName}.targetBranch`}
          render={({ field }) => (
            <Input
              description={t.steps.targetBranchDescription}
              label={t.steps.targetBranchLabel}
              onChange={(e) => field.onChange(Number(e.target.value))}
              placeholder="0"
              type="number"
              value={field.value}
            />
          )}
        />
      )}
    </Box>
  );
};
