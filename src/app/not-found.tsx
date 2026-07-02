import React from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Leaf } from "lucide-react";

export default function NotFound(): React.ReactNode {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-cream py-20">
      <Container>
        <div className="max-w-md mx-auto text-center flex flex-col items-center">
          <div className="p-4 rounded-full bg-forest/10 text-forest mb-6 animate-bounce">
            <Leaf size={40} className="fill-current" />
          </div>
          <h1 className="text-5xl font-extrabold font-heading text-forest tracking-tight mb-2">
            404
          </h1>
          <h2 className="text-2xl font-bold font-heading text-charcoal mb-4">
            Page Not Found
          </h2>
          <p className="text-sm text-charcoal/60 font-body mb-8 leading-relaxed">
            The path you are looking for might have drifted away, been reforested, or does not exist.
          </p>
          <Button label="Return Home" variant="primary" href="/" />
        </div>
      </Container>
    </div>
  );
}
