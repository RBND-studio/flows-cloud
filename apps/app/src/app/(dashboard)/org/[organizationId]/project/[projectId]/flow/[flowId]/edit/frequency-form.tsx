"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FC } from "react";
import { Controller } from "react-hook-form";
import { t } from "translations";
import { Select, Text } from "ui";

import { useFlowEditForm } from "./edit-constants";

export const FrequencyForm: FC = () => {
  const { control } = useFlowEditForm();

  return (
    <Flex flexDirection="column" gap="space12" padding="space16">
      <Flex flexDirection="column">
        <Text variant="titleL">{t.frequency.frequency}</Text>
        <Text color="muted">{t.frequency.description}</Text>
      </Flex>
      <Flex gap="space8">
        <Controller
          control={control}
          name="frequency"
          render={({ field }) => (
            <Select
              className={css({ width: "200px" })}
              onChange={field.onChange}
              options={["once", "every-time"].map((v) => ({ label: t.frequency[v], value: v }))}
              value={field.value}
            />
          )}
        />
      </Flex>
    </Flex>
  );
};
