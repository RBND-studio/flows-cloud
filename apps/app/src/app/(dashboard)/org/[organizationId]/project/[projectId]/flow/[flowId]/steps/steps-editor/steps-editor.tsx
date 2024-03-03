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
import { Button, Icon, Menu, MenuItem, Text, toast } from "ui";

import { Step } from "./step";
import { STEP_DEFAULT } from "./step-form";
import { StepInsertMenu } from "./step-insert-menu";
import type { StepsForm } from "./steps-editor.types";
import { StepsEditorPreview } from "./steps-editor-preview";

type Props = {
  flow: FlowDetail;
};
const createDefaultValues = (flow: FlowDetail): DefaultValues<StepsForm> => ({
  steps: (flow.draftVersion?.steps ?? flow.publishedVersion?.steps) as FlowSteps | undefined,
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
        <Flex direction="column" mb="space16">
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <StepInsertMenu onInsert={(step) => insert(index, step)} />
              <Step index={index} key={field.id} onRemove={() => remove(index)} />
            </Fragment>
          ))}
        </Flex>

        <Box mb="space24">
          <Menu
            trigger={
              !fields.length ? (
                <button
                  className={css({
                    cardWrap: "-",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    gap: "space8",
                    py: "space32",
                    cursor: "pointer",
                    width: "100%",

                    fastEaseInOut: "all",

                    _hover: {
                      bg: "bg.subtleHover",
                    },
                  })}
                  type="button"
                >
                  <Text color="muted">Start by adding a step</Text>
                  <Text color="subtle" variant="bodyXs">
                    Steps are the building blocks of your flow. They are the individual steps a user
                    can take when interacting with your flow.
                  </Text>
                </button>
              ) : (
                <Button startIcon={<Icon icon={Plus16} />} variant="secondary">
                  Add
                </Button>
              )
            }
          >
            <MenuItem onClick={() => append(STEP_DEFAULT.tooltip)}>Step</MenuItem>
            <MenuItem onClick={() => append(STEP_DEFAULT.fork)}>Fork</MenuItem>
          </Menu>
        </Box>

        <Button
          className={css({ mb: "space40" })}
          disabled={!formState.isDirty}
          loading={loading}
          type="submit"
        >
          Save changes
        </Button>

        <Text className={css({ mb: "space8" })} variant="titleM">
          Flow preview
        </Text>
        <StepsEditorPreview />
      </form>
    </FormProvider>
  );
};
