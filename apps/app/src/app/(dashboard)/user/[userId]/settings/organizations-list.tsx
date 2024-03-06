import { css } from "@flows/styled-system/css";
import { OrganizationLeaveDialog } from "app/(dashboard)/user/[userId]/settings/organization-leave-dialog";
import { api } from "lib/api";
import { load } from "lib/load";
import Link from "next/link";
import React from "react";
import { routes } from "routes";
import { Button } from "ui";

export const OrganizationsList = async (): Promise<JSX.Element> => {
  const organizations = await load(api["/organizations"]());

  return (
    <div
      className={css({
        cardWrap: "-",
        p: "space16",
        display: "flex",
        flexDirection: "column",
        gap: "space16",
        mb: "space16",
      })}
    >
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
              gap: "space16",
              display: "flex",
              flexDirection: "row",
            })}
            key={org.id}
          >
            {org.name}
            <br />
            members: {org.members}
            <Button asChild size="small" variant="secondary">
              <Link href={routes.organizationSettings({ organizationId: org.id })}>Edit</Link>
            </Button>
            <OrganizationLeaveDialog organization={org} />
          </li>
        ))}
      </ul>
    </div>
  );
};
