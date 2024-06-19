import { Flex } from "@flows/styled-system/jsx";
import Link from "next/link";
import { type FC } from "react";
import { routes } from "routes";
import { Button, Text } from "ui";

type Props = {
  title: string;
  errorMessage: string;
};

export const DashboardError: FC<Props> = ({ errorMessage, title }) => {
  return (
    <Flex align="center" justifyContent="center" direction="column" height="100vh">
      <Text mb="space8" variant="titleL">
        {title}
      </Text>
      <Text color="muted" mb="space24">
        {errorMessage}
      </Text>
      <Button asChild>
        <Link href={routes.home}>Go back</Link>
      </Button>
    </Flex>
  );
};
