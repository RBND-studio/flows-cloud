"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { api, type FlowDetail, type UpdateFlow } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Input, Text, toast } from "ui";

type Props = {
  flow: FlowDetail;
};

type LaunchForm = Pick<UpdateFlow, "clickElement" | "location">;

const createDefaultValues = (flow: FlowDetail): LaunchForm => {
  const editVersion = flow.draftVersion ?? flow.publishedVersion;
  return {
    clickElement: editVersion?.clickElement || "",
    location: editVersion?.location || "",
  };
};

export const LaunchForm: FC<Props> = ({ flow }) => {
  const { register, handleSubmit, formState, reset } = useForm<LaunchForm>({
    defaultValues: createDefaultValues(flow),
  });
  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<LaunchForm> = async (data) => {
    const res = await send(api["PATCH /flows/:flowId"](flow.id, data), {
      errorMessage: t.toasts.saveLaunchFailed,
    });
    if (res.error) return;
    reset(data, { keepValues: true });
    toast.success(t.toasts.saveLaunchSuccess);
    router.refresh();
  };

  const isCloud = flow.flow_type === "cloud";

  return (
    <Box cardWrap="-" p="space16">
      <Flex flexDirection="column" mb="space12">
        <Text variant="titleL">{t.launch.launch}</Text>
        <Text color="muted">{t.launch.description}</Text>
      </Flex>

      {isCloud ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("location")}
            className={css({ maxWidth: "400px", width: "100%", mb: "space16" })}
            defaultValue={formState.defaultValues?.location}
            description={t.launch.location}
            label="Location"
            placeholder="^\/home$ <- shows up only on the home page"
          />
          <Input
            {...register("clickElement")}
            className={css({ maxWidth: "400px", width: "100%", mb: "space16" })}
            defaultValue={formState.defaultValues?.clickElement}
            description={t.launch.element}
            label="Click element"
            placeholder=".onboarding-flow"
          />
          <Button disabled={!formState.isDirty} loading={loading} type="submit" variant="black">
            Save
          </Button>
        </form>
      ) : (
        <Flex justifyContent="center" padding="space32">
          <Text color="muted">Local flow launch settings need to be changed in your codebase</Text>
        </Flex>
      )}
    </Box>
  );
};
