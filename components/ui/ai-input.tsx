"use client"

import React from "react"
import { cx } from "class-variance-authority"
import { AnimatePresence, motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { X, ArrowUpRight, Send } from "lucide-react"

interface OrbProps {
  dimension?: string
  className?: string
  tones?: {
    base?: string
    accent1?: string
    accent2?: string
    accent3?: string
  }
  spinDuration?: number
}

const ColorOrb: React.FC<OrbProps> = ({
  dimension = "192px",
  className,
  tones,
  spinDuration = 20,
}) => {
  const fallbackTones = {
    base: "oklch(95% 0.02 264.695)",
    accent1: "oklch(75% 0.15 350)",
    accent2: "oklch(80% 0.12 200)",
    accent3: "oklch(78% 0.14 280)",
  }

  const palette = { ...fallbackTones, ...tones }
  const dimValue = parseInt(dimension.replace("px", ""), 10)
  const blurStrength = dimValue < 50 ? Math.max(dimValue * 0.008, 1) : Math.max(dimValue * 0.015, 4)
  const adjustedContrast = dimValue < 30 ? 1.1 : 1.5

  return (
    <div
      className={cn("color-orb", className)}
      style={{
        width: dimension,
        height: dimension,
        "--base": palette.base,
        "--accent1": palette.accent1,
        "--accent2": palette.accent2,
        "--accent3": palette.accent3,
        "--spin-duration": `${spinDuration}s`,
        "--blur": `${blurStrength}px`,
        "--contrast": adjustedContrast,
      } as React.CSSProperties}
    >
      <style jsx>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        .color-orb {
          display: grid;
          grid-template-areas: "stack";
          overflow: hidden;
          border-radius: 50%;
          position: relative;
        }
        .color-orb::before {
          content: "";
          grid-area: stack;
          width: 100%;
          height: 100%;
          background: conic-gradient(from var(--angle) at 50% 50%, var(--accent1), var(--accent2), var(--accent3), var(--accent1));
          filter: blur(var(--blur)) contrast(var(--contrast));
          animation: spin var(--spin-duration) linear infinite;
        }
        @keyframes spin { to { --angle: 360deg; } }
      `}</style>
    </div>
  )
}

const SPEED_FACTOR = 1

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
}

interface ContextShape {
  showForm: boolean
  messages: Message[]
  isTyping: boolean
  triggerOpen: () => void
  triggerClose: () => void
  handleSendMessage: (text: string) => void
}

const FormContext = React.createContext({} as ContextShape)
const useFormContext = () => React.useContext(FormContext)

export function MorphPanel() {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

  const [showForm, setShowForm] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    { id: "1", text: "Hi there! I'm the Salt concierge. How can I help you navigate our ventures today?", sender: "bot" }
  ])
  const [isTyping, setIsTyping] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const triggerClose = React.useCallback(() => {
    setShowForm(false)
    textareaRef.current?.blur()
  }, [])

  const triggerOpen = React.useCallback(() => {
    setShowForm(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)
  }, [])

  const handleSendMessage = React.useCallback(async (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), text, sender: "user" }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await response.json()
      
      if (data.text) {
        const botMsg: Message = { 
          id: Date.now().toString(), 
          text: data.text, 
          sender: "bot" 
        }
        setMessages(prev => [...prev, botMsg])
      }
    } catch (error) {
      console.error("AI API Error:", error)
    } finally {
      setIsTyping(false)
    }
  }, [])

  React.useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node) && showForm) {
        triggerClose()
      }
    }
    document.addEventListener("mousedown", clickOutsideHandler)
    return () => document.removeEventListener("mousedown", clickOutsideHandler)
  }, [showForm, triggerClose])

  const ctx = React.useMemo(
    () => ({ showForm, messages, isTyping, triggerOpen, triggerClose, handleSendMessage }),
    [showForm, messages, isTyping, triggerOpen, triggerClose, handleSendMessage]
  )

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[200]">
      <motion.div
        ref={wrapperRef}
        data-panel
        className={cx(
          "bg-[#FAF9F6] relative flex flex-col items-center overflow-hidden border border-[#1A1A1A]/10 shadow-[0_20px_50px_rgba(26,26,26,0.1)]"
        )}
        initial={false}
        animate={{
          width: showForm ? (isMobile ? window.innerWidth - 48 : 440) : (isMobile ? 180 : 240),
          height: showForm ? (messages.length > 1 ? (isMobile ? 500 : 600) : 200) : 48,
          borderRadius: showForm ? 24 : 32,
        }}
        transition={{
          type: "spring",
          stiffness: 550 / SPEED_FACTOR,
          damping: 45,
          mass: 0.7,
        }}
      >
        <FormContext.Provider value={ctx}>
          <div className="flex flex-col h-full w-full relative">
             <InputForm ref={textareaRef} />
             {!showForm && <DockBar />}
          </div>
        </FormContext.Provider>
      </motion.div>
    </div>
  )
}

function DockBar() {
  const { triggerOpen } = useFormContext()
  return (
    <div 
      className="absolute inset-0 flex items-center justify-between px-4 cursor-pointer group"
      onClick={triggerOpen}
    >
       <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Salt Logo" width={24} height={24} className="object-contain" />
          <span className="text-[11px] font-oswald font-bold uppercase tracking-[0.2em] text-[#1A1A1A] whitespace-nowrap">Ask Salt Intelligence</span>
       </div>
       <ArrowUpRight size={14} className="text-[#1A1A1A]/40 group-hover:text-[#1A1A1A] transition-colors" />
    </div>
  )
}

function InputForm({ ref }: { ref: React.Ref<HTMLTextAreaElement> }) {
  const { triggerClose, showForm, messages, isTyping, handleSendMessage } = useFormContext()
  const [inputValue, setInputValue] = React.useState("")
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!inputValue.trim()) return
    handleSendMessage(inputValue)
    setInputValue("")
  }

  function handleKeys(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") triggerClose()
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      btnRef.current?.click()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute inset-0 flex flex-col z-10"
      style={{ pointerEvents: showForm ? "all" : "none" }}
    >
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 shrink-0">
              <div className="flex items-center gap-3">
                 <Image src="/images/logo.png" alt="Logo" width={20} height={20} className="object-contain" />
                 <p className="text-[#1A1A1A] font-oswald font-bold uppercase tracking-widest text-[10px]">Salt Intelligence</p>
              </div>
              <button onClick={triggerClose} type="button" className="text-[#1A1A1A]/20 hover:text-[#1A1A1A] transition-colors"><X size={16} /></button>
            </div>

            {/* Chat History */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2 scrollbar-hide"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm font-medium ${
                    msg.sender === "user" ? "bg-[#1A1A1A] text-white" : "bg-white border border-[#1A1A1A]/5 text-[#1A1A1A]"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                 <div className="flex justify-start">
                    <div className="bg-white border border-[#1A1A1A]/5 px-5 py-3 rounded-2xl flex gap-1 items-center">
                        <span className="size-1 bg-[#1A1A1A]/20 rounded-full animate-bounce" />
                        <span className="size-1 bg-[#1A1A1A]/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="size-1 bg-[#1A1A1A]/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                 </div>
              )}
            </div>

            {/* Input Area */}
            <div className="relative shrink-0 border-t border-[#1A1A1A]/5 pt-4">
                <textarea
                    ref={ref}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about Salt Route..."
                    className="w-full bg-transparent resize-none text-[#1A1A1A] text-sm font-medium focus:outline-none placeholder:text-[#1A1A1A]/20 min-h-[40px] max-h-[120px]"
                    rows={1}
                    onKeyDown={handleKeys}
                />
                <button
                    ref={btnRef}
                    type="submit"
                    className="absolute right-0 bottom-1 size-8 bg-[#1A1A1A] text-white rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                    <Send size={14} />
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

export default MorphPanel
