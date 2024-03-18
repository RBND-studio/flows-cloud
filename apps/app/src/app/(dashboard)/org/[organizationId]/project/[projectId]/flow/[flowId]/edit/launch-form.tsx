"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import type { FC } from "react";
import { t } from "translations";
import { Input, Text } from "ui";

import { useFlowEditForm } from "./edit-constants";

export const LaunchForm: FC = () => {
  const { register, formState } = useFlowEditForm();

  return (
    <Box p="space16">
      <Flex flexDirection="column" mb="space12">
        <Text variant="titleL">{t.launch.launch}</Text>
        <Text color="muted">{t.launch.description}</Text>
      </Flex>

      <Input
        {...register("location")}
        className={css({ maxWidth: "400px", width: "100%", mb: "space16" })}
        defaultValue={formState.defaultValues?.location}
        description={t.launch.location}
        label="Location"
        placeholder="^\/home$ <- shows up only on the home page"
      />
      <Input
        {...register("clickElement")}
        className={css({ maxWidth: "400px", width: "100%", mb: "space16" })}
        defaultValue={formState.defaultValues?.clickElement}
        description={t.launch.element}
        label="Click element"
        placeholder=".onboarding-flow"
      />
    </Box>
  );
};
