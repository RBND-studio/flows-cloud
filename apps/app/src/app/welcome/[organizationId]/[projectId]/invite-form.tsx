"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { useSend } from "hooks/use-send";
import { Close16, Plus16 } from "icons";
import { api } from "lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { routes } from "routes";
import { t } from "translations";
import { Button, Icon, Input, Text, toast } from "ui";

type Props = {
  organizationId: string;
  projectId: string;
};

type FormValues = {
  users: { email: string }[];
};

export const InviteForm: FC<Props> = ({ organizationId, projectId }) => {
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: { users: [{ email: "" }] },
  });
  const { send, loading } = useSend();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const emails = data.users.map((u) => u.email).filter((e) => Boolean(e.trim()));
    if (emails.length) {
      const results = await Promise.all(
        emails.map((email) =>
          send(api["POST /organizations/:organizationId/users"](organizationId, { email }), {
            errorMessage: null,
          }),
        ),
      );
      const resWithError = results.find((r) => r.error);
      if (resWithError?.error)
        return toast.error(t.toasts.sendInviteFailed, {
          description: resWithError.error.message,
        });

      toast.success(t.toasts.usersInvited);
    }

    router.push(routes.projectGettingStarted({ organizationId, projectId }));
  };

  const { append, remove, fields } = useFieldArray({ control, name: "users" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column" gap="space24">
        <Flex alignItems="flex-start" flexDirection="column" gap="space8">
          <Text>Email</Text>
          <Flex direction="column" gap="space8" width="100%">
            {fields.map((field, i) => (
              <Flex gap="space8" key={field.id}>
                <Input
                  {...register(`users.${i}.email`)}
                  className={css({
                    width: "100%",
                  })}
                  type="email"
                />
                <Button onClick={() => remove(i)} variant="secondary">
                  <Icon icon={Close16} />
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
        </Flex>

        <Flex flexDirection="column" gap="space8">
          <Button loading={loading} type="submit">
            Send invites
          </Button>
          <Button asChild variant="secondary">
            <Link href={routes.projectGettingStarted({ organizationId, projectId })}>
              Continue alone
            </Link>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
