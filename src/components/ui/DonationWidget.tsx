"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { AnimatedButton } from "./AnimatedButton";
import { Heart, ShieldCheck, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";

export interface DonationCause {
  id: string;
  name: string;
  description: string;
  impactFormula: (amount: number) => string;
  goal?: number;
  raised?: number;
}

export interface DonationWidgetProps {
  causes?: DonationCause[];
  presetAmounts?: number[];
  currencySymbol?: string;
  onDonate?: (data: { amount: number; causeId: string; frequency: string }) => Promise<void> | void;
  className?: string;
}

const defaultCauses: DonationCause[] = [
  {
    id: "edu",
    name: "Childhood Education",
    description: "Provide interactive science kits, learning laptops, and school classroom libraries.",
    impactFormula: (amt) => {
      if (amt < 500) return `Provides pencils and notebooks for ${Math.floor(amt / 50)} children.`;
      if (amt < 2000) return `Sponsors interactive learning toolkits for ${Math.floor(amt / 500)} children.`;
      return `Funds complete computer lab access for ${Math.floor(amt / 1000)} students for a term.`;
    },
    goal: 50000,
    raised: 38200,
  },
  {
    id: "env",
    name: "Nature & Replanting",
    description: "Support native tree planting, riparian restoration, and classroom gardens.",
    impactFormula: (amt) => {
      if (amt < 500) return `Plants ${Math.floor(amt / 100)} native saplings in urban school hubs.`;
      if (amt < 2000) return `Funds organic fertilizer and compost mulch for ${Math.floor(amt / 500)} garden beds.`;
      return `Builds a complete composting worm-bin classroom garden system.`;
    },
    goal: 30000,
    raised: 12450,
  },
  {
    id: "art",
    name: "Arts & Emotional Care",
    description: "Therapeutic painting, clay modeling, and music workshops for children.",
    impactFormula: (amt) => {
      if (amt < 500) return `Supplies paint brushes and sketchbooks for ${Math.floor(amt / 100)} pupils.`;
      if (amt < 2000) return `Sponsors art supplies and canvasses for ${Math.floor(amt / 400)} therapists' slots.`;
      return `Hosts a community-wide mural painting festival weekend.`;
    },
    goal: 25000,
    raised: 21800,
  },
];

const defaultPresets = [500, 1000, 2500, 5000];

export const DonationWidget: React.FC<DonationWidgetProps> = ({
  causes = defaultCauses,
  presetAmounts = defaultPresets,
  currencySymbol = "₹",
  onDonate,
  className,
}) => {
  const [selectedCauseId, setSelectedCauseId] = useState(causes[0]?.id || "");
  const [frequency, setFrequency] = useState<"one-time" | "monthly" | "annual">("monthly");
  const [selectedTier, setSelectedTier] = useState<number | "custom">(presetAmounts[1]);
  const [customAmountStr, setCustomAmountStr] = useState("");
  const [step, setStep] = useState(1); // 1: Cause & Amount, 2: Checkout details, 3: Success
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Checkout inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  // Calculate active donation value
  const activeAmount = useMemo(() => {
    if (selectedTier === "custom") {
      return Math.max(0, parseInt(customAmountStr, 10) || 0);
    }
    return selectedTier;
  }, [selectedTier, customAmountStr]);

  const activeCause = useMemo(() => {
    return causes.find((c) => c.id === selectedCauseId) || causes[0];
  }, [causes, selectedCauseId]);

  // Formatted currency preview
  const formattedAmount = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    })
      .format(activeAmount)
      .replace("INR", currencySymbol);
  }, [activeAmount, currencySymbol]);

  // Handle donation submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAmount <= 0) {
      setErrorMessage("Please enter a valid donation value.");
      return;
    }
    if (!name || !email || !cardNumber) {
      setErrorMessage("Please complete all billing fields.");
      return;
    }

    setErrorMessage("");
    setStatus("loading");

    try {
      if (onDonate) {
        await onDonate({ amount: activeAmount, causeId: selectedCauseId, frequency });
      } else {
        // Simulate payment gateway delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setStatus("success");
      setStep(3);
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Payment processing failed. Please try again.";
      setErrorMessage(msg);
    }
  };

  const handleNextStep = () => {
    if (activeAmount <= 0) return;
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
    setStatus("idle");
  };

  const handleReset = () => {
    setStep(1);
    setStatus("idle");
    setSelectedTier(presetAmounts[1]);
    setCustomAmountStr("");
    setName("");
    setEmail("");
    setCardNumber("");
  };

  // Progress Bar percentage
  const goalProgress = useMemo(() => {
    if (!activeCause || !activeCause.goal || !activeCause.raised) return 0;
    return Math.min(100, (activeCause.raised / activeCause.goal) * 100);
  }, [activeCause]);

  return (
    <div
      className={cn(
        "w-full max-w-lg mx-auto bg-cream border border-forest/15 rounded-[36px] p-6 sm:p-8 flex flex-col gap-6 shadow-xs select-none relative overflow-hidden",
        className
      )}
    >
      {/* Decorative Gradient Top border */}
      <span className="absolute top-0 left-0 right-0 h-[4px] bg-linear-to-r from-[#BF953F] via-[#F7DF7C] to-[#B38728] z-10" />

      {/* Screen Readers polite state announcer */}
      <div className="sr-only" aria-live="polite">
        {status === "loading" && "Processing your contribution details..."}
        {status === "success" && `Thank you! Your donation of ${formattedAmount} was successful.`}
        {errorMessage && `Error: ${errorMessage}`}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Select Cause, Frequency & Amount */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-forest fill-forest/10" />
              <h2 className="text-xl font-heading font-bold text-charcoal">
                Support our Programs
              </h2>
            </div>

            {/* Cause selection */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-charcoal/50 font-body uppercase">
                1. Choose a Cause
              </label>
              <div className="flex flex-col gap-2">
                {causes.map((cause) => (
                  <button
                    key={cause.id}
                    type="button"
                    onClick={() => setSelectedCauseId(cause.id)}
                    className={cn(
                      "p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all duration-200 cursor-pointer focus:outline-hidden",
                      selectedCauseId === cause.id
                        ? "bg-forest/5 border-forest shadow-xs"
                        : "bg-transparent border-forest/10 hover:border-forest/35"
                    )}
                  >
                    <span className="font-heading font-semibold text-sm text-charcoal">
                      {cause.name}
                    </span>
                    <span className="text-xs text-charcoal/60 leading-relaxed font-body">
                      {cause.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Selector Toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-charcoal/50 font-body uppercase">
                2. Donation Frequency
              </label>
              <div className="grid grid-cols-3 gap-2 bg-forest/5 p-1 rounded-full border border-forest/10">
                {(["one-time", "monthly", "annual"] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setFrequency(freq)}
                    className={cn(
                      "py-2 rounded-full text-xs font-semibold font-heading transition-all duration-250 capitalize cursor-pointer focus:outline-hidden",
                      frequency === freq ? "bg-forest text-cream shadow-sm" : "text-charcoal/60 hover:text-forest"
                    )}
                  >
                    {freq === "one-time" ? "One-time" : freq === "monthly" ? "Monthly" : "Annual"}
                  </button>
                ))}
              </div>
            </div>

            {/* Preset Amount buttons + Custom */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-charcoal/50 font-body uppercase">
                3. Amount
              </label>
              <div className="grid grid-cols-4 gap-2">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedTier(amt);
                      setCustomAmountStr("");
                    }}
                    className={cn(
                      "py-3 rounded-xl border text-center font-bold font-heading text-sm transition-all duration-200 cursor-pointer focus:outline-hidden",
                      selectedTier === amt
                        ? "bg-forest border-forest text-cream shadow-sm"
                        : "bg-transparent border-forest/10 hover:border-forest/30 text-charcoal"
                    )}
                  >
                    {currencySymbol}
                    {amt}
                  </button>
                ))}
              </div>

              {/* Custom input tier trigger */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTier("custom")}
                  className={cn(
                    "w-full py-2.5 rounded-xl border text-center font-bold font-heading text-xs transition-all duration-200 cursor-pointer focus:outline-hidden",
                    selectedTier === "custom"
                      ? "bg-forest border-forest text-cream shadow-sm"
                      : "bg-transparent border-forest/10 hover:border-forest/30 text-charcoal"
                  )}
                >
                  Custom Amount
                </button>
                {selectedTier === "custom" && (
                  <div className="relative mt-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold font-heading text-charcoal/40 text-sm">
                      {currencySymbol}
                    </span>
                    <input
                      type="number"
                      placeholder="Enter value"
                      value={customAmountStr}
                      min={1}
                      onChange={(e) => setCustomAmountStr(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 bg-transparent border border-forest/20 rounded-xl font-heading text-sm text-charcoal placeholder-charcoal/30 focus:outline-hidden focus:ring-2 focus:ring-forest/30"
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Real-time Impact preview card */}
            {activeAmount > 0 && activeCause && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-mint/20 border border-forest/10 flex flex-col gap-1"
              >
                <span className="text-[10px] font-bold text-forest tracking-wider uppercase font-body">
                  Your Impact
                </span>
                <p className="text-xs sm:text-sm font-semibold text-charcoal leading-relaxed font-body">
                  {activeCause.impactFormula(activeAmount)}
                </p>
              </motion.div>
            )}

            {/* Campaign goal progress tracker */}
            {activeCause && activeCause.goal && activeCause.raised && (
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex justify-between text-[10px] font-semibold text-charcoal/50 font-body uppercase">
                  <span>Goal Meter</span>
                  <span>
                    {currencySymbol}
                    {activeCause.raised.toLocaleString()} / {currencySymbol}
                    {activeCause.goal.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-charcoal/5 rounded-full overflow-hidden">
                  <div style={{ width: `${goalProgress}%` }} className="h-full bg-forest rounded-full" />
                </div>
              </div>
            )}

            {/* Next Step trigger */}
            <AnimatedButton
              label={`Review Donation - ${formattedAmount}`}
              variant="secondary"
              icon={<ChevronRight className="w-4 h-4" />}
              disabled={activeAmount <= 0}
              onClick={handleNextStep}
              className="mt-2"
            />
          </motion.div>
        )}

        {/* STEP 2: Checkout / Payment Details */}
        {step === 2 && (
          <motion.form
            key="step2"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevStep}
                aria-label="Back to cause selector"
                className="p-1 rounded-full hover:bg-charcoal/5 transition-colors cursor-pointer focus:outline-hidden"
              >
                <ArrowLeft className="w-5 h-5 text-charcoal/60" />
              </button>
              <h2 className="text-xl font-heading font-bold text-charcoal">
                Payment Details
              </h2>
            </div>

            {/* Error notifications */}
            {errorMessage && (
              <div className="p-3 bg-red-100/50 border border-red-200 text-red-700 text-xs rounded-xl font-body">
                {errorMessage}
              </div>
            )}

            {/* Billing fields */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name-input" className="text-xs font-bold text-charcoal/50 font-body uppercase">
                  Donor Full Name
                </label>
                <input
                  id="name-input"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-transparent border border-forest/15 rounded-xl font-body text-sm text-charcoal focus:outline-hidden focus:ring-2 focus:ring-forest/30"
                  required
                  disabled={status === "loading"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email-input" className="text-xs font-bold text-charcoal/50 font-body uppercase">
                  Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-transparent border border-forest/15 rounded-xl font-body text-sm text-charcoal focus:outline-hidden focus:ring-2 focus:ring-forest/30"
                  required
                  disabled={status === "loading"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="card-input" className="text-xs font-bold text-charcoal/50 font-body uppercase">
                  Card Details (Mock checkout)
                </label>
                <input
                  id="card-input"
                  type="text"
                  placeholder="4111 2222 3333 4444"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  className="w-full px-4 py-2.5 bg-transparent border border-forest/15 rounded-xl font-body text-sm text-charcoal focus:outline-hidden focus:ring-2 focus:ring-forest/30"
                  required
                  disabled={status === "loading"}
                />
              </div>
            </div>

            {/* Total checkout amount visual */}
            <div className="flex justify-between items-center py-3 border-t border-b border-forest/10 font-heading my-1">
              <span className="font-semibold text-charcoal/60 text-sm">
                Checkout Sum ({frequency === "one-time" ? "One-Time" : frequency === "monthly" ? "Monthly" : "Annual"})
              </span>
              <span className="font-bold text-lg text-forest">
                {formattedAmount}
              </span>
            </div>

            {/* SSL Badge footer */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-charcoal/40 font-medium font-body select-none">
              <ShieldCheck className="w-4 h-4 text-forest" />
              <span>Secure 256-bit encrypted simulated checkout gateway</span>
            </div>

            <AnimatedButton
              type="submit"
              label={`Donate Now`}
              variant="secondary"
              loading={status === "loading"}
              disabled={status === "loading" || activeAmount <= 0}
              className="w-full"
            />
          </motion.form>
        )}

        {/* STEP 3: Complete confirmation */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-8 gap-4"
          >
            <div className="p-4 rounded-full bg-forest/10 text-forest mb-2">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            <h2 className="text-2xl font-heading font-extrabold text-charcoal">
              Thank You, {name.split(" ")[0]}!
            </h2>
            
            <p className="text-sm text-charcoal/65 font-body leading-relaxed max-w-sm">
              Your mock donation of <strong>{formattedAmount}</strong> to <strong>{activeCause.name}</strong> was successful.
            </p>

            {/* Simulated impact receipt */}
            <div className="p-4 rounded-2xl bg-mint/20 border border-forest/10 text-xs font-semibold leading-relaxed text-charcoal font-body max-w-xs my-2">
              Impact statement: {activeCause.impactFormula(activeAmount)}
            </div>

            <AnimatedButton
              label="Contribute Again"
              variant="outline"
              onClick={handleReset}
              className="mt-2"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationWidget;
