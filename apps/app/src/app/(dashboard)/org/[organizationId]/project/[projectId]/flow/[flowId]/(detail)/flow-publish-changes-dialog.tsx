import { SmartLink } from "components/ui/smart-link";
import { useSend } from "hooks/use-send";
import type { FlowDetail } from "lib/api";
import { api } from "lib/api";
import { useParams, useRouter } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
import { routes } from "routes";
import { links } from "shared";
import { t } from "translations";
import {
  Button,
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogTitle,
  Text,
  toast,
} from "ui";

type Props = {
  flow: FlowDetail;
};

export const FlowPublishChangesDialog: FC<Props> = ({ flow }) => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const [open, setOpen] = useState(false);
  const [makeLiveOpen, setMakeLiveOpen] = useState(false);

  const { loading, send } = useSend();
  const router = useRouter();
  const pushRoute = routes.flow({ flowId: flow.id, projectId: flow.project_id, organizationId });
  const handlePublish = async (): Promise<void> => {
    const res = await send(api["POST /flows/:flowId/publish"](flow.id), {
      errorMessage: t.toasts.publishFlowFailed,
    });
    if (res.error) return;
    setOpen(false);
    toast.success(t.toasts.publishFlowSuccess);

    if (flow.enabled_at === null) {
      // Timeout to create nice transition between dialogs
      setTimeout(() => {
        setMakeLiveOpen(true);
      }, 300);
    } else {
      router.push(pushRoute);
    }

    router.refresh();
  };

  const handleMakeLive = async (): Promise<void> => {
    const res = await send(api["PATCH /flows/:flowId"](flow.id, { enabled: true }), {
      errorMessage: t.toasts.enableFlowFailed,
    });
    if (res.error) return;
    toast.success(t.toasts.enableFlowSuccess);
    router.push(pushRoute);
    router.refresh();
    setMakeLiveOpen(false);
  };

  const handleMakeLiveOpenChange = (value: boolean): void => {
    setMakeLiveOpen(value);
    if (!value) router.push(pushRoute);
  };

  if (makeLiveOpen)
    return (
      <Dialog onOpenChange={handleMakeLiveOpenChange} open={makeLiveOpen}>
        <DialogTitle>Make live?</DialogTitle>
        <DialogContent>
          <Text>
            For the users to see your flow, you need to make it live first.{" "}
            <SmartLink href={links.docs.makeFlowLive} target="_blank" color="text.primary">
              Learn more
            </SmartLink>
          </Text>
        </DialogContent>
        <DialogActions>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <Button loading={loading} onClick={handleMakeLive} variant="primary">
            Make live
          </Button>
        </DialogActions>
      </Dialog>
    );

  const changesToPublish = !!flow.draftVersion && !!flow.draftVersion.steps.length;

  return (
    <Dialog
      onOpenChange={setOpen}
      open={open}
      trigger={
        <Button variant="primary" disabled={!changesToPublish}>
          Publish changes
        </Button>
      }
    >
      <DialogTitle>Publish changes</DialogTitle>
      <DialogContent>
        <Text>
          Are you sure you want to publish flow changes? This will update the flow for all of your
          users.{" "}
          <SmartLink href={links.docs.publishFlow} target="_blank" color="text.primary">
            Learn more
          </SmartLink>
        </Text>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button variant="secondary">Close</Button>
        </DialogClose>
        <Button loading={loading} onClick={handlePublish} variant="primary">
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  );
};
