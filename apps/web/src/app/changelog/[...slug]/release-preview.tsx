import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { type Release } from "contentlayer/generated";
import { ArrowLeft16, ArrowRight16 } from "icons";
import { type FC } from "react";
import { routes } from "routes";
import { Icon, Text } from "ui";

type Props = {
  release: Release;
  variant: "prev" | "next";
};

export const ReleasePreview: FC<Props> = ({ release, variant }) => {
  const href = routes.changelogReleaseDetail({ releaseId: release.slugAsParams });
  const date = new Date(release.date).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <a href={href} className={css({ cardWrap: "-", p: "space12", display: "block" })}>
      <Flex gap="space8" alignItems="center" mb="space8">
        {variant === "prev" && <Icon icon={ArrowLeft16} />}
        <Text as="h2" variant="titleS" flex="1">
          {release.title}
        </Text>
        {variant === "next" && <Icon icon={ArrowRight16} />}
      </Flex>
      <Text color="muted">{date}</Text>
    </a>
  );
};
