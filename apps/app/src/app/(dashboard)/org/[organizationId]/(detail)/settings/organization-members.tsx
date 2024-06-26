import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Person24 } from "icons";
import type { OrganizationDetail, OrganizationUsers } from "lib/api";
import { timeFromNow } from "lib/date";
import type { FC } from "react";
import { plural, t } from "translations";
import { Icon, Text } from "ui";

import { InviteDelete } from "./invite-delete";
import { InviteDialog } from "./invite-dialog";
import { InviteResend } from "./invite-resend";
import { MemberRemoveDialog } from "./member-remove-dialog";

type Props = {
  org: OrganizationDetail;
  users: OrganizationUsers;
};

export const OrganizationMembers: FC<Props> = ({ users, org }) => {
  const { members, pending_invites } = users;
  return (
    <Flex
      alignItems="flex-start"
      cardWrap="-"
      flexDirection="column"
      padding="space16"
      mb="space16"
    >
      <Flex flexDirection="column" mb="space16">
        <Text variant="titleL">{t.organization.members.title}</Text>
        <Text color="muted">
          {plural(
            members.length,
            t.organization.members.description,
            t.organization.members.description_plural,
          )}
        </Text>
      </Flex>
      <Flex flexDirection="column" gap="space12" mb="space16">
        {members.map((member) => (
          <Flex alignItems="center" gap="space8" key={member.id}>
            <Icon icon={Person24} />
            <Text key={member.id}>{member.email}</Text>
            <MemberRemoveDialog organization={org} user={member} />
          </Flex>
        ))}
      </Flex>

      {pending_invites.length ? (
        <>
          <Text className={css({ mb: "space8" })} variant="titleS">
            Pending invites
          </Text>
          {/* TODO: @opesicka make this nicer */}
          <Flex direction="column" gap="space12" mb="space16">
            {pending_invites.map((invite) => {
              const expired = new Date(invite.expires_at) < new Date();
              return (
                <Flex alignItems="center" gap="space8" key={invite.id}>
                  <Text>{invite.email}</Text>
                  {expired ? (
                    <Text color="danger">Expired</Text>
                  ) : (
                    <Text>Expires {timeFromNow(invite.expires_at)}</Text>
                  )}
                  <InviteResend email={invite.email} organizationId={org.id} />
                  <InviteDelete inviteId={invite.id} />
                </Flex>
              );
            })}
          </Flex>
        </>
      ) : null}

      <InviteDialog organizationId={org.id} />
    </Flex>
  );
};
