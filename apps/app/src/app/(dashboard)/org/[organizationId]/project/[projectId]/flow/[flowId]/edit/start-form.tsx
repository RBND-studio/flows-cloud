"use client";

import { Box, Flex } from "@flows/styled-system/jsx";
import { SmartLink } from "components/ui/smart-link";
import { Plus16 } from "icons";
import type { FC } from "react";
import { useFieldArray } from "react-hook-form";
import { links } from "shared";
import { t } from "translations";
import { Button, Text } from "ui";

import { useFlowEditForm } from "./edit-constants";
import { StepWaitOption } from "./step-form/step-wait-option";

export const StartForm: FC = () => {
  const { control } = useFlowEditForm();
  const fieldName = "start";
  const { append, remove, fields } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <Box>
      <Flex flexDirection="column" p="space16" borBottom="1px">
        <Text variant="titleL">{t.start.start}</Text>
        <Text color="muted">
          {t.start.description}{" "}
          <SmartLink color="text.primary" href={links.docs.startFlow} target="_blank">
            Learn more
          </SmartLink>
        </Text>
      </Flex>

      <Box p="space16">
        {fields.map((field, i) => (
          <StepWaitOption
            fieldName={`${fieldName}.${i}`}
            index={i}
            key={(field as { id: string }).id}
            onRemove={() => remove(i)}
          />
        ))}

        <Button onClick={() => append({})} size="small" startIcon={<Plus16 />} variant="secondary">
          {t.start.addOption}
        </Button>
      </Box>
    </Box>
  );
};
