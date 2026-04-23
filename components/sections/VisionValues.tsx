'use client';

import React from 'react';
import { 
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover 
} from "@/components/ui/animated-slideshow";

const SLIDES = [
  {
    id: "ethical",
    title: "Ethical Practices",
    description: "We operate with honesty, fairness, and a deep respect for human dignity in everything we do.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "diversity",
    title: "Diversity and Inclusion",
    description: "We believe diversity is strength—and we strive to create inclusive spaces that value every voice.",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "sustainability",
    title: "Sustainability",
    description: "Environmental stewardship guides our strategies, decisions, and long-term goals.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "community",
    title: "Community Empowerment",
    description: "We prioritize local employment, uplift communities, and reinvest in the ecosystems that support us.",
    imageUrl: "https://images.unsplash.com/photo-1541976590-71394168159b?q=80&w=1200&auto=format&fit=crop",
  },
];

const VisionValues = () => {
  return (
    <section className="bg-background text-foreground py-20 md:py-32 px-6 md:px-16 w-full relative overflow-hidden border-t border-accent/10">
      <div className="max-w-[1400px] mx-auto">
        <HoverSlider className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[60vh] lg:min-h-[70vh]">
          
          {/* Left Side: Content */}
          <div className="space-y-12 lg:space-y-20">
            <div className="space-y-6">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] text-foreground/60 font-semibold font-oswald">The Philosophy</p>
              <h2 className="text-5xl md:text-8xl font-bold uppercase font-oswald leading-[0.9] md:leading-[0.85] tracking-tighter text-foreground">
                Purpose <br/>Over Profit
              </h2>
            </div>
 
            <div className="flex flex-col space-y-4">
              {SLIDES.map((slide, index) => (
                <div key={slide.id} className="group relative">
                  <TextStaggerHover
                    index={index}
                    className="cursor-pointer text-2xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter font-oswald text-foreground/80 group-hover:text-foreground transition-colors"
                    text={slide.title}
                  />
                  <div className="max-h-0 overflow-hidden group-hover:max-h-32 lg:group-hover:max-h-20 transition-all duration-500 ease-out">
                    <p className="text-foreground/70 text-sm md:text-lg mt-2 md:mt-4 max-w-md font-medium italic">
                      "{slide.description}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image Display */}
          <div className="relative aspect-[4/5] lg:aspect-square w-full max-w-2xl mx-auto overflow-hidden bg-accent/5 border border-accent/10">
            <HoverSliderImageWrap className="size-full">
              {SLIDES.map((slide, index) => (
                <div key={slide.id} className="size-full">
                  <HoverSliderImage
                    index={index}
                    imageUrl={slide.imageUrl}
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="size-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </HoverSliderImageWrap>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            
            {/* Salt Route Watermark */}
            <div className="absolute bottom-8 right-8 font-oswald text-xs uppercase tracking-[0.4em] text-accent/60">
              Salt Route Group
            </div>
          </div>

        </HoverSlider>
      </div>
    </section>
  );
};

export default VisionValues;
