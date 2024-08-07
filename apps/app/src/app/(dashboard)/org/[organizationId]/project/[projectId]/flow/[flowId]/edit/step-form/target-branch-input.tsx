import { Flex } from "@flows/styled-system/jsx";
import { SmartLink } from "components/ui/smart-link";
import { type FC } from "react";
import { Controller } from "react-hook-form";
import { links } from "shared";
import { t } from "translations";
import { Button, Text } from "ui";

import { type FooterActionPlacement, useFlowEditForm } from "../edit-constants";

type Props = {
  fieldName:
    | `steps.${number}.wait.${number}`
    | `steps.${number}.${number}.${number}.wait.${number}`
    | `steps.${number}.footerActions.${FooterActionPlacement}.${number}`
    | `steps.${number}.${number}.${number}.footerActions.${FooterActionPlacement}.${number}`;
};

export const TargetBranchInput: FC<Props> = ({ fieldName }) => {
  const { watch, control } = useFlowEditForm();

  const nextStepBranchCount = (() => {
    const isForkStep = fieldName.includes(".wait")
      ? fieldName.split(".").length === 6
      : fieldName.split(".").length === 7;
    if (isForkStep) return null;
    const stepNumberString = fieldName.split(".").at(1);
    if (stepNumberString === undefined) return null;
    const nextStepNumber = Number(stepNumberString) + 1;
    const nextStep = watch(`steps.${nextStepNumber}`);
    if (!Array.isArray(nextStep)) return null;
    return nextStep.length;
  })();

  if (nextStepBranchCount === null) return null;

  const targetBranchFieldName = `${fieldName}.targetBranch` as const;

  return (
    <Controller
      control={control}
      name={targetBranchFieldName}
      render={({ field }) => {
        const options = Array(nextStepBranchCount)
          .fill(null)
          .map((_, i) => i);

        return (
          <>
            <Text mt="space16">{t.steps.targetBranchLabel}</Text>
            <Text color="subtle" variant="bodyXs" mb="space8">
              {t.steps.targetBranchDescription}{" "}
              <SmartLink href={links.docs.branchTargeting} target="_blank" color="text.primary">
                Learn more
              </SmartLink>
            </Text>

            <Flex cardWrap="-" overflowX="auto" display="inline-flex">
              <Button
                variant={field.value === null ? "black" : "ghost"}
                onClick={() => field.onChange(null)}
                size="small"
              >
                None
              </Button>
              {options.map((opt) => {
                const active = field.value === opt;
                return (
                  <Button
                    key={opt}
                    size="small"
                    variant={active ? "black" : "ghost"}
                    onClick={() => field.onChange(opt)}
                  >
                    {opt}
                  </Button>
                );
              })}
            </Flex>
          </>
        );
      }}
    />
  );
};
