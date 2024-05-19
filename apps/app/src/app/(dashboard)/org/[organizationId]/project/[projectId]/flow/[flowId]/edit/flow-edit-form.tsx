"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex, Grid } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { Close16, Versions24 } from "icons";
import type { FlowDetail } from "lib/api";
import { api } from "lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { routes } from "routes";
import { t } from "translations";
import { Button, Icon, Separator, Text } from "ui";

import { FlowPreviewDialog } from "../(detail)/flow-preview-dialog";
import { FlowPublishChangesDialog } from "../(detail)/flow-publish-changes-dialog";
import { Autosave } from "./autosave";
import {
  createDefaultValues,
  formToRequest,
  type IFlowEditForm,
  type SelectedItem,
} from "./edit-constants";
import { EditFormEmpty } from "./edit-form-empty";
import { FrequencyForm } from "./frequency-form";
import { RemoveDraft } from "./remove-draft";
import { StartForm } from "./start-form";
import { StepForm } from "./step-form";
import { StepPreview } from "./step-preview";
import { StepsFlow } from "./steps-flow";
import { FlowTargetingForm } from "./targeting";

type Props = {
  flow: FlowDetail;
  organizationId: string;
};

export const FlowEditForm: FC<Props> = ({ flow, organizationId }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();
  const methods = useForm<IFlowEditForm>({
    defaultValues: createDefaultValues(flow),
    mode: "onChange",
  });
  const { reset, handleSubmit, control, formState } = methods;
  const fieldArray = useFieldArray({ control, name: "steps" });

  const backLink = routes.flow({ flowId: flow.id, organizationId, projectId: flow.project_id });
  const router = useRouter();
  const { send } = useSend();
  const onSubmit: SubmitHandler<IFlowEditForm> = useCallback(
    async (data) => {
      const res = await send(api["PATCH /flows/:flowId"](flow.id, formToRequest(data)), {
        errorMessage: t.toasts.saveFlowFailed,
      });
      if (res.error) return;
      reset(data, { keepValues: true });
      router.refresh();
    },
    [flow.id, reset, router, send],
  );

  const formRef = useRef<HTMLFormElement>(null);
  const handleSave = useCallback((): void => {
    formRef.current?.requestSubmit();
  }, []);

  const onUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      handleSave();
    },
    [handleSave],
  );

  const { isDirty } = formState;
  // Save on page unload (refresh, close, etc.)
  useEffect(() => {
    if (!isDirty) return;
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [isDirty, onUnload]);

  // Save on SPA navigation to other page
  useEffect(() => {
    if (!isDirty) return;
    return () => {
      void handleSubmit(onSubmit)();
    };
  }, [handleSubmit, isDirty, onSubmit]);

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
          <Flex alignItems="center">
            <Box flex={1}>
              <Text variant="titleM">{flow.name}</Text>
            </Box>

            <Flex alignItems="center" gap="space12">
              <Autosave onSave={handleSave} flow={flow} />
              <RemoveDraft flow={flow} />
              <FlowPreviewDialog flow={flow} />
              <FlowPublishChangesDialog flow={flow} />
              <Button variant="ghost" size="icon" asChild>
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
          <Flex flex={1} gap={0} overflow="hidden" width="100%">
            <Grid borRight="1px" overflow="auto" flex={1}>
              <StepsFlow
                onSelectItem={setSelectedItem}
                selectedItem={selectedItem}
                fieldArray={fieldArray}
              />
            </Grid>
            <Box borRight="1px" overflow="auto" bg="bg" flex={1} maxWidth="760px">
              {selectedItem !== undefined ? (
                selectedItem === "targeting" ? (
                  <FlowTargetingForm />
                ) : selectedItem === "frequency" ? (
                  <FrequencyForm />
                ) : selectedItem === "start" ? (
                  <StartForm />
                ) : (
                  <>
                    <Box bg="bg" p="space16">
                      <StepForm index={selectedItem} key={selectedItem} />
                    </Box>
                    <Separator />
                    <StepPreview selectedStep={selectedItem} />
                  </>
                )
              ) : (
                <Flex
                  flexDirection="column"
                  gap="space24"
                  px="space24"
                  py="space120"
                  alignItems="center"
                >
                  <Icon icon={Versions24} />
                  <Text color="muted" align="center">
                    Select a step on the left to edit its properties.
                  </Text>
                </Flex>
              )}
            </Box>
          </Flex>
        )}
      </form>
    </FormProvider>
  );
};
