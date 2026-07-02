import { NavItem, PageRoutes, Project, BlogPost, TeamMember, FAQItem, Testimonial } from "@/types";
import { siteName, siteDescription } from "./site";

export const siteConfig = {
  name: siteName,
  description: siteDescription,
  email: "hello@cognibloom.org",
  phone: "+1 (555) 309-8422",
  address: "108 Bloomingdale Rd, Suite 400, Seattle, WA 98101",
  socials: [
    { platform: "facebook", href: "https://facebook.com/cognibloom" },
    { platform: "twitter", href: "https://twitter.com/cognibloom" },
    { platform: "instagram", href: "https://instagram.com/cognibloom" },
    { platform: "linkedin", href: "https://linkedin.com/company/cognibloom" },
  ] as const,
};

export const navItems: NavItem[] = [
  { label: "Home", href: PageRoutes.HOME },
  { label: "About", href: PageRoutes.ABOUT_US },
  { label: "Projects", href: PageRoutes.OUR_PROJECTS },
  { label: "Blog", href: PageRoutes.BLOG },
];

export const heroData = {
  heading: "Sparking Universal Curiosity",
  subheading: "We believe every child deserves a chance to learn, grow, and dream. Join us in making education a joyful adventure for all.",
  primaryCtaText: "See Our Impact",
  primaryCtaLink: PageRoutes.OUR_PROJECTS,
  secondaryCtaText: "Get Involved",
  secondaryCtaLink: PageRoutes.DONATE,
};

export const missionData = {
  title: "Nurturing Joyful Wisdom",
  description: "Through community education and engaging social initiatives, we create inspiring environments where learning blossoms naturally.",
  bullets: [
    "STEM & Innovation: Equipping classrooms with coding workshops, interactive scientific experiments, and computational thinking modules to ignite a lifelong passion for discovery.",
    "Arts & Creativity: Nurturing emotional resilience, collaborative murals, and creative expression through local music, painting, and tactile sculpture hubs.",
    "Environment & Nature: Fostering ecological responsibility and green stewardship through organic school gardens, seed preservation, and native reforestation programs.",
    "Holistic Well-being: Advocating for mental health resilience, wellness workshops, clean hydration, and physical well-being support in vulnerable regional communities."
  ],
  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
};

export const focusCardsData = [
  {
    title: "STEM & Innovation",
    description: "Equipping classrooms with coding workshops, interactive scientific experiments, and computational thinking modules.",
    icon: "gear",
    pattern: "circuit" as const,
  },
  {
    title: "Arts & Creativity",
    description: "Nurturing emotional resilience, collaborative murals, and creative expression through local arts hubs.",
    icon: "palette",
    pattern: "leaf" as const,
  },
  {
    title: "Environment & Nature",
    description: "Fostering ecological responsibility and green stewardship through organic school gardens and reforestation.",
    icon: "leaf",
    pattern: "leaf" as const,
  },
  {
    title: "Holistic Well-being",
    description: "Advocating for mental health resilience, wellness workshops, and physical well-being support.",
    icon: "person",
    pattern: "wave" as const,
  }
];

export const aboutHeroData = {
  heading: "Nurturing Joyful Wisdom.",
  subheading: "We are Dua Charitable Trust, an educational NGO dedicated to transforming community learning into an inspiring, inclusive, and deeply joyful adventure.",
  image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
};

export const aboutStoryData = {
  title: "Our Story",
  cards: [
    {
      title: "The Beginning",
      description: "Founded on the belief that education should not be a rigid institution but a blooming collective effort, Dua started as a small community initiative. We saw a gap between traditional learning and the natural curiosity of individuals."
    },
    {
      title: "Our Vision",
      description: "A world where joyful learning is accessible to all, empowering communities to grow together."
    }
  ]
};

export const coreValuesData = {
  title: "Core Values",
  values: [
    {
      title: "Joyful Learning",
      description: "Education should be a delightful journey, not a chore.",
      icon: "smiley"
    },
    {
      title: "Community First",
      description: "Empowering local voices and collective growth.",
      icon: "community"
    },
    {
      title: "Inquisitive Minds",
      description: "Fostering curiosity and critical thinking in every environment.",
      icon: "brain"
    },
    {
      title: "Inclusive Access",
      description: "Breaking down barriers to ensure education is for everyone.",
      icon: "globe"
    }
  ]
};

export const impactStatsData = {
  title: "Our Impact In Numbers",
  subtitle: "Every action counts. Together with volunteers, donors, and families, we are creating measurable ripples of educational impact.",
  stats: [
    { value: "5,000+", label: "Students Reached", description: "Sparking curiosity through interactive workshops." },
    { value: "50+", label: "Active Hubs", description: "Connecting retired educators with local rural learners." },
    { value: "1,200+", label: "Laptops Donated", description: "Providing access to digital learning tools for youth." },
    { value: "10,000+", label: "Mentorship Hours", description: "Fostering intergenerational bonds and wisdom transfer." }
  ]
};

