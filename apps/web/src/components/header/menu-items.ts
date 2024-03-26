import { routes } from "routes";
import { links } from "shared";

type MenuItem = {
  title: string;
  href: string;
  target?: string;
};

export const menuItems: MenuItem[] = [
  {
    title: "Features",
    href: routes.features,
  },
  {
    title: "Blog",
    href: routes.blog,
  },
  {
    title: "Docs",
    href: links.docs,
  },
];
