import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { OrganizationLeaveDialog } from "app/(dashboard)/user/[userId]/settings/organization-leave-dialog";
import { CreateOrganizationDialog } from "components/organizations";
import { Organization16 } from "icons";
import { api } from "lib/api";
import { load } from "lib/load";
import Link from "next/link";
import { routes } from "routes";
import { plural, t } from "translations";
import { Button, Icon, Text } from "ui";

export const OrganizationsList = async (): Promise<JSX.Element> => {
  const organizations = await load(api["/organizations"]());

  return (
    <Flex cardWrap="-" p="space16" flexDirection="column">
      <Flex justifyContent="space-between" mb="space16">
        <Flex flexDirection="column">
          <Text variant="titleL">{t.personal.organizations.title}</Text>
          <Text color="muted">{t.personal.organizations.description}</Text>
        </Flex>
        <CreateOrganizationDialog
          trigger={<Button variant="secondary">{t.actions.newOrg}</Button>}
        />
      </Flex>
      <ul
        className={css({
          gap: "space16",
          display: "flex",
          flexDirection: "column",
        })}
      >
        {organizations.map((org) => (
          <li
            className={css({
              gap: "space12",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            })}
            key={org.id}
          >
            <Flex gap="space8" alignItems="center" maxWidth={240} width="100%">
              <Icon icon={Organization16} />
              <Text variant="titleS">{org.name}</Text>
            </Flex>
            <Text
              className={css({
                maxWidth: 240,
                width: "100%",
              })}
              color="muted"
            >
              {plural(
                org.members ?? 0,
                t.personal.organizations.member,
                t.personal.organizations.member_plural,
              )}
            </Text>

            <Flex gap="space8" alignItems="center">
              <Button asChild size="small" variant="secondary">
                <Link href={routes.organizationSettings({ organizationId: org.id })}>
                  {t.actions.open}
                </Link>
              </Button>
              <OrganizationLeaveDialog organization={org} />
            </Flex>
          </li>
        ))}
      </ul>
    </Flex>
  );
};
