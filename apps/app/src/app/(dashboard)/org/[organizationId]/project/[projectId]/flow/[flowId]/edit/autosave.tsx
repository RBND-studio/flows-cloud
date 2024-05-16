"use client";

import { debounce } from "lib/debounce";
import { type FC, useEffect, useMemo } from "react";
import { Text } from "ui";

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

  if (formState.isDirty) return <Text color="muted">Saving</Text>;

  return null;
};
