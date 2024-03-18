import type { FlowSteps } from "@flows/js";
import { type FlowDetail, type UpdateFlow } from "lib/api";
import { type DefaultValues, useFormContext } from "react-hook-form";

import { type MatchGroup } from "./targeting/targeting-types";

export type StepsForm = Pick<UpdateFlow, "frequency" | "clickElement" | "location"> & {
  steps: FlowSteps;
  userProperties: MatchGroup[];
};

export const createDefaultValues = (flow: FlowDetail): DefaultValues<StepsForm> => {
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
export const useStepsForm = () => useFormContext<StepsForm>();

export type SelectedItem =
  | number
  | `${number}.${number}.${number}`
  | "targeting"
  | "launch"
  | "frequency";

export const selectedItemIsStep = (
  item: SelectedItem,
): item is number | `${number}.${number}.${number}` =>
  item !== "frequency" && item !== "targeting" && item !== "launch";
