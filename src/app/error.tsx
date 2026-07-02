"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.ReactNode {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream py-20">
      <Container>
        <div className="max-w-md mx-auto text-center flex flex-col items-center">
          <div className="p-4 rounded-full bg-red-100 text-red-600 mb-6">
            <AlertCircle size={40} />
          </div>
          <h1 className="text-3xl font-bold font-heading text-charcoal mb-3">
            Something went wrong!
          </h1>
          <p className="text-sm text-charcoal/60 font-body mb-8 leading-relaxed">
            An unexpected error occurred while processing this page. Please try refreshing.
          </p>
          <div className="flex gap-4 w-full justify-center">
            <Button label="Try Again" variant="primary" onClick={reset} />
            <Button label="Back Home" variant="outline" href="/" />
          </div>
        </div>
      </Container>
    </div>
  );
}
