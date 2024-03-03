"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { api, type FlowDetail, type UpdateFlow } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Select, Text, toast } from "ui";

type Props = {
  flow: FlowDetail;
};

type FrequencyForm = Pick<UpdateFlow, "frequency">;
const createDefaultValues = (flow: FlowDetail): FrequencyForm => {
  const editVersion = flow.draftVersion ?? flow.publishedVersion;
  return {
    frequency: editVersion?.frequency ?? "once",
  };
};

export const FrequencyForm: FC<Props> = ({ flow }) => {
  const { control, handleSubmit, formState, reset } = useForm<FrequencyForm>({
    defaultValues: createDefaultValues(flow),
  });
  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<FrequencyForm> = async (data) => {
    const res = await send(api["PATCH /flows/:flowId"](flow.id, data), {
      errorMessage: t.toasts.saveFrequencyFailed,
    });
    if (res.error) return;
    reset(data, { keepValues: true });
    toast.success(t.toasts.saveFrequencySuccess);
    router.refresh();
  };

  const isCloud = flow.flow_type === "cloud";

  return (
    <Flex cardWrap="-" flexDirection="column" gap="space12" mb="space16" padding="space16">
      <Flex flexDirection="column">
        <Text variant="titleL">{t.frequency.frequency}</Text>
        <Text color="muted">{t.frequency.description}</Text>
      </Flex>
      {isCloud ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap="space8">
            <Controller
              control={control}
              name="frequency"
              render={({ field }) => (
                <Select
                  className={css({ width: "200px" })}
                  onChange={field.onChange}
                  options={[
                    { value: "once", label: "Once" },
                    { value: "every-time", label: "Every time" },
                  ]}
                  value={field.value}
                />
              )}
            />
            <Button
              disabled={!formState.isDirty}
              loading={loading}
              size="small"
              type="submit"
              variant="black"
            >
              Save
            </Button>
          </Flex>
        </form>
      ) : (
        <Flex justifyContent="center" padding="space32">
          <Text color="muted">{t.frequency.localState}</Text>
        </Flex>
      )}
    </Flex>
  );
};
