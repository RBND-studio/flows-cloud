import type { FlowStep } from "@flows/js";
import { Box, Flex } from "@flows/styled-system/jsx";
import { type FC, Fragment } from "react";
import { type Control, useFieldArray } from "react-hook-form";
import { Button, Text } from "ui";

import { InsertButton } from "./insert-button";
import { StepBranch } from "./step-branch";
import { STEP_DEFAULT } from "./step-form";
import { useStepsForm } from "./steps-editor.types";

type Props = {
  index: number;
  onRemove: () => void;
};

export const StepFork: FC<Props> = ({ index, onRemove }) => {
  const { control } = useStepsForm();
  const { append, remove, fields, insert } = useFieldArray({
    control: control as unknown as Control<{ steps: FlowStep[][][] }>,
    name: `steps.${index}`,
  });

  return (
    <Box cardWrap="-" px="space12" py="space12">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap="space8">
          <Text variant="titleM">Fork</Text>
          <Text color="subtle">{index}</Text>
        </Flex>
        <Button onClick={onRemove} shadow={false} variant="secondary">
          Remove fork
        </Button>
      </Flex>
      {fields.length !== 0 && (
        <Flex direction="column" mb="space12">
          {fields.map((field, i) => (
            <Fragment key={field.id}>
              <InsertButton onClick={() => insert(i, STEP_DEFAULT.fork)}>
                Insert branch
              </InsertButton>
              <StepBranch index={`${index}.${i}`} onRemove={() => remove(i)} />
            </Fragment>
          ))}
        </Flex>
      )}

      <Button onClick={() => append(STEP_DEFAULT.fork)} shadow={false} variant="secondary">
        Add branch
      </Button>
    </Box>
  );
};
