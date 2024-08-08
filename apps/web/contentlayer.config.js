import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  readingTimeText: {
    type: "string",
    resolve: (doc) => readingTime(doc.body.raw).text,
  },
  readingTimeMinutes: {
    type: "number",
    resolve: (doc) => readingTime(doc.body.raw).minutes,
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    image: {
      type: "string",
      required: false,
    },
    imageAlt: {
      type: "string",
      required: false,
    },
    author: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}));

export const Release = defineDocumentType(() => ({
  name: "Release",
  filePathPattern: `releases/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Release],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      // TODO: @pesickadavid this was creating empty links that nobody could use. Ideal state would be to have an icon show up when hovering over the heading that would allow you to copy the link.
      // [
      //   rehypeAutolinkHeadings,
      //   {
      //     properties: {
      //       className: ["anchor"],
      //     },
      //   },
      // ],
    ],
  },
});
