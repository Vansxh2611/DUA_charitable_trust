import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Library Showcase - Dua Charitable Trust",
  description: "Dev-only interactive playground for the premium UI component library.",
  robots: {
    index: false,
    follow: false,
  },
};

interface ShowcaseLayoutProps {
  children: React.ReactNode;
}

export default function ShowcaseLayout({ children }: ShowcaseLayoutProps) {
  return <>{children}</>;
}
