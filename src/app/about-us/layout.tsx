import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Story & Values",
  description: "Discover the story and core values of Dua Charitable Trust - a multi-domain NGO dedicated to interactive STEM learning, sustainable agriculture, art therapy, and wellness programs.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
