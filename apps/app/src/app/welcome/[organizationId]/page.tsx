import { Box } from "@flows/styled-system/jsx";
import { ProjectForm } from "app/welcome/[organizationId]/project-form";
import { api } from "lib/api";
import { load } from "lib/load";
import { Text } from "ui";

type Props = {
  params: {
    organizationId: string;
  };
};

// TODO: @opesicka make this pretty
export default async function WelcomeOrganizationPage({ params }: Props): Promise<JSX.Element> {
  const org = await load(api["/organizations/:organizationId"](params.organizationId));

  return (
    <Box cardWrap="-" padding="space16">
      <Text variant="titleL">Welcome {org.name}</Text>
      <Text>Continue by creating a project in {org.name}</Text>

      <ProjectForm organizationId={params.organizationId} />
    </Box>
  );
}
