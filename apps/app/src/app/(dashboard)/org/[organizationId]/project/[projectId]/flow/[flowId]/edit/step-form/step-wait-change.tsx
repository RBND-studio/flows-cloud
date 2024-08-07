import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Close16, Plus16 } from "icons";
import type { FC } from "react";
import { useFieldArray } from "react-hook-form";
import { Button, Icon, IconButton, Input, Text } from "ui";

import { useFlowEditForm } from "../edit-constants";

type Props = {
  fieldName:
    | `steps.${number}.wait.${number}`
    | `steps.${number}.${number}.${number}.wait.${number}`
    | `start.${number}`;
};

export const StepWaitChange: FC<Props> = ({ fieldName }) => {
  const { control } = useFlowEditForm();
  const changeFieldArray = useFieldArray({ name: `${fieldName}.change`, control });

  return (
    <Box bor="1px" borderRadius="radius8">
      <Box borBottom="1px" padding="space12">
        <Text variant="titleS">On Change</Text>
        <Text color="muted" variant="bodyS">
          Wait for an element to change and optionally check its new value.
        </Text>
      </Box>
      {changeFieldArray.fields.map((field, i) => (
        <ChangeForm
          fieldName={`${fieldName}.change.${i}`}
          index={i}
          key={field.id}
          onRemove={() => changeFieldArray.remove(i)}
        />
      ))}
      <Box padding="space12">
        <Button
          onClick={() => changeFieldArray.append({ element: "", value: "" })}
          size="small"
          startIcon={<Plus16 />}
          variant="secondary"
        >
          Add change field
        </Button>
      </Box>
    </Box>
  );
};

type ChangeProps = {
  fieldName:
    | `steps.${number}.wait.${number}.change.${number}`
    | `steps.${number}.${number}.${number}.wait.${number}.change.${number}`
    | `start.${number}.change.${number}`;
  onRemove: () => void;
  index: number;
};
const ChangeForm: FC<ChangeProps> = ({ fieldName, index, onRemove }) => {
  const { register, getValues } = useFlowEditForm();
  const initialValue = getValues(fieldName);

  return (
    <Box borBottom="1px" padding="space12">
      <Flex align="center" justify="space-between" mb="space8">
        <Text variant="titleS">Change field {index + 1}</Text>
        <IconButton onClick={onRemove} size="small" variant="ghost" tooltip="Remove change field">
          <Icon icon={Close16} />
        </IconButton>
      </Flex>
      <Input
        {...register(`${fieldName}.element`)}
        className={css({ mb: "space12" })}
        defaultValue={initialValue.element}
        description="Value of this element will be checked when its 'onchange' event is fired."
        label="Element"
        placeholder=".element"
      />
      <Input
        {...register(`${fieldName}.value`)}
        defaultValue={initialValue.value}
        description="Regex to match value of the element. Leave empty to only check if the element value changed."
        label="Value"
        placeholder="^my-value$"
      />
    </Box>
  );
};
