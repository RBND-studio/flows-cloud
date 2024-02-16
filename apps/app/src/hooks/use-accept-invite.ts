import { mutate } from "hooks/use-fetch";
import { useSend } from "hooks/use-send";
import { api } from "lib/api";
import { useRouter } from "next/navigation";
import { routes } from "routes";
import { t } from "translations";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- ignore
export const useAcceptInvite = () => {
  const router = useRouter();
  const { send, loading } = useSend();
  const handleAccept = async (inviteId: string): Promise<void> => {
    const res = await send(api["POST /invites/:inviteId/accept"](inviteId), {
      errorMessage: t.toasts.acceptInviteFailed,
    });
    if (!res.data) return;
    void mutate("/me");
    void mutate("/organizations");
    router.push(routes.organization({ organizationId: res.data.organization_id }));
  };

  return {
    handleAccept,
    loading,
  };
};
