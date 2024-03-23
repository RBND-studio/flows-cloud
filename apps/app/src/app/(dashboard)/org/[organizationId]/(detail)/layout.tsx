import { Container } from "components/ui/container";
import { api } from "lib/api";
import { load } from "lib/load";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  params: {
    organizationId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const org = await load(api["/organizations/:organizationId"](params.organizationId));

  return {
    title: `${org.name} | Flows`,
  };
}

export default function OrganizationDetailLayout({ children }: Props): JSX.Element {
  return <Container>{children}</Container>;
}
