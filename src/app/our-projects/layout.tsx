import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects & Campaigns",
  description: "Explore the active multi-domain NGO initiatives of Dua Charitable Trust, including STEM labs, seed preservation, and mental wellness circles.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
