'use client';

import CardNav from '@/components/layout/CardNav';
import { Footer } from '@/components/ui/footer';
import ParallaxHero from '@/components/sections/ParallaxHero';
import InteractiveSelector from '@/components/ui/interactive-selector';
import VisionValues from '@/components/sections/VisionValues';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import { VerticalAccordion } from '@/components/ui/vertical-accordion';
import { LetsWorkTogether } from '@/components/ui/lets-work-together';
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from '@/components/ui/map';
import { DynamicFrameLayout } from '@/components/ui/dynamic-frame-layout';
import { Link2, Camera, MessageCircle } from 'lucide-react';

export default function Home() {
  const navItems = [
    {
      label: "About",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/about" },
        { label: "Careers", ariaLabel: "About Careers", href: "/careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "/projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/case-studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#2F293A", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "mailto:hello@example.com" },
        { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://linkedin.com" }
      ]
    }
  ];

  const handleNewsletterSubscribe = async (email: string): Promise<boolean> => {
    console.log(`Subscribing ${email}...`);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Simulate a 70% success rate
    if (Math.random() > 0.3) {
      console.log(`Successfully subscribed ${email}!`);
      return true;
    } else {
      console.error(`Failed to subscribe ${email}.`);
      return false;
    }
  };

  const socialLinksData = [
    { label: 'Website', href: '#', icon: <Link2 className="h-5 w-5" /> },
    { label: 'Instagram', href: '#', icon: <Camera className="h-5 w-5" /> },
    { label: 'X', href: '#', icon: <MessageCircle className="h-5 w-5" /> },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start overflow-x-hidden bg-background">
      <CardNav
        logo="/images/logo.png"
        items={navItems}
        baseColor="#000" // Black background for navbar
        menuColor="#fff" // White hamburger menu icon
        buttonBgColor="#fff" // White CTA button
        buttonTextColor="#000" // Black text on CTA
        ease="power3.out"
        className="z-50"
      />
      
      <ParallaxHero />
      <InteractiveSelector />
      <VisionValues />
      
      <section className="w-full h-[60vh] md:h-screen bg-background overflow-hidden relative border-y border-accent/20">
        {/* Top & Bottom Vignette for Seamless Transition */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />


        <DynamicFrameLayout 
          showFrames={true}
          frames={[
            {
              id: 1,
              video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
              defaultPos: { x: 0, y: 0, w: 4, h: 4 },
              mediaSize: 1,
              isHovered: false,
              corner: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-corner.svg",
              edgeHorizontal: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-h.svg",
              edgeVertical: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-v.svg",
              borderThickness: 20,
              borderSize: 92,
            },
            {
              id: 2,
              video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
              defaultPos: { x: 4, y: 0, w: 4, h: 4 },
              mediaSize: 1,
              isHovered: false,
              corner: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-corner.svg",
              edgeHorizontal: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-h.svg",
              edgeVertical: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-v.svg",
              borderThickness: 20,
              borderSize: 92,
            },
            {
              id: 3,
              video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
              defaultPos: { x: 8, y: 0, w: 4, h: 4 },
              mediaSize: 1,
              isHovered: false,
              corner: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-corner.svg",
              edgeHorizontal: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-h.svg",
              edgeVertical: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-v.svg",
              borderThickness: 20,
              borderSize: 92,
            },
            {
              id: 4,
              video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
              defaultPos: { x: 0, y: 4, w: 4, h: 4 },
              mediaSize: 1,
              isHovered: false,
              corner: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-corner.svg",
              edgeHorizontal: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-h.svg",
              edgeVertical: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-v.svg",
              borderThickness: 20,
              borderSize: 92,
            },
            {
              id: 5,
              video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
              defaultPos: { x: 4, y: 4, w: 4, h: 4 },
              mediaSize: 1,
              isHovered: false,
              corner: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-corner.svg",
              edgeHorizontal: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-h.svg",
              edgeVertical: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-v.svg",
              borderThickness: 20,
              borderSize: 92,
            },
            {
              id: 6,
              video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
              defaultPos: { x: 8, y: 4, w: 4, h: 4 },
              mediaSize: 1,
              isHovered: false,
              corner: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-corner.svg",
              edgeHorizontal: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-h.svg",
              edgeVertical: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-v.svg",
              borderThickness: 20,
              borderSize: 92,
            },
            {
              id: 7,
              video: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
              defaultPos: { x: 0, y: 8, w: 4, h: 4 },
              mediaSize: 1,
              isHovered: false,
              corner: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-corner.svg",
              edgeHorizontal: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-h.svg",
              edgeVertical: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-v.svg",
              borderThickness: 20,
              borderSize: 92,
            },
            {
              id: 8,
              video: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
              defaultPos: { x: 4, y: 8, w: 4, h: 4 },
              mediaSize: 1,
              isHovered: false,
              corner: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-corner.svg",
              edgeHorizontal: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-h.svg",
              edgeVertical: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-v.svg",
              borderThickness: 20,
              borderSize: 92,
            },
            {
              id: 9,
              video: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
              defaultPos: { x: 8, y: 8, w: 4, h: 4 },
              mediaSize: 1,
              isHovered: false,
              corner: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-corner.svg",
              edgeHorizontal: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-h.svg",
              edgeVertical: "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/67177d6f51f4c7e6c5a0a3a4_osmo-frame-edge-v.svg",
              borderThickness: 20,
              borderSize: 92,
            },
          ]} 
          className="w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-700" 
          hoverSize={8}
          gapSize={2}
        />
      </section>

      
      <ProjectShowcase />
      <VerticalAccordion />
      <LetsWorkTogether />
      
      <section className="w-full h-[500px] relative bg-black">
        <Map 
          center={[85.3240, 27.7172]} 
          zoom={12}
          dragRotate={false}
          touchPitch={false}
        >
          <MapMarker longitude={85.3240} latitude={27.7172}>
            <MarkerContent />
            <MarkerPopup closeButton>
              <div className="flex flex-col gap-1 min-w-[150px]">
                <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Headquarters</p>
                <h4 className="text-lg font-bold text-white uppercase tracking-tight">Salt Route Group</h4>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">Kathmandu, Nepal. Building the future of local enterprises on the global stage.</p>
              </div>
            </MarkerPopup>
          </MapMarker>
          <MapControls showZoom showFullscreen />
        </Map>
        
        {/* Overlay for aesthetic blend */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      <div className="w-full mt-auto">
        <Footer
          logoSrc="/images/logo.png"
          companyName="Salt Route Group"
          description="Salt Route Group: Pioneering digital experiences and cultural storytelling through innovative motion and design."
          onSubscribe={handleNewsletterSubscribe}
          socialLinks={socialLinksData}
        />
      </div>
    </main>
  );
}
