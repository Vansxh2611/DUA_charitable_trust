export interface SeedItem {
  id: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  wash: "mint" | "sage" | "beige" | "cream";
  bgImage?: string;
}

export const seedsIntro = {
  title: "Empowerment in Action",
  description: "From women's tailoring cooperatives to native seed banks, our projects are designed to meet communities where they are, sparking sustainable local development.",
  buttonLabel: "Explore All Projects",
  buttonHref: "/our-projects",
};

export const seedsItems: SeedItem[] = [
  {
    id: "seeds-1",
    title: "Digital Literacy & Tech Bootcamps",
    description: "Bridging the technological divide by delivering computer coding workshops and tech certifications for rural youth.",
    href: "/our-projects/code-bloom",
    imageSrc: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Child in classroom using a digital tablet and smiling",
    wash: "sage",
    bgImage: "/digital-literacy-bg.jpg",
  },
  {
    id: "seeds-2",
    title: "Sustainable Community Farming",
    description: "Empowering rural households with organic agriculture training, native seed vaults, and compost chemistry education.",
    href: "/our-projects/green-roots",
    imageSrc: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Student in rural Peru Andes holding and assembling a wooden science project",
    wash: "mint",
    bgImage: "/steam-workshops-bg.jpg",
  },
  {
    id: "seeds-3",
    title: "Interactive Mobile Classrooms",
    description: "Bringing books, educational tablets, and trained mentors directly to remote areas where access to quality schooling is limited.",
    href: "/our-projects/curiosity-labs",
    imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Mobile library yellow trailer with books and students reading outside",
    wash: "beige",
    bgImage: "/mobile-library-bg.jpg",
  },
  {
    id: "seeds-4",
    title: "Vocational Tailoring Cooperatives",
    description: "Providing women with sewing machines, financial literacy classes, and cooperative hubs to build sustainable livelihoods.",
    href: "/our-projects/the-wisdom-collective",
    imageSrc: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Group of children planting and watering green saplings in a community garden",
    wash: "mint",
    bgImage: "/art-gardening-bg.jpg",
  },
];
