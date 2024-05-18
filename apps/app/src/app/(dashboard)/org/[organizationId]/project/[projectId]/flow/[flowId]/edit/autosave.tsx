"use client";

import { Flex } from "@flows/styled-system/jsx";
import { Check16 } from "icons";
import { debounce } from "lib/debounce";
import { type FC, useEffect, useMemo } from "react";
import { Icon, Text } from "ui";

import { useFlowEditForm } from "./edit-constants";

type Props = {
  onSave: () => void;
};

export const Autosave: FC<Props> = ({ onSave }) => {
  const { formState } = useFlowEditForm();

  const debouncedSave = useMemo(
    () => debounce(() => onSave(), 2000),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no dependencies needed
    [],
  );

  useEffect(() => {
    if (formState.isDirty) debouncedSave();
  }, [debouncedSave, formState.isDirty]);

  if (formState.isDirty)
    return (
      <Text variant="bodyXs" color="muted">
        Saving
      </Text>
    );

  return (
    <Flex gap="space4">
      <Icon icon={Check16} />
      <Text variant="bodyXs" color="muted">
        Saved
      </Text>
    </Flex>
  );
};
