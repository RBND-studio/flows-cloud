import { css } from "@flows/styled-system/css";
import { Flex } from "@flows/styled-system/jsx";
import type { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from "ui";
import { CodeHighlight } from "ui/server";

import { NumberCircle } from "./number-circle";

type Props = {
  organizationId?: string;
  projectId: string;
};

const CDNSnippet: FC<Props> = async ({ projectId }) => {
  const latestPackageJson = await fetch("https://unpkg.com/@flows/js@latest/package.json", {
    cache: "no-store",
  }).then((res) => res.json() as Promise<{ version?: string } | undefined>);
  const latestVersion = latestPackageJson?.version;

  return (
    <Flex flexDirection="column" gap="space16">
      <Text>
        First copy the snippet bellow and paste it within the <strong>head</strong> tag of your
        product - ideally right before the closing <strong>head</strong> tag.
      </Text>
      <CodeHighlight className={css({ margin: "0!", width: "100%" })}>
        <pre>
          <code className="index.html">{`<script defer src="https://cdn.jsdelivr.net/npm/@flows/js@${latestVersion}/dist/index.global.js"></script>`}</code>
        </pre>
      </CodeHighlight>
      <Text>
        After that start using Flows by calling <strong>flows.init()</strong> anywhere in your code
        to initialize the script.
      </Text>
      <CodeHighlight className={css({ margin: "0!", width: "100%" })}>
        <pre>
          <code className="index.html">{`<script>
  flows.init({
    projectId: "${projectId}",
    // Optionally define local flows. 
    flows: [],
  });
</script>`}</code>
        </pre>
      </CodeHighlight>
    </Flex>
  );
};

const NPMSnippet: FC<Props> = ({ projectId }) => {
  return (
    <Flex flexDirection="column" gap="space16">
      <Text>First Install the Flows SDK library via a NPM package manager.</Text>
      <CodeHighlight className={css({ margin: "0!" })} lineNumbers={false}>
        <pre>
          <code className="sh">npm i @flows/js</code>
        </pre>
      </CodeHighlight>
      <Text>And then import it in your code.</Text>
      <CodeHighlight className={css({ margin: "0!" })}>
        <pre>
          <code className="flows.js">{`import { init } from "@flows/js";
 
init({
  projectId: "${projectId}",
  // Optionally define local flows.
  flows: [],
});`}</code>
        </pre>
      </CodeHighlight>
    </Flex>
  );
};

export const InstallInstructions: FC<Props> = ({ projectId }) => {
  return (
    <Flex gap="space12">
      <NumberCircle>1</NumberCircle>
      <Flex flexDirection="column" gap="space16" overflow="hidden" width="100%">
        <Flex flexDirection="column" gap="space4">
          <Text variant="titleL">Install Flows in your codebase</Text>
          <Text color="muted">
            For Flows to show up in your app, you need to insert Flows script or install the Flows
            SDK in your codebase.
          </Text>
        </Flex>
        <Tabs
          className={css({
            overflow: "hidden",
            width: "100%",
          })}
          defaultValue="cdn"
        >
          <TabsList>
            <TabsTrigger value="cdn">CDN</TabsTrigger>
            <TabsTrigger value="npm">NPM</TabsTrigger>
          </TabsList>
          <TabsContent value="cdn">
            <CDNSnippet projectId={projectId} />
          </TabsContent>
          <TabsContent value="npm">
            <NPMSnippet projectId={projectId} />
          </TabsContent>
        </Tabs>
      </Flex>
    </Flex>
  );
};
