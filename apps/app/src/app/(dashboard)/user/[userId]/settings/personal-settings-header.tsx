"use client";
import { Flex } from "@flows/styled-system/jsx";
import { useAuth } from "auth/client";
import { Text } from "ui";

import { DeleteAccountDialog } from "./delete-account-dialog";

export default function PersonalSettingsHeader(): JSX.Element {
  const { auth } = useAuth();
  return (
    <Flex flexDirection="column" gap="space8" mb="space16">
      <Flex justifyContent="space-between">
        <Text variant="titleXl">{auth?.user.name ?? auth?.user.email}</Text>

        <DeleteAccountDialog />
      </Flex>
    </Flex>
  );
}
