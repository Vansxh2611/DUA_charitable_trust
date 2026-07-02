"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { Heart, CheckCircle2, ShieldCheck } from "lucide-react";

export default function Donate(): React.ReactNode {
  const [frequency, setFrequency] = useState<"one-time" | "monthly" | "annual">("monthly");
  const [selectedTier, setSelectedTier] = useState<number | "custom">(30);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const donationTiers = [15, 30, 60, 120];

  const getImpactDescription = (amount: number): string => {
    if (amount <= 15) {
      return "Sponsors 5 native riparian broadleaf seedlings and stakes.";
    } else if (amount <= 30) {
      return "Sponsors 10 native conifer seedlings and organic soil mulch bags.";
    } else if (amount <= 60) {
      return "Sponsors a school Garden Classroom composting worm-bin and starter kit.";
    } else {
      return "Sponsors a complete biology test kit for a transitioning small farm.";
    }
  };

  const activeAmount = selectedTier === "custom" ? Number(customAmount) || 0 : selectedTier;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (activeAmount <= 0 || !name || !email) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1800);
  };

  return (
    <div className="pt-24 sm:pt-28 bg-cream min-h-screen pb-20 animate-fade-in">
      <section className="py-16 sm:py-20 gradient-bg border-b border-forest/10 text-center">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
              Empower Joyful Wisdom
            </h1>
            <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-body">
              Your donations directly fund STEM robotics kits, creative art materials, organic gardening beds, and student well-being hygiene resources.
            </p>
          </div>
        </Container>
      </section>

      <Container className="mt-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 bg-cream border border-forest/15 rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
            <h2 className="text-xl font-bold font-heading text-charcoal flex items-center gap-2">
              <Heart size={20} className="text-forest fill-forest/15" />
              Select Donation Value
            </h2>

            <div className="grid grid-cols-3 gap-2 bg-forest/5 p-1.5 rounded-full border border-forest/10">
              {(["one-time", "monthly", "annual"] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={cn(
                    "py-2 rounded-full text-xs sm:text-sm font-semibold font-heading transition-all duration-200 capitalize cursor-pointer focus:outline-none",
                    frequency === freq ? "bg-forest text-cream shadow-xs" : "text-charcoal/70 hover:text-forest"
                  )}
                >
                  {freq === "one-time" ? "One-time" : freq === "monthly" ? "Monthly" : "Annual"}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {donationTiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => {
                    setSelectedTier(tier);
                    setCustomAmount("");
                  }}
                  className={cn(
                    "py-4 rounded-2xl border text-center font-bold font-heading transition-all duration-200 cursor-pointer focus:outline-none",
                    selectedTier === tier
                      ? "bg-forest border-forest text-cream shadow-xs"
                      : "bg-cream border-forest/15 text-charcoal hover:bg-forest/5"
                  )}
                >
                  ${tier}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedTier("custom")}
                className={cn(
                  "w-full py-3 rounded-2xl border text-center font-bold font-heading transition-all duration-200 cursor-pointer focus:outline-none",
                  selectedTier === "custom"
                    ? "bg-forest border-forest text-cream shadow-xs"
                    : "bg-cream border-forest/15 text-charcoal hover:bg-forest/5"
                )}
              >
                Custom Value
              </button>
              {selectedTier === "custom" && (
                <div className="relative mt-2 animate-fade-in">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-charcoal/40 font-bold font-heading z-10">
                    $
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="pl-9! w-full"
                    min={1}
                    required
                  />
                </div>
              )}
            </div>

            {activeAmount > 0 && (
              <div className="p-5 rounded-2xl bg-mint/20 border border-forest/15 animate-fade-in">
                <span className="text-xs font-bold text-forest font-heading tracking-wider uppercase block mb-1">
                  Your Impact
                </span>
                <p className="text-sm font-semibold text-charcoal font-body leading-relaxed">
                  {getImpactDescription(activeAmount)}
                </p>
              </div>
            )}
          </div>

          <div className="md:col-span-5 bg-cream border border-forest/15 rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <CheckCircle2 size={48} className="text-forest mb-4" />
                <h3 className="text-2xl font-bold text-charcoal font-heading mb-2">Thank You!</h3>
                <p className="text-sm text-charcoal/60 font-body leading-relaxed max-w-xs">
                  Your mock donation of <strong>${activeAmount}</strong> has been received. Your support drives change!
                </p>
                <Button label="Donate Again" variant="outline" onClick={() => setStatus("idle")} className="mt-6" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold font-heading text-charcoal border-b border-forest/10 pb-3">
                  Billing Information
                </h3>
                <Input
                  label="Full Name"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={status === "loading"}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                />
                <Input
                  label="Card Details (Mock)"
                  placeholder="4111 2222 3333 4444"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  required
                  disabled={status === "loading"}
                />

                <Button
                  type="submit"
                  label={`Complete Donation of $${activeAmount}`}
                  variant="secondary"
                  loading={status === "loading"}
                  disabled={activeAmount <= 0}
                  className="w-full py-4! text-base font-bold shadow-xs mt-2"
                />

                <div className="flex items-center justify-center gap-2 text-xs text-charcoal/40 font-medium">
                  <ShieldCheck size={14} className="text-forest" />
                  <span>Secure 256-bit encrypted SSL checkout</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
