import { ReactNode } from "react";

export enum PageRoutes {
  HOME = "/",
  ABOUT_US = "/about-us",
  OUR_PROJECTS = "/our-projects",
  BLOG = "/blog",
  CONTACT = "/contact",
  DONATE = "/donate",
}

export interface NavItem {
  label: string;
  href: PageRoutes | string;
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
}

export interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "info" | "default" | "orange";
  className?: string;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  clean?: boolean;
}

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
}

export type PatternVariant =
  | "leaf"
  | "circuit"
  | "wave"
  | "doodle"
  | "project-grid";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  badge: string;
  status: "active" | "completed" | "planned";
  impactMetric?: string;
  goals?: string[];
  timeline?: string;
  category: string;
  featured?: boolean;
  pattern?: PatternVariant;
}

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string;
  readTime: string;
  readingTime?: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags?: string[];
}

export interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: SocialLink[];
}

export interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube";
  href: string;
}

export interface SocialIconsProps {
  links?: SocialLink[];
  className?: string;
  iconClassName?: string;
}

export interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface StatItemProps {
  value: string;
  label: string;
  icon?: ReactNode;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  location?: string;
  avatar: string;
  quote: string;
}

// Section Props
export interface HeroProps {
  heading: string;
  subheading: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundImage?: string;
}

export interface MissionProps {
  title: string;
  description: string;
  bullets: string[];
  image?: string;
}

export interface ImpactStatsProps {
  title: string;
  subtitle: string;
  stats: StatItemProps[];
}

export interface FeaturedProjectsProps {
  title: string;
  subtitle: string;
  projects: Project[];
}

export interface TeamGridProps {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export interface NewsletterProps {
  title: string;
  subtitle: string;
  placeholderText?: string;
  buttonText?: string;
}

export interface TestimonialsProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export interface CTAProps {
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface FAQProps {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}

export interface ContactFormProps {
  title: string;
  subtitle: string;
}
