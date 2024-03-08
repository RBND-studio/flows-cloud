import type { WaitStepOptions } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Plus16 } from "icons";
import type { FC } from "react";
import { useFieldArray } from "react-hook-form";
import { Button, Text } from "ui";

import { StepWaitOption } from "./step-wait-option";
import { useStepsForm } from "./steps-editor.types";

type Props = {
  fieldName: `steps.${number}.wait` | `steps.${number}.${number}.${number}.wait`;
};

const DEFAULT_WAIT_OPTION: WaitStepOptions = {};

export const StepWaitOptionList: FC<Props> = ({ fieldName }: Props) => {
  const { control } = useStepsForm();
  const { append, remove, fields } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <>
      <Text
        className={css({
          mb: "space16",
        })}
        color="muted"
      >
        Wait for an event to occur before continuing to the next step. You can wait for the user to
        click a button, navigate to a page, submit a form, etc.
      </Text>
      {fields.map((field, i) => (
        <StepWaitOption
          fieldName={`${fieldName}.${i}`}
          index={i}
          key={(field as { id: string }).id}
          onRemove={() => remove(i)}
        />
      ))}
      <Button
        onClick={() => append(DEFAULT_WAIT_OPTION as never)}
        shadow="none"
        size="small"
        startIcon={<Plus16 />}
        variant="secondary"
      >
        Add wait option
      </Button>
    </>
  );
};
