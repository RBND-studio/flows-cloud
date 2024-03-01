import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FlowDetail } from "lib/api";
import type { FC } from "react";
import { Text } from "ui";

type Props = {
  flow: FlowDetail;
};

export const Launch: FC<Props> = ({ flow }) => {
  const location = flow.publishedVersion?.location;
  const clickElement = flow.publishedVersion?.clickElement;

  return (
    <Flex alignItems="flex-start" direction="column" gap="space8">
      <Text variant="titleS">Launch</Text>
      <Flex alignItems="center" gap="space8">
        {location ? (
          <>
            <Text>When visiting</Text>
            <div
              className={css({
                paddingY: "space4",
                paddingX: "space8",
                backgroundColor: "bg.chip",
                bor: "1px",
                borderRadius: "radius8",
              })}
            >
              <Text weight="600">{location}</Text>
            </div>
          </>
        ) : null}
        {clickElement ? (
          <>
            {location ? <Text>and clicking</Text> : <Text>After clicking</Text>}
            <div
              className={css({
                paddingY: "space4",
                paddingX: "space8",
                backgroundColor: "bg.chip",
                bor: "1px",
                borderRadius: "radius8",
              })}
            >
              <Text weight="600">{clickElement}</Text>
            </div>
          </>
        ) : null}
        {!location && !clickElement ? <Text color="muted">Only manually</Text> : null}
      </Flex>
    </Flex>
  );
};
