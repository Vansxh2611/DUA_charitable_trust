import { NavItem, PageRoutes } from "@/types";
import { siteName } from "./site";

export const navItems: NavItem[] = [
  { label: "Home", href: PageRoutes.HOME },
  { label: "About", href: PageRoutes.ABOUT_US },
  { label: "Projects", href: PageRoutes.OUR_PROJECTS },
  { label: "Blog", href: PageRoutes.BLOG },
];

export const siteConfig = {
  name: siteName,
  donateLink: PageRoutes.DONATE,
  contactLink: PageRoutes.CONTACT,
};
