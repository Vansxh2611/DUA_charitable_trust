"use client";

import React, { useState } from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";
import { Container } from "@/components/ui/Container";
import { FAQData } from "@/constants/data";
import { Clock, Building, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";

const OfficeHoursAndDepartments = () => {
  const departments = [
    { name: "Volunteering & Programs", email: "volunteer@duatrust.org" },
    { name: "CSR & Corporate Partnerships", email: "partnerships@duatrust.org" },
    { name: "Media & Press Inquiries", email: "media@duatrust.org" }
  ];

  return (
    <section className="py-12 bg-sage">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Office Hours */}
          <div className="bg-card-bg border border-card-border rounded-lg p-8 text-left flex flex-col gap-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-card-border pb-4">
              <div className="p-3 rounded-md bg-forest/5 text-forest shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal font-heading">Office Hours</h3>
                <p className="text-xs text-charcoal/50 font-body mt-0.5">When you can reach us live</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm sm:text-base text-charcoal/80 font-body">
              <div className="flex justify-between">
                <span className="font-semibold">Monday - Friday:</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Saturday:</span>
                <span>10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between text-charcoal/40">
                <span className="font-semibold">Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="bg-card-bg border border-card-border rounded-lg p-8 text-left flex flex-col gap-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-card-border pb-4">
              <div className="p-3 rounded-md bg-forest/5 text-forest shrink-0">
                <Building size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal font-heading">Departments</h3>
                <p className="text-xs text-charcoal/50 font-body mt-0.5">Direct routes for partnerships</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {departments.map((dept, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm font-body border-b border-charcoal/5 pb-2 last:border-b-0 last:pb-0">
                  <span className="font-bold text-charcoal">{dept.name}</span>
                  <a href={`mailto:${dept.email}`} className="text-forest hover:text-forest-dark font-semibold">
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const HubMap = () => (
  <section className="py-12 bg-cream">
    <Container size="xl">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
          Our Regional Hub Locations
        </h2>
        <p className="text-base text-charcoal/70 font-body">
          We operate across 50 active regional hubs to deliver structured science, arts, and well-being programs.
        </p>
      </div>

      <div className="bg-card-bg border border-card-border rounded-lg p-6 max-w-4xl mx-auto relative overflow-hidden flex items-center justify-center min-h-[350px] shadow-sm">
        {/* Stylized custom SVG map representation */}
        <svg className="w-full max-w-[650px] aspect-[16/9] text-forest/10" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Abstract land shapes */}
          <path d="M150 100 Q 300 80, 450 130 T 700 200 Q 750 350, 500 380 T 200 320 Z" fill="currentColor" opacity="0.4" />
          <path d="M500 50 Q 600 40, 720 90 T 780 200 Q 700 280, 600 220 Z" fill="currentColor" opacity="0.2" />
          
          {/* Connection Lines */}
          <line x1="280" y1="160" x2="420" y2="220" stroke="#C89B52" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="420" y1="220" x2="590" y2="180" stroke="#C89B52" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="420" y1="220" x2="350" y2="300" stroke="#C89B52" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="350" y1="300" x2="520" y2="320" stroke="#C89B52" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Active Hub Dots (Pulsing style) */}
          <circle cx="280" cy="160" r="8" fill="#566246" />
          <circle cx="280" cy="160" r="16" stroke="#566246" strokeWidth="1.5" opacity="0.3" className="animate-ping" />
          <text x="280" y="140" fill="currentColor" className="text-charcoal font-bold font-body" fontSize="11" fontWeight="bold" textAnchor="middle">North Hub</text>

          <circle cx="420" cy="220" r="10" fill="#C89B52" />
          <circle cx="420" cy="220" r="20" stroke="#C89B52" strokeWidth="1.5" opacity="0.3" />
          <text x="420" y="195" fill="currentColor" className="text-charcoal font-bold font-body" fontSize="12" fontWeight="bold" textAnchor="middle">Central HQ</text>

          <circle cx="590" cy="180" r="8" fill="#566246" />
          <circle cx="590" cy="180" r="16" stroke="#566246" strokeWidth="1.5" opacity="0.3" />
          <text x="590" y="160" fill="currentColor" className="text-charcoal font-bold font-body" fontSize="11" fontWeight="bold" textAnchor="middle">East Hub</text>

          <circle cx="350" cy="300" r="8" fill="#566246" />
          <circle cx="350" cy="300" r="16" stroke="#566246" strokeWidth="1.5" opacity="0.3" />
          <text x="350" y="325" fill="currentColor" className="text-charcoal font-bold font-body" fontSize="11" fontWeight="bold" textAnchor="middle">West Hub</text>

          <circle cx="520" cy="320" r="8" fill="#566246" />
          <circle cx="520" cy="320" r="16" stroke="#566246" strokeWidth="1.5" opacity="0.3" />
          <text x="520" y="345" fill="currentColor" className="text-charcoal font-bold font-body" fontSize="11" fontWeight="bold" textAnchor="middle">South Hub</text>
        </svg>
      </div>
    </Container>
  </section>
);

const VolunteerForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "stem",
    skill: "mentorship",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-12 bg-sage">
      <Container size="xl">
        <div className="bg-card-bg border border-card-border rounded-lg p-8 sm:p-12 shadow-sm max-w-3xl mx-auto text-left">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-charcoal font-heading leading-tight mb-2">
              Share Your Skills
            </h3>
            <p className="text-sm text-charcoal/70 font-body">
              Register as a volunteer, mentor, or domain expert to support our hub network.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in">
              <CheckCircle size={48} className="text-forest mb-4" />
              <h4 className="text-xl font-bold text-charcoal font-heading mb-2">Application Received!</h4>
              <p className="text-sm text-charcoal/60 font-body max-w-sm">
                Thank you for applying. Our Volunteer Coordinator will contact you to align your skills with active cohorts.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-body text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="vol-name" className="font-bold text-charcoal">Full Name</label>
                  <input
                    id="vol-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="bg-cream border border-[#DDD5C8]/80 text-charcoal rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="vol-email" className="font-bold text-charcoal">Email Address</label>
                  <input
                    id="vol-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="bg-cream border border-[#DDD5C8]/80 text-charcoal rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="vol-domain" className="font-bold text-charcoal">Preferred Domain</label>
                  <select
                    id="vol-domain"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="bg-cream border border-[#DDD5C8]/80 text-charcoal rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest font-semibold"
                  >
                    <option value="stem">STEM & Innovation</option>
                    <option value="arts">Arts & Creativity</option>
                    <option value="environment">Environment & Nature</option>
                    <option value="wellbeing">Holistic Well-being</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="vol-skill" className="font-bold text-charcoal">Contribution Type</label>
                  <select
                    id="vol-skill"
                    value={formData.skill}
                    onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                    className="bg-cream border border-[#DDD5C8]/80 text-charcoal rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest font-semibold"
                  >
                    <option value="mentorship">Mentorship & Teaching</option>
                    <option value="coordination">Local Hub Coordination</option>
                    <option value="materials">Material / Book Donation</option>
                    <option value="digital">Digital Curriculum Help</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="vol-message" className="font-bold text-charcoal">Introduce Yourself (Optional)</label>
                <textarea
                  id="vol-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a brief about your experience or motivation..."
                  className="bg-cream border border-[#DDD5C8]/80 text-charcoal rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              <button
                type="submit"
                className="bg-charcoal text-cream hover:bg-forest hover:text-cream px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest self-start cursor-pointer"
              >
                Register Interest
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
};

export default function Contact(): React.ReactNode {
  return (
    <div className="pt-24 sm:pt-28 bg-cream min-h-screen pb-20">
      <section className="py-16 sm:py-20 text-center">
        <Container>
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-body">
              Whether you want to coordinate farm grants, register for volunteer digs, or request seed packages, send us
              a message.
            </p>
          </div>
        </Container>
      </section>

      {/* 1. Header (cream) -> ContactForm (cream) */}
      <SectionDivider variant="minimal" color="forest/10" bgColor="cream" height={50} />

      <ContactForm
        title="We would love to hear from you"
        subtitle="Please fill out the form below or use our email/phone channels to speak directly with an organizer."
      />

      {/* 2. ContactForm (cream) -> OfficeHoursAndDepartments (sage) */}
      <SectionDivider variant="curve" color="sage" bgColor="cream" height={90} />

      <OfficeHoursAndDepartments />

      {/* 3. OfficeHoursAndDepartments (sage) -> HubMap (cream) */}
      <SectionDivider variant="diagonal" color="cream" bgColor="sage" height={90} />

      <HubMap />

      {/* 4. HubMap (cream) -> VolunteerForm (sage) */}
      <SectionDivider variant="wave" color="sage" bgColor="cream" height={100} />

      <VolunteerForm />

      {/* 5. VolunteerForm (sage) -> FAQ (cream) */}
      <SectionDivider variant="blob" color="cream" bgColor="sage" height={95} />

      <FAQ
        title="Inquiries FAQ"
        subtitle="Quick answers concerning response timelines, school programs, and regional boundaries."
        faqs={FAQData}
      />
      
      {/* 6. FAQ (cream) -> Footer (footer-bg) */}
      <SectionDivider variant="layered" color="footer-bg" bgColor="cream" height={110} />
    </div>
  );
}
