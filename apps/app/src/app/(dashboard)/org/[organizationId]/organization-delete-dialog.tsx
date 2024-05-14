"use client";

import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import type { OrganizationDetail } from "lib/api";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { routes } from "routes";
import { t } from "translations";
import {
  Button,
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogTitle,
  Input,
  Text,
  toast,
} from "ui";

type Props = {
  organization: OrganizationDetail;
};

export const OrganizationDeleteDialog: FC<Props> = ({ organization }) => {
  const { register, handleSubmit, reset, formState } = useForm<{ organizationName: string }>({
    defaultValues: { organizationName: "" },
  });

  const router = useRouter();
  const { send, loading } = useSend();
  const handleDelete = async (): Promise<void> => {
    const res = await send(api["DELETE /organizations/:organizationId"](organization.id), {
      errorMessage: t.toasts.deleteOrgFailed,
    });
    if (res.error) return;
    toast.success(t.toasts.deleteOrgSuccess);
    void mutate("/organizations");
    router.refresh();
    router.replace(routes.home);
  };

  return (
    <Dialog
      onOpenChange={() => reset()}
      trigger={<Button variant="secondary">{t.actions.delete}</Button>}
    >
      <DialogTitle>{t.organization.deleteDialog.title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleDelete)} id="delete-organization">
          <Text mb="space24">{t.organization.deleteDialog.description}</Text>
          <Input
            {...register("organizationName", {
              validate: (value) => {
                if (value !== organization.name) return "Organization name does not match.";
                return true;
              },
            })}
            required
            label={`Enter organization name to confirm (${organization.name})`}
            placeholder={organization.name}
            error
            description={formState.errors.organizationName?.message}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow="none" size="small" variant="secondary">
            {t.actions.close}
          </Button>
        </DialogClose>
        <Button
          loading={loading}
          type="submit"
          form="delete-organization"
          size="small"
          variant="primary"
        >
          {t.organization.deleteDialog.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
