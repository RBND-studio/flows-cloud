import type { FlowSteps } from "@flows/js";
import { css } from "@flows/styled-system/css";
import { Box, Flex } from "@flows/styled-system/jsx";
import { Plus16 } from "icons";
import { type FC } from "react";
import { Button, Icon, Menu, MenuItem } from "ui";

import { STEP_DEFAULT } from "./step-form";

type Props = {
  onInsert: (step: FlowSteps[number]) => void;
};

export const StepInsertMenu: FC<Props> = ({ onInsert }) => {
  return (
    <Flex
      _hover={{ opacity: 1 }}
      direction="column"
      fastEaseInOut="all"
      height="12px"
      justifyContent="center"
      opacity={0}
      position="relative"
    >
      <Menu
        trigger={
          <Button
            className={css({
              position: "absolute",
              right: "calc(100% + 8px)",
              top: "50%",
              transform: "translateY(-50%)",
            })}
            variant="ghost"
          >
            <Icon icon={Plus16} />
          </Button>
        }
      >
        <MenuItem onClick={() => onInsert(STEP_DEFAULT.tooltip)}>Step</MenuItem>
        <MenuItem onClick={() => onInsert(STEP_DEFAULT.fork)}>Fork</MenuItem>
      </Menu>
      <Box borBottom="1px" top="50%" />
    </Flex>
  );
};
