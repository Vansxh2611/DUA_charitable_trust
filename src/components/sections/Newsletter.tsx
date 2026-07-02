"use client";

import React, { useState } from "react";
import { NewsletterProps } from "@/types";
import { Container } from "../ui/Container";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Send, CheckCircle2 } from "lucide-react";

export const Newsletter: React.FC<NewsletterProps> = ({
  title,
  subtitle,
  placeholderText = "Enter your email address",
  buttonText = "Subscribe",
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="py-16 sm:py-20 bg-forest text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#F57C00_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <Container>
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading leading-tight mb-4 text-cream">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-cream/80 leading-relaxed font-body mb-8 max-w-xl">
            {subtitle}
          </p>

          {status === "success" ? (
            <div className="flex flex-col items-center bg-cream/10 border border-cream/20 rounded-3xl p-6 sm:p-8 animate-fade-in w-full max-w-md">
              <CheckCircle2 size={40} className="text-cream mb-3" />
              <h3 className="text-lg font-bold font-heading mb-1 text-cream">Thank You!</h3>
              <p className="text-xs sm:text-sm text-cream/95 font-body">
                You&apos;ve successfully subscribed to our eco-digest.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <div className="flex-grow">
                <Input
                  type="email"
                  placeholder={placeholderText}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="bg-cream/10! border-cream/20! text-cream! placeholder:text-cream/50! focus:border-cream! focus:ring-cream/30! w-full"
                  aria-label="Email Address"
                />
              </div>
              <Button
                type="submit"
                label={buttonText}
                variant="secondary"
                loading={status === "loading"}
                icon={<Send size={14} />}
                iconPosition="right"
                className="w-full sm:w-auto shrink-0 py-3!"
              />
            </form>
          )}
        </div>
      </Container>
    </section>
  );
};
