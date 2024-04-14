import { ChangelogRender } from "components/changelog";
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

const getReleaseFromParams = (params: ReleaseProps["params"]): Promise<Release | undefined> => {
  const slug = params.slug.join("/");
  const releaseFromParams = allReleases.find((release) => release.slugAsParams === slug);

  if (!releaseFromParams) {
    null;
  }

  return Promise.resolve(releaseFromParams);
};

export async function generateMetadata({ params }: ReleaseProps): Promise<Metadata> {
  const release = await getReleaseFromParams(params);

  if (!release) {
    return {};
  }

  return {
    title: `${release.title} | Changelog`,
  };
}

// eslint-disable-next-line @typescript-eslint/require-await -- required for nextjs
export async function generateStaticParams(): Promise<ReleaseProps["params"][]> {
  return allReleases.map((release) => ({
    slug: release.slugAsParams.split("/"),
  }));
}

export default async function ReleasePage({ params }: ReleaseProps): Promise<ReactElement> {
  const release = await getReleaseFromParams(params);

  if (!release) {
    notFound();
  }

  return <ChangelogRender detail release={release} />;
}
