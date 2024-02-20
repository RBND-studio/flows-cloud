import type { FC } from "react";
import { useFormContext } from "react-hook-form";

import { StepsPreview } from "../steps-preview";
import type { StepsForm } from "./steps-editor.types";

export const StepsEditorPreview: FC = () => {
  const { watch } = useFormContext<StepsForm>();

  return <StepsPreview steps={watch("steps")} />;
};
