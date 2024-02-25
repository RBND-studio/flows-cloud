"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api, type ProjectDetail } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { t } from "translations";
import { Button, clipboard, Input, Text, toast } from "ui";

type Props = {
  project: ProjectDetail;
};

type FormData = {
  name: string;
  description: string;
};

export const ProjectEditForm: FC<Props> = ({ project }) => {
  const { handleSubmit, register, formState, reset } = useForm<FormData>({
    defaultValues: createDefaultValues(project),
  });

  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await send(api["PATCH /projects/:projectId"](project.id, data), {
      errorMessage: t.toasts.saveProjectFailed,
    });
    if (res.error) return;
    if (res.data) reset(createDefaultValues(res.data));
    toast.success(t.toasts.updateProjectSuccess);
    void mutate("/organizations/:organizationId/projects", [project.organization_id]);
    router.refresh();
  };

  const handleCopyProjectId = async (): Promise<void> => {
    await clipboard.copy(project.id);
    toast.success(t.toasts.projectIdCopied);
  };

  return (
    <form
      className={css({ cardWrap: "-", mb: "space16", p: "space16" })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text className={css({ mb: "space12" })} variant="titleL">
        General
      </Text>
      <Input
        {...register("name")}
        className={css({ maxWidth: "400px", width: "100%", mb: "space16" })}
        defaultValue={formState.defaultValues?.name}
        label="Project name"
      />
      <Flex alignItems="flex-end" gap="space8" mb="space16">
        <Input
          className={css({ maxWidth: "400px", width: "100%" })}
          disabled
          label="Project ID"
          value={project.id}
        />
        <Button onClick={handleCopyProjectId} variant="secondary">
          {t.actions.copy}
        </Button>
      </Flex>
      <Input
        {...register("description")}
        asChild
        className={css({ mb: "space12" })}
        defaultValue={formState.defaultValues?.description}
        inputClassName={css({ height: "unset" })}
        key="description"
        label="Project description"
      >
        <textarea rows={4} />
      </Input>

      <Button disabled={!formState.isDirty} loading={loading} type="submit" variant="black">
        {t.actions.save}
      </Button>
    </form>
  );
};

const createDefaultValues = (project: ProjectDetail): FormData => ({
  name: project.name,
  description: project.description || "",
});
