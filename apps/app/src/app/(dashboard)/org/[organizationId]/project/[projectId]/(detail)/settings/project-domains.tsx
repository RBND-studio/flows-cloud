"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { Plus16 } from "icons";
import { api, type ProjectDetail } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { t } from "translations";
import { Button, Input, Text, toast } from "ui";

type Props = {
  project: ProjectDetail;
};

type DomainsForm = {
  domains: { value: string }[];
};

export const ProjectDomains: FC<Props> = ({ project }) => {
  const { handleSubmit, control, register, reset, formState } = useForm<DomainsForm>({
    defaultValues: createDefaultValues(project),
  });
  const { append, fields, remove } = useFieldArray({ control, name: "domains" });

  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<DomainsForm> = async (data) => {
    const res = await send(
      api["PATCH /projects/:projectId"](project.id, { domains: data.domains.map((d) => d.value) }),
      { errorMessage: t.toasts.saveProjectFailed },
    );
    if (res.error) return;
    if (res.data) reset(createDefaultValues(res.data));
    toast.success(t.toasts.updateProjectSuccess);
    void mutate("/organizations/:organizationId/projects", [project.organization_id]);
    router.refresh();
  };

  return (
    <form
      className={css({
        cardWrap: "-",
        display: "flex",
        flexDirection: "column",
        gap: "space16",
        p: "space16",
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex flexDirection="column">
        <Text variant="titleL">{t.project.domains.domains}</Text>
        <Text color="muted">{t.project.domains.description}</Text>
      </Flex>

      {fields.length > 0 && (
        <Flex direction="column" gap="space8">
          {fields.map((field, i) => {
            return (
              <Flex gap="space8" key={field.id}>
                <Input
                  type="url"
                  {...register(`domains.${i}.value`)}
                  className={css({ flex: 1 })}
                  required
                />
                <Button onClick={() => remove(i)} variant="secondary">
                  {t.actions.remove}
                </Button>
              </Flex>
            );
          })}
        </Flex>
      )}
      <div>
        <Button
          onClick={() => append({ value: "" })}
          size="small"
          startIcon={<Plus16 />}
          variant="secondary"
        >
          {t.project.domains.addDomain}
        </Button>
      </div>

      <div>
        <Button disabled={!formState.isDirty} loading={loading} type="submit" variant="black">
          {t.actions.save}
        </Button>
      </div>
    </form>
  );
};

const createDefaultValues = (project: ProjectDetail): DomainsForm => ({
  domains: project.domains.map((domain) => ({ value: domain })),
});
