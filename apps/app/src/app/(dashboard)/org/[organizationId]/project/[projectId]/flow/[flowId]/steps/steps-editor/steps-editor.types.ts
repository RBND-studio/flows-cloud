import type { FlowSteps } from "@flows/js";
import { useFormContext } from "react-hook-form";

export type StepsForm = {
  steps: FlowSteps;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- not needed
export const useStepsForm = () => useFormContext<StepsForm>();
