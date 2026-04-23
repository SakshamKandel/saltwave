"use client";

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DollarSign, Play, Bell, BarChart } from "lucide-react";

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>(() => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return {
      width: 0,
      height: 0,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export const VerticalAccordion = () => {
  const [open, setOpen] = useState(items[0].id);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="py-24 bg-background text-foreground w-full border-t border-accent/10 opacity-0">
        <div className="max-w-7xl mx-auto px-6 h-[500px]" />
      </section>
    );
  }

  return (
    <section className="py-24 bg-background text-foreground w-full border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold uppercase font-oswald tracking-widest text-foreground">
          Our Specialties
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row h-fit lg:h-[500px] w-full max-w-7xl mx-auto overflow-hidden px-6">
        {items.map((item) => {
          return (
            <Panel
              key={item.id}
              open={open}
              setOpen={setOpen}
              id={item.id}
              Icon={item.Icon}
              title={item.title}
              imgSrc={item.imgSrc}
              description={item.description}
            />
          );
        })}
      </div>
    </section>
  );
};

interface PanelProps {
  open: number;
  setOpen: Dispatch<SetStateAction<number>>;
  id: number;
  Icon: React.ElementType;
  title: string;
  imgSrc: string;
  description: string;
}

const Panel = ({
  open,
  setOpen,
  id,
  Icon,
  title,
  imgSrc,
  description,
}: PanelProps) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

  return (
    <>
      <button
        className={`
          transition-all duration-500 p-6 border-r border-b border-accent/10 flex flex-row-reverse lg:flex-col justify-end items-center gap-6 relative group
          ${isOpen ? 'bg-accent/10' : 'bg-transparent hover:bg-accent/5'}
        `}
        onClick={() => setOpen(id)}
      >
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden lg:block text-2xl font-bold font-oswald uppercase rotate-180 text-foreground/40 group-hover:text-foreground transition-colors"
        >
          {title}
        </span>
        <span className="block lg:hidden text-xl font-bold font-oswald uppercase text-foreground/40 group-hover:text-foreground transition-colors">
          {title}
        </span>
        <div className={`w-10 lg:w-full aspect-square flex items-center justify-center transition-all duration-500 ${isOpen ? 'text-accent' : 'text-accent/30 group-hover:text-accent/60'}`}>
          <Icon size={32} />
        </div>
        <span
          className={`
            w-4 h-4 bg-background transition-colors border-r border-b border-accent/20 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20
            ${isOpen ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(26,26,26,0.9), transparent), url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-background flex items-center"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-12 py-8 max-w-lg"
            >
              <h3 className="text-3xl font-bold font-oswald uppercase mb-4 text-white">
                {title}
              </h3>
              <p className="text-white/80 leading-relaxed text-lg italic">
                "{description}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "300px",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    x: "0%",
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: "easeOut"
    },
  },
  closed: { opacity: 0, x: "-20%" },
};

const items = [
  {
    id: 1,
    title: "Hospitality Consulting",
    Icon: BarChart,
    imgSrc:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    description:
      "Salt Route Consulting helps hospitality businesses unlock value through smart operations and sustainable practices.",
  },
  {
    id: 2,
    title: "Travel Design",
    Icon: Play,
    imgSrc:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop",
    description:
      "Salt Route Experiences designs journeys that connect travelers to the landscapes, cultures, and communities of Nepal.",
  },
  {
    id: 3,
    title: "Sustainable Ventures",
    Icon: Bell,
    imgSrc:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
    description:
      "Building businesses that are not only profitable but deeply responsible—where young people find purpose at home.",
  },
  {
    id: 4,
    title: "Economic Impact",
    Icon: DollarSign,
    imgSrc:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop",
    description:
      "We prioritize local employment, uplift communities, and reinvest in the ecosystems that support us.",
  },
];
