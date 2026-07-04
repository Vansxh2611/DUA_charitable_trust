import { NavItem, PageRoutes, Project, BlogPost, TeamMember, FAQItem, Testimonial } from "@/types";
import { siteName, siteDescription } from "./site";

export const siteConfig = {
  name: siteName,
  description: siteDescription,
  email: "hello@duatrust.org",
  phone: "+1 (555) 309-8422",
  address: "108 Bloomingdale Rd, Suite 400, Seattle, WA 98101",
  socials: [
    { platform: "facebook", href: "https://facebook.com/duatrust" },
    { platform: "twitter", href: "https://twitter.com/duatrust" },
    { platform: "instagram", href: "https://instagram.com/duatrust" },
    { platform: "linkedin", href: "https://linkedin.com/company/duatrust" },
  ] as const,
};

export const navItems: NavItem[] = [
  { label: "Home", href: PageRoutes.HOME },
  { label: "About", href: PageRoutes.ABOUT_US },
  { label: "Projects", href: PageRoutes.OUR_PROJECTS },
  { label: "Blog", href: PageRoutes.BLOG },
  { label: "Contact", href: PageRoutes.CONTACT },
];

export const heroData = {
  heading: "Empowering Communities, Transforming Lives",
  subheading: "We are a multi-domain trust dedicated to fostering education, environmental sustainability, women empowerment, health and well-being, livelihood skills, and community development.",
  primaryCtaText: "Explore Our Work",
  primaryCtaLink: PageRoutes.OUR_PROJECTS,
  secondaryCtaText: "Support Our Mission",
  secondaryCtaLink: PageRoutes.DONATE,
};

export const missionData = {
  title: "Empowering Through Inclusive Growth",
  description: "We work hand-in-hand with local communities to create sustainable pathways across multiple vital development domains.",
  bullets: [
    "Education & Livelihood: Igniting children's potential through interactive schooling and empowering adults with micro-entrepreneurship, vocational training, and essential livelihood skills.",
    "Women Empowerment: Promoting gender equality, leadership workshops, financial literacy, and entrepreneurial support to uplift women and their families.",
    "Environment & Sustainability: Fostering ecological responsibility through local organic farming, clean water resource preservation, and native reforestation programs.",
    "Health & Well-being: Restoring community wellness through primary healthcare clinics, mental health support groups, and preventive hygiene campaigns."
  ],
  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
};

export const focusCardsData = [
  {
    title: "Education & Skills",
    description: "Nurturing young minds with digital tools and preparing youth for sustainable livelihoods.",
    icon: "gear",
    pattern: "circuit" as const,
  },
  {
    title: "Women Empowerment",
    description: "Empowering women through micro-finance, leadership training, and vocational workshops.",
    icon: "palette",
    pattern: "leaf" as const,
  },
  {
    title: "Climate & Ecology",
    description: "Fostering environmental responsibility through reforestation and sustainable organic farming.",
    icon: "leaf",
    pattern: "leaf" as const,
  },
  {
    title: "Health & Community",
    description: "Delivering primary healthcare, mental wellness circles, and local cultural development.",
    icon: "person",
    pattern: "wave" as const,
  }
];

export const aboutHeroData = {
  heading: "Sustainable & Inclusive Development.",
  subheading: "We are Dua Charitable Trust, a multi-domain NGO committed to driving positive social change through education, ecological stewardship, women's agency, health support, and livelihood training.",
  image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
};

export const aboutStoryData = {
  title: "Our Story",
  cards: [
    {
      title: "Our Journey",
      description: "Dua Charitable Trust was founded with the belief that true community development requires addressing multiple facets of life. From our humble beginnings in local tutoring, we listened to the community and evolved into a multi-domain organization—integrating education, green ecology, women's empowerment, health services, and livelihood workshops into a unified system."
    },
    {
      title: "Our Vision",
      description: "An inclusive society where self-sustaining communities thrive through holistic education, gender equity, clean health, ecological balance, and secure livelihoods."
    }
  ]
};

export const coreValuesData = {
  title: "Core Values",
  values: [
    {
      title: "Empowerment",
      description: "Equipping individuals with tools and knowledge to shape their own futures.",
      icon: "smiley"
    },
    {
      title: "Community First",
      description: "Centering our initiatives around local leadership, voices, and collaborative solutions.",
      icon: "community"
    },
    {
      title: "Sustainability",
      description: "Creating long-lasting environmental, financial, and social development patterns.",
      icon: "brain"
    },
    {
      title: "Inclusivity",
      description: "Ensuring equal opportunities for women, children, and marginalized groups.",
      icon: "globe"
    }
  ]
};

