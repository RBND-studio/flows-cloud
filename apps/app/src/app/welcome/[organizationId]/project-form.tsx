"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { Close16, Plus16 } from "icons";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { routes } from "routes";
import { t } from "translations";
import { Button, Icon, Input, Text, toast } from "ui";

type Props = {
  organizationId: string;
};

type FormValues = {
  name: string;
  domains: { value: string }[];
};

export const ProjectForm: FC<Props> = ({ organizationId }) => {
  const { handleSubmit, register, control } = useForm<FormValues>();
  const router = useRouter();
  const { send, loading } = useSend();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await send(
      api["POST /organizations/:organizationId/projects"](organizationId, {
        name: data.name,
        domains: data.domains.map((d) => d.value),
      }),
      { errorMessage: t.toasts.createProjectFailed },
    );
    if (!res.data) return;
    toast.success(t.toasts.createProjectSuccess);
    router.push(routes.welcomeOrganizationProject({ projectId: res.data.id, organizationId }));
  };

  const { append, fields, remove } = useFieldArray({ control, name: "domains" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap="space16">
        <Input {...register("name")} label="Project name" required />
        <Flex flexDirection="column" gap="space8">
          <Flex flexDirection="column" gap="space4">
            <Text>{t.project.domains.domains}</Text>
            <Text color="muted" variant="bodyXs">
              {t.project.domains.description}
            </Text>
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
                      <Icon icon={Close16} />
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
        </Flex>

        <Button loading={loading} type="submit">
          Create project
        </Button>
      </Flex>
    </form>
  );
};
