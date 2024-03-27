import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import Link from "next/link";
import { routes } from "routes";
import { links } from "shared";
import { Text } from "ui";

export default function About(): JSX.Element {
  const textLink = css({
    color: "text.primary",
    fontWeight: 700,
    textDecoration: "underline",
  });

  return (
    <Flex flexDirection="column" alignItems="center" mb="space64" mt="space64" mx="space16">
      <Text variant="title4xl" as="h1" className={css({ mb: "space16" })}>
        About Flows
      </Text>
      <Text
        color="muted"
        variant="bodyL"
        className={css({ maxWidth: "640px", mb: "space24" })}
        align="center"
      >
        Flows is made by{" "}
        <a target="_blank" className={textLink} href={links.rbnd} rel="noopener">
          RBND studio
        </a>
        . A small team of developers and designers who love creating tools that help other creators.
        Some of our other projects are{" "}
        <a href="https://atmos.style" className={textLink} target="_blank" rel="noopener">
          Atmos
        </a>{" "}
        and{" "}
        <a href="https://fig-stats.com" className={textLink} target="_blank" rel="noopener">
          Fig Stats
        </a>
      </Text>
      <Text color="muted" variant="bodyL" className={css({ maxWidth: "640px" })} align="center">
        Learn more about why we created Flows in our blog post{" "}
        <Link className={textLink} href={routes.blogPostDetail({ postId: "announcing-flows" })}>
          Announcing Flows
        </Link>
      </Text>
    </Flex>
  );
}
