import { DashboardError } from "components/ui/dashboard-error";
import { api } from "lib/api";
import { load } from "lib/load";
import { redirect } from "next/navigation";
import { routes } from "routes";

type Props = {
  params: { inviteId: string };
};

export default async function AcceptInvitePage({
  params: { inviteId },
}: Props): Promise<JSX.Element> {
  try {
    const res = await load(api["POST /invites/:inviteId/accept"](inviteId));
    redirect(routes.organization({ organizationId: res.organization_id }));
  } catch (err) {
    return (
      <DashboardError
        title="Error accepting invite"
        errorMessage={err instanceof Error ? err.message : "Something went wrong"}
      />
    );
  }
}
