import { Flex } from "@flows/styled-system/jsx";
import { Plus16 } from "icons";
import type { FC } from "react";
import { Button, Text } from "ui";

import { CreateFlowDialog } from "../create-flow-dialog";
import { NumberCircle } from "./number-circle";

type Props = {
  organizationId: string;
  projectId: string;
};

export const CreateFlow: FC<Props> = ({ projectId, organizationId }) => {
  return (
    <Flex gap="space12">
      <NumberCircle>3</NumberCircle>
      <Flex
        alignItems="center"
        flex="1"
        gap="space16"
        justifyContent="space-between"
        mdDown={{ flexDirection: "column", justifyContent: "unset", alignItems: "flex-start" }}
      >
        <Flex flexDirection="column" gap="space4">
          <Text variant="titleL">Create your first flow</Text>
          <Text color="muted">Start onboarding your users by creating your first flow.</Text>
        </Flex>
        <CreateFlowDialog
          organizationId={organizationId}
          projectId={projectId}
          trigger={
            <Button size="medium" startIcon={<Plus16 />} variant="primary">
              Create flow
            </Button>
          }
        />
      </Flex>
    </Flex>
  );
};