export const projectsData: Project[] = [
  {
    id: "p1",
    slug: "curiosity-labs",
    title: "Curiosity Labs",
    category: "STEM & Innovation",
    description: "Interactive workshops designed to spark interest in science and technology among primary school students through hands-on experiments.",
    longDescription: "Curiosity Labs is our dedicated hands-on science and technology program. We set up mobile labs in community schools, guiding children through experiments in chemistry, physics, and programming, proving that science is a playground of questions rather than a list of facts.",
    image: "https://images.unsplash.com/photo-1530210120071-aa792f6b7d6b?q=80&w=1000&auto=format&fit=crop",
    badge: "STEM & Innovation",
    status: "active",
    impactMetric: "Impact: 5,000+ Students",
    pattern: "circuit",
    featured: false,
    goals: [
      "Reach 10 new rural schools by late 2026.",
      "Distribute 1,000 take-home science kits.",
      "Conduct weekly teacher training webinars."
    ],
    timeline: "Ongoing"
  },
  {
    id: "p2",
    slug: "green-roots",
    title: "Green Roots",
    category: "Environment & Nature",
    description: "A community-driven agricultural education program teaching sustainable farming practices and environmental stewardship to youth.",
    longDescription: "Green Roots bridges classrooms and ecology. Students learn compost chemistry, soil biology, seed preservation, and native reforestation. By cultivating school gardens, children understand the food cycle and build long-term environmental stewardship.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1000&auto=format&fit=crop",
    badge: "Environment & Nature",
    status: "active",
    impactMetric: "Impact: 20 Communities",
    pattern: "leaf",
    featured: false,
    goals: [
      "Build 5 new organic school gardens this year.",
      "Conduct native bird nesting workshops.",
      "Maintain a community seed exchange vault."
    ],
    timeline: "Ongoing"
  },
  {
    id: "p3",
    slug: "code-bloom",
    title: "Code Bloom",
    category: "STEM & Innovation",
    description: "Providing access to technology and coding education for underprivileged teenagers, bridging the digital divide one line of code at a time.",
    longDescription: "Code Bloom empowers teenagers in under-resourced areas with digital skills. We collect, refurbish, and distribute laptops, while hosting free programming Bootcamps in web development, python, and computational thinking.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    badge: "STEM & Innovation",
    status: "active",
    impactMetric: "Impact: 1,200 Laptops Donated",
    pattern: "circuit",
    featured: false,
    goals: [
      "Deliver 500 more laptops to community centers.",
      "Mentor 100 students through industry-certified paths.",
      "Host our annual hackathon for community issues."
    ],
    timeline: "Ongoing"
  },
  {
    id: "p4",
    slug: "canvas-of-hope",
    title: "Canvas of Hope",
    category: "Arts & Creativity",
    description: "Art therapy and creative expression workshops aimed at fostering emotional resilience and mental well-being in vulnerable populations.",
    longDescription: "Canvas of Hope creates a safe harbor for emotional expression. Guided by art therapists and volunteers, students express trauma and hope through clay, painting, music, and collaborative murals in shared neighborhood spaces.",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop",
    badge: "Arts & Creativity",
    status: "active",
    impactMetric: "Impact: 300+ Workshops",
    pattern: "wave",
    featured: false,
    goals: [
      "Publish an anthology of student paintings.",
      "Launch a mural collective across three towns.",
      "Introduce ceramic molding facilities to labs."
    ],
    timeline: "Ongoing"
  },
  {
    id: "p6",
    slug: "wellness-circle",
    title: "Wellness Circle",
    category: "Holistic Well-being",
    description: "Nurturing mental health, emotional resilience, clean hydration, and physical well-being support for students in regional schools.",
    longDescription: "The Wellness Circle delivers direct mental health counseling, physical health checkups, clean water workshops, and active mindfulness sessions. We partner with school systems to ensure physical and emotional health is built directly into classrooms.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
    badge: "Holistic Well-being",
    status: "active",
    impactMetric: "Impact: 15 Core Centers",
    pattern: "wave",
    featured: false,
    goals: [
      "Establish physical checkup camps in 25 regional schools.",
      "Introduce weekly active mindfulness sessions.",
      "Distribute wellness guidelines and clean water hygiene kits."
    ],
    timeline: "Ongoing"
  },
  {
    id: "p5",
    slug: "the-wisdom-collective",
    title: "The Wisdom Collective",
    category: "Flagship Program",
    description: "Our comprehensive mentorship program connecting retired educators with young learners in rural areas, fostering intergenerational knowledge transfer and community bonding.",
    longDescription: "The Wisdom Collective is our flagship initiative. We coordinate local hubs where senior educators teach, read with, and guide young learners. This program keeps elder knowledge alive, provides vital tutoring to rural areas, and builds strong community bonds.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    badge: "Flagship Program",
    status: "active",
    impactMetric: "50 Active Hubs  •  10,000+ Mentorship Hours",
    pattern: "wave",
    featured: true,
    goals: [
      "Grow to 80 active community hubs by late 2026.",
      "Provide scholarship support for outstanding student scholars.",
      "Conduct intergenerational oral history storytelling cycles."
    ],
    timeline: "Ongoing"
  }
];

