"use client";

import type { FlowsOptions } from "@rbnd/flows";
import { endFlow, init } from "@rbnd/flows";
import { usePrevious } from "hooks";
import type { FC, ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Props = FlowsOptions & {
  children?: ReactNode;
};

const FlowsContext = createContext<{ runningFlowIds: string[] }>({ runningFlowIds: [] });
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- not needed
export const useFlowsContext = () => useContext(FlowsContext);

export const Flows: FC<Props> = ({ children, ...options }) => {
  const [runningFlowIds, setRunningFlowIds] = useState<string[]>([]);

  useEffect(() => {
    init({
      ...options,
      tracking: (event) =>
        setRunningFlowIds((prev) => {
          if (event.type === "startFlow") return [...prev, event.flowId];
          if (event.type === "finishFlow" || event.type === "cancelFlow")
            return prev.filter((id) => id !== event.flowId);
          return prev;
        }),
    });
    return () => init({ flows: [] });
  }, [options]);

  const flowIds = useMemo(() => (options.flows ?? []).map((f) => f.id), [options.flows]);
  const prevFlowIds = usePrevious(flowIds);
  const flowIdsChanged = prevFlowIds && flowIds.toString() !== prevFlowIds.toString();

  useEffect(() => {
    prevFlowIds?.forEach(endFlow);
    return () => flowIds.forEach(endFlow);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on flowIds change
  }, [flowIdsChanged]);

  return <FlowsContext.Provider value={{ runningFlowIds }}>{children}</FlowsContext.Provider>;
};
