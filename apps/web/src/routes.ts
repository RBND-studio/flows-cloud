export const routes = {
  home: "/",
  privacy: "/privacy",
  terms: "/terms",
  about: "/about",

  blog: "/blog",
  blogPostDetail: ({ postId }: { postId: string }) => `/blog/${postId}`,

  features: "/features",
  featuresBuild: "/features/build",
  featuresFlowSteps: "/features/flow-steps",
  featuresDeliver: "/features/deliver",
  featuresAnalyze: "/features/analyze",
  featuresSecure: "/features/secure",
};
