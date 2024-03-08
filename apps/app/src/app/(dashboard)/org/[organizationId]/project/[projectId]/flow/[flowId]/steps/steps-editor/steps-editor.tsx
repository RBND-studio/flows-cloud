"use client";

import type { FlowSteps } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { Plus16 } from "icons";
import type { FlowDetail, UpdateFlow } from "lib/api";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC, Fragment } from "react";
import type { DefaultValues, SubmitHandler } from "react-hook-form";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Menu, MenuItem, Text, toast } from "ui";

import { Step } from "./step";
import { STEP_DEFAULT } from "./step-form";
import { StepInsertMenu } from "./step-insert-menu";
import type { StepsForm } from "./steps-editor.types";
import { StepsEditorPreview } from "./steps-editor-preview";

type Props = {
  flow: FlowDetail;
};
const createDefaultValues = (flow: FlowDetail): DefaultValues<StepsForm> => ({
  steps:
    ((flow.draftVersion?.steps ?? flow.publishedVersion?.steps) as FlowSteps | undefined) ?? [],
});

export const StepsEditor: FC<Props> = ({ flow }) => {
  const methods = useForm<StepsForm>({
    defaultValues: createDefaultValues(flow),
    mode: "onChange",
  });
  const { handleSubmit, control, reset, formState } = methods;
  const { append, remove, fields, insert } = useFieldArray({
    control,
    name: "steps",
  });

  const router = useRouter();
  const { loading, send } = useSend();
  const onSubmit: SubmitHandler<StepsForm> = async (data) => {
    const res = await send(
      api["PATCH /flows/:flowId"](flow.id, { steps: data.steps as unknown as UpdateFlow["steps"] }),
      { errorMessage: t.toasts.saveStepsFailed },
    );
    if (res.error) return;
    reset(data, { keepValues: true });
    router.refresh();
    toast.success(t.toasts.updateFlowSuccess);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Text variant="titleM">Flow steps</Text>

          <Button disabled={!formState.isDirty} loading={loading} type="submit">
            Save changes
          </Button>
        </Flex>

        <Flex direction="column" mb="space16">
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <StepInsertMenu onInsert={(step) => insert(index, step)} />
              <Step index={index} key={field.id} onRemove={() => remove(index)} />
            </Fragment>
          ))}
        </Flex>

        <Box mb="space40">
          {fields.length === 0 && (
            <Flex
              alignItems="center"
              cardWrap="-"
              flexDirection="column"
              gap="space8"
              mb="space16"
              px="space16"
              py="space32"
            >
              <Text color="muted">Start by adding a step</Text>
              <Text align="center" color="subtle" variant="bodyXs">
                Steps are the building blocks of your flow. They are the individual steps a user can
                take when interacting with your flow.
              </Text>
            </Flex>
          )}

          <Menu
            trigger={
              <Button startIcon={<Plus16 />} variant="secondary">
                Add step
              </Button>
            }
          >
            <MenuItem onClick={() => append(STEP_DEFAULT.tooltip)}>Tooltip</MenuItem>
            <MenuItem onClick={() => append(STEP_DEFAULT.modal)}>Modal</MenuItem>
            <MenuItem onClick={() => append(STEP_DEFAULT.wait)}>Wait</MenuItem>
            <MenuItem onClick={() => append(STEP_DEFAULT.fork)}>Fork</MenuItem>
          </Menu>
        </Box>

        <Text className={css({ mb: "space8" })} variant="titleM">
          Flow preview
        </Text>
        <StepsEditorPreview />
      </form>
    </FormProvider>
  );
};
