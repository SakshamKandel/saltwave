"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Bot, User, Sparkles, Zap, ChevronDown, ArrowUpRight } from "lucide-react"

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: "Hi there! Welcome to Salt Route. I'm your digital concierge—how can I help you navigate our world today?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Human-like response simulation
    setTimeout(() => {
      setIsTyping(false)
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "That's a great question! I'm looking into that for you. We're all about bringing local ideas to life on a global scale. Would you like me to put you in touch with one of our lead consultants to chat further?",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMsg])
    }, 1500)
  }

  return (
    <div className="fixed bottom-10 right-10 z-[200] flex flex-col items-end gap-4">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(20px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-[95vw] md:w-[440px] h-[700px] bg-[#0A0A0A] border border-white/10 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col mb-4 origin-bottom-right relative"
          >
            {/* Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] size-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] size-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02] relative z-10">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-white shadow-2xl flex items-center justify-center relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-tr from-accent to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <Sparkles size={24} className="text-black relative z-10" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] font-oswald text-white">Salt Concierge</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold font-oswald">Identity Protocol Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all active:scale-90"
              >
                <ChevronDown size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide relative z-10"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`size-10 rounded-xl shrink-0 flex items-center justify-center border border-white/10 backdrop-blur-md ${msg.sender === "user" ? "bg-white" : "bg-white/10 shadow-xl"}`}>
                      {msg.sender === "user" ? <User size={18} className="text-black" /> : <Bot size={18} className="text-white" />}
                    </div>
                    <div className={`p-6 rounded-[2rem] text-[15px] leading-relaxed shadow-lg transition-all duration-500 ${
                      msg.sender === "user" 
                        ? "bg-white text-black font-medium rounded-tr-none" 
                        : "bg-white/[0.05] text-white border border-white/10 backdrop-blur-md rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl flex gap-1 items-center">
                       <span className="size-1 bg-white/40 rounded-full animate-bounce" />
                       <span className="size-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                       <span className="size-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-8 bg-black border-t border-white/5 relative z-10 backdrop-blur-xl">
               <form onSubmit={handleSend} className="relative flex items-center">
                  <input 
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Salt Route..."
                    className="w-full h-16 bg-white/[0.05] border border-white/10 rounded-2xl px-6 pr-16 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute right-2 size-12 bg-white text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20 shadow-xl"
                  >
                    <ArrowUpRight size={20} />
                  </button>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`size-20 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 border border-white/10 backdrop-blur-2xl ${
          isOpen ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={32} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={32} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  )
}
