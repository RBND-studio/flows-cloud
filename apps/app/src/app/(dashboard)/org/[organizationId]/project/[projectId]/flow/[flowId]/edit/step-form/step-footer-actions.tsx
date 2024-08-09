import { type FooterActionItem } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Close16, Plus16 } from "icons";
import type { FC } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { t } from "translations";
import { Button, Checkbox, Icon, IconButton, Input, Label, Select, Text } from "ui";

import { type FooterActionPlacement, useFlowEditForm } from "../edit-constants";
import { TargetBranchInput } from "./target-branch-input";

type Props = {
  index: number | `${number}.${number}.${number}`;
  placement: FooterActionPlacement;
};

export const StepFooterActions: FC<Props> = ({ index, placement }) => {
  const { control } = useFlowEditForm();
  const fieldName = `steps.${index}.footerActions.${placement}` as const;
  const fieldArray = useFieldArray({ name: fieldName, control });

  return (
    <Box bor="1px" borderRadius="radius8" minWidth={0}>
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
    | `steps.${number}.footerActions.${FooterActionPlacement}.${number}`
    | `steps.${number}.${number}.${number}.footerActions.${FooterActionPlacement}.${number}`;
  onRemove: () => void;
  index: number;
};

type OptionKey = "href" | "targetBranch" | "prev" | "next" | "cancel";

const Option: FC<OptionProps> = ({ fieldName, onRemove, index }) => {
  const { control, setValue, watch } = useFlowEditForm();
  const value = watch(fieldName);

  const currentVariant = (() => {
    if (value.href !== undefined) return "href";
    if (value.prev) return "prev";
    if (value.next) return "next";
    if (value.cancel) return "cancel";
    return "targetBranch";
  })();
  const handleSwitchVariant = (variant: typeof currentVariant): void => {
    const newValue = ((): FooterActionItem => {
      if (variant === "href") return { label: value.label, href: "" };
      if (variant === "prev") return { label: value.label, prev: true };
      if (variant === "next") return { label: value.label, next: true };
      if (variant === "cancel") return { label: value.label, cancel: true };
      return { label: value.label, targetBranch: 0 };
    })();
    setValue(fieldName, newValue, { shouldDirty: true });
  };

  const targetBranchIsEnabled = fieldName.split(".footerActions.").at(0)?.split(".").length === 2;
  const options: OptionKey[] = [
    "href",
    ...(targetBranchIsEnabled ? (["targetBranch"] as const) : []),
    "prev",
    "next",
    "cancel",
  ];

  return (
    <Box borBottom="1px" padding="space12">
      <Flex alignItems="center" gap="space8" justifyContent="space-between" mb="space8">
        <Text variant="titleS">Button {index + 1}</Text>
        <IconButton onClick={onRemove} tooltip="Remove footer button" size="small" variant="ghost">
          <Icon icon={Close16} />
        </IconButton>
      </Flex>
      <Input
        {...control.register(`${fieldName}.label`)}
        className={css({ mb: "space8" })}
        defaultValue={value.label}
        label="Text"
      />
      <Controller
        control={control}
        name={`${fieldName}.variant`}
        render={({ field }) => (
          <Select
            className={css({ mb: "space16" })}
            label="Variant"
            onChange={field.onChange}
            options={[
              { value: "primary", label: "Primary" },
              { value: "secondary", label: "Secondary" },
            ]}
            value={field.value ?? "primary"}
          />
        )}
      />

      <Flex cardWrap="-" mb="space16" overflowX="auto">
        {options.map((variant) => (
          <Button
            className={css({ flex: 1, fontWeight: "normal" })}
            key={variant}
            onClick={() => handleSwitchVariant(variant)}
            size="small"
            variant={currentVariant === variant ? "black" : "ghost"}
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

      {currentVariant === "targetBranch" && <TargetBranchInput fieldName={fieldName} />}
    </Box>
  );
};