export const impactStatsData = {
  title: "Our Impact In Numbers",
  subtitle: "Every initiative represents a real family supported. Through collective action, we are building a fairer, greener, and more resilient world.",
  stats: [
    { value: "15,000+", label: "Lives Impacted", description: "Accessing health support, schooling, livelihood training, and green projects." },
    { value: "45+", label: "Partner Villages", description: "Co-creating local resource hubs and agricultural learning spaces." },
    { value: "3,500+", label: "Resource Kits Shared", description: "Livelihood toolkits, seed bundles, health packs, and student packages." },
    { value: "25,000+", label: "Volunteer Hours", description: "Fostering community mentorship, health camps, and environmental action." }
  ]
};

export const projectsData: Project[] = [
  {
    id: "p1",
    slug: "curiosity-labs",
    title: "Curiosity Labs",
    category: "Education & Development",
    description: "Deploying mobile science labs and digital classrooms to spark curiosity and improve education in rural schools.",
    longDescription: "Curiosity Labs provides children in under-funded rural schools with hands-on STEM education. We install interactive learning spaces, distribute science kits, and train local teachers in active learning methodology.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
    badge: "Education & Development",
    status: "active",
    impactMetric: "Impact: 12,000+ Students",
    pattern: "circuit",
    featured: false,
    goals: [
      "Expand to 30 rural schools by late 2026.",
      "Distribute 2,500 interactive learning kits.",
      "Conduct monthly teacher empowerment workshops."
    ],
    timeline: "Ongoing"
  },
  {
    id: "p2",
    slug: "green-roots",
    title: "Project Green Roots",
    category: "Environment & Nature",
    description: "Promoting community reforestation, seed vault preservation, and training in sustainable climate-smart agriculture.",
    longDescription: "Project Green Roots empowers smallholder farmers and community members with ecological stewardship. We manage local seed banks, establish organic school gardens, and lead native tree reforestation to fight climate change.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop",
    badge: "Environment & Nature",
    status: "active",
    impactMetric: "Impact: 35 Communities",
    pattern: "leaf",
    featured: false,
    goals: [
      "Plant 10,000 native tree saplings.",
      "Set up 15 cooperative community organic gardens.",
      "Host seasonal workshops on composting and soil health."
    ],
    timeline: "Ongoing"
  },
  {
    id: "p3",
    slug: "code-bloom",
    title: "Code Bloom Initiative",
    category: "Livelihood & Skills",
    description: "Providing digital literacy, professional vocational coding training, and refurbished laptops for rural youth.",
    longDescription: "The Code Bloom Initiative bridges the digital divide by equipping youth in marginalized settings with technical and professional skills. We host web development bootcamps and distribute laptops to help them access secure jobs.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    badge: "Livelihood & Skills",
    status: "active",
    impactMetric: "Impact: 1,800+ Youth Trained",
    pattern: "circuit",
    featured: false,
    goals: [
      "Graduate 400 certified students from bootcamps.",
      "Establish 3 community digital centers.",
      "Secure tech internship placements for top graduates."
    ],
    timeline: "Ongoing"
  },
  {
    id: "p4",
    slug: "canvas-of-hope",
    title: "Canvas of Hope",
    category: "Arts & Community",
    description: "Art therapy and creative expression workshops aimed at fostering emotional resilience and mental well-being in vulnerable populations.",
    longDescription: "Canvas of Hope uses creative art therapy as a tool for emotional healing and community bonding. We host neighborhood painting sessions, craft local cultural heritage showcases, and co-create public murals.",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop",
    badge: "Arts & Community",
    status: "active",
    impactMetric: "Impact: 50+ Community Murals",
    pattern: "wave",
    featured: false,
    goals: [
      "Document local oral histories in art catalogs.",
      "Engage 1,500 children in creative therapy sessions.",
      "Launch public art exhibitions for neighborhood development."
    ],
    timeline: "Ongoing"
  },
  {
    id: "p6",
    slug: "wellness-circle",
    title: "Wellness Circle",
    category: "Health & Well-being",
    description: "Nurturing mental health, emotional resilience, clean hydration, and physical well-being support for students in regional schools.",
    longDescription: "The Wellness Circle delivers primary health screenings, hygiene awareness campaigns, and mental health counseling. We establish local health checkup points and water purification filters in remote cohorts.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000&auto=format&fit=crop",
    badge: "Health & Well-being",
    status: "active",
    impactMetric: "Impact: 8,500+ Families Served",
    pattern: "wave",
    featured: false,
    goals: [
      "Conduct 40 mobile medical checkup camps.",
      "Distribute 2,000 clean hygiene and water kits.",
      "Train 50 community health guides for primary support."
    ],
    timeline: "Ongoing"
  },
  {
    id: "p5",
    slug: "the-wisdom-collective",
    title: "The Women's Collective",
    category: "Women Empowerment",
    description: "Our comprehensive mentorship program connecting retired educators with young learners in rural areas, fostering intergenerational knowledge transfer and community bonding.",
    longDescription: "The Women's Collective is our flagship program. We coordinate local self-help groups, facilitate micro-loans for women-owned businesses, and host tailoring and craft cooperatives to build long-term economic independence.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
    badge: "Women Empowerment",
    status: "active",
    impactMetric: "750+ Female Leaders  •  Micro-loans & Cooperatives",
    pattern: "wave",
    featured: true,
    goals: [
      "Form 35 new women's micro-enterprise circles.",
      "Conduct comprehensive financial literacy training.",
      "Establish two new local craft cooperatives by 2026."
    ],
    timeline: "Ongoing"
  },
];

