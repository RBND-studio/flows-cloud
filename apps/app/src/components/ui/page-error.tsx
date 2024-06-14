"use client";

import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { useRouter } from "next/navigation";
import { type FC, type ReactNode, useTransition } from "react";
import { Button, Text } from "ui";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
  title: ReactNode;
};

export const PageError: FC<Props> = ({ error, reset, title }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRetry = (): void =>
    startTransition(() => {
      router.refresh();
      reset();
    });

  return (
    <Flex align="center" justifyContent="center" direction="column" height="100vh">
      <Text className={css({ mb: "space16" })} variant="titleL">
        {title}
      </Text>
      <Text color="muted">{error.message}</Text>
      <Flex mt="space12">
        <Button loading={isPending} onClick={handleRetry}>
          Retry
        </Button>
      </Flex>
    </Flex>
  );
};
