import { Flex } from "@flows/styled-system/jsx";
import { getUser } from "auth/server";
import { Text } from "ui";

import { DeleteAccountDialog } from "./delete-account-dialog";

export default async function PersonalSettingsHeader(): Promise<JSX.Element> {
  const user = await getUser();
  return (
    <Flex flexDirection="column" gap="space8" mb="space16">
      <Flex justifyContent="space-between">
        <Text variant="titleXl">{user?.full_name ?? user?.email}</Text>
        <DeleteAccountDialog />
      </Flex>
    </Flex>
  );
}
