'use client';

import React, { useState, useEffect } from 'react';
import { Tent, Flame, Droplets, Bath, Mountain } from 'lucide-react';

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const options = [
    {
      title: "Hospitality Consulting",
      description: "Pre-opening strategy & operational support.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      icon: <Bath size={24} className="text-white" />
    },
    {
      title: "Travel Design",
      description: "End-to-end journeys honoring local heritage.",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop",
      icon: <Mountain size={24} className="text-white" />
    },
    {
      title: "Impact Ventures",
      description: "Sustainability guides our strategies.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
      icon: <Droplets size={24} className="text-white" />
    },
    {
      title: "Heritage Stays",
      description: "Shaping distinctive & responsible brands.",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200&auto=format&fit=crop",
      icon: <Tent size={24} className="text-white" />
    },
    {
      title: "Global Pathways",
      description: "Local innovation to global opportunity.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
      icon: <Flame size={24} className="text-white" />
    }
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center pt-32 pb-24 bg-background font-sans text-foreground w-full"> 
      {/* Header Section */}
      <div className="w-full max-w-2xl px-6 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight uppercase font-oswald">
          Purpose Meets Ambition
        </h2>
        <p className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto font-medium">
          Pathways from local innovation to global opportunity through consulting and travel.
        </p>
      </div>

      {/* Options Container */}
      <div className="options flex flex-col md:flex-row w-full max-w-[1200px] h-auto md:h-[500px] px-4 items-stretch overflow-hidden relative gap-2 md:gap-0">
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out border-b md:border-b-0 md:border-r border-accent/20 last:border-0
              ${activeIndex === index ? 'flex-[10] md:flex-[5] min-h-[300px] md:min-h-0' : 'flex-1 min-h-[80px] md:min-h-0'}
            `}
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(26,26,26,0.9) 100%), url('${option.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translate(0)' : (isMobile ? 'translateY(20px)' : 'translateX(-60px)'),
              cursor: 'pointer',
              zIndex: activeIndex === index ? 10 : 1,
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Label with icon and info */}
            <div className={`label absolute left-0 right-0 bottom-4 md:bottom-8 flex items-center h-12 z-20 px-6 gap-4 w-full transition-all duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-60'}`}>
              <div className="icon min-w-[40px] h-[40px] md:min-w-[48px] md:h-[48px] flex items-center justify-center rounded-full bg-background/20 backdrop-blur-md border border-white/20 flex-shrink-0 transition-transform duration-500 hover:scale-110">
                {React.cloneElement(option.icon as React.ReactElement<{ size: number }>, { size: isMobile ? 18 : 24 })}
              </div>
              <div className={`info text-white overflow-hidden transition-all duration-700 ease-in-out ${activeIndex === index ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`}>
                <div className="main font-bold text-lg md:text-xl uppercase tracking-wider font-oswald whitespace-nowrap">
                  {option.title}
                </div>
                <div className="sub text-[10px] md:text-sm text-neutral-200 whitespace-nowrap">
                  {option.description}
                </div>
              </div>
            </div>
            
            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-accent/5 transition-opacity duration-300 ${activeIndex === index ? 'opacity-0' : 'opacity-0 hover:opacity-100'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveSelector;
