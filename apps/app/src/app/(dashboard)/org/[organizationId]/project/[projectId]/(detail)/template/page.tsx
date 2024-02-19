import { Flex } from "@flows/styled-system/jsx";
import { api } from "lib/api";
import { load } from "lib/load";
import { Text } from "ui";

import { CssTemplateForm } from "./css-template-form";
import { CssVarsForm } from "./css-vars-form";
import { TemplateProvider } from "./template-context";
import { TemplatePreview } from "./template-preview";

type Props = {
  params: { projectId: string };
};

export default async function ProjectTemplatePage({ params }: Props): Promise<JSX.Element> {
  const [project, defaultVars, defaultTemplate] = await Promise.all([
    load(api["/projects/:projectId"](params.projectId)),
    load(api["/css/vars"]()),
    load(api["/css/template"]()),
  ]);

  return (
    <>
      <Flex flexDirection="column" gap="space8" mb="space16">
        <Text variant="titleXl">Style template</Text>
        <Text color="muted">
          Customize the look and feel of your flows by changing CSS variables or using full CSS
          template.
        </Text>
      </Flex>
      <TemplateProvider defaultCssTemplate={defaultTemplate} defaultCssVars={defaultVars}>
        <CssVarsForm defaultVars={defaultVars} project={project} />
        <CssTemplateForm defaultTemplate={defaultTemplate} project={project} />
        <TemplatePreview />
      </TemplateProvider>
    </>
  );
}
