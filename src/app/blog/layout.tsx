import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NGO Blog & Community Stories",
  description: "Read updates, success stories, and educational articles from the team and volunteers at Dua Charitable Trust.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
