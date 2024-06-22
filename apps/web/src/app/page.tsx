import { AnalyzeSection, BuilderSection, DeliverSection, DemoSection, Hero } from "components";
import type { Metadata } from "next";
import type { ReactElement } from "react";

export const metadata: Metadata = {
  alternates: { canonical: "https://flows.sh" },
};

const Page = (): ReactElement => {
  return (
    <>
      <Hero />
      <DemoSection />
      <BuilderSection />
      <DeliverSection />
      <AnalyzeSection />
    </>
  );
};

export default Page;
