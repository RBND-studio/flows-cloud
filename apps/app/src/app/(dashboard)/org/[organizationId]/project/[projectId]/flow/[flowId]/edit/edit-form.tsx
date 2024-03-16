"use client";

import type { FlowSteps } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import type { FlowDetail, UpdateFlow } from "lib/api";
import { api } from "lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import type { DefaultValues, SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { routes } from "routes";
import { t } from "translations";
import { Button, Separator, Text, toast } from "ui";

import { FlowPreviewDialog } from "../(detail)/flow-preview-dialog";
import { FlowPublishChangesDialog } from "../(detail)/flow-publish-changes-dialog";
import type { StepsForm } from "./edit-constants";
import { StepForm } from "./step-form";
import { StepPreview } from "./step-preview";
import { StepsFlow } from "./steps-flow";

type Props = {
  flow: FlowDetail;
  organizationId: string;
};
const createDefaultValues = (flow: FlowDetail): DefaultValues<StepsForm> => ({
  steps:
    ((flow.draftVersion?.steps ?? flow.publishedVersion?.steps) as FlowSteps | undefined) ?? [],
});

export const EditForm: FC<Props> = ({ flow, organizationId }) => {
  const [selectedStep, setSelectedStep] = useState<number | `${number}.${number}.${number}`>();
  const methods = useForm<StepsForm>({
    defaultValues: createDefaultValues(flow),
    mode: "onChange",
  });
  const { formState, reset, handleSubmit } = methods;

  const backLink = routes.flow({ flowId: flow.id, organizationId, projectId: flow.project_id });
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
    router.push(backLink);
    toast.success(t.toasts.updateFlowSuccess);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={css({
          display: "flex",
          flexDir: "column",
          h: "100vh",
        })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box borBottom="1px">
          <Flex alignItems="center" margin="0 auto" maxWidth="1280px" p="space16">
            <Box flex={1}>
              <Text variant="titleM">{flow.name}</Text>
            </Box>

            <Flex alignItems="center" gap="space16">
              <FlowPreviewDialog flow={flow} />
              <FlowPublishChangesDialog flow={flow} />
              <Button disabled={!formState.isDirty} loading={loading} type="submit">
                Save changes
              </Button>
              <Button variant="ghost" asChild>
                <Link href={backLink}>X</Link>
              </Button>
            </Flex>
          </Flex>
        </Box>
        <Grid
          flex={1}
          gap={0}
          gridTemplateColumns={2}
          margin="0 auto"
          maxWidth="1280px"
          overflow="hidden"
        >
          <Grid borLeft="1px" borRight="1px" overflow="auto">
            <StepsFlow onSelectStep={setSelectedStep} selectedStep={selectedStep} />
          </Grid>
          <Box borRight="1px" overflow="auto">
            {selectedStep !== undefined ? (
              <>
                <Box bg="bg" p="space16">
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
