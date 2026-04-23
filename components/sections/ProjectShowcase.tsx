"use client"

import React from "react"
import CursorFollow from "@/components/ui/cursor-follow" 

const projects = [
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    label: "Sunshine Villa",
    description: "Luxury, comfort, and cultural charm in the hills.",
    href: "https://sunshinevillafikkal.com/",
  },
  {
    src: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=1200&auto=format&fit=crop",
    label: "Salbari Heritage",
    description: "Biodiversity and heritage of the southern plains.",
    href: "#",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    label: "Habre Center",
    description: "Himalayan hospitality and breathtaking views.",
    href: "https://redpandanetwork.org/himalayan-habre-center",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
    label: "Experience Hub",
    description: "Immersive journeys across the heart of Nepal.",
    href: "#",
  },
]

const ProjectShowcase = () => {
  return (
    <section className="bg-background py-24 border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold uppercase font-oswald mb-12 tracking-widest text-foreground">
          Featured Projects
        </h2>
        
        <CursorFollow>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => (
              <a 
                key={i} 
                href={project.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative overflow-hidden aspect-[4/5] block"
              >
                <img
                  src={project.src}
                  alt={project.label}
                  data-cursor-text={project.label}
                  className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
                  style={{ cursor: "none" }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white font-oswald text-xs uppercase tracking-widest">{project.label}</p>
                </div>
              </a>
            ))}
          </div>
        </CursorFollow>
      </div>
    </section>
  )
}

export default ProjectShowcase
