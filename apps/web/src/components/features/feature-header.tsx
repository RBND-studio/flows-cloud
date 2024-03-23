import { css } from "@flows/styled-system/css";
import { Box } from "@flows/styled-system/jsx";
import type { ReactElement } from "react";
import { Text } from "ui";

export const FeatureHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}): ReactElement => {
  return (
    <Box borBottom="1px" mb="space40" pb="space40">
      <Text as="h1" className={css({ mb: "space12" })} variant="title3xl">
        {title}
      </Text>
      <Text color="muted" variant="bodyL">
        {description}
      </Text>
    </Box>
  );
};
