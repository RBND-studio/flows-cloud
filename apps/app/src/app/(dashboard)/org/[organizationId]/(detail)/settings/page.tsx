import { Flex } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";
import { Text } from "ui";

import { OrganizationDeleteDialog } from "../../organization-delete-dialog";
import { OrganizationEditForm } from "./organization-edit-form";
import { OrganizationMembers } from "./organization-members";

type Props = {
  params: {
    organizationId: string;
  };
};

export default async function OrganizationSettingsPage({ params }: Props): Promise<JSX.Element> {
  const [org, users] = await Promise.all([
    load(api["/organizations/:organizationId"](params.organizationId)),
    load(api["/organizations/:organizationId/users"](params.organizationId)),
  ]);

  users;

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" mb="space16">
        <Text variant="titleXl">{org.name}</Text>
        <OrganizationDeleteDialog organization={org} />
      </Flex>

      <OrganizationEditForm org={org} />
      <OrganizationMembers org={org} users={users} />
    </>
  );
}
