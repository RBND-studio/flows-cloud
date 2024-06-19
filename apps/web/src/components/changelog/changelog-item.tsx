import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Mdx } from "components";
import type { Release } from "contentlayer/generated";
import { ArrowLeft16 } from "icons";
import Link from "next/link";
import type { ReactElement } from "react";
import { routes } from "routes";
import { Icon, Text } from "ui";

type Props = {
  release: Release;
  detail?: boolean;
};

export const ChangelogItem = ({ release, detail }: Props): ReactElement => {
  const href = routes.changelogReleaseDetail({ releaseId: release.slugAsParams });
  const date = new Date(release.date).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dateComponent = detail ? (
    <Box>
      <Link href={routes.changelog}>
        <Flex gap="space4" alignItems="center" mb="space8">
          <Icon icon={ArrowLeft16} />
          <Text color="muted">All releases</Text>
        </Flex>
      </Link>
      <Text color="muted">{date}</Text>
    </Box>
  ) : (
    <Link href={href}>
      <Text color="muted">{date}</Text>
    </Link>
  );

  const titleComponent = detail ? (
    <Text variant="title2xl" as="h2" className={css({ mb: "space24" })}>
      {release.title}
    </Text>
  ) : (
    <Link href={href}>
      <Text variant="title2xl" as="h2" className={css({ mb: "space24" })}>
        {release.title}
      </Text>
    </Link>
  );

  return (
    <Flex
      gap="space40"
      justifyContent="center"
      borBottom="1px"
      py="space64"
      mdDown={{ flexDirection: "column", py: "space40" }}
      _last={{ border: "none" }}
    >
      <Box maxWidth={200} width="100%" mt="space12">
        {dateComponent}
      </Box>
      <Box maxWidth={580}>
        {titleComponent}
        <Mdx key={release.slug} code={release.body.code} />
      </Box>
    </Flex>
  );
};
