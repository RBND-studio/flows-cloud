import { useSend } from "hooks/use-send";
import type { FlowDetail } from "lib/api";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
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
  onSave?: () => Promise<void>;
  isDirty?: boolean;
};

export const FlowPublishChangesDialog: FC<Props> = ({ flow, onSave, isDirty }) => {
  const [open, setOpen] = useState(false);
  const [makeLiveOpen, setMakeLiveOpen] = useState(false);

  const { loading, send } = useSend();
  const router = useRouter();
  const handlePublish = async (): Promise<void> => {
    await onSave?.();
    const res = await send(api["POST /flows/:flowId/publish"](flow.id), {
      errorMessage: t.toasts.publishFlowFailed,
    });
    if (res.error) return;
    setOpen(false);
    toast.success(t.toasts.publishFlowSuccess);
    router.refresh();
    if (flow.enabled_at === null) {
      // Timeout to create nice transition between dialogs
      setTimeout(() => {
        setMakeLiveOpen(true);
      }, 300);
    }
  };

  const handleMakeLive = async (): Promise<void> => {
    const res = await send(api["PATCH /flows/:flowId"](flow.id, { enabled: true }), {
      errorMessage: t.toasts.enableFlowFailed,
    });
    if (res.error) return;
    toast.success(t.toasts.enableFlowSuccess);
    router.refresh();
    setMakeLiveOpen(false);
  };

  // TODO: @opesicka make this nicer
  if (makeLiveOpen)
    return (
      <Dialog onOpenChange={setMakeLiveOpen} open={makeLiveOpen}>
        <DialogTitle>Make live?</DialogTitle>
        <DialogContent>
          <Text>For the users to see your flow, you need to make it live first.</Text>
        </DialogContent>
        <DialogActions>
          <DialogClose asChild>
            <Button shadow="none" size="small" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button loading={loading} onClick={handleMakeLive} size="small" variant="primary">
            Make live
          </Button>
        </DialogActions>
      </Dialog>
    );

  const changesToPublish = !!flow.draftVersion && !!flow.draftVersion.steps.length;
  const hidden = isDirty === undefined && !changesToPublish;
  if (hidden) return null;

  return (
    <Dialog
      onOpenChange={setOpen}
      open={open}
      trigger={<Button disabled={!isDirty}>Publish changes</Button>}
    >
      <DialogTitle>Publish changes</DialogTitle>
      <DialogContent>
        <Text>Are you sure you want to publish flow changes?</Text>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow="none" size="small" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button loading={loading} onClick={handlePublish} size="small" variant="primary">
          Publish
        </Button>
      </DialogActions>
    </Dialog>
  );
};
