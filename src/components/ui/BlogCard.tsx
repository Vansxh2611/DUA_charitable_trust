import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogCardProps } from "@/types";
import { Calendar } from "lucide-react";
import { cn } from "@/utils/cn";

export const BlogCard: React.FC<BlogCardProps> = ({ post, className }) => {
  const isCommunity = post.category.toLowerCase() === "community";
  const isEducation = post.category.toLowerCase() === "education";

  const badgeColorClass = isEducation
    ? "bg-[#F7DF7C] text-charcoal"
    : isCommunity
    ? "bg-mint text-forest"
    : "bg-[#F7DF7C] text-charcoal"; // IMPACT uses yellow/accent

  return (
    <article className={cn("flex flex-col h-full bg-beige rounded-[32px] overflow-hidden border border-forest/10 shadow-xs hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group", className)}>
      {/* Card Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              "px-3.5 py-1 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider shadow-xs",
              badgeColorClass
            )}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow p-6 sm:p-8">
        <h3 className="text-xl font-bold text-charcoal font-heading group-hover:text-forest transition-colors duration-200 mb-3 leading-snug">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-forest">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-charcoal/70 mb-6 line-clamp-3 leading-relaxed font-body">
          {post.excerpt}
        </p>

        {/* Date Row only (no reading time or author in card) */}
        <div className="mt-auto pt-4 border-t border-charcoal/5 flex items-center gap-2 text-xs text-charcoal/55 font-medium">
          <Calendar size={14} className="text-charcoal/40" />
          <span>{post.date}</span>
        </div>
      </div>
    </article>
  );
};
