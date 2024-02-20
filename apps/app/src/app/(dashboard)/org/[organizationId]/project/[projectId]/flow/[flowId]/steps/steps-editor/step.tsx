import type { FC } from "react";

import { StepFork } from "./step-fork";
import { StepForm } from "./step-form";
import { useStepsForm } from "./steps-editor.types";

type Props = {
  index: number;
  onRemove: () => void;
};

export const Step: FC<Props> = ({ index, onRemove }) => {
  const { watch } = useStepsForm();
  const value = watch(`steps.${index}`);

  if (!Array.isArray(value)) return <StepForm index={index} onRemove={onRemove} />;

  return <StepFork index={index} onRemove={onRemove} />;
};
