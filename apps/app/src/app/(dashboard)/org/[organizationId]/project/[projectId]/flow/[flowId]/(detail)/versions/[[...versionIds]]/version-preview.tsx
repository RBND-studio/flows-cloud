import { CodeEditor } from "components/ui/code-editor";
import type { FlowVersion } from "lib/api";
import type { FC } from "react";

type Props = {
  version: FlowVersion;
};

export const VersionPreview: FC<Props> = ({ version }) => {
  return <CodeEditor defaultValue={JSON.stringify(version.data, null, 2)} language="json" />;
};
