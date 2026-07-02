export interface SeedItem {
  id: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  wash: "mint" | "sage" | "beige" | "cream";
}

export const seedsIntro = {
  title: "Seeds of Change in Action",
  description: "From mobile libraries to pop-up science fairs, our projects are designed to meet communities where they are, sparking a lifelong love for discovery.",
  buttonLabel: "Explore All Projects",
  buttonHref: "/our-projects",
};

export const seedsItems: SeedItem[] = [
  {
    id: "seeds-1",
    title: "Digital Literacy for All",
    description: "Bridging the technological divide by providing digital tools and training to students in underserved urban centers.",
    href: "/our-projects/code-bloom",
    imageSrc: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Child in classroom using a digital tablet and smiling",
    wash: "sage",
  },
  {
    id: "seeds-2",
    title: "STEAM Workshops in Rural Peru",
    description: "Empowering students through hands-on science and technology projects that solve local community challenges.",
    href: "/our-projects/curiosity-labs",
    imageSrc: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Student in rural Peru Andes holding and assembling a wooden science project",
    wash: "mint",
  },
  {
    id: "seeds-3",
    title: "The Mobile Library Initiative",
    description: "Bringing curated book collections and reading workshops to remote areas where access to libraries is limited.",
    href: "/our-projects/the-wisdom-collective",
    imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Mobile library yellow trailer with books and students reading outside",
    wash: "beige",
  },
  {
    id: "seeds-4",
    title: "Art & Gardening for Empowerment",
    description: "Using creative expression as a tool for building confidence and community identity among young learners.",
    href: "/our-projects/canvas-of-hope",
    imageSrc: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Group of children planting and watering green saplings in a community garden",
    wash: "mint",
  },
];
