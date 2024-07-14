import { Flex } from "@flows/styled-system/jsx";
import { SmartLink } from "components/ui/smart-link";
import { api } from "lib/api";
import { load } from "lib/load";
import { links } from "shared";
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

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- or is intentional here
  const cssVars = project.css_vars || defaultVars;
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- or is intentional here
  const template = project.css_template || defaultTemplate;

  return (
    <>
      <Flex flexDirection="column" gap="space8" mb="space16">
        <Text variant="titleXl">Style template</Text>
        <Text color="muted">
          Customize the look and feel of your flows by changing CSS variables or using full CSS
          template.{" "}
          <SmartLink href={links.docsCustomStyles} target="_blank" color="text.primary">
            Learn more
          </SmartLink>
        </Text>
      </Flex>
      <TemplateProvider cssTemplate={template} cssVars={cssVars}>
        <CssVarsForm defaultVars={defaultVars} project={project} />
        <CssTemplateForm defaultTemplate={defaultTemplate} project={project} />
        <TemplatePreview />
      </TemplateProvider>
    </>
  );
}
