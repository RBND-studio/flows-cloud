import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Close16, Plus16 } from "icons";
import type { FC } from "react";
import { type Control, Controller, useController, useFieldArray } from "react-hook-form";
import { t } from "translations";
import { Button, Icon, Input, Text } from "ui";

import type { StepsForm } from "./steps-editor.types";

type Props = {
  control: Control<StepsForm>;
  fieldName:
    | `steps.${number}.wait.${number}`
    | `steps.${number}.${number}.${number}.wait.${number}`;
  onRemove: () => void;
  index: number;
};

export const StepWaitOption: FC<Props> = ({ control, fieldName, index, onRemove }) => {
  const controller = useController({ control, name: fieldName });
  const value = controller.field.value;

  const changeFieldArray = useFieldArray({ name: `${fieldName}.change`, control });
  const submitValueFieldArray = useFieldArray({ name: `${fieldName}.form.values`, control });

  const currentVariant = (() => {
    if (controller.field.value.form) return "submit";
    if (controller.field.value.change) return "change";
    return "click";
  })();
  const handleVariantChange = (variant: typeof currentVariant): void => {
    if (variant === "change")
      return controller.field.onChange({
        location: controller.field.value.location,
        action: controller.field.value.action,
        change: [],
      });
    if (variant === "submit")
      return controller.field.onChange({
        location: controller.field.value.location,
        action: controller.field.value.action,
        form: {},
      });
    return controller.field.onChange({
      location: controller.field.value.location,
      action: controller.field.value.action,
      element: "",
    });
  };

  return (
    <Box>
      <Flex align="center" justify="space-between" mb="space8">
        <Text variant="titleS">Wait option {index + 1}</Text>
        <Button onClick={onRemove} size="small" variant="ghost">
          <Icon icon={Close16} />
        </Button>
      </Flex>
      <Input
        {...control.register(`${fieldName}.location`)}
        defaultValue={value.location}
        description="Wait for the user to navigate to this location. Leave empty for any location"
        label="Location"
        placeholder="^/path$ (uses regex)"
      />

      <Flex gap="space4" my="space16">
        {(["click", "change", "submit"] as const).map((variant) => (
          <Button
            key={variant}
            onClick={() => handleVariantChange(variant)}
            size="small"
            variant={currentVariant === variant ? "black" : "secondary"}
          >
            {t.steps.wait.variant[variant]}
          </Button>
        ))}
      </Flex>

      {currentVariant === "click" && (
        <Input
          {...control.register(`${fieldName}.element`)}
          defaultValue={value.element}
          description="Wait for the user to click on this element can be combined with 'location'"
          label="Element"
          placeholder=".element"
        />
      )}

      {currentVariant === "change" && (
        <Box bor="1px" borderRadius="radius8">
          <Box borBottom="1px" padding="space12">
            <Text variant="titleS">On Change</Text>
            <Text color="muted" variant="bodyS">
              Wait for an element to change and optionally check its new value.
            </Text>
          </Box>
          {changeFieldArray.fields.map((field, i) => (
            <ChangeForm
              control={control}
              fieldName={`${fieldName}.change.${i}`}
              index={i}
              key={field.id}
              onRemove={() => changeFieldArray.remove(i)}
            />
          ))}
          <Box padding="space12">
            <Button
              onClick={() => changeFieldArray.append({ element: "", value: "" })}
              shadow={false}
              size="small"
              startIcon={<Plus16 />}
              variant="secondary"
            >
              Add change field
            </Button>
          </Box>
        </Box>
      )}

      {currentVariant === "submit" && (
        <Box bor="1px" borderRadius="radius8">
          <Box borBottom="1px" padding="space12">
            <Text variant="titleS">On Submit</Text>
            <Text className={css({ mb: "space8" })} color="muted" variant="bodyS">
              Wait for a form to be submitted and optionally check the values of the fields in it.
            </Text>
            <Input
              {...control.register(`${fieldName}.form.element`)}
              defaultValue={value.form?.element}
              description="Form element to listen 'onsubmit' event on."
              label="Form element"
              placeholder=".element"
            />
          </Box>
          {submitValueFieldArray.fields.map((field, i) => (
            <SubmitValueForm
              control={control}
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
      )}

      <Controller
        control={control}
        name={`${fieldName}.action`}
        render={({ field }) => (
          <Input
            className={css({ my: "space16" })}
            description="Which branch to take. Leave empty is there is no fork step after this step."
            label="Action"
            onChange={(e) => field.onChange(Number(e.target.value))}
            placeholder="0"
            type="number"
            value={field.value}
          />
        )}
      />
      <hr className={css({ borderColor: "border", mb: "space16", mx: "-space16" })} />
    </Box>
  );
};

type ChangeProps = {
  control: Control<StepsForm>;
  fieldName:
    | `steps.${number}.wait.${number}.change.${number}`
    | `steps.${number}.${number}.${number}.wait.${number}.change.${number}`;
  onRemove: () => void;
  index: number;
};
const ChangeForm: FC<ChangeProps> = ({ control, fieldName, index, onRemove }) => {
  const { field } = useController({ control, name: fieldName });

  return (
    <Box borBottom="1px" padding="space12">
      <Flex align="center" justify="space-between" mb="space8">
        <Text variant="titleS">Change field {index + 1}</Text>
        <Button onClick={onRemove} size="small" variant="ghost">
          <Icon icon={Close16} />
        </Button>
      </Flex>
      <Input
        {...control.register(`${fieldName}.element`)}
        className={css({ mb: "space12" })}
        defaultValue={field.value.element}
        description="Value of this element will be checked when its 'onchange' event is fired."
        label="Element"
        placeholder=".element"
      />
      <Input
        {...control.register(`${fieldName}.value`)}
        defaultValue={field.value.value}
        description="Regex to match value of the element. Leave empty to only check if the element value changed."
        label="Value"
        placeholder="^my-value$"
      />
    </Box>
  );
};

type SubmitValueProps = {
  control: Control<StepsForm>;
  fieldName:
    | `steps.${number}.wait.${number}.form.values.${number}`
    | `steps.${number}.${number}.${number}.wait.${number}.form.values.${number}`;
  onRemove: () => void;
  index: number;
};
const SubmitValueForm: FC<SubmitValueProps> = ({ control, fieldName, index, onRemove }) => {
  const { field } = useController({ control, name: fieldName });

  return (
    <Box borBottom="1px" padding="space12">
      <Flex align="center" justify="space-between" mb="space8">
        <Text variant="titleS">Checked form field {index + 1}</Text>
        <Button onClick={onRemove} size="small" variant="ghost">
          <Icon icon={Close16} />
        </Button>
      </Flex>
      <Input
        {...control.register(`${fieldName}.element`)}
        className={css({ mb: "space12" })}
        defaultValue={field.value.element}
        description="Value of this element will be checked when the form is submitted."
        label="Form field"
        placeholder=".element"
      />
      <Input
        {...control.register(`${fieldName}.value`)}
        defaultValue={field.value.value}
        description="Regex to match value of the form element."
        label="Value"
        placeholder="^my-value$"
      />
    </Box>
  );
};
