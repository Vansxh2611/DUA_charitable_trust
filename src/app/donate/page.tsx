"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Gift, MessageSquare, Laptop, Flower, Sparkles } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Donate(): React.ReactNode {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!name || !email || !notes) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="pt-24 sm:pt-28 bg-cream min-h-screen pb-20 animate-fade-in">
      <section className="py-16 sm:py-20 text-center">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
              Get Involved & Support
            </h1>
            <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-body">
              Make a difference by offering resources, items, or skills. Describe what you would like to contribute, and our coordination team will contact you directly to organize the details.
            </p>
          </div>
        </Container>
      </section>

      {/* 1. Header (cream) -> Ways/Form (sage) */}
      <SectionDivider variant="curve" color="sage" bgColor="cream" height={90} />

      <section className="py-12 bg-sage">
        <Container>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Information on What to Contribute */}
          <div className="md:col-span-6 bg-card-bg border border-card-border rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 shadow-xs text-left">
            <h2 className="text-xl font-bold font-heading text-charcoal flex items-center gap-2 mb-2">
              <Gift size={20} className="text-forest" />
              Ways to Contribute
            </h2>
            <p className="text-sm text-charcoal/80 font-body leading-relaxed">
              We welcome contributions of any size or type. Since we do not process financial transactions online, you can share whatever resources or materials you have available.
            </p>

            <div className="flex flex-col gap-5 mt-2">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-forest/10 text-forest shrink-0 mt-0.5">
                  <Laptop size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal font-heading mb-0.5">Technology & Screens</h4>
                  <p className="text-xs text-charcoal/70 font-body leading-relaxed">
                    Refurbished laptops, learning tablets, screens, chargers, or computing components for our local learning labs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-forest/10 text-forest shrink-0 mt-0.5">
                  <Flower size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal font-heading mb-0.5">Agricultural & Gardening Supplies</h4>
                  <p className="text-xs text-charcoal/70 font-body leading-relaxed">
                    Organic seeds, soil nutrients, planters, trowels, garden stakes, or composting tool kits for school gardens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-forest/10 text-forest shrink-0 mt-0.5">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal font-heading mb-0.5">Educational & Art Kits</h4>
                  <p className="text-xs text-charcoal/70 font-body leading-relaxed">
                    Drawing paper, painting supplies, sketchbooks, scientific models, STEM boards, and storytelling textbooks.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-forest/5 border border-card-border text-xs text-charcoal/75 font-body leading-relaxed">
              <strong>Have another idea?</strong> Simply write it in the notes field. Whether it is mentorship hours, transport help, or regional coordination support, we appreciate your help!
            </div>
          </div>

          {/* Right Panel: Contribution Details Submission Form */}
          <div className="md:col-span-6 bg-card-bg border border-card-border rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 shadow-xs text-left">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <CheckCircle2 size={48} className="text-forest mb-4" />
                <h3 className="text-2xl font-bold text-charcoal font-heading mb-2">Details Submitted!</h3>
                <p className="text-sm text-charcoal/60 font-body leading-relaxed max-w-xs">
                  Thank you, <strong>{name}</strong>! Your contribution details have been received. Our community coordination team will reach out to you at <strong>{email}</strong> shortly to organize and coordinate.
                </p>
                <Button label="Submit Another Contribution" variant="outline" onClick={() => setStatus("idle")} className="mt-6" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold font-heading text-charcoal border-b border-card-border pb-3 flex items-center gap-2">
                  <MessageSquare size={18} className="text-forest" />
                  Your Contribution Details
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
                
                {/* Designated Cause dropdown */}
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="donation-cause" className="text-sm font-bold text-charcoal font-heading">
                    Designated Program Cause
                  </label>
                  <select
                    id="donation-cause"
                    className="w-full bg-card-bg border border-card-border rounded-2xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest font-semibold"
                  >
                    <option value="general">General Program Support (Where needed most)</option>
                    <option value="stem">STEM & Innovation (Curiosity Labs)</option>
                    <option value="arts">Arts & Creativity (Canvas of Hope)</option>
                    <option value="environment">Environment & Nature (Green Roots)</option>
                    <option value="wellbeing">Holistic Well-being (Wellness Circles)</option>
                  </select>
                </div>

                {/* notes Textarea */}
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="donation-notes" className="text-sm font-bold text-charcoal font-heading">
                    Describe What You Wish to Contribute
                  </label>
                  <textarea
                    id="donation-notes"
                    placeholder="Describe the items, materials, laptops, tools, seeds, or hours you want to provide. Please include quantities or condition if applicable."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full min-h-[120px] bg-card-bg border border-card-border rounded-2xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest font-semibold font-body"
                    disabled={status === "loading"}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  label="Submit Contribution Details"
                  variant="secondary"
                  loading={status === "loading"}
                  className="w-full py-4! text-base font-bold shadow-xs mt-2"
                />
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>

      {/* 2. Ways/Form (sage) -> Impact Levels (cream) */}
      <SectionDivider variant="diagonal" color="cream" bgColor="sage" height={90} />

      {/* Re-aligned Support Impact Levels (No dollar values) */}
      <section className="py-12 bg-cream">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
              Your Contribution Impact
            </h2>
            <p className="text-base text-charcoal/70 font-body">
              How your material resources and skills enrich students, local hubs, and community programs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-card-bg border border-card-border rounded-lg p-6 text-left flex flex-col justify-between shadow-xs animate-fade-in">
              <div>
                <span className="text-xs font-bold font-heading text-forest uppercase tracking-wider block">Art Supplies</span>
                <h4 className="text-base font-bold text-charcoal font-heading mt-3 mb-2">Student Art Kits</h4>
                <p className="text-sm text-charcoal/70 leading-relaxed font-body">
                  Pencils, brushes, palettes, and sketchbooks help children express trauma and build mental resilience.
                </p>
              </div>
            </div>

            <div className="bg-card-bg border border-card-border rounded-lg p-6 text-left flex flex-col justify-between shadow-xs animate-fade-in">
              <div>
                <span className="text-xs font-bold font-heading text-forest uppercase tracking-wider block">STEM Gear</span>
                <h4 className="text-base font-bold text-charcoal font-heading mt-3 mb-2">Science Experiments</h4>
                <p className="text-sm text-charcoal/70 leading-relaxed font-body">
                  Prototyping boards, wiring controllers, and test tools equip mobile science labs for rural schools.
                </p>
              </div>
            </div>

            <div className="bg-card-bg border border-card-border rounded-lg p-6 text-left flex flex-col justify-between shadow-xs animate-fade-in">
              <div>
                <span className="text-xs font-bold font-heading text-forest uppercase tracking-wider block">Garden Seeds</span>
                <h4 className="text-base font-bold text-charcoal font-heading mt-3 mb-2">Organic Farm Beds</h4>
                <p className="text-sm text-charcoal/70 leading-relaxed font-body">
                  Pledges of native seeds, organic soil, compost kits, and trowels help students create green spaces.
                </p>
              </div>
            </div>

            <div className="bg-card-bg border border-card-border rounded-lg p-6 text-left flex flex-col justify-between shadow-xs animate-fade-in">
              <div>
                <span className="text-xs font-bold font-heading text-forest uppercase tracking-wider block">Active Hours</span>
                <h4 className="text-base font-bold text-charcoal font-heading mt-3 mb-2">Hub Mentorship</h4>
                <p className="text-sm text-charcoal/70 leading-relaxed font-body">
                  Retired educators donate their teaching details and hours to mentor primary rural students.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Impact Levels (cream) -> FAQ (sage) */}
      <SectionDivider variant="wave" color="sage" bgColor="cream" height={90} />

      {/* Donation FAQs */}
      <section className="py-12 bg-sage">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
              Contribution FAQ
            </h2>
            <p className="text-base text-charcoal/70 font-body">
              Frequently asked questions regarding collections, shipping, transparency, and coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-charcoal font-heading text-base">Is there a paid checkout on this site?</h4>
              <p className="text-sm text-charcoal/70 font-body leading-relaxed">
                No. All paid checkouts, dollar amounts, and banking gateway forms have been removed. We operate purely on material resource, skill, and coordinative offers submitted through contact.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-charcoal font-heading text-base">Who processes my contribution details?</h4>
              <p className="text-sm text-charcoal/70 font-body leading-relaxed">
                Our local Trust Coordinators check your description notes and email you directly to organize item drop-offs, shipping arrangements, or coordination details.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-charcoal font-heading text-base">What items do you accept most?</h4>
              <p className="text-sm text-charcoal/70 font-body leading-relaxed">
                We have high demand for laptops (refurbished or new), drawing kits, soil amendments, seed packets, and elementary reading textbooks.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-charcoal font-heading text-base">Can I offer tutoring or mentorship hours?</h4>
              <p className="text-sm text-charcoal/70 font-body leading-relaxed">
                Yes, absolutely! Let us know how many hours or subjects you would like to volunteer in the description field, and we will pair you with a local hub.
              </p>
            </div>
          </div>
        </Container>
      </section>
      
      {/* 4. FAQ (sage) -> Footer (footer-bg) */}
      <SectionDivider variant="layered" color="footer-bg" bgColor="sage" height={110} />
    </div>
  );
}
