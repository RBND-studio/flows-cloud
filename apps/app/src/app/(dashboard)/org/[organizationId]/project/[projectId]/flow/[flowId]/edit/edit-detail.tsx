import type { FC } from "react";
import { Text } from "ui";

import { StepForm } from "./step-form/step-form";

type Props = {
  selectedStep?: number | `${number}.${number}.${number}`;
};

export const EditDetail: FC<Props> = ({ selectedStep }) => {
  if (selectedStep !== undefined) return <StepForm index={selectedStep} key={selectedStep} />;

  return <Text>Start by selecting a step on the left</Text>;
};
