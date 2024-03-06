import { css } from "@flows/styled-system/css";
import { GitHub16, Google16 } from "icons";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import { createClient } from "supabase/server";
import { Text } from "ui";

export const ConnectedAccounts = async (): Promise<JSX.Element> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
        {user?.identities
          ?.filter((i) => i.provider !== "email")
          ?.map((identity) => (
            <li
              className={css({
                gap: "space16",
                display: "flex",
                flexDirection: "row",
              })}
              key={identity.id}
            >
              <Image
                alt="avatar"
                className={css({
                  borderRadius: "radius100",
                })}
                height={64}
                src={identity.identity_data?.avatar_url}
                width={64}
              />
              {identity.provider === "google" ? (
                <Google16 />
              ) : identity.provider === "github" ? (
                <GitHub16 />
              ) : (
                "Unknown"
              )}
              <Text>
                {identity.provider} - {identity.identity_data?.email}
              </Text>
            </li>
          ))}
      </ul>
    </div>
  );
};
