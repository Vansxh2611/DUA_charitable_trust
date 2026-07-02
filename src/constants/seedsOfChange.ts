export interface SeedProject {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  bgColorClass: string; // Tailored hex color classes to match screenshot exactly
}

export const SEED_PROJECTS: SeedProject[] = [
  {
    id: "digital-literacy",
    title: "Digital Literacy for All",
    description: "Bridging the technological divide by providing digital tools and training to students in underserved urban centers.",
    imageSrc: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop", // Smiling child with tablet
    imageAlt: "Child using a digital tablet in a classroom setting",
    link: "/our-projects/code-bloom",
    bgColorClass: "bg-[#EAEEDB]",
  },
  {
    id: "steam-workshops",
    title: "STEAM Workshops in Rural Peru",
    description: "Empowering students through hands-on science and technology projects that solve local community challenges.",
    imageSrc: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop", // Child with wooden puzzle
    imageAlt: "Child in a rural setting examining a physical learning tool",
    link: "/our-projects/curiosity-labs",
    bgColorClass: "bg-[#D8E2DC]",
  },
  {
    id: "mobile-library",
    title: "The Mobile Library Initiative",
    description: "Bringing curated book collections and reading workshops to remote areas where access to libraries is limited.",
    imageSrc: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop", // Library outreach window
    imageAlt: "Children looking through the service window of a mobile library vehicle",
    link: "/our-projects",
    bgColorClass: "bg-[#EAEEDB]",
  },
  {
    id: "art-gardening",
    title: "Art & Gardening for Empowerment",
    description: "Using creative expression as a tool for building confidence and community identity among young learners.",
    imageSrc: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop", // Children planting saplings
    imageAlt: "Children planting saplings in a community garden",
    link: "/our-projects/green-roots",
    bgColorClass: "bg-[#D8E2DC]",
  },
];
