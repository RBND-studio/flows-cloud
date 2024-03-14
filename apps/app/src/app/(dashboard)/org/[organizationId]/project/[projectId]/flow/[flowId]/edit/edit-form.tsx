"use client";

import type { FlowSteps } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import type { FlowDetail, UpdateFlow } from "lib/api";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import type { DefaultValues, SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Separator, Text, toast } from "ui";

import type { StepsForm } from "./edit-constants";
import { StepForm } from "./step-form";
import { StepPreview } from "./step-preview";
import { StepsFlow } from "./steps-flow";

type Props = {
  flow: FlowDetail;
};
const createDefaultValues = (flow: FlowDetail): DefaultValues<StepsForm> => ({
  steps:
    ((flow.draftVersion?.steps ?? flow.publishedVersion?.steps) as FlowSteps | undefined) ?? [],
});

export const EditForm: FC<Props> = ({ flow }) => {
  const [selectedStep, setSelectedStep] = useState<number | `${number}.${number}.${number}`>();
  const methods = useForm<StepsForm>({
    defaultValues: createDefaultValues(flow),
    mode: "onChange",
  });
  const { formState, reset, handleSubmit } = methods;

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
      <form
        className={css({ display: "flex", flexDir: "column", h: "100vh" })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex alignItems="center" borBottom="1px" p="space16">
          <Box flex={1}>
            <Text variant="titleM">{flow.name}</Text>
          </Box>
          <Button disabled={!formState.isDirty} loading={loading} type="submit">
            Save changes
          </Button>
        </Flex>
        <Grid flex={1} gap={0} gridTemplateColumns={2} overflow="hidden">
          <Box borRight="1px" overflow="auto" px="space16" py="space48">
            <StepsFlow onSelectStep={setSelectedStep} selectedStep={selectedStep} />
          </Box>
          <Box overflow="auto">
            {selectedStep !== undefined ? (
              <>
                <Box p="space16">
                  <StepForm index={selectedStep} key={selectedStep} />
                </Box>
                <Separator />
                <StepPreview selectedStep={selectedStep} />
              </>
            ) : (
              <Box p="space16">
                <Text>Start by selecting a step on the left</Text>
              </Box>
            )}
          </Box>
        </Grid>
      </form>
    </FormProvider>
  );
};
