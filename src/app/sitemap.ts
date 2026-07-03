import { MetadataRoute } from "next";
import { projectsData, blogData } from "@/constants/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://duacharitabletrust.org";

  // Core Static Pages
  const staticRoutes = ["", "/about-us", "/our-projects", "/blog", "/contact", "/donate"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Project Detail Pages
  const projectRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/our-projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic Blog Article Detail Pages
  const blogRoutes = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
