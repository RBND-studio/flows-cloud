import { type FlowStep } from "@flows/js";
import { Box, Flex } from "@flows/styled-system/jsx";
import { type FC, Fragment } from "react";
import { useFieldArray } from "react-hook-form";

import { useStepsForm } from "../edit-constants";
import { ConnectionArrow } from "./connection-arrow";
import { StepsFlowStep } from "./steps-flow-step";

type Props = {
  index: `${number}.${number}`;
  onSelectStep: (index?: number | `${number}.${number}.${number}`) => void;
  selectedStep?: number | `${number}.${number}.${number}`;
  onRemove: () => void;
};

export const Branch: FC<Props> = ({ index, onSelectStep, selectedStep, onRemove }) => {
  const { control } = useStepsForm();
  const fieldName = `steps.${index}` as const;
  const { fields, insert, remove } = useFieldArray({ control, name: fieldName });

  const handleRemove = (i: number): void => {
    if (fields.length === 1) onRemove();
    else remove(i);
  };

  return (
    <Flex alignItems="center" direction="column">
      {fields.map((field, i) => {
        const stepIndex = `${index}.${i}` as const;
        const lastStep = i === fields.length - 1;
        return (
          <Fragment key={field.id}>
            {i !== 0 && <ConnectionArrow lines={1} variant="fork" />}
            <StepsFlowStep
              index={stepIndex}
              onSelect={onSelectStep}
              selected={selectedStep === stepIndex}
              onRemove={() => handleRemove(i)}
              onAddBefore={(s) => insert(i, s as FlowStep)}
              onAddAfter={(s) => insert(i + 1, s as FlowStep)}
              lastStep={lastStep}
            />
            {lastStep ? <Box bg="border" flex={1} width="2px" /> : null}
          </Fragment>
        );
      })}
    </Flex>
  );
};
