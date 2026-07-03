"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogCardProps } from "@/types";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

export const BlogCard: React.FC<BlogCardProps> = ({ post, className }) => {
  const router = useRouter();
  const isCommunity = post.category.toLowerCase() === "community";
  const isEducation = post.category.toLowerCase() === "education";

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent double navigation if the user clicks directly on an anchor link
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) {
      return;
    }
    router.push(`/blog/${post.slug}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className={cn(
        "flex flex-col h-full bg-card-bg rounded-lg overflow-hidden border border-card-border shadow-xs hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-pointer",
        className
      )}
    >
      {/* Card Image */}
      <div className="relative h-56 w-full overflow-hidden bg-sage">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow p-6 sm:p-8 text-left">
        <h3 className="text-xl font-bold text-charcoal font-heading group-hover:text-forest transition-colors duration-200 mb-3 leading-snug">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-forest">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-charcoal/70 mb-6 line-clamp-3 leading-relaxed font-body">
          {post.excerpt}
        </p>

        {/* Date Row with Learn More */}
        <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center justify-between text-xs text-charcoal/55 font-medium">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-charcoal/40" />
            <span>{post.date}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-forest hover:text-forest-dark transition-colors font-body font-bold"
            aria-label={`Read more about ${post.title}`}
          >
            Learn More <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
