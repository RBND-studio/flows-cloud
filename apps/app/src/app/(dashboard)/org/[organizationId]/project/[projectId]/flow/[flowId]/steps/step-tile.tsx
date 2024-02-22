/* eslint-disable react/no-array-index-key -- there's no better key */

import type { FlowStep } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import { Hourglass16 } from "icons";
import type { FC } from "react";
import { Fragment } from "react";
import { Icon } from "ui";

type Props = {
  step: FlowStep | FlowStep[][];
  activeIndex?: number | number[];
  index: number;
  onClick: (index: number | number[]) => void;
};

const TitlePlaceholder = (): JSX.Element => (
  <span
    className={css({
      color: "text.subtle",
    })}
  >
    Empty step
  </span>
);

const WaitStep = (): JSX.Element => (
  <Flex justifyContent="center" width="100%">
    <Icon icon={Hourglass16} />
  </Flex>
);

export const StepTile: FC<Props> = ({ step, activeIndex, index, onClick }) => {
  if (Array.isArray(step)) {
    return (
      <Flex flexDirection="column" gap="space8">
        {step.map((s, i) => (
          <Fragment key={i}>
            {s.map((subS, j) => {
              const activeI = (() => {
                if (!Array.isArray(activeIndex)) return undefined;
                if (activeIndex[0] === index && activeIndex[1] === i) return activeIndex[2];
                return undefined;
              })();

              return (
                <StepTile
                  activeIndex={activeI}
                  index={j}
                  key={j}
                  onClick={(clickIndex) =>
                    onClick([index, i, ...(Array.isArray(clickIndex) ? clickIndex : [clickIndex])])
                  }
                  step={subS}
                />
              );
            })}
          </Fragment>
        ))}
      </Flex>
    );
  }

  const active = activeIndex === index;

  // If the step is a wait step, we don't want to show the title but icon instead
  const title =
    "title" in step ? (
      //
      step.title !== "" ? (
        step.title
      ) : (
        <TitlePlaceholder />
      )
    ) : (
      <WaitStep />
    );

  return (
    <button
      className={css({
        width: "120px",
        height: "48px",
        backgroundColor: active ? "bg.subtle" : "bg",
        fastEaseInOut: "all",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: active ? "border.primary" : "border",
        borderRadius: "radius8",
        cursor: "pointer",
        pointerEvents: active ? "none" : undefined,
        textStyle: "bodyXs",
        paddingX: "space4",
        overflow: "hidden",

        _hover: {
          backgroundColor: "bg.hover",
        },
      })}
      onClick={() => onClick(index)}
      type="button"
    >
      {title}
    </button>
  );
};
