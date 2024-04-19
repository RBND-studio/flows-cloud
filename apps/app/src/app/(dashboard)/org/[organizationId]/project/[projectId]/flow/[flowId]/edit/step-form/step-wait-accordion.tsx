import { Flex } from "@flows/styled-system/jsx";
import { type FC } from "react";
import { Accordion, Badge, Text } from "ui";

import { useFlowEditForm } from "../edit-constants";
import { StepWaitOptionList } from "./step-wait-option-list";

type Props = {
  fieldName: `steps.${number}.wait` | `steps.${number}.${number}.${number}.wait`;
};

export const StepWaitAccordion: FC<Props> = ({ fieldName }) => {
  const { watch } = useFlowEditForm();
  const value = watch(fieldName);
  const optionCount = Array.isArray(value) ? value.length : 0;

  return (
    <Accordion
      title={
        <Flex gap="space8">
          <Text variant="titleM">Wait</Text> {optionCount ? <Badge>{optionCount}</Badge> : null}
        </Flex>
      }
    >
      <StepWaitOptionList fieldName={fieldName} />
    </Accordion>
  );
};
