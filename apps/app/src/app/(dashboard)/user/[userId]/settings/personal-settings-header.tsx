import { Flex } from "@flows/styled-system/jsx";
import { getAuth } from "auth/server";
import { Text } from "ui";

import { DeleteAccountDialog } from "./delete-account-dialog";

export default async function PersonalSettingsHeader(): Promise<JSX.Element> {
  const auth = await getAuth();
  return (
    <Flex flexDirection="column" gap="space8" mb="space16">
      <Flex justifyContent="space-between">
        <Text variant="titleXl">{auth?.user.full_name ?? auth?.user.email}</Text>
        <DeleteAccountDialog />
      </Flex>
    </Flex>
  );
}
