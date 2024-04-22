import { type WaitStepOptions } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FlowDetail } from "lib/api";
import { type FC, Fragment } from "react";
import { Text } from "ui";

type Props = {
  flow: FlowDetail;
};

export const Launch: FC<Props> = ({ flow }) => {
  const start = (flow.publishedVersion?.start ?? []) as WaitStepOptions[];

  const noOptions =
    start.length === 0 ||
    start.every((opt) => !opt.location && !opt.change && !opt.form && !opt.clickElement);

  return (
    <Flex alignItems="flex-start" direction="column" gap="space8">
      <Text variant="titleS">Launch</Text>
      <Flex gap="space8" direction="column" alignItems="start">
        {!noOptions &&
          start.map((startOption, i) => {
            const location = startOption.location;
            return (
              <Fragment
                // eslint-disable-next-line react/no-array-index-key -- no better key
                key={i}
              >
                {i !== 0 && <Text>or</Text>}
                <Flex
                  alignItems="center"
                  gap="space4"
                  py="space4"
                  px="space8"
                  borderRadius="radius12"
                  bor="1px"
                  bg="bg.subtle"
                >
                  {startOption.location ? (
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
                  {startOption.form ? (
                    <>
                      <Text>{location ? "and submitting" : "When submitting"}</Text>
                      <div
                        className={css({
                          paddingY: "space4",
                          paddingX: "space8",
                          backgroundColor: "bg.chip",
                          bor: "1px",
                          borderRadius: "radius8",
                        })}
                      >
                        <Text weight="600">{startOption.form.formElement}</Text>
                      </div>
                    </>
                  ) : null}
                  {startOption.change ? (
                    <>
                      <Text>{location ? "and changing" : "When changing"}</Text>
                      {startOption.change.map((change, j) => (
                        <Fragment
                          // eslint-disable-next-line react/no-array-index-key -- no better key
                          key={j}
                        >
                          {j !== 0 && <Text>and</Text>}
                          <div
                            className={css({
                              paddingY: "space4",
                              paddingX: "space8",
                              backgroundColor: "bg.chip",
                              bor: "1px",
                              borderRadius: "radius8",
                            })}
                          >
                            <Text weight="600">{change.element}</Text>
                          </div>
                        </Fragment>
                      ))}
                    </>
                  ) : null}
                  {startOption.clickElement ? (
                    <>
                      <Text>{location ? "and clicking" : "When clicking"}</Text>
                      <div
                        className={css({
                          paddingY: "space4",
                          paddingX: "space8",
                          backgroundColor: "bg.chip",
                          bor: "1px",
                          borderRadius: "radius8",
                        })}
                      >
                        <Text weight="600">{startOption.clickElement}</Text>
                      </div>
                    </>
                  ) : null}
                </Flex>
              </Fragment>
            );
          })}
        {noOptions ? <Text color="subtle">Only manually</Text> : null}
      </Flex>
    </Flex>
  );
};
