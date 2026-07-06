"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/ui/BlogCard";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { blogData } from "@/constants/data";
import { Search, Calendar, MapPin, CheckCircle } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Blog(): React.ReactNode {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const handleRegisterEvent = (eventId: string) => {
    if (registeredEvents.includes(eventId)) return;
    setRegisteredEvents([...registeredEvents, eventId]);
  };

  const categories = ["all", "education", "community", "impact"];

  const filteredPosts = blogData.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || post.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const events = [
    { id: "e1", title: "Creative Art & Mitosis Coding Fest", date: "July 24, 2026", time: "10:00 AM - 2:00 PM", location: "Seattle Community Hub", type: "upcoming" },
    { id: "e2", title: "Reforestation Seed Sowing Campaign", date: "August 12, 2026", time: "8:00 AM - 12:00 PM", location: "Green Roots Farm Valley", type: "upcoming" },
    { id: "e3", title: "Holistic Well-being Checkup Webinar", date: "June 15, 2026", time: "Zoom Online Conference", location: "Online", type: "past" },
    { id: "e4", title: "Local Senior Mentors Meetup", date: "May 08, 2026", time: "Oakridge Primary Library", location: "Oakridge Center", type: "past" }
  ];

  const upcomingEvents = events.filter((e) => e.type === "upcoming");
  const pastEvents = events.filter((e) => e.type === "past");

  return (
    <div className="pt-24 sm:pt-28 bg-cream min-h-screen pb-20 animate-fade-in">
      {/* Header Section */}
      <section className="py-16 sm:py-20 border-b border-forest/5 text-center relative overflow-hidden">
        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1b221e_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
              Our Community Blog
            </h1>
            <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-body">
              Stories of impact, educational insights, and updates from the Dua Charitable Trust. Join us in making education a joyful adventure for all.
            </p>
          </div>
        </Container>
      </section>

      {/* 1. Header (cream) -> Search & Grid (sage) */}
      <SectionDivider variant="curve" color="sage" bgColor="cream" height={90} />

      {/* Search and Filters Section */}
      <section className="py-12 bg-sage">
        <Container>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card-bg text-charcoal placeholder-charcoal/40 rounded-full px-6 py-2.5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-forest border border-card-border shadow-xs"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold font-heading transition-all duration-200 capitalize cursor-pointer focus:outline-none ${
                    activeCategory === cat
                      ? "bg-charcoal text-cream shadow-xs"
                      : "bg-card-bg border border-card-border text-charcoal hover:bg-sage/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Container>

        {/* Blog Cards Grid Section */}
        <Container className="mt-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card-bg border border-card-border rounded-lg max-w-xl mx-auto">
              <p className="text-sm sm:text-base text-charcoal/50 font-body">
                No articles matched your search query. Try another term!
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* 2. Search & Grid (sage) -> Events (cream) */}
      <SectionDivider variant="diagonal" color="cream" bgColor="sage" height={90} />

      {/* Events Section */}
      <section className="py-12 bg-cream">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-charcoal font-heading leading-tight mb-4">
              Community Events & Workshops
            </h2>
            <p className="text-base text-charcoal/70 font-body">
              Join us live in our workshops and hubs. RSVP to secure a place or explore past activities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Upcoming Events */}
            <div className="flex flex-col gap-6 text-left">
              <h3 className="text-xl font-bold text-charcoal border-b border-card-border pb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-forest shrink-0" />
                Upcoming Events
              </h3>
              <div className="flex flex-col gap-4">
                {upcomingEvents.map((evt) => {
                  const isRegistered = registeredEvents.includes(evt.id);
                  return (
                    <div key={evt.id} className="bg-card-bg border border-card-border rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
                      <div>
                        <h4 className="text-base font-bold text-charcoal font-heading mb-2">{evt.title}</h4>
                        <div className="flex flex-col gap-1 text-xs text-charcoal/65 font-body">
                          <span className="flex items-center gap-1.5"><Calendar size={14} /> {evt.date} • {evt.time}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={14} /> {evt.location}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRegisterEvent(evt.id)}
                        className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm focus:outline-none cursor-pointer ${
                          isRegistered
                            ? "bg-forest/10 text-forest border border-forest/20"
                            : "bg-[#0a142f] text-white hover:bg-forest"
                        }`}
                      >
                        {isRegistered ? "✓ RSVP Registered" : "RSVP Now"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Past Events */}
            <div className="flex flex-col gap-6 text-left">
              <h3 className="text-xl font-bold text-charcoal/50 border-b border-card-border pb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-charcoal/30 shrink-0" />
                Past Events
              </h3>
              <div className="flex flex-col gap-4">
                {pastEvents.map((evt) => (
                  <div key={evt.id} className="bg-card-bg/60 border border-card-border/80 rounded-lg p-6 opacity-85">
                    <h4 className="text-base font-bold text-charcoal/70 font-heading mb-2">{evt.title}</h4>
                    <div className="flex flex-col gap-1 text-xs text-charcoal/50 font-body">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {evt.date}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {evt.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Events (cream) -> Newsletter (cream) */}
      <SectionDivider variant="minimal" color="forest/10" bgColor="cream" height={50} />

      {/* Stay Inspired Newsletter Section */}
      <Container className="mt-16">
        <section
          className="relative bg-footer-bg text-white rounded-[32px] p-8 sm:p-12 overflow-hidden shadow-xs border border-card-border"
          aria-labelledby="newsletter-title"
        >
          {/* Reusable Doodle Pattern */}
          <BackgroundPattern variant="doodle" opacity={0.04} className="text-white" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Newsletter Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <h2 id="newsletter-title" className="text-4xl sm:text-5xl font-black tracking-tight font-heading leading-tight mb-4 text-white!">
                Stay Inspired
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed font-body">
                Subscribe to our newsletter for the latest stories of joyful wisdom and updates on our community initiatives.
              </p>
            </div>

            {/* Newsletter Input/Form */}
            <div className="lg:col-span-5 w-full">
              {subscribed ? (
                <div className="bg-white/80 rounded-full px-6 py-4 text-center font-bold text-charcoal animate-fade-in text-sm border border-forest/10">
                  ✓ Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
                  <div className="flex-grow">
                    <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
                    <input
                      id="newsletter-email"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-accent text-charcoal hover:bg-accent-dark px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest shrink-0 cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </Container>
      {/* 4. Newsletter (cream) -> Footer (footer-bg) */}
      <SectionDivider variant="layered" color="footer-bg" bgColor="cream" height={110} />
    </div>
  );
}
