"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { SmartLink } from "components/ui/smart-link";
import type { FC } from "react";
import { Controller } from "react-hook-form";
import { links } from "shared";
import { t } from "translations";
import { Select, Text } from "ui";

import { useFlowEditForm } from "./edit-constants";

export const FrequencyForm: FC = () => {
  const { control } = useFlowEditForm();

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" p="space16" borBottom="1px">
        <Text variant="titleL">{t.frequency.frequency}</Text>
        <Text color="muted">
          {t.frequency.description}{" "}
          <SmartLink color="text.primary" href={links.docs.flowFrequency} target="_blank">
            Learn more
          </SmartLink>
        </Text>
      </Flex>

      <Flex gap="space8" p="space16">
        <Controller
          control={control}
          name="frequency"
          render={({ field }) => (
            <Select
              className={css({ width: "200px" })}
              onChange={field.onChange}
              options={["once", "every-session", "every-time"].map((v) => ({
                label: t.frequency[v],
                value: v,
              }))}
              value={field.value}
            />
          )}
        />
      </Flex>
    </Flex>
  );
};
