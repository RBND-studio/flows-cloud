import { Container } from "components/ui/container";
import type { Metadata } from "next";

type Props = {
  children?: React.ReactNode;
};

export function generateMetadata(): Metadata {
  return {
    title: `Personal settings | Flows`,
  };
}

export default function OrganizationDetailLayout({ children }: Props): JSX.Element {
  return <Container>{children}</Container>;
}
