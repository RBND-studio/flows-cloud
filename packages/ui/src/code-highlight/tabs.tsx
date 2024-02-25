import type { BrightProps, Extension } from "bright";
import { Code } from "bright";

import { CopyButton } from "./copy-button";
import { TabsContent, TabsList, TabsRoot } from "./tabs-client";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it's safe to assume that Code exists
const CodeTab = Code.Tab!;
const TitleBarContent: BrightProps["TitleBarContent"] = (brightProps) => {
  const { subProps, title } = brightProps;
  const titles = subProps?.length ? subProps.map((subProp) => subProp.title ?? "") : [title ?? ""];
  const childProps = subProps?.length ? subProps : [brightProps];
  return (
    <TabsList titles={titles}>
      {titles.map((t, i) => {
        return <CodeTab key={t} {...brightProps} {...childProps[i]} />;
      })}
    </TabsList>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it's safe to assume that Code.Root exists
const CodeRoot = Code.Root!;
const Root: BrightProps["Root"] = (brightProps) => {
  const { subProps, title } = brightProps;

  const titles = subProps?.length ? subProps.map((subProp) => subProp.title) : [title];

  return (
    <TabsRoot defaultValue={titles[0] ?? ""}>
      <CodeRoot {...brightProps} />
    </TabsRoot>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- it's safe to assume that Code.Pre exists
const CodePre = Code.Pre!;
const Content: BrightProps["Pre"] = (brightProps) => {
  const { subProps } = brightProps;
  const propsList = subProps?.length ? subProps : [brightProps];
  return (
    <>
      {propsList.map((props, i) => (
        <TabsContent key={props.title ?? i} value={props.title ?? ""}>
          <>
            <CodePre {...brightProps} {...props} />
            <CopyButton code={props.code ?? ""} />
          </>
        </TabsContent>
      ))}
    </>
  );
};

export const tabs: Extension = {
  name: "tabs",
  Root,
  TitleBarContent,
  Pre: Content,
};
