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

  return (
    <a
      href={href}
      className={css({
        bor: "1px",
        borderRadius: "radius8",
        p: "space12",
        display: "block",
        fastEaseInOut: "background-color",
        _hover: {
          bg: "bg.hover",
        },
      })}
    >
      <Flex flexDirection="column" gap="space4">
        {variant === "next" && (
          <Flex gap="space4" alignItems="center">
            <Icon icon={ArrowLeft16} />
            <Text>Next</Text>
          </Flex>
        )}
        {variant === "prev" && (
          <Flex gap="space4" alignItems="center">
            <Text>Previous</Text>
            <Icon icon={ArrowRight16} />
          </Flex>
        )}
        <Flex flexDirection="column" flex="1">
          <Text as="h2" variant="bodyS" weight="600" flex="1">
            {release.title}
          </Text>
        </Flex>
      </Flex>
    </a>
  );
};
