"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import type { FlowDetail, UpdateFlow } from "lib/api";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Input, Text, toast } from "ui";

type Props = {
  flow: FlowDetail;
};

type GeneralForm = Pick<UpdateFlow, "name" | "description">;
const createDefaultValues = (flow: FlowDetail): GeneralForm => ({
  description: flow.description,
  name: flow.name,
});

export const FlowGeneralForm: FC<Props> = ({ flow }) => {
  const { register, handleSubmit, formState, reset } = useForm<GeneralForm>({
    defaultValues: createDefaultValues(flow),
  });

  const { loading, send } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<GeneralForm> = async (data) => {
    const res = await send(api["PATCH /flows/:flowId"](flow.id, data), {
      errorMessage: t.toasts.saveFlowFailed,
    });
    if (res.error) return;
    reset(data, { keepValues: true });
    toast.success(t.toasts.updateFlowSuccess);
    router.refresh();
  };

  return (
    <form
      className={css({
        cardWrap: "-",
        padding: "space16",
        mb: "space16",
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text className={css({ mb: "space12" })} variant="titleL">
        General
      </Text>

      <Input
        {...register("name")}
        className={css({ maxWidth: "400px", width: "100%", mb: "space16" })}
        defaultValue={formState.defaultValues?.name}
        label="Flow name"
      />
      <Input
        {...register("description")}
        asChild
        className={css({ mb: "space12" })}
        defaultValue={formState.defaultValues?.description}
        inputClassName={css({ height: "unset" })}
        label="Description"
      >
        <textarea rows={4} />
      </Input>
      <Flex gap="space16" mb="space16">
        <Input
          className={css({ maxWidth: "400px", width: "100%" })}
          description="Unique identifier for this flow. Cannot be changed."
          disabled
          label="Human ID"
          value={flow.human_id}
        />
      </Flex>
      <Button disabled={!formState.isDirty} loading={loading} type="submit" variant="black">
        {t.actions.save}
      </Button>
    </form>
  );
};
