import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Plus16 } from "icons";
import { type FC, Fragment } from "react";
import { type Control, useFieldArray } from "react-hook-form";
import { Accordion, Button, Text } from "ui";

import { InsertButton } from "./insert-button";
import { STEP_DEFAULT, StepForm } from "./step-form";
import type { StepsForm } from "./steps-editor.types";

type Props = {
  control: Control<StepsForm>;
  index: `${number}.${number}`;
  onRemove: () => void;
};

export const StepBranch: FC<Props> = ({ control, index, onRemove }) => {
  const { append, remove, fields, insert } = useFieldArray({ control, name: `steps.${index}` });
  const branchIndex = index.split(".")[1];

  return (
    <Accordion
      title={
        <Flex alignItems="center" mr="space8">
          <Flex alignItems="center" flex={1} gap="space8">
            <Text as="span" variant="titleM">
              Branch
            </Text>
            <Text color="subtle" variant="bodyS">
              {branchIndex}
            </Text>
          </Flex>

          <Button
            onClick={(e) => (e.stopPropagation(), onRemove())}
            shadow={false}
            size="small"
            variant="secondary"
          >
            Remove branch
          </Button>
        </Flex>
      }
    >
      {fields.map((field, i) => (
        <Fragment key={field.id}>
          <InsertButton
            className={css({ mt: i === 0 ? "-space16" : 0 })}
            onClick={() => insert(i, STEP_DEFAULT.tooltip)}
          >
            Insert step
          </InsertButton>
          <StepForm control={control} index={`${index}.${i}`} onRemove={() => remove(i)} />
        </Fragment>
      ))}
      <Button
        className={css({ mt: "space16" })}
        onClick={() => append(STEP_DEFAULT.tooltip)}
        shadow={false}
        startIcon={<Plus16 />}
        variant="secondary"
      >
        Add step to branch
      </Button>
    </Accordion>
  );
};
