"use client";

import { Box, Flex } from "@flows/styled-system/jsx";
import { Plus16 } from "icons";
import type { FC } from "react";
import { useFieldArray } from "react-hook-form";
import { t } from "translations";
import { Button, Text } from "ui";

import { useFlowEditForm } from "./edit-constants";
import { StepWaitOption } from "./step-form/step-wait-option";

export const LaunchForm: FC = () => {
  const { control } = useFlowEditForm();
  const fieldName = "start";
  const { append, remove, fields } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <Box p="space16">
      <Flex flexDirection="column" mb="space12">
        <Text variant="titleL">{t.launch.launch}</Text>
        <Text color="muted">{t.launch.description}</Text>
      </Flex>

      {fields.map((field, i) => (
        <StepWaitOption
          fieldName={`${fieldName}.${i}`}
          index={i}
          key={(field as { id: string }).id}
          onRemove={() => remove(i)}
        />
      ))}

      <Button
        onClick={() => append({})}
        shadow="none"
        size="small"
        startIcon={<Plus16 />}
        variant="secondary"
      >
        Add start option
      </Button>
    </Box>
  );
};
