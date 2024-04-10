import { Container } from "components/ui/container";
import type { Metadata } from "next";

type Props = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: `Personal settings | Flows`,
};

export default function OrganizationDetailLayout({ children }: Props): JSX.Element {
  return <Container>{children}</Container>;
}
