import React from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";
import { Container } from "@/components/ui/Container";
import { FAQData } from "@/constants/data";

export default function Contact(): React.ReactNode {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="py-16 sm:py-20 gradient-bg border-b border-forest/10 text-center">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-charcoal font-heading leading-tight mb-4">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-body">
              Whether you want to coordinate farm grants, register for volunteer digs, or request seed packages, send us
              a message.
            </p>
          </div>
        </Container>
      </section>

      <ContactForm
        title="We would love to hear from you"
        subtitle="Please fill out the form below or use our email/phone channels to speak directly with an organizer."
      />

      <FAQ
        title="Inquiries FAQ"
        subtitle="Quick answers concerning response timelines, school programs, and regional boundaries."
        faqs={FAQData}
      />
    </div>
  );
}
