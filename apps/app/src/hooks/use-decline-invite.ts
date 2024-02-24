import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { t } from "translations";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- ignore
export const useDeclineInvite = () => {
  const { send, loading } = useSend();
  const router = useRouter();
  const handleDecline = async (inviteId: string): Promise<void> => {
    const res = await send(api["POST /invites/:inviteId/decline"](inviteId), {
      errorMessage: t.toasts.declineInviteFailed,
    });
    if (res.error) return;
    void mutate("/me");
    router.refresh();
  };

  return {
    handleDecline,
    loading,
  };
};
