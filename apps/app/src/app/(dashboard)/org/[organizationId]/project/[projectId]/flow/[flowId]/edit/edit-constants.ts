import type { FlowSteps } from "@flows/js";
import { type FlowDetail, type UpdateFlow } from "lib/api";
import { type DefaultValues, useFormContext } from "react-hook-form";

import { type MatchGroup } from "./targeting";

export type IFlowEditForm = Pick<UpdateFlow, "frequency" | "clickElement" | "location"> & {
  steps: FlowSteps;
  userProperties: MatchGroup[];
};

export const createDefaultValues = (flow: FlowDetail): DefaultValues<IFlowEditForm> => {
  const editVersion = flow.draftVersion ?? flow.publishedVersion;
  return {
    steps: (editVersion?.steps as FlowSteps | undefined) ?? [],
    userProperties: (editVersion?.userProperties as MatchGroup[] | undefined) ?? [],
    frequency: editVersion?.frequency ?? "once",
    clickElement: editVersion?.clickElement ?? "",
    location: editVersion?.location ?? "",
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- not needed
export const useFlowEditForm = () => useFormContext<IFlowEditForm>();

export type SelectedItem =
  | number
  | `${number}.${number}.${number}`
  | "targeting"
  | "launch"
  | "frequency";
