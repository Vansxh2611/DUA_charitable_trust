"use client";

import React, { useState } from "react";
import { ContactFormProps } from "@/types";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Input, TextArea } from "../ui/Input";
import { Button } from "../ui/Button";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/constants/data";

export const ContactForm: React.FC<ContactFormProps> = ({
  title,
  subtitle,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section className="py-20 bg-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <SectionHeading
                title={title}
                subtitle={subtitle}
                badge="Get In Touch"
                className="mb-8!"
              />
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-forest/10 text-forest shrink-0 mt-0.5">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal font-heading mb-1">Email Address</h4>
                    <a href={`mailto:${siteConfig.email}`} className="text-sm text-charcoal/70 hover:text-forest transition-colors font-body">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-forest/10 text-forest shrink-0 mt-0.5">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal font-heading mb-1">Phone Number</h4>
                    <a href={`tel:${siteConfig.phone}`} className="text-sm text-charcoal/70 hover:text-forest transition-colors font-body">
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-forest/10 text-forest shrink-0 mt-0.5">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-charcoal font-heading mb-1">Headquarters</h4>
                    <p className="text-sm text-charcoal/70 font-body">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-cream border border-forest/15 rounded-[32px] p-6 sm:p-10 shadow-xs hover:border-forest/25 transition-all">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <CheckCircle2 size={48} className="text-forest mb-4" />
                <h3 className="text-2xl font-bold text-charcoal font-heading mb-2">Message Sent!</h3>
                <p className="text-sm sm:text-base text-charcoal/60 font-body max-w-sm">
                  Thank you for reaching out. A collective member will contact you within 24-48 hours.
                </p>
                <Button
                  label="Send Another Message"
                  variant="outline"
                  onClick={() => setStatus("idle")}
                  className="mt-6"
                />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    name="name"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <Input
                  label="Subject"
                  name="subject"
                  placeholder="How would you like to cooperate?"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === "loading"}
                />
                <TextArea
                  label="Your Message"
                  name="message"
                  placeholder="Tell us about your farm, volunteer interests, or questions..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === "loading"}
                />
                <Button
                  type="submit"
                  label="Send Message"
                  variant="primary"
                  loading={status === "loading"}
                  icon={<Send size={14} />}
                  iconPosition="right"
                  className="w-full sm:w-fit px-8 py-3.5!"
                />
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
