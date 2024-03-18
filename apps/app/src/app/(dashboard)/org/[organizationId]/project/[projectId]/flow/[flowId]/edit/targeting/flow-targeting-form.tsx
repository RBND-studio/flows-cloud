"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Plus16 } from "icons";
import { type FC, Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import { t } from "translations";
import { Button, Text } from "ui";

import { useStepsForm } from "../edit-constants";
import { FlowMatchGroup } from "./flow-match-group";

export const FlowTargetingForm: FC = () => {
  const { control } = useStepsForm();
  const { fields, append, remove } = useFieldArray({ control, name: "userProperties" });

  return (
    <Flex flexDirection="column" p="space16">
      <Flex flexDirection="column" mb="space16">
        <Text variant="titleL">{t.targeting.targeting}</Text>
        <Text color="muted">{t.targeting.description}</Text>
      </Flex>

      <Box borTop="1px">
        {fields.map((field, i) => (
          <Fragment key={field.id}>
            {i !== 0 && (
              <Flex justifyContent="center" width="100%">
                <Text
                  as="span"
                  className={css({
                    paddingX: "space8",
                    backgroundColor: "bg.strong",
                    borderRadius: "radius8",
                    mt: "-space12",
                    mb: "-space12",
                  })}
                  variant="bodyS"
                >
                  or
                </Text>
              </Flex>
            )}
            <FlowMatchGroup index={i} onRemove={() => remove(i)} />
          </Fragment>
        ))}
      </Box>
      <Button onClick={() => append([[]])} startIcon={<Plus16 />} variant="secondary">
        {t.targeting.addGroup}
      </Button>
    </Flex>
  );
};
