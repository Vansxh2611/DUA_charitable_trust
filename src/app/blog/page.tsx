"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/ui/BlogCard";
import { BackgroundPattern } from "@/components/ui/BackgroundPattern";
import { blogData } from "@/constants/data";

export default function Blog(): React.ReactNode {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

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

      {/* Blog Cards Grid Section */}
      <Container className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button
            className="px-6 py-2.5 rounded-full border border-card-border text-charcoal font-heading font-bold text-sm bg-card-bg hover:bg-charcoal hover:text-cream transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            aria-label="Load more articles"
          >
            Load More Articles
          </button>
        </div>
      </Container>

      {/* Stay Inspired Newsletter Section */}
      <Container className="mt-20">
        <section
          className="relative bg-accent rounded-[32px] p-8 sm:p-12 overflow-hidden shadow-xs border border-charcoal/5"
          aria-labelledby="newsletter-title"
        >
          {/* Reusable Doodle Pattern */}
          <BackgroundPattern variant="doodle" opacity={0.15} className="text-charcoal" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Newsletter Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <h2 id="newsletter-title" className="text-3xl font-extrabold text-charcoal-static font-heading mb-3">
                Stay Inspired
              </h2>
              <p className="text-sm sm:text-base text-charcoal-static/80 leading-relaxed font-body">
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
                      className="w-full bg-white text-charcoal placeholder-charcoal/40 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest border-none shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-charcoal text-cream hover:bg-forest hover:text-cream px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-forest shrink-0"
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
    </div>
  );
}
