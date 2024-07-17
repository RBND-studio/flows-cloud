import { endFlow, startFlow } from "@flows/js";
import { css, cx } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { type FC, useEffect } from "react";

import { useFirstRender } from "../hooks/use-first-render";

type Props = {
  variant: "tooltip" | "modal" | "banner" | "wait" | "fork";
};

//TODO: add reset option

export const Demo: FC<Props> = ({ variant }) => {
  const firstRender = useFirstRender();

  useEffect(() => {
    if (firstRender) return;

    startFlow(variant);

    return () => {
      endFlow(variant);
    };
  }, [firstRender, variant]);

  if (variant === "tooltip")
    return (
      <Flex
        alignItems="center"
        bg="bg.muted"
        bor="1px!"
        className="tooltip-root"
        h="240px"
        marginY="space24"
        overflow="hidden"
        p="space40"
        rounded="radius8"
        transform="translate3d(0,0,0)"
      >
        <Box bg="bg.primary" className="tooltip-target" h="16px" rounded="radius100" w="16px" />
      </Flex>
    );

  if (variant === "modal")
    return (
      <Box
        bg="bg.muted"
        bor="1px!"
        className="modal-root"
        height="320px"
        marginY="space24"
        overflow="hidden"
        rounded="radius8"
        transform="translate3d(0,0,0)"
      />
    );

  if (variant === "banner")
    return (
      <Box
        bg="bg.muted"
        bor="1px!"
        className="banner-root"
        height="320px"
        marginY="space24"
        overflow="hidden"
        rounded="radius8"
        transform="translate3d(0,0,0)"
      />
    );

  if (variant === "wait")
    return (
      <Flex
        alignItems="center"
        bg="bg.muted"
        bor="1px!"
        className="wait-root"
        h="240px"
        marginY="space24"
        overflow="hidden"
        p="space40"
        rounded="radius8"
        transform="translate3d(0,0,0)"
      >
        <Box
          bg="bg.primary"
          className="wait-tooltip-target"
          h="16px"
          rounded="radius100"
          w="16px"
        />
        <button
          className={cx(
            css({
              backgroundColor: "bg.primary!",
              paddingY: "space8!",
              paddingX: "space16!",
              borderRadius: "radius8",
              color: "text.onPrimary!",
              marginLeft: "space40!",
            }),
            "flow-3",
          )}
          type="button"
        >
          Click me to continue
        </button>
      </Flex>
    );

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- this is fine
  if (variant === "fork")
    return (
      <Flex
        alignItems="center"
        bg="bg.muted"
        bor="1px!"
        className="fork-root"
        h="240px"
        justifyContent="center"
        marginY="space24"
        overflow="hidden"
        p="space40"
        rounded="radius8"
        transform="translate3d(0,0,0)"
      >
        <button
          className={cx(
            css({
              backgroundColor: "bg.primary!",
              paddingY: "space8!",
              paddingX: "space16!",
              borderRadius: "radius8",
              color: "text.onPrimary!",
              marginLeft: "space40!",
            }),
            "branch-a",
          )}
          type="button"
        >
          Branch A
        </button>
        <button
          className={cx(
            css({
              backgroundColor: "bg.primary!",
              paddingY: "space8!",
              paddingX: "space16!",
              borderRadius: "radius8",
              color: "text.onPrimary!",
              marginLeft: "space40!",
            }),
            "branch-b",
          )}
          type="button"
        >
          Branch B
        </button>
      </Flex>
    );

  return null;
};
