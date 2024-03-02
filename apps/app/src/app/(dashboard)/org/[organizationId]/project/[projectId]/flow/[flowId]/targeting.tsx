import { css } from "@flows/styled-system/css";
import { Flex, Wrap } from "@flows/styled-system/jsx";
import type { FlowDetail } from "lib/api";
import { parseIsoDate } from "lib/date";
import type { FC, ReactNode } from "react";
import { Fragment } from "react";
import { t } from "translations";
import { Text } from "ui";

import type { MatcherKey } from "./settings/targeting/property-matcher";
import type { MatchGroup } from "./settings/targeting/targeting-types";

type Props = {
  flow: FlowDetail;
};

const ValueText: FC<{ children?: ReactNode }> = ({ children }) => {
  const date = parseIsoDate(children);
  return <Text weight="600">{date ? date.toLocaleDateString() : children}</Text>;
};

export const Targeting: FC<Props> = ({ flow }) => {
  const properties = (flow.draftVersion?.userProperties ??
    flow.publishedVersion?.userProperties ??
    []) as unknown as MatchGroup[];

  return (
    <Flex direction="column" gap="space8">
      <Text variant="titleS">Targeting</Text>
      {!properties.length ? (
        <Text color="muted">Shown to anyone</Text>
      ) : (
        properties.map((group, groupIndex) => (
          <Fragment
            // eslint-disable-next-line react/no-array-index-key -- ignore
            key={groupIndex}
          >
            {groupIndex !== 0 && <Text>or</Text>}

            <Wrap
              align="center"
              bg="bg.subtle"
              bor="1px"
              borderRadius="radius12"
              gap="space8"
              p="space4"
            >
              {group.map((item, matcherIndex) => {
                const operatorKey = Object.keys(item).filter((key) => key !== "key")[0];
                const value = item[operatorKey as MatcherKey];
                return (
                  <Fragment
                    // eslint-disable-next-line react/no-array-index-key -- ignore
                    key={matcherIndex}
                  >
                    {matcherIndex !== 0 && <Text>and</Text>}
                    <Flex
                      className={css({
                        paddingY: "space4",
                        paddingX: "space8",
                        backgroundColor: "bg",
                        bor: "1px",
                        borderRadius: "radius8",
                      })}
                      gap="space8"
                    >
                      <Text weight="600">{item.key}</Text>
                      <Text color="muted">{t.targeting.operatorExplanation[operatorKey]}</Text>
                      {Array.isArray(value) ? (
                        value.map((v, valueIndex) => (
                          <Fragment
                            // eslint-disable-next-line react/no-array-index-key -- ignore
                            key={valueIndex}
                          >
                            {valueIndex !== 0 && <Text>or</Text>}
                            <ValueText>{v}</ValueText>
                          </Fragment>
                        ))
                      ) : (
                        <ValueText>{value}</ValueText>
                      )}
                    </Flex>
                  </Fragment>
                );
              })}
            </Wrap>
          </Fragment>
        ))
      )}
    </Flex>
  );
};
