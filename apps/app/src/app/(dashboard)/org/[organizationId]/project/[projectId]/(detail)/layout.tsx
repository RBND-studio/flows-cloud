import { Container } from "components/ui/container";
import { api } from "lib/api";
import { load } from "lib/load";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  params: { projectId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await load(api["/projects/:projectId"](params.projectId));

  return {
    title: `${project.name} | Flows`,
  };
}

export default function ProjectDetailLayout({ children }: Props): JSX.Element {
  return <Container>{children}</Container>;
}
