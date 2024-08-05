import { Box, Flex, styled } from "@flows/styled-system/jsx";
import { Book16, Question16, Slack16, Versions16 } from "icons";
import { links } from "shared";
import { Icon, Text } from "ui";

import { VideoSection } from "./video";

const resources = [
  {
    title: "Migrate to Flows",
    href: links.docs.migrateToFlows,
    icon: Versions16,
  },
  {
    title: "Documentation",
    href: links.docs.home,
    icon: Book16,
  },
  {
    title: "Slack community",
    href: links.slack,
    icon: Slack16,
  },
  {
    title: "Contact support",
    href: links.docs.contact,
    icon: Question16,
  },
];

export const InfoSidebar = (): JSX.Element => {
  return (
    <Flex
      flexDirection="column"
      width={254}
      lgDown={{
        flexDirection: "row",
        width: "100%",
        gap: "space40",
        ml: "space40",
      }}
    >
      <Box>
        <Text variant="titleM" mb="space8">
          Watch a demo
        </Text>
        <VideoSection />
      </Box>
      <Box>
        <Text variant="titleM" mb="space8">
          Resources
        </Text>
        {resources.map((item) => (
          <styled.a
            _hover={{ color: "text.primary" }}
            display="flex"
            fastEaseInOut="all"
            alignItems="center"
            gap="space8"
            href={item.href}
            key={item.title}
            rel="noopener"
            target="_blank"
            color="text"
            mb="space12"
          >
            <Icon color="inherit" icon={item.icon} />
            <Text color="inherit">{item.title}</Text>
          </styled.a>
        ))}
      </Box>
    </Flex>
  );
};
