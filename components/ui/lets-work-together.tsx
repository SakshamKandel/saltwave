"use client"

import type React from "react"
import { useState } from "react"
import { ArrowUpRight, Check, Send, Mail, Phone, MapPin, Globe, ExternalLink, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function LetsWorkTogether() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <section className="bg-[#FAF9F6] py-20 md:py-32 px-6 overflow-hidden border-t border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Brand & Contact Info */}
          <div className="space-y-12 lg:space-y-16">
          <div className="space-y-8">
              <h2 className="text-5xl md:text-8xl font-bold font-oswald text-[#1A1A1A] leading-[0.9] tracking-tighter uppercase">
                Let's Build <br /> 
                <span className="text-[#8B7355]">The Future</span> <br />
                Together
              </h2>
              
              <p className="text-lg md:text-xl text-[#1A1A1A]/60 max-w-md leading-relaxed font-medium">
                Whether you're looking to collaborate, invest, or simply learn more about our mission in Nepal, we're ready to listen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 pt-4 md:pt-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Mail className="size-4 md:size-5" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest font-oswald">Email Us</span>
                </div>
                <a href="mailto:info@saltroutegroup.com" className="text-base md:text-lg font-medium text-[#1A1A1A] hover:text-accent transition-colors border-b border-accent/10 pb-1">
                  info@saltroutegroup.com
                </a>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Phone className="size-4 md:size-5" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest font-oswald">Call Us</span>
                </div>
                <a href="tel:+977014XXXXX" className="text-base md:text-lg font-medium text-[#1A1A1A] hover:text-accent transition-colors border-b border-accent/10 pb-1">
                  +977-01-XXXXXXX
                </a>
              </div>

              <div className="space-y-4 md:col-span-2">
                <div className="flex items-center gap-3 text-accent">
                  <MapPin className="size-4 md:size-5" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest font-oswald">Our Headquarters</span>
                </div>
                <p className="text-base md:text-lg font-medium text-[#1A1A1A]">
                  Salt Route Group HQ, <br /> Jhamsikhel, Lalitpur, Nepal
                </p>
              </div>
            </div>

            {/* Social Proof/Links */}
            <div className="flex items-center gap-4 md:gap-8 pt-4 md:pt-8">
              <a href="#" className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white border border-accent/10 hover:border-accent transition-all group">
                <ExternalLink className="size-5 md:size-6 text-[#1A1A1A]/40 group-hover:text-accent transition-colors" />
              </a>
              <a href="#" className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white border border-accent/10 hover:border-accent transition-all group">
                <MessageCircle className="size-5 md:size-6 text-[#1A1A1A]/40 group-hover:text-accent transition-colors" />
              </a>
              <a href="#" className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white border border-accent/10 hover:border-accent transition-all group">
                <Globe className="size-5 md:size-6 text-[#1A1A1A]/40 group-hover:text-accent transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="relative">
             <div className="bg-white border border-accent/10 p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8 md:space-y-12"
                    >
                      <div className="space-y-2">
                        <h3 className="text-3xl md:text-4xl font-bold font-oswald uppercase tracking-tighter text-[#1A1A1A]">Send a Message</h3>
                        <p className="text-[#1A1A1A]/40 text-[10px] md:text-sm font-medium uppercase tracking-widest">Responses within 24 hours</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                        <div className="space-y-2 md:space-y-4 group">
                          <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 group-focus-within:text-accent transition-colors">Your Name</label>
                          <input 
                            required
                            type="text" 
                            placeholder="Full Name"
                            className="w-full bg-transparent border-b border-accent/20 py-2 md:py-4 text-base md:text-lg font-medium text-[#1A1A1A] focus:outline-none focus:border-accent transition-all placeholder:text-[#1A1A1A]/10"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2 md:space-y-4 group">
                          <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 group-focus-within:text-accent transition-colors">Email Address</label>
                          <input 
                            required
                            type="email" 
                            placeholder="hello@example.com"
                            className="w-full bg-transparent border-b border-accent/20 py-2 md:py-4 text-base md:text-lg font-medium text-[#1A1A1A] focus:outline-none focus:border-accent transition-all placeholder:text-[#1A1A1A]/10"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2 md:space-y-4 group">
                          <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-accent/60 group-focus-within:text-accent transition-colors">How can we help?</label>
                          <textarea 
                            required
                            rows={3}
                            placeholder="Describe your inquiry..."
                            className="w-full bg-transparent border-b border-accent/20 py-2 md:py-4 text-base md:text-lg font-medium text-[#1A1A1A] focus:outline-none focus:border-accent transition-all resize-none placeholder:text-[#1A1A1A]/10"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full group relative flex items-center justify-center gap-4 md:gap-6 px-8 md:px-12 py-4 md:py-6 bg-[#1A1A1A] text-[#FAF9F6] font-oswald font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm overflow-hidden rounded-full transition-all hover:scale-[1.02] active:scale-95"
                        >
                          <span className="relative z-10">Submit Inquiry</span>
                          <Send className="relative z-10 size-3 md:size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          <div className="absolute inset-0 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-16 md:py-24 text-center space-y-6 md:space-y-8"
                    >
                      <div className="size-16 md:size-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-500">
                        <Check className="size-8 md:size-12" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl md:text-5xl font-bold font-oswald uppercase tracking-tighter text-[#1A1A1A]">Thank You</h3>
                        <p className="text-[#1A1A1A]/60 text-base md:text-lg font-medium max-w-xs mx-auto">
                          We've received your inquiry and will be in touch shortly.
                        </p>
                      </div>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="text-[10px] font-bold uppercase tracking-widest text-accent hover:text-[#1A1A1A] transition-colors font-oswald"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
