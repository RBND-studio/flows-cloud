"use client";

import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { SmartLink } from "components/ui/smart-link";
import { useSend } from "hooks/use-send";
import { api, type FlowDetail } from "lib/api";
import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { links } from "shared";
import { Button, Input, Text, toast } from "ui";

type Props = {
  flow: FlowDetail;
};

type IForm = {
  userId: string;
};

export const FlowResetUserProgress: FC<Props> = ({ flow }) => {
  const { register, reset, handleSubmit, formState } = useForm<IForm>({
    defaultValues: { userId: "" },
  });

  const { loading, send } = useSend();
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const res = await send(
      api["DELETE /projects/:projectId/users/:userId/progress"](flow.project_id, data.userId, {
        flowId: flow.id,
      }),
      { errorMessage: "Failed to delete user progress" },
    );
    if (!res.data) return;
    const count = res.data.deletedCount;
    const message = count ? "Successfully reset user progress" : "No progress found";
    toast.success(message);
    reset();
  };

  return (
    <Box cardWrap="-" p="space16">
      <Flex flexDirection="column" mb="space16">
        <Text variant="titleL">Reset user progress</Text>
        <Text color="muted">
          Reset progress of a user for this flow. For the changes to propagate, you have to start a
          new browser session in your app.{" "}
          <SmartLink color="text.primary" target="_blank" href={links.docs.resetFlow}>
            Learn more
          </SmartLink>
        </Text>
      </Flex>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css({
          display: "flex",
          gap: "space8",
          alignItems: "flex-end",
        })}
      >
        <Input
          {...register("userId", { required: true })}
          label="User ID"
          description="Identifier of the user whose progress you want to reset. This is the same property you use in the flows init method."
          className={css({
            flex: 1,
          })}
        />
        <Button
          type="submit"
          variant="danger"
          disabled={!formState.isValid}
          loading={loading}
          mb="space20"
        >
          Reset progress
        </Button>
      </form>
    </Box>
  );
};
