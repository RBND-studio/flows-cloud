import { BlogPostPreview } from "components/blog";
import { allPosts } from "contentlayer/generated";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import React from "react";
import { Text } from "ui";

export const metadata: Metadata = {
  title: "Blog - Flows",
};

const Page = (): ReactElement => {
  return (
    <>
      <Text as="h1" variant="title4xl">
        Blog
      </Text>
      <ul>
        {[...allPosts]
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((post) => (
            <BlogPostPreview key={post.slug} post={post} />
          ))}
      </ul>
    </>
  );
};

export default Page;
