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
    id: "children",
    badge: "Child Support",
    title: "Helping Children",
    subtitle: "Nurturing the Seed of Curiosity",
    description: "Empowering young minds with mentorship, protective shelter, and educational pathways to break the cycle of poverty and nurture natural talent.",
    imageSrc: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Children smiling and learning together in a community environment",
    buttonText: "Support Childhood Projects",
    buttonLink: "/our-projects",
    bgColor: "#F9F8F3",     // Clean soft cream
    accentColor: "#D4A847", // Gold
    duration: 1,
  },
  {
    id: "healthcare",
    badge: "Health & Well-being",
    title: "Essential Healthcare",
    subtitle: "Closer Clinics, Healthier Lives",
    description: "Bringing primary medical clinics, hygiene awareness, and mental well-being circles directly to isolated rural neighborhoods and school hubs.",
    imageSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Healthcare workers helping children with medical checkups",
    buttonText: "Our Healthcare Hubs",
    buttonLink: "/our-projects",
    bgColor: "#F5F8F6",     // Soft mint cream tint
    accentColor: "#2D5B45", // Forest Green
    duration: 1,
  },
  {
    id: "education",
    badge: "Interactive Learning",
    title: "Equitable Education",
    subtitle: "Igniting the Joy of Knowledge",
    description: "Distributing interactive science kits, mobile school libraries, and computing devices to spark lifelong curiosity in local learning hubs.",
    imageSrc: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Group of students reading and learning with an educator in a classroom",
    buttonText: "Explore Learning Labs",
    buttonLink: "/our-projects",
    bgColor: "#F3F7F9",     // Soft blue cream tint
    accentColor: "#0F2A37", // Navy
    duration: 1,
  },
  {
    id: "food",
    badge: "Nutrition Support",
    title: "Food Security",
    subtitle: "Healthy Meals, Focused Minds",
    description: "Sponsoring warm school lunches, classroom agro-gardens, and grocery distribution centers for families undergoing transition phases.",
    imageSrc: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Fresh, healthy food and vegetables being shared",
    buttonText: "Sponsor Nutrition Programs",
    buttonLink: "/our-projects",
    bgColor: "#FAF4F0",     // Soft warm orange tint
    accentColor: "#BA681E", // Warm Orange
    duration: 1,
  },
  {
    id: "community",
    badge: "Resilience",
    title: "Community Growth",
    subtitle: "Building Roots of Coexistence",
    description: "Co-creating public spaces for local cooperative farming, vocational training, and green parks to build long-term local resilience.",
    imageSrc: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "People collaborating on community project work",
    buttonText: "Our Community Initiatives",
    buttonLink: "/our-projects",
    bgColor: "#F6F6F6",     // Soft neutral grey tint
    accentColor: "#6B7B73", // Sage grey
    duration: 1,
  },
];
