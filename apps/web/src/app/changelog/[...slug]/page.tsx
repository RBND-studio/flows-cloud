import { ChangelogItem } from "components/changelog";
import type { Release } from "contentlayer/generated";
import { allReleases } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";

interface ReleaseProps {
  params: {
    slug: string[];
  };
}

const getReleaseFromParams = (params: ReleaseProps["params"]): Release | undefined => {
  const slug = params.slug.join("/");
  const releaseFromParams = allReleases.find((release) => release.slugAsParams === slug);

  if (!releaseFromParams) {
    null;
  }

  return releaseFromParams;
};

export function generateMetadata({ params }: ReleaseProps): Metadata {
  const release = getReleaseFromParams(params);

  if (!release) {
    return {};
  }

  return {
    title: `${release.title} | Changelog`,
  };
}

export function generateStaticParams(): ReleaseProps["params"][] {
  return allReleases.map((release) => ({
    slug: release.slugAsParams.split("/"),
  }));
}

export default function ReleasePage({ params }: ReleaseProps): ReactElement {
  const release = getReleaseFromParams(params);

  if (!release) {
    notFound();
  }

  return <ChangelogItem detail release={release} />;
}
