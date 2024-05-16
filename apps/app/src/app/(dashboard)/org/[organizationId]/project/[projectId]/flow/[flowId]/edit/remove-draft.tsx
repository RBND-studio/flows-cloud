import { useSend } from "hooks/use-send";
import { api, type FlowDetail } from "lib/api";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { t } from "translations";
import { Button } from "ui";

import { createDefaultValues, formToRequest, useFlowEditForm } from "./edit-constants";

type Props = {
  flow: FlowDetail;
};

export const RemoveDraft: FC<Props> = ({ flow }) => {
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
  };

  const hasDraft = !!flow.draftVersion;

  return (
    <Button loading={loading} variant="secondary" onClick={handleRemoveDraft} disabled={!hasDraft}>
      Remove draft
    </Button>
  );
};
