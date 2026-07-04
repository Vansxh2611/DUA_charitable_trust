export interface StoryStep {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;     // The soft background color for the storytelling slide
  accentColor: string; // The primary theme color for progress bars & highlights
  duration: number;    // Animation duration multiplier
}

export const STORY_STEPS: StoryStep[] = [
  {
    id: "education",
    badge: "Education & Children",
    title: "Quality Education",
    subtitle: "Igniting the Joy of Knowledge",
    description: "Empowering children with digital classrooms, interactive learning libraries, and educational kits to build strong foundational education.",
    imageSrc: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Children smiling and learning together in a community environment",
    buttonText: "Our Education Programs",
    buttonLink: "/our-projects",
    bgColor: "#F9F8F3",     // Clean soft cream
    accentColor: "#D4A847", // Gold
    duration: 1,
  },
  {
    id: "healthcare",
    badge: "Health & Well-being",
    title: "Essential Healthcare",
    subtitle: "Clean Water, Healthier Communities",
    description: "Providing clean water filtration systems, mobile health checkups, and hygiene awareness camps directly to remote communities.",
    imageSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Healthcare workers helping children with medical checkups",
    buttonText: "Explore Health Initiatives",
    buttonLink: "/our-projects",
    bgColor: "#F5F8F6",     // Soft mint cream tint
    accentColor: "#2D5B45", // Forest Green
    duration: 1,
  },
  {
    id: "skills",
    badge: "Livelihood & Skills",
    title: "Skill Development",
    subtitle: "Vocational Pathways to Independence",
    description: "Fostering local economic growth through youth technical bootcamps, adult vocational training, and placement programs.",
    imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Group of students reading and learning with an educator in a classroom",
    buttonText: "Our Skills Training",
    buttonLink: "/our-projects",
    bgColor: "#F3F7F9",     // Soft blue cream tint
    accentColor: "#0F2A37", // Navy
    duration: 1,
  },
  {
    id: "women",
    badge: "Women Empowerment",
    title: "Gender Equity",
    subtitle: "Financial Agency, Shared Leadership",
    description: "Organizing self-help circles, microfinance support, tailoring cooperatives, and leadership training for women entrepreneurs.",
    imageSrc: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Fresh, healthy food and vegetables being shared",
    buttonText: "Empower Women Leaders",
    buttonLink: "/our-projects",
    bgColor: "#FAF4F0",     // Soft warm orange tint
    accentColor: "#BA681E", // Warm Orange
    duration: 1,
  },
  {
    id: "environment",
    badge: "Environment & Ecology",
    title: "Climate Action",
    subtitle: "Restoring the Ecological Balance",
    description: "Co-creating sustainable school gardens, cooperative organic farms, and native reforestation programs to protect our natural ecosystem.",
    imageSrc: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "People collaborating on community project work",
    buttonText: "Join Green Reforestation",
    buttonLink: "/our-projects",
    bgColor: "#F6F6F6",     // Soft neutral grey tint
    accentColor: "#6B7B73", // Sage grey
    duration: 1,
  },
];
