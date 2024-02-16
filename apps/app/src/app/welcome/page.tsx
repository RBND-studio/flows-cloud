import { Box } from "@flows/styled-system/jsx";
import { OrganizationForm } from "app/welcome/[organizationId]/organization-form";
import { api } from "lib/api";
import { load } from "lib/load";
import { redirect } from "next/navigation";
import { routes } from "routes";
import { Text } from "ui";

// TODO: @opesicka make this pretty
// Preview by visiting http://localhost:6001/welcome
export default async function WelcomePage(): Promise<JSX.Element> {
  const me = await load(api["/me"]());

  if (me.pendingInvites.length) redirect(routes.welcomeAcceptInvite);

  return (
    <Box cardWrap="-" padding="space16">
      <Text variant="titleL">Welcome</Text>
      <Text>Start by creating an organization</Text>

      <OrganizationForm />
    </Box>
  );
}
