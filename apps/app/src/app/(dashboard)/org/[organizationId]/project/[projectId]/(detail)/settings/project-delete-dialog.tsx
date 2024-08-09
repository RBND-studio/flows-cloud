"use client";

import { css } from "@flows/styled-system/css";
import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import type { ProjectDetail } from "lib/api";
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
  project: ProjectDetail;
};

export const ProjectDeleteDialog: FC<Props> = ({ project }) => {
  const { register, handleSubmit, reset, formState } = useForm<{ projectName: string }>({
    defaultValues: { projectName: "" },
  });

  const router = useRouter();
  const { send, loading } = useSend();
  const handleDelete = async (): Promise<void> => {
    const res = await send(api["DELETE /projects/:projectId"](project.id), {
      errorMessage: t.toasts.deleteProjectFailed,
    });
    if (res.error) return;
    toast.success(t.toasts.deleteProjectSuccess);
    void mutate("/organizations", []);
    router.replace(routes.organization({ organizationId: project.organization_id }));
    router.refresh();
  };

  return (
    <Dialog
      onOpenChange={() => reset()}
      trigger={<Button variant="danger">{t.actions.delete}</Button>}
    >
      <DialogTitle>{t.project.deleteDialog.title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleDelete)} id="delete-project">
          <Text mb="space24">{t.project.deleteDialog.description}</Text>
          <Input
            {...register("projectName", {
              validate: (value) => {
                if (value !== project.name) return "Project name does not match.";
                return true;
              },
            })}
            required
            label={
              <>
                Enter{" "}
                <span
                  className={css({
                    fontWeight: 700,
                  })}
                >
                  {project.name}
                </span>{" "}
                to confirm
              </>
            }
            placeholder={project.name}
            error
            description={formState.errors.projectName?.message}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button variant="secondary">{t.actions.close}</Button>
        </DialogClose>
        <Button loading={loading} type="submit" form="delete-project" variant="primary">
          {t.project.deleteDialog.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
