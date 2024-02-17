"use client";

import { Flex } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { Plus16 } from "icons";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { routes } from "routes";
import { t } from "translations";
import { Button, Input, Text, toast } from "ui";

type Props = {
  organizationId: string;
};

type FormValues = {
  users: { email: string }[];
};

export const InviteForm: FC<Props> = ({ organizationId }) => {
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: { users: [{ email: "" }] },
  });
  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const results = await Promise.all(
      data.users
        .map((u) => u.email)
        .filter((e) => Boolean(e.trim()))
        .map((email) =>
          send(api["POST /organizations/:organizationId/users"](organizationId, { email }), {
            errorMessage: null,
          }),
        ),
    );
    const resWithError = results.find((r) => r.error);
    if (resWithError?.error)
      return toast.error(t.toasts.createInviteFailed, { description: resWithError.error.message });

    toast.success(t.toasts.usersInvited);
    router.push(routes.organization({ organizationId }));
  };

  const { append, remove, fields } = useFieldArray({ control, name: "users" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text>Users</Text>
      <Flex direction="column" gap="space8">
        {fields.map((field, i) => (
          <Flex gap="space8" key={field.id}>
            <Input {...register(`users.${i}.email`)} required type="email" />
            <Button onClick={() => remove(i)} variant="secondary">
              {t.actions.remove}
            </Button>
          </Flex>
        ))}
      </Flex>
      <Button
        onClick={() => append({ email: "" })}
        size="small"
        startIcon={<Plus16 />}
        variant="secondary"
      >
        Add user
      </Button>

      <div>
        <Button loading={loading} type="submit" variant="black">
          {t.actions.save}
        </Button>
      </div>
    </form>
  );
};
