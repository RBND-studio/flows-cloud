import { ChangelogItem } from "components/changelog";
import { allReleases } from "contentlayer/generated";
import type { ReactElement } from "react";

const Page = (): ReactElement => {
  return (
    <>
      {[...allReleases]
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((release) => (
          <ChangelogItem key={release.slug} release={release} />
        ))}
    </>
  );
};

export default Page;
