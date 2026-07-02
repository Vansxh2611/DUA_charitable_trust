import React from "react";
import { Loader } from "@/components/ui/Loader";

export default function Loading(): React.ReactNode {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream">
      <Loader size="lg" />
    </div>
  );
}
