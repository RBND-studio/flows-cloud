import { css } from "@flows/styled-system/css";
import { Flex, styled } from "@flows/styled-system/jsx";
import { Book16, Info16, Question16, Slack16 } from "icons";
import type { FC } from "react";
import { links } from "shared";
import { Icon, Text } from "ui";

import { NumberCircle } from "./number-circle";

const content = [
  {
    title: "Documentation",
    description: "Learn more about Flows and how to use it in your app.",
    href: links.docs,
    icon: Book16,
  },
  {
    title: "Community",
    description: "Join our Slack community to share your feedback and get help.",
    href: links.slack,
    icon: Slack16,
  },
  {
    title: "Contact support",
    description: "Get in touch with our support team for help with your account.",
    href: links.support,
    icon: Question16,
  },
];

export const LearnMore: FC = () => {
  return (
    <Flex gap="space12">
      <NumberCircle>
        <Icon icon={Info16} />
      </NumberCircle>
      <Flex flexDirection="column" gap="space12">
        <Text variant="titleL">Additional tips</Text>
        <Flex gap="space16" mdDown={{ flexDirection: "column" }}>
          {content.map((item) => (
            <styled.a
              _hover={{ background: "bg.subtleHover" }}
              cardWrap="-"
              cursor="pointer"
              display="flex"
              fastEaseInOut="all"
              flexDirection="column"
              gap="space4"
              href={item.href}
              key={item.title}
              padding="space12"
              rel="noopener"
              target="_blank"
            >
              <Flex alignItems="center" gap="space4">
                <Icon
                  className={css({
                    flexShrink: 0,
                  })}
                  icon={item.icon}
                />
                <Text variant="titleS">{item.title}</Text>
              </Flex>
              <Text color="muted">{item.description}</Text>
            </styled.a>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
