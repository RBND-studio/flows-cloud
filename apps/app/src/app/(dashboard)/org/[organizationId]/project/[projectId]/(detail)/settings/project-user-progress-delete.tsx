"use client";

import { Box } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { api, type ProjectDetail } from "lib/api";
import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { plural } from "translations";
import { Button, Input, Text, toast } from "ui";

type Props = {
  project: ProjectDetail;
};

type IForm = {
  userId: string;
};

export const ProjectUserProgressDelete: FC<Props> = ({ project }) => {
  const { register, reset, handleSubmit, formState } = useForm<IForm>({
    defaultValues: { userId: "" },
  });

  const { loading, send } = useSend();
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const res = await send(
      api["DELETE /projects/:projectId/users/:userId/progress"](project.id, data.userId, {}),
      { errorMessage: "Failed to delete user progress" },
    );
    if (!res.data) return;
    const count = res.data.deletedCount;
    const message = count
      ? `Deleted progress of ${count} ${plural(count, "flow", "flows")}`
      : "No progress found";
    toast.success(message);
    reset();
  };

  return (
    <Box cardWrap="-" p="space16">
      <Text variant="titleL" mb="space16">
        Project users
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("userId", { required: true })} label="User ID" />
        <Button
          size="small"
          type="submit"
          variant="secondary"
          disabled={!formState.isValid}
          loading={loading}
          mt="space12"
        >
          Delete progress
        </Button>
      </form>
    </Box>
  );
};
