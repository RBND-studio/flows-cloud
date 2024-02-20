import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Close16, Plus16 } from "icons";
import type { FC } from "react";
import { useFieldArray } from "react-hook-form";
import { Button, Icon, Input, Text } from "ui";

import { useStepsForm } from "./steps-editor.types";

type Props = {
  fieldName:
    | `steps.${number}.wait.${number}`
    | `steps.${number}.${number}.${number}.wait.${number}`;
};

export const StepWaitForm: FC<Props> = ({ fieldName }) => {
  const { register, control, getValues } = useStepsForm();
  const initialValue = getValues(fieldName);
  const submitValueFieldArray = useFieldArray({ name: `${fieldName}.form.values`, control });

  return (
    <Box bor="1px" borderRadius="radius8">
      <Box borBottom="1px" padding="space12">
        <Text variant="titleS">On Submit</Text>
        <Text className={css({ mb: "space8" })} color="muted" variant="bodyS">
          Wait for a form to be submitted and optionally check the values of the fields in it.
        </Text>
        <Input
          {...register(`${fieldName}.form.formElement`)}
          defaultValue={initialValue.form?.formElement}
          description="Form element to listen 'onsubmit' event on."
          label="Form element"
          placeholder=".element"
        />
      </Box>
      {submitValueFieldArray.fields.map((field, i) => (
        <SubmitValueForm
          fieldName={`${fieldName}.form.values.${i}`}
          index={i}
          key={field.id}
          onRemove={() => submitValueFieldArray.remove(i)}
        />
      ))}
      <Box padding="space12">
        <Button
          onClick={() => submitValueFieldArray.append({ element: "", value: "" })}
          shadow={false}
          size="small"
          startIcon={<Plus16 />}
          variant="secondary"
        >
          Add submit field
        </Button>
      </Box>
    </Box>
  );
};

type SubmitValueProps = {
  fieldName:
    | `steps.${number}.wait.${number}.form.values.${number}`
    | `steps.${number}.${number}.${number}.wait.${number}.form.values.${number}`;
  onRemove: () => void;
  index: number;
};
const SubmitValueForm: FC<SubmitValueProps> = ({ fieldName, index, onRemove }) => {
  const { register, getValues } = useStepsForm();
  const initialValue = getValues(fieldName);

  return (
    <Box borBottom="1px" padding="space12">
      <Flex align="center" justify="space-between" mb="space8">
        <Text variant="titleS">Checked form field {index + 1}</Text>
        <Button onClick={onRemove} size="small" variant="ghost">
          <Icon icon={Close16} />
        </Button>
      </Flex>
      <Input
        {...register(`${fieldName}.element`)}
        className={css({ mb: "space12" })}
        defaultValue={initialValue.element}
        description="Value of this element will be checked when the form is submitted."
        label="Form field"
        placeholder=".element"
      />
      <Input
        {...register(`${fieldName}.value`)}
        defaultValue={initialValue.value}
        description="Regex to match value of the form element."
        label="Value"
        placeholder="^my-value$"
      />
    </Box>
  );
};
