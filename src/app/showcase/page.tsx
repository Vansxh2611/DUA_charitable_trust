"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { cn } from "@/utils/cn";
import {
  AnimatedButton,
  AnimatedCard,
  AnimatedCounter,
  BeforeAfter,
  DonationWidget,
  FAQAccordion,
  FloatingButton,
  Gallery,
  GlassCard,
  GradientHeading,
  ImpactCounter,
  ImageSlider,
  SectionDivider,
  TestimonialSlider,
  TiltCard,
  Timeline,
  BlurReveal,
  TextReveal,
  ImageReveal,
  Magnetic,
  StickyScrollSection,
} from "@/components/ui";
import {
  Sparkles,
  Sliders,
  Layout,
  Type,
  Maximize,
  Coins,
  Check,
  Copy,
  Heart,
  Film,
} from "lucide-react";

// Guard page in production
if (process.env.NODE_ENV === "production") {
  notFound();
}

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState("AnimatedCard");
  const [copiedCode, setCopiedCode] = useState(false);

  // Copy helper
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Mock data for showcase previews
  const mockFaqs = [
    {
      question: "What is the mission of Dua Charitable Trust?",
      answer: "We aim to make education a joyful community adventure by organizing STEM labs, art therapies, and environmental gardens.",
      category: "General",
    },
    {
      question: "How are donations utilized?",
      answer: "Exactly 85% of funds support program assets directly (materials, kits, seedlings, laptops), while 15% covers admin support.",
      category: "Funding",
    },
    {
      question: "Can I host a Curiosity Lab in my school?",
      answer: "Absolutely! Get in touch with our Outreach lead via the contact form to schedule a mobile lab session.",
      category: "Programs",
    },
  ];

  const mockTimeline = [
    {
      id: 1,
      date: "Spring 2024",
      title: "Foundation of Collective",
      subtitle: "Seattle, WA",
      content: "Launched with five founding educators running local tutoring labs.",
    },
    {
      id: 2,
      date: "Fall 2024",
      title: "First 1,000 Laptops",
      subtitle: "Digital Literacy Campaign",
      content: "Refurbished and shipped computing devices to regional libraries.",
    },
    {
      id: 3,
      date: "Late 2025",
      title: "Green Roots Initiated",
      subtitle: "Sustainable Gardens",
      content: "Partnered with ten community schools to maintain seed exchange vaults.",
    },
  ];

  const mockGallery = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1530210120071-aa792f6b7d6b?q=80&w=600&auto=format&fit=crop",
      alt: "STEM experimental setup",
      category: "STEM",
      title: "Curiosity Labs Experiment",
      description: "Primary school students testing circuit boards.",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=600&auto=format&fit=crop",
      alt: "School organic garden planting",
      category: "Environment",
      title: "School Riparian Garden",
      description: "Students checking composting worm-bins.",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop",
      alt: "Kids creative watercolor painting",
      category: "Arts",
      title: "Canvas of Hope session",
      description: "Therapeutic painting workshop for kids.",
    },
  ];

  const mockSlider = [
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
      alt: "Curious classroom learning",
      title: "Sparking Universal Curiosity",
      description: "Empowering school children to explore and question through tactile experiments.",
    },
    {
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
      alt: "Group learning outdoor circle",
      title: "Nurturing Joyful Wisdom",
      description: "Connecting intergenerational mentors with eager rural students.",
    },
  ];

  const mockTestimonials = [
    {
      name: "Clara Henderson",
      role: "Parent of Student",
      avatar: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0?q=80&w=200&auto=format&fit=crop",
      quote: "Dua's Curiosity Labs changed my daughter's view of school. She went from dreading science to wanting to build circuits at home.",
      rating: 5,
    },
    {
      name: "Arthur Glass",
      role: "School Principal",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      quote: "The Wisdom Collective tutoring program has dramatically boosted our reading comprehension scores and forged real intergenerational friendships.",
      rating: 5,
    },
  ];

  const mockImpact = [
    { value: 5000, label: "Students Taught", suffix: "+", type: "counter" as const, color: "forest" as const },
    { value: 85, label: "Efficiency rating", suffix: "%", type: "circle" as const, progressValue: 85, color: "gold" as const },
    { value: 1200, label: "Laptops Distributed", suffix: "+", type: "progress" as const, progressValue: 78, color: "charcoal" as const },
  ];

  // Component configuration state controls
  const [cCardVariant, setCCardVariant] = useState<"default" | "glass" | "premium" | "outline">("default");
  const [cCardGlow, setCCardGlow] = useState(false);
  const [cCardHover, setCCardHover] = useState(true);

  const [cGlassOpacity, setCGlassOpacity] = useState(0.4);
  const [cGlassBlur, setCGlassBlur] = useState(12);
  const [cGlassGlow, setCGlassGlow] = useState(true);

  const [cTiltIntensity, setCTiltIntensity] = useState(15);
  const [cTiltGlare, setCTiltGlare] = useState(true);

  const [cButtonVariant, setCButtonVariant] = useState<"primary" | "secondary" | "outline" | "ghost" | "gold">("primary");
  const [cButtonLoading, setCButtonLoading] = useState(false);

  const [cHeadingUnderline, setCHeadingUnderline] = useState(true);

  const categoriesList = [
    {
      group: "Cards",
      icon: <Layout className="w-4 h-4" />,
      items: ["AnimatedCard", "GlassCard", "TiltCard"],
    },
    {
      group: "Typography & Accents",
      icon: <Type className="w-4 h-4" />,
      items: ["GradientHeading", "SectionDivider"],
    },
    {
      group: "Data & Timelines",
      icon: <Maximize className="w-4 h-4" />,
      items: ["AnimatedCounter", "ImpactCounter", "Timeline"],
    },
    {
      group: "Interaction",
      icon: <Sliders className="w-4 h-4" />,
      items: ["AnimatedButton", "FAQAccordion", "FloatingButton"],
    },
    {
      group: "Media sliders",
      icon: <Film className="w-4 h-4" />,
      items: ["Gallery", "ImageSlider", "BeforeAfter", "TestimonialSlider"],
    },
    {
      group: "Cinematic Animations",
      icon: <Sparkles className="w-4 h-4" />,
      items: ["BlurReveal", "TextReveal", "ImageReveal", "Magnetic", "StickyScrollSection"],
    },
    {
      group: "Giving Forms",
      icon: <Coins className="w-4 h-4" />,
      items: ["DonationWidget"],
    },
  ];

  // Code snippets database
  const codeSnippets: Record<string, string> = {
    AnimatedCard: `<AnimatedCard\n  variant="${cCardVariant}"\n  hover={${cCardHover}}\n  glow={${cCardGlow}}\n  animationDirection="up"\n>\n  <div className="p-6">\n    <h3 className="text-lg font-bold font-heading mb-2">Dua Charitable Trust</h3>\n    <p className="text-sm opacity-80">Premium modular reveal cards.</p>\n  </div>\n</AnimatedCard>`,
    GlassCard: `<GlassCard\n  opacity={${cGlassOpacity}}\n  blur={${cGlassBlur}}\n  glow={${cGlassGlow}}\n  gradientBorder={true}\n>\n  <div className="p-8">\n    <h3 className="text-xl font-bold font-heading mb-2">Glassmorphism</h3>\n    <p className="text-sm text-charcoal/70">Radial cursor-following glow spotlight.</p>\n  </div>\n</GlassCard>`,
    TiltCard: `<TiltCard\n  intensity={${cTiltIntensity}}\n  glare={${cTiltGlare}}\n  scale={1.04}\n>\n  <div className="p-8">\n    <h3 className="text-lg font-bold font-heading">3D Tilt Effect</h3>\n    <p className="text-xs opacity-70 mt-1">Parallax mouse coordinate transitions.</p>\n  </div>\n</TiltCard>`,
    GradientHeading: `<GradientHeading\n  variant="section"\n  level={2}\n  underline={${cHeadingUnderline}}\n  highlightWords={["Curiosity", "Wisdom"]}\n>\n  Sparking Universal Curiosity & Wisdom\n</GradientHeading>`,
    SectionDivider: `<SectionDivider\n  variant="premium"\n  animate={true}\n/>`,
    AnimatedCounter: `<AnimatedCounter\n  target={12450}\n  prefix="$"\n  suffix="+"\n  decimals={0}\n  formatting={true}\n/>`,
    ImpactCounter: `<ImpactCounter\n  stats={[\n    { value: 5000, label: "Students", type: "counter" },\n    { value: 85, label: "Efficiency", type: "circle", progressValue: 85 },\n    { value: 1200, label: "Laptops", type: "progress", progressValue: 78 }\n  ]}\n/>`,
    Timeline: `<Timeline\n  items={timelineItems}\n  orientation="vertical"\n  variant="premium"\n/>`,
    AnimatedButton: `<AnimatedButton\n  variant="${cButtonVariant}"\n  loading={${cButtonLoading}}\n  label="Make a Difference"\n  onClick={() => alert("Simulated Submit")}\n/>`,
    FAQAccordion: `<FAQAccordion\n  items={faqItems}\n  allowMultiple={false}\n  showSearch={true}\n/>`,
    FloatingButton: `<FloatingButton\n  label="Quick Actions"\n  tooltip="Get Involved"\n  pulse={true}\n  actions={[\n    { label: "Donate", icon: <Coins />, href: "/donate" },\n    { label: "Volunteers", icon: <Heart />, href: "/contact" }\n  ]}\n/>`,
    Gallery: `<Gallery\n  items={galleryItems}\n/>`,
    ImageSlider: `<ImageSlider\n  images={sliderImages}\n  autoplay={true}\n  infinite={true}\n/>`,
    BeforeAfter: `<BeforeAfter\n  beforeImage="url1"\n  afterImage="url2"\n  beforeLabel="Before Restoration"\n  afterLabel="After Planting"\n/>`,
    TestimonialSlider: `<TestimonialSlider\n  testimonials={testimonialsList}\n  autoplay={true}\n/>`,
    DonationWidget: `<DonationWidget\n  currencySymbol="₹"\n  presetAmounts={[500, 1000, 2500, 5000]}\n  onDonate={async (data) => console.log(data)}\n/>`,
    BlurReveal: `<BlurReveal blur={15} duration={0.8}>\n  <div className="p-8 bg-sage/10 rounded-2xl border border-forest/10">\n    <h3 className="text-xl font-bold font-heading">Blur Reveal Card</h3>\n  </div>\n</BlurReveal>`,
    TextReveal: `<TextReveal mode="words" stagger={0.03} duration={0.6}>\n  Premium selectable split reveal text.\n</TextReveal>`,
    ImageReveal: `<ImageReveal\n  src="image_url"\n  alt="Description"\n  parallaxStrength={30}\n  duration={1.2}\n/>`,
    Magnetic: `<Magnetic strength={0.35}>\n  <button className="bg-navy text-white px-8 py-3 rounded-full">\n    Hover Me\n  </button>\n</Magnetic>`,
    StickyScrollSection: `<StickyScrollSection steps={stepsData} />`,
  };

  return (
    <div className="pt-24 min-h-screen bg-cream pb-20 font-body">
      {/* Top Header Section */}
      <section className="border-b border-forest/10 py-10 bg-forest/5 mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-bold text-forest tracking-wider uppercase font-body">
            Dua Charitable Trust
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal font-heading leading-tight mt-1">
            Premium Component Playground
          </h1>
          <p className="text-sm sm:text-base text-charcoal/70 max-w-2xl mt-2 leading-relaxed">
            Interact with our accessible, modular UI library powered by Tailwind v4 & Framer Motion. 
            Select components from the left menu to configure properties and grab production-ready code.
          </p>
        </div>
      </section>

      {/* Main Showcase Layout */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav (lg:col-span-3) */}
        <aside className="lg:col-span-3 flex flex-col gap-4 bg-cream border border-forest/10 p-5 rounded-[24px] shadow-xs">
          <h2 className="text-xs font-bold text-charcoal/40 font-body uppercase px-3">
            Component Groups
          </h2>
          <nav className="flex flex-col gap-5">
            {categoriesList.map((cat, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 px-3 text-xs font-semibold text-forest/75 font-heading">
                  {cat.icon}
                  <span>{cat.group}</span>
                </div>
                <div className="flex flex-col gap-1 pl-6">
                  {cat.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveTab(item);
                        setCopiedCode(false);
                      }}
                      className={cn(
                        "w-full text-left py-1.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-hidden",
                        activeTab === item
                          ? "bg-forest/10 text-forest shadow-xs font-bold"
                          : "text-charcoal/70 hover:text-forest"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Workspace Display Area (lg:col-span-9) */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          <div className="p-6 sm:p-8 bg-cream border border-forest/10 rounded-[32px] shadow-xs">
            <h2 className="text-2xl font-heading font-bold text-charcoal mb-2">
              {activeTab}
            </h2>
            <div className="h-[1px] bg-forest/10 w-full mb-6" />

            {/* Interactive Live Playground Container */}
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-xs font-bold text-charcoal/50 font-body uppercase block mb-3">
                  Live Preview
                </span>
                <div className="border border-forest/15 rounded-3xl p-6 sm:p-12 bg-forest/5 flex items-center justify-center min-h-[300px]">
                  {/* Render targeted component based on activeTab */}
                  {activeTab === "AnimatedCard" && (
                    <AnimatedCard
                      variant={cCardVariant}
                      hover={cCardHover}
                      glow={cCardGlow}
                      className="max-w-sm w-full"
                    >
                      <div className="p-6 flex flex-col gap-3">
                        <span className="text-xs font-bold text-[#F7DF7C] tracking-wide uppercase font-body">
                          Featured RESTORATION
                        </span>
                        <h3 className="text-xl font-heading font-bold leading-tight">
                          Ecosystem Healing
                        </h3>
                        <p className="text-sm font-body leading-relaxed opacity-70">
                          Rebuilding native soil structures and plant nurseries across communities.
                        </p>
                      </div>
                    </AnimatedCard>
                  )}

                  {activeTab === "GlassCard" && (
                    <GlassCard
                      opacity={cGlassOpacity}
                      blur={cGlassBlur}
                      glow={cGlassGlow}
                      gradientBorder={true}
                      className="max-w-sm w-full"
                    >
                      <div className="p-8 flex flex-col gap-3">
                        <span className="text-xs font-bold text-forest tracking-wide uppercase font-body">
                          Active Hub
                        </span>
                        <h3 className="text-xl font-heading font-bold leading-tight text-charcoal">
                          Joyful Wisdom
                        </h3>
                        <p className="text-sm font-body leading-relaxed text-charcoal/70">
                          Cursor-following radial highlight effect.
                        </p>
                      </div>
                    </GlassCard>
                  )}

                  {activeTab === "TiltCard" && (
                    <TiltCard
                      intensity={cTiltIntensity}
                      glare={cTiltGlare}
                      className="max-w-xs w-full"
                    >
                      <div className="p-8 flex flex-col gap-3 h-52 justify-between">
                        <h3 className="text-xl font-heading font-bold text-charcoal leading-tight">
                          Hover to Tilt Card
                        </h3>
                        <p className="text-xs font-body text-charcoal/55">
                          Move mouse inside boundaries to rotate and project sheens.
                        </p>
                      </div>
                    </TiltCard>
                  )}

                  {activeTab === "GradientHeading" && (
                    <GradientHeading
                      variant="section"
                      underline={cHeadingUnderline}
                      highlightWords={["Curiosity", "Wisdom"]}
                    >
                      Sparking Universal Curiosity & Wisdom
                    </GradientHeading>
                  )}

                  {activeTab === "SectionDivider" && (
                    <SectionDivider variant="premium" className="my-0 w-full" />
                  )}

                  {activeTab === "AnimatedCounter" && (
                    <div className="text-center">
                      <AnimatedCounter
                        target={12450}
                        prefix="₹"
                        suffix="+"
                        className="text-5xl font-heading text-forest block mb-2"
                      />
                      <span className="text-sm font-medium text-charcoal/60 font-body">
                        Curious minds supported
                      </span>
                    </div>
                  )}

                  {activeTab === "ImpactCounter" && (
                    <ImpactCounter stats={mockImpact} className="w-full" />
                  )}

                  {activeTab === "Timeline" && (
                    <Timeline items={mockTimeline} variant="premium" className="w-full" />
                  )}

                  {activeTab === "AnimatedButton" && (
                    <AnimatedButton
                      variant={cButtonVariant}
                      loading={cButtonLoading}
                      label="Nurturing Growth"
                    />
                  )}

                  {activeTab === "FAQAccordion" && (
                    <FAQAccordion items={mockFaqs} className="w-full" />
                  )}

                  {activeTab === "FloatingButton" && (
                    <div className="py-20 flex items-center justify-center">
                      <p className="text-xs text-charcoal/40 font-body mr-4">
                        (Anchored bottom-right in layout - check preview item)
                      </p>
                      <FloatingButton
                        label="Volunteers actions"
                        tooltip="Participate"
                        sticky={false}
                        actions={[
                          { label: "Give Funds", icon: <Coins className="w-4 h-4" /> },
                          { label: "Share Love", icon: <Heart className="w-4 h-4" /> },
                        ]}
                      />
                    </div>
                  )}

                  {activeTab === "Gallery" && (
                    <Gallery items={mockGallery} className="w-full" />
                  )}

                  {activeTab === "ImageSlider" && (
                    <ImageSlider images={mockSlider} className="w-full" />
                  )}

                  {activeTab === "BeforeAfter" && (
                    <BeforeAfter
                      beforeImage="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop"
                      afterImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
                      beforeLabel="Restoration Plot"
                      afterLabel="Flourishing Nursery"
                      className="w-full"
                    />
                  )}

                  {activeTab === "TestimonialSlider" && (
                    <TestimonialSlider testimonials={mockTestimonials} className="w-full" />
                  )}

                  {activeTab === "DonationWidget" && (
                    <DonationWidget className="w-full" />
                  )}

                  {activeTab === "BlurReveal" && (
                    <div className="flex flex-col gap-4 w-full">
                      <BlurReveal blur={15} duration={0.8}>
                        <div className="p-8 bg-sage/15 rounded-3xl border border-forest/15 text-center">
                          <h3 className="text-xl font-bold font-heading mb-2 text-charcoal">Translucent Blur Reveal</h3>
                          <p className="text-sm text-charcoal/70">Observe how this card transitions in with a soft, cinematic blur effect once visible in the viewport.</p>
                        </div>
                      </BlurReveal>
                    </div>
                  )}

                  {activeTab === "TextReveal" && (
                    <div className="flex flex-col gap-6 text-center max-w-xl mx-auto w-full">
                      <div className="text-3xl font-extrabold font-heading text-charcoal leading-tight">
                        <TextReveal mode="words" stagger={0.05} duration={0.6}>
                          Cultivating a premium community of lifelong learners and curious minds.
                        </TextReveal>
                      </div>
                      <p className="text-xs text-charcoal/40 font-body">
                        (Hover and select/copy the text above! It behaves exactly like standard, accessible DOM text.)
                      </p>
                    </div>
                  )}

                  {activeTab === "ImageReveal" && (
                    <div className="w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden relative shadow-md">
                      <ImageReveal
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
                        alt="Visual Image Reveal Example"
                        parallaxStrength={30}
                        duration={1.2}
                      />
                    </div>
                  )}

                  {activeTab === "Magnetic" && (
                    <div className="flex flex-col items-center gap-6 w-full py-12">
                      <Magnetic strength={0.35}>
                        <button className="bg-navy text-white hover:bg-forest transition-colors duration-300 font-bold px-8 py-3 rounded-full cursor-pointer shadow-md select-none font-heading text-sm">
                          Hover Over Me
                        </button>
                      </Magnetic>
                      <p className="text-xs text-charcoal/50 font-body max-w-xs text-center">
                        Moves smoothly to follow your cursor on hover. Disables dynamically on touch devices.
                      </p>
                    </div>
                  )}

                  {activeTab === "StickyScrollSection" && (
                    <div className="w-full border border-forest/15 rounded-3xl overflow-hidden bg-cream h-[400px] overflow-y-auto p-2 scrollbar-thin">
                      <p className="text-xs text-charcoal/40 font-body text-center py-2 bg-sage/10 sticky top-0 z-50">
                        (Demo inside scrollable preview wrapper. Pinned columns activate on desktop scroll.)
                      </p>
                      <StickyScrollSection
                        steps={[
                          {
                            title: "Phase 1: Sparking Interest",
                            description: "Establishing localized learning spaces to make foundational education creative and exciting.",
                            imageSrc: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
                            imageAlt: "Children in science lab",
                          },
                          {
                            title: "Phase 2: Project Incubation",
                            description: "Empowering children to form design teams, prototype solutions, and present in public showcases.",
                            imageSrc: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
                            imageAlt: "Student presenting model",
                          },
                        ]}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Configurations Control Panel (Only render when applicable) */}
              <div className="p-5 bg-cream border border-forest/10 rounded-2xl">
                <span className="text-xs font-bold text-charcoal/50 font-body uppercase block mb-4">
                  Configuration Settings
                </span>

                {activeTab === "AnimatedCard" && (
                  <div className="flex flex-wrap gap-6 items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-charcoal/55 font-body">Card Variant</span>
                      <select
                        value={cCardVariant}
                        onChange={(e) => setCCardVariant(e.target.value as typeof cCardVariant)}
                        className="bg-transparent border border-forest/15 rounded-lg py-1 px-3 text-xs"
                      >
                        <option value="default">Default</option>
                        <option value="glass">Glass</option>
                        <option value="premium">Premium</option>
                        <option value="outline">Outline</option>
                      </select>
                    </div>

                    <label className="flex items-center gap-2 text-xs text-charcoal select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cCardGlow}
                        onChange={(e) => setCCardGlow(e.target.checked)}
                      />
                      <span>Background Glow</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-charcoal select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cCardHover}
                        onChange={(e) => setCCardHover(e.target.checked)}
                      />
                      <span>Hover scale & lift</span>
                    </label>
                  </div>
                )}

                {activeTab === "GlassCard" && (
                  <div className="flex flex-wrap gap-6 items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-charcoal/55 font-body">Opacity ({cGlassOpacity})</span>
                      <input
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.05"
                        value={cGlassOpacity}
                        onChange={(e) => setCGlassOpacity(parseFloat(e.target.value))}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-charcoal/55 font-body">Blur ({cGlassBlur}px)</span>
                      <input
                        type="range"
                        min="4"
                        max="24"
                        step="2"
                        value={cGlassBlur}
                        onChange={(e) => setCGlassBlur(parseInt(e.target.value, 10))}
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-charcoal select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cGlassGlow}
                        onChange={(e) => setCGlassGlow(e.target.checked)}
                      />
                      <span>Spotlight Glow</span>
                    </label>
                  </div>
                )}

                {activeTab === "TiltCard" && (
                  <div className="flex flex-wrap gap-6 items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-charcoal/55 font-body">Tilt Intensity ({cTiltIntensity}deg)</span>
                      <input
                        type="range"
                        min="5"
                        max="35"
                        step="5"
                        value={cTiltIntensity}
                        onChange={(e) => setCTiltIntensity(parseInt(e.target.value, 10))}
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-charcoal select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cTiltGlare}
                        onChange={(e) => setCTiltGlare(e.target.checked)}
                      />
                      <span>Reflective Glare Sheen</span>
                    </label>
                  </div>
                )}

                {activeTab === "GradientHeading" && (
                  <div className="flex flex-wrap gap-6 items-center">
                    <label className="flex items-center gap-2 text-xs text-charcoal select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cHeadingUnderline}
                        onChange={(e) => setCHeadingUnderline(e.target.checked)}
                      />
                      <span>Animated Underline</span>
                    </label>
                  </div>
                )}

                {activeTab === "AnimatedButton" && (
                  <div className="flex flex-wrap gap-6 items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-charcoal/55 font-body">Button Variant</span>
                      <select
                        value={cButtonVariant}
                        onChange={(e) => setCButtonVariant(e.target.value as typeof cButtonVariant)}
                        className="bg-transparent border border-forest/15 rounded-lg py-1 px-3 text-xs"
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="outline">Outline</option>
                        <option value="ghost">Ghost</option>
                        <option value="gold">Gold</option>
                      </select>
                    </div>

                    <label className="flex items-center gap-2 text-xs text-charcoal select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cButtonLoading}
                        onChange={(e) => setCButtonLoading(e.target.checked)}
                      />
                      <span>Loading spinner</span>
                    </label>
                  </div>
                )}

                {!["AnimatedCard", "GlassCard", "TiltCard", "GradientHeading", "AnimatedButton"].includes(activeTab) && (
                  <p className="text-xs text-charcoal/50 font-body">
                    This component is configured with optimal premium defaults. Custom code handles responsiveness and touch details automatically.
                  </p>
                )}
              </div>

              {/* Code Snippet copying block */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-charcoal/50 font-body uppercase">
                    Copy Snippet
                  </span>
                  <button
                    onClick={() => handleCopyCode(codeSnippets[activeTab])}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest/5 hover:bg-forest/10 border border-forest/10 text-xs font-semibold text-forest cursor-pointer focus:outline-hidden"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-charcoal/90 bg-[#1b221e] p-5 font-mono text-[10px] sm:text-xs text-cream/90 overflow-x-auto whitespace-pre leading-relaxed select-all">
                  <code>{codeSnippets[activeTab]}</code>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