export const blogData: BlogPost[] = [
  {
    id: "b1",
    slug: "sparking-universal-curiosity",
    title: "Sparking Universal Curiosity in the Classroom",
    category: "Education",
    excerpt: "Discover how our new curriculum initiatives are transforming traditional learning environments into spaces of active exploration and joyful...",
    content: "True education is not about filling a bucket; it is about lighting a fire. Traditional classroom settings often rely on passive listening and rote memorization, which can dim a child's natural curiosity. At Dua, we've developed student-led project modules. Instead of listening to a lecture about plant cell biology, students germinate seeds in custom transparent viewports, document daily mitosis visually, and teach their peers. By changing kids from receivers to active explorers, we notice engagement scores surge, and a lifetime interest in learning is sparked.",
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
    title: "Building Stronger Communities Through Shared Learning",
    category: "Community",
    excerpt: "A look into our recent community workshops and how collaborative educational experiences are fostering stronger neighborhood bonds and...",
    content: "When neighborhoods learn together, they grow together. Over the past six months, Dua Charitable Trust has organized over forty weekend learning festivals. These range from basic solar grid wiring to community oral history compilation. When a grandparent and a teenager sit side-by-side soldering a solar controller or editing audio, barriers break. Learning becomes a shared experience, building mutual respect and deep local bonds that strengthen the social fabric of the entire area.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 02, 2024",
    readTime: "5 min read",
    readingTime: "5 min read",
    author: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop",
      role: "Outreach Lead"
    },
    tags: ["Mentorship", "Community Building", "Oral History"]
  },
  {
    id: "b3",
    slug: "measuring-tactile-learning-impact",
    title: "Measuring the Impact of Tactile Learning",
    category: "Impact",
    excerpt: "We share our latest findings on how hands-on, tactile educational methods significantly improve retention and engagement among young learners.",
    content: "Why do we remember the touch of soil, the smell of wood shavings, or the weight of a clay brick far longer than a diagram on a digital board? Our latest cognitive assessments track student retention across tactile versus digital learning styles. The results are clear: students engaging in manual prototyping show a 40% higher retention of core scientific concepts six weeks later. Tactile learning engages motor control and spatial reasoning, cementing academic lessons directly into memory.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop",
    date: "Sep 28, 2024",
    readTime: "6 min read",
    readingTime: "6 min read",
    author: {
      name: "Sonia Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&auto=format&fit=crop",
      role: "Lead Researcher"
    },
    tags: ["Cognition", "Tactile learning", "Research Findings"]
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Sonia Patel",
    role: "Director of Education",
    bio: "Sonia spent ten years teaching in classrooms before joining Dua to pioneer hands-on, interdisciplinary curriculum styles.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Marcus Vance",
    role: "Community Outreach Lead",
    bio: "Marcus organizes our community learning festivals, linking regional centers and building volunteer networks.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
  }
];

export const FAQData: FAQItem[] = [
  {
    question: "Where do my donations go?",
    answer: "Exactly 85% of every dollar goes directly into field operations, including workshop materials, computers, art supplies, and community hub setups. The remaining 15% covers administrative and regulatory fees."
  },
  {
    question: "How can I volunteer with Dua?",
    answer: "We have teaching, mentoring, and administrative volunteer opportunities. Just register on our Contact page or visit any local community hub."
  },
  {
    question: "How do community hubs operate?",
    answer: "Our hubs are local school or neighborhood spaces where retired educators and volunteers hold after-school mentoring, reading labs, and arts workshops twice a week."
  }
];

export const testimonialsData: Testimonial[] = [
  {
    name: "Clara Henderson",
    role: "Parent of Student",
    avatar: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0?q=80&w=200&auto=format&fit=crop",
    quote: "Dua's Curiosity Labs changed my daughter's view of school. She went from dreading science to wanting to build circuits at home."
  },
  {
    name: "Principal Arthur Glass",
    role: "Oakridge Elementary",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote: "The Wisdom Collective tutoring program has dramatically boosted our reading comprehension scores and forged real intergenerational friendships."
  }
];

export const ctaData = {
  title: "Ready to Bloom with Us?",
  description: "Whether you want to get your hands dirty as a volunteer, fund digital literacy kits, or transition your classroom to hands-on methods, there is a place for you in the collective.",
  primaryCtaText: "Make a Donation",
  primaryCtaLink: PageRoutes.DONATE,
  secondaryCtaText: "Join as Volunteer",
  secondaryCtaLink: PageRoutes.CONTACT,
};
