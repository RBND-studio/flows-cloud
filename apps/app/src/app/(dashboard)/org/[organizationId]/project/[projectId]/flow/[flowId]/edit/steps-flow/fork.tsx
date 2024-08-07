import { css } from "@flows/styled-system/css";
import { Flex, Grid } from "@flows/styled-system/jsx";
import { Fork16 } from "icons";
import { type FC } from "react";
import { useFieldArray } from "react-hook-form";
import { Icon, IconButton } from "ui";

import { type SelectedItem, useFlowEditForm } from "../edit-constants";
import { STEP_DEFAULT } from "../step-form";
import { Branch } from "./branch";
import { boxConstants } from "./steps-flow.constants";

type Props = {
  index: number;
  onSelectStep: (item: SelectedItem) => void;
  selectedStep?: SelectedItem;
  onRemove: () => void;
};

export const Fork: FC<Props> = ({ index, onSelectStep, selectedStep, onRemove }) => {
  const { control } = useFlowEditForm();
  const fieldName = `steps.${index}` as const;
  const { fields, remove, append } = useFieldArray({ control, name: fieldName });
  const handleRemove = (i: number): void => {
    if (fields.length === 1) onRemove();
    else remove(i);
  };

  return (
    <Flex
      position="relative"
      px="48px"
      gap={boxConstants.gap}
      _after={{
        borderStyle: "dashed",
        borderColor: "border.strong",
        borderWidth: "2px",
        content: "''",
        position: "absolute",
        top: "50%",
        left: "0",
        right: "0",
        transform: "translateY(-50%)",
        zIndex: -1,
        width: "100%",
        height: "calc(100% + 48px)",
        borderRadius: "radius12",
      }}
    >
      {(fields as { id: string }[]).map((field, i) => (
        <Branch
          key={field.id}
          index={`${index}.${i}`}
          onSelectStep={onSelectStep}
          selectedStep={selectedStep}
          onRemove={() => handleRemove(i)}
        />
      ))}
      <Grid
        position="absolute"
        right={0}
        h="100%"
        placeItems="center"
        w="48px"
        _hover={{ "& button": { opacity: 1 } }}
      >
        <IconButton
          size="small"
          variant="secondary"
          tooltip="Add branch"
          className={css({ opacity: "0" })}
          onClick={() => append([[STEP_DEFAULT.tooltip]] as never[])}
        >
          <Icon icon={Fork16} />
        </IconButton>
      </Grid>
    </Flex>
  );
};