export const blogData: BlogPost[] = [
  {
    id: "b1",
    slug: "sparking-universal-curiosity",
    title: "Reimagining Rural Classrooms for the Future",
    category: "Education",
    excerpt: "How student-centered, active learning models and digital tooling are successfully closing the educational divide in remote village schools...",
    content: "Equal access to high-quality education is the cornerstone of community growth. We explore how replacing rote memorization with digital tools, active learning kits, and teacher mentoring is transforming rural classrooms, preparing children for the modern world.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 15, 2024",
    readTime: "4 min read",
    readingTime: "4 min read",
    author: {
      name: "Arthur Glass",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop",
      role: "Education Coordinator"
    },
    tags: ["Curiosity", "Active Learning", "Classroom Reform"]
  },
  {
    id: "b2",
    slug: "building-stronger-communities",
    title: "Community-Led Reforestation and Sustainable Farming",
    category: "Environment",
    excerpt: "Practical ways local farming cooperatives are successfully restoring soil health, preserving native seeds, and building climate resilience...",
    content: "Protecting the environment begins with local action. We outline how our organic farming training and native seed vaults are helping smallholder farmers build climate-resilient livelihoods, restoring both the soil and their families' incomes.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 02, 2024",
    readTime: "5 min read",
    readingTime: "5 min read",
    author: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop",
      role: "Outreach Lead"
    },
    tags: ["Environment", "Climate Action", "Organic Farming"]
  },
  {
    id: "b3",
    slug: "measuring-tactile-learning-impact",
    title: "Empowering Women through Economic Independence",
    category: "Empowerment",
    excerpt: "Inside our women's micro-finance circles, and how cooperative craft hubs are creating strong local community leaders...",
    content: "When a woman is financially independent, her whole family thrives. We share stories from our self-help cooperatives where women learn financial literacy, tailoring, and leadership, rising to solve crucial community challenges.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop",
    date: "Sep 28, 2024",
    readTime: "6 min read",
    readingTime: "6 min read",
    author: {
      name: "Sonia Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&auto=format&fit=crop",
      role: "Lead Researcher"
    },
    tags: ["Women Empowerment", "Microfinance", "Leadership"]
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Sonia Patel",
    role: "Director of Programs",
    bio: "Sonia has over 12 years of experience coordinating multi-domain community development and inclusive growth initiatives across regional sectors.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Marcus Vance",
    role: "Director of Community Partnerships",
    bio: "Marcus manages our local partnerships, connecting field coordinators, health specialists, and local volunteers.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
  }
];

export const FAQData: FAQItem[] = [
  {
    question: "Where do my donations go?",
    answer: "Exactly 85% of all funds directly support our program operations, including schooling supplies, micro-finance seed funds, tree saplings, and primary health clinics. The remaining 15% covers administrative costs."
  },
  {
    question: "How can I volunteer with Dua?",
    answer: "You can volunteer in any of our active domains—ranging from teaching children and leading health camps to tree planting and financial literacy mentorship. Register on our Contact page to join."
  },
  {
    question: "How do community hubs operate?",
    answer: "Our hubs are local cooperative spaces where we coordinate all multi-domain programs. Here, we conduct training, distribute toolkits, host wellness circles, and hold self-help group meetings."
  }
];

export const testimonialsData: Testimonial[] = [
  {
    name: "Clara Henderson",
    role: "Parent of Student",
    avatar: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0?q=80&w=200&auto=format&fit=crop",
    quote: "Dua's program modules transformed my daughter's view of education. She went from dreading learning to wanting to study science and build projects at home."
  },
  {
    name: "Principal Arthur Glass",
    role: "Oakridge Elementary",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote: "The intergenerational mentorship tutoring program has dramatically boosted our reading scores and forged real community bonds."
  }
];

export const ctaData = {
  title: "Ready to Empower Communities?",
  description: "Whether you want to share your professional skills as a volunteer, sponsor a women's cooperative, or fund primary health clinics, there is a place for you in our movement.",
  primaryCtaText: "Make a Donation",
  primaryCtaLink: PageRoutes.DONATE,
  secondaryCtaText: "Join as Volunteer",
  secondaryCtaLink: PageRoutes.CONTACT,
};
