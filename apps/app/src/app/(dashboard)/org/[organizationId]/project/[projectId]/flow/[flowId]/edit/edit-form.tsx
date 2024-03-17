"use client";

import type { FlowSteps } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { Close16 } from "icons";
import type { FlowDetail, UpdateFlow } from "lib/api";
import { api } from "lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC, useCallback, useRef, useState } from "react";
import type { DefaultValues, SubmitHandler } from "react-hook-form";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { routes } from "routes";
import { t } from "translations";
import { Button, Icon, Separator, Text, toast } from "ui";

import { FlowPreviewDialog } from "../(detail)/flow-preview-dialog";
import { FlowPublishChangesDialog } from "../(detail)/flow-publish-changes-dialog";
import type { StepsForm } from "./edit-constants";
import { EditFormEmpty } from "./edit-form-empty";
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
  const { formState, reset, handleSubmit, control } = methods;
  const fieldArray = useFieldArray({ control, name: "steps" });

  const backLink = routes.flow({ flowId: flow.id, organizationId, projectId: flow.project_id });
  const router = useRouter();
  const { loading, send } = useSend();
  const onSubmit: SubmitHandler<StepsForm> = useCallback(
    async (data) => {
      const res = await send(
        api["PATCH /flows/:flowId"](flow.id, {
          steps: data.steps as unknown as UpdateFlow["steps"],
        }),
        { errorMessage: t.toasts.saveStepsFailed },
      );
      if (res.error) return;
      reset(data, { keepValues: true });
      toast.success(t.toasts.updateFlowSuccess);
      router.push(backLink);
      router.refresh();
    },
    [backLink, flow.id, reset, router, send],
  );
  const formRef = useRef<HTMLFormElement>(null);
  const handleSave = useCallback(async (): Promise<void> => {
    if (!formState.isDirty) return;
    return handleSubmit(onSubmit)();
  }, [formState.isDirty, handleSubmit, onSubmit]);

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        className={css({
          display: "flex",
          flexDir: "column",
          h: "100vh",
        })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box borBottom="1px" p="space16">
          <Flex alignItems="center" margin="0 auto" maxWidth="1280px">
            <Box flex={1}>
              <Text variant="titleM">{flow.name}</Text>
            </Box>

            <Flex alignItems="center" gap="space12">
              <FlowPreviewDialog flow={flow} />
              <Button
                disabled={!formState.isDirty}
                loading={loading}
                type="submit"
                variant="secondary"
              >
                Save and close
              </Button>
              <FlowPublishChangesDialog
                isDirty={formState.isDirty}
                flow={flow}
                onSave={handleSave}
              />
              <Button variant="ghost" asChild>
                <Link href={backLink}>
                  <Icon icon={Close16} />
                </Link>
              </Button>
            </Flex>
          </Flex>
        </Box>
        {!fieldArray.fields.length ? (
          <EditFormEmpty fieldArray={fieldArray} />
        ) : (
          <Grid
            flex={1}
            gap={0}
            gridTemplateColumns={2}
            margin="0 auto"
            maxWidth="1280px"
            overflow="hidden"
            width="100%"
          >
            <Grid borLeft="1px" borRight="1px" overflow="auto">
              <StepsFlow
                onSelectStep={setSelectedStep}
                selectedStep={selectedStep}
                fieldArray={fieldArray}
              />
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
                <Box px="space24" py="space120">
                  <Text color="muted" align="center">
                    Select a step on the left to edit its properties.
                  </Text>
                </Box>
              )}
            </Box>
          </Grid>
        )}
      </form>
    </FormProvider>
  );
};
