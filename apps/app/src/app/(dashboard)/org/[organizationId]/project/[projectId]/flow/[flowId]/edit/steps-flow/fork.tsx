import { css } from "@flows/styled-system/css";
import { Flex, Grid } from "@flows/styled-system/jsx";
import { type FC } from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "ui";

import { useStepsForm } from "../edit-constants";
import { STEP_DEFAULT } from "../step-form";
import { Branch } from "./branch";
import { boxGap } from "./steps-flow.constants";

type Props = {
  index: number;
  onSelectStep: (index?: number | `${number}.${number}.${number}`) => void;
  selectedStep?: number | `${number}.${number}.${number}`;
};

export const Fork: FC<Props> = ({ index, onSelectStep, selectedStep }) => {
  const { control } = useStepsForm();
  const fieldName = `steps.${index}` as const;
  const { fields, remove, append } = useFieldArray({ control, name: fieldName });

  return (
    <Flex gap={`space${boxGap}`} position="relative">
      {(fields as { id: string }[]).map((field, i) => (
        <Branch
          key={field.id}
          index={`${index}.${i}`}
          onSelectStep={onSelectStep}
          selectedStep={selectedStep}
          onRemove={() => remove(i)}
        />
      ))}
      <Grid
        position="absolute"
        left="100%"
        h="100%"
        placeItems="center"
        w="64px"
        _hover={{ "& button": { opacity: 1 } }}
      >
        <Button
          size="small"
          variant="secondary"
          className={css({ opacity: "0" })}
          onClick={() => append([[STEP_DEFAULT.tooltip]] as never[])}
        >
          +
        </Button>
      </Grid>
    </Flex>
  );
};
