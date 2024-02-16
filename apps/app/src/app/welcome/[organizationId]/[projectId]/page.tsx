import { Box } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";
import { Text } from "ui";

import { InviteForm } from "./invite-form";

type Props = {
  params: {
    organizationId: string;
    projectId: string;
  };
};

// TODO: @opesicka make this pretty
export default async function WelcomeOrganizationProjectPage({
  params,
}: Props): Promise<JSX.Element> {
  const org = await load(api["/organizations/:organizationId"](params.organizationId));

  return (
    <Box cardWrap="-" padding="space16">
      <Text>Finally invite users to {org.name}</Text>
      <InviteForm organizationId={params.organizationId} />
    </Box>
  );
}
