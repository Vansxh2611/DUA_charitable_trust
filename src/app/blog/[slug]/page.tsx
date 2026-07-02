import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogData } from "@/constants/data";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Newsletter } from "@/components/sections/Newsletter";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface BlogPostDetailProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams(): { slug: string }[] {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostDetail({ params }: BlogPostDetailProps): React.ReactNode {
  const post = blogData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-24 sm:pt-28 bg-cream min-h-screen">
      <Container className="py-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest/85 transition-colors focus:outline-none"
        >
          <ArrowLeft size={16} />
          Back to Eco-Digest
        </Link>
      </Container>

      <section className="pb-8">
        <Container>
          <div className="relative h-[250px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xs border border-forest/10">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="100vw" priority />
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-4 text-xs sm:text-sm text-charcoal/50 font-medium">
              <Badge label={post.category} variant="info" />
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-charcoal font-heading leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex items-center gap-3.5 pb-8 mb-8 border-b border-forest/10">
              <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 border border-forest/10">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-charcoal truncate">{post.author.name}</span>
                <span className="text-xs text-charcoal/50 truncate font-heading">{post.author.role}</span>
              </div>
            </div>

            <article className="prose max-w-none text-charcoal/80 font-body leading-relaxed text-base sm:text-lg whitespace-pre-line">
              {post.content || post.excerpt}
            </article>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2.5 mt-10 pt-8 border-t border-forest/10">
                {post.tags.map((tag, idx) => (
                  <Badge key={idx} label={`#${tag}`} variant="default" className="text-[10px]" />
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      <Newsletter
        title="Stay Nurtured with Eco-Digest"
        subtitle="Subscribe to receive our monthly reviews, organic farming guides, and restoration volunteer callouts."
      />
    </div>
  );
}
