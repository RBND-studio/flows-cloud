import { useSend } from "hooks/use-send";
import { api, type FlowDetail } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { t } from "translations";
import { Button, Dialog, DialogActions, DialogClose, DialogContent, DialogTitle, Text } from "ui";

import { createDefaultValues, formToRequest, useFlowEditForm } from "./edit-constants";

type Props = {
  flow: FlowDetail;
};

export const RemoveDraft: FC<Props> = ({ flow }) => {
  const [open, setOpen] = useState(false);
  const { reset } = useFlowEditForm();

  const router = useRouter();
  const { send, loading } = useSend();
  const handleRemoveDraft = async (): Promise<void> => {
    const newDefaultValues = createDefaultValues({ ...flow, draftVersion: undefined });
    const res = await send(api["PATCH /flows/:flowId"](flow.id, formToRequest(newDefaultValues)), {
      errorMessage: t.toasts.removeFlowDraftFailed,
    });
    if (res.error) return;
    reset(newDefaultValues);
    router.refresh();
    setOpen(false);
  };

  const hasDraft = !!flow.draftVersion;

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button loading={loading} variant="secondary" disabled={!hasDraft}>
          Discard draft
        </Button>
      }
    >
      <DialogTitle>Discard draft</DialogTitle>
      <DialogContent>
        <Text>Are you sure you want to discard the draft? This action cannot be undone.</Text>
      </DialogContent>
      <DialogActions>
        <DialogClose asChild>
          <Button shadow="none" size="small" variant="secondary">
            Close
          </Button>
        </DialogClose>
        {/* TODO: make this close on click */}
        <Button loading={loading} onClick={handleRemoveDraft}>
          Discard draft
        </Button>
      </DialogActions>
    </Dialog>
  );
};
