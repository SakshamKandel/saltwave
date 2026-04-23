"use client"

import React, { createContext, useContext, useEffect, useState, useRef, useCallback, memo, useMemo } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ===== TYPES =====

type MenuOption = "Auto" | "Max" | "Search" | "Plan";

interface RippleEffect {
  x: number;
  y: number;
  id: number;
}

interface Position {
  x: number;
  y: number;
}

interface ChatInputProps {
  /**
   * Placeholder text for the input field
   */
  placeholder?: string;
  /**
   * Function called when the form is submitted
   */
  onSubmit?: (value: string) => void;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Intensity of the glow effect (0.1 to 1.0)
   */
  glowIntensity?: number;
  /**
   * Whether the input expands on focus
   */
  expandOnFocus?: boolean;
  /**
   * Duration of animations in ms
   */
  animationDuration?: number;
  /**
   * Text color
   */
  textColor?: string;
  /**
   * Background opacity (0.1 to 1.0)
   */
  backgroundOpacity?: number;
  /**
   * Whether to show visual effects
   */
  showEffects?: boolean;
  /**
   * Available menu options
   */
  menuOptions?: MenuOption[];
}

interface InputAreaProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  disabled: boolean;
  isSubmitDisabled: boolean;
  textColor: string;
}

interface GlowEffectsProps {
  glowIntensity: number;
  mousePosition: Position;
  animationDuration: number;
  enabled: boolean;
}

interface RippleEffectsProps {
  ripples: RippleEffect[];
  enabled: boolean;
}

interface MenuButtonProps {
  toggleMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  isMenuOpen: boolean;
  onSelectOption: (option: MenuOption) => void;
  textColor: string;
  menuOptions: MenuOption[];
}

interface SelectedOptionsProps {
  options: MenuOption[];
  onRemove: (option: MenuOption) => void;
  textColor: string;
}

interface SendButtonProps {
  isDisabled: boolean;
  textColor: string;
}

interface OptionsMenuProps {
  isOpen: boolean;
  onSelect: (option: MenuOption) => void;
  textColor: string;
  menuOptions: MenuOption[];
}

interface OptionTagProps {
  option: MenuOption;
  onRemove: (option: MenuOption) => void;
  textColor: string;
}

// ===== CONTEXT =====

interface ChatInputContextProps {
  mousePosition: Position;
  ripples: RippleEffect[];
  addRipple: (x: number, y: number) => void;
  animationDuration: number;
  glowIntensity: number;
  textColor: string;
  showEffects: boolean;
}

const ChatInputContext = createContext<ChatInputContextProps | undefined>(undefined);

function useChatInputContext() {
  const context = useContext(ChatInputContext);
  if (context === undefined) {
    throw new Error("useChatInputContext must be used within a ChatInputProvider");
  }
  return context;
}

// ===== COMPONENTS =====

// Send button component
const SendButton = memo(({ 
  isDisabled,
  textColor
}: SendButtonProps) => {
  return (
    <button
      type="submit"
      aria-label="Send message"
      disabled={isDisabled}
      className={`ml-auto self-center h-8 w-8 flex items-center justify-center rounded-full border-0 p-0 transition-all z-20 ${
        isDisabled
          ? 'opacity-40 cursor-not-allowed bg-white/5 text-white/30'
          : 'opacity-90 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:opacity-100 cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
      }`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`block ${isDisabled ? "opacity-50" : "opacity-100"}`}
      >
        <path
          d="M16 22L16 10M16 10L11 15M16 10L21 15"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});

// Options menu component
const OptionsMenu = memo(({ 
  isOpen, 
  onSelect,
  textColor,
  menuOptions 
}: OptionsMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg overflow-hidden z-30 min-w-[120px]">
      <ul className="py-1">
        {menuOptions.map((option) => (
          <li
            key={option}
            className={`px-4 py-2 hover:bg-white/10 cursor-pointer text-sm font-medium text-white`}
            style={{ fontFamily: '"Inter", sans-serif' }}
            onClick={() => onSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
});

// Option tag component
const OptionTag = memo(({ 
  option, 
  onRemove,
  textColor 
}: OptionTagProps) => (
  <div
    className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md text-xs text-white"
    style={{ fontFamily: '"Inter", sans-serif' }}
  >
    <span>{option}</span>
    <button
      type="button"
      onClick={() => onRemove(option)}
      className="h-4 w-4 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
));

// Visual effects component
const GlowEffects = memo(({ 
  glowIntensity, 
  mousePosition,
  animationDuration,
  enabled
}: GlowEffectsProps) => {
  if (!enabled) return null;
  
  const transitionStyle = `transition-opacity duration-${animationDuration}`;
  
  return (
    <>
      {/* Enhanced liquid glass background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/8 via-white/12 to-white/8 backdrop-blur-2xl rounded-3xl"></div>
      
      {/* Outside border glow effect */}
      <div
        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ${transitionStyle} pointer-events-none`}
        style={{
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, ${0.1 * glowIntensity}),
            0 0 8px rgba(255, 255, 255, ${0.2 * glowIntensity})
          `,
          filter: 'blur(0.5px)',
        }}
      ></div>
      
      {/* Enhanced outside glow on hover */}
      <div
        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 ${transitionStyle} pointer-events-none`}
        style={{
          boxShadow: `
            0 0 12px rgba(255, 255, 255, ${0.15 * glowIntensity})
          `,
          filter: 'blur(1px)',
        }}
      ></div>
      
      {/* Cursor following gradient */}
      <div
        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none blur-sm`}
        style={{
          background: `radial-gradient(circle 120px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.05) 0%, transparent 100%)`,
        }}
      ></div>
      
      {/* Subtle trail animation overlay */}
      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 overflow-hidden blur-sm`}>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/8 to-transparent transform -translate-x-full group-hover:translate-x-full"
          style={{ 
            transitionProperty: 'transform',
            transitionDuration: `${animationDuration * 2}ms`,
            transitionTimingFunction: 'ease-out'
          }}
        ></div>
      </div>
      
      {/* Subtle shimmer overlay */}
      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-25 ${transitionStyle} bg-gradient-to-r from-transparent via-white/4 to-transparent animate-pulse blur-sm`}></div>
      
      {/* Minimal background on hover */}
      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 group-focus-within:opacity-5 transition-opacity duration-300 bg-white blur-sm`}></div>
    </>
  );
});

// Ripple effects component
const RippleEffects = memo(({ ripples, enabled }: RippleEffectsProps) => {
  if (!enabled || ripples.length === 0) return null;
  
  return (
    <>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none blur-sm"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: 50,
            height: 50,
          }}
        >
          <div className="w-full h-full rounded-full bg-white/10 animate-ping"></div>
        </div>
      ))}
    </>
  );
});

// Input area component
const InputArea = memo(({ 
  value,
  setValue,
  placeholder,
  handleKeyDown,
  disabled,
  isSubmitDisabled,
  textColor
}: InputAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const lineHeight = 22;
      const maxHeight = lineHeight * 4 + 16;
      textareaRef.current.style.height =
        Math.min(scrollHeight, maxHeight) + "px";
    }
  }, [value]);
  
  return (
    <div className="flex-1 relative h-full flex items-center">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Message Input"
        rows={1}
        className="w-full min-h-8 max-h-24 bg-transparent text-sm font-normal text-left self-center text-white placeholder-white/30 border-0 outline-none px-3 pr-10 py-1 z-20 relative resize-none overflow-hidden scrollbar-hide flex items-center"
        style={{
          fontFamily: '"Inter", sans-serif',
          letterSpacing: "-0.14px",
          lineHeight: "22px",
          display: 'flex',
          alignItems: 'center'
        }}
        disabled={disabled}
      />
      <SendButton isDisabled={isSubmitDisabled} textColor={textColor} />
    </div>
  );
});

// Menu Button component
const MenuButton = memo(({ 
  toggleMenu,
  menuRef,
  isMenuOpen,
  onSelectOption,
  textColor,
  menuOptions
}: MenuButtonProps) => (
  <div className="relative" ref={menuRef}>
    <button
      type="button"
      onClick={toggleMenu}
      aria-label="Menu options"
      className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all ml-1 mr-1"
    >
      <Plus size={16} />
    </button>
    <OptionsMenu 
      isOpen={isMenuOpen} 
      onSelect={onSelectOption} 
      textColor={textColor}
      menuOptions={menuOptions}
    />
  </div>
));

// Selected options component
const SelectedOptions = memo(({ 
  options,
  onRemove,
  textColor
}: SelectedOptionsProps) => {
  if (options.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mt-2 pl-3 pr-3 z-20 relative">
      {options.map((option) => (
        <OptionTag 
          key={option} 
          option={option} 
          onRemove={onRemove} 
          textColor={textColor}
        />
      ))}
    </div>
  );
});

export default function ChatGPTInput({
  placeholder = "",
  onSubmit = (value: string) => console.log("Submitted:", value),
  disabled = false,
  glowIntensity = 0.6,
  expandOnFocus = true,
  animationDuration = 500,
  textColor = "#FFFFFF",
  backgroundOpacity = 0.1,
  showEffects = true,
  menuOptions = ["Auto", "Max", "Search", "Plan"] as MenuOption[]
}: ChatInputProps) {
  // State
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<{id: number, text: string, sender: 'user' | 'bot'}[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<MenuOption[]>([]);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 50, y: 50 });

  // Refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const throttleRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle submit
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim() && !disabled) {
        const userMsg = { id: Date.now(), text: value.trim(), sender: 'user' as const };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setValue("");
        setIsChatOpen(true);
        setIsLoading(true);
        
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: updatedMessages }),
          });

          const data = await response.json();
          
          if (data.text) {
            setMessages(prev => [...prev, { 
              id: Date.now() + 1, 
              text: data.text, 
              sender: 'bot' as const 
            }]);
          } else {
            throw new Error("Empty response");
          }
        } catch (error) {
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            text: "My apologies. I'm having trouble connecting to our systems. Please reach out to info@saltroutegroup.com for urgent inquiries.", 
            sender: 'bot' as const 
          }]);
        } finally {
          setIsLoading(false);
        }

        if (onSubmit) onSubmit(value.trim());
      }
    },
    [value, onSubmit, disabled]
  );

  // Handle key down
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as any);
      }
    },
    [handleSubmit]
  );

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!showEffects) return;
    
    if (containerRef.current && !throttleRef.current) {
      throttleRef.current = window.setTimeout(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setMousePosition({ x, y });
        }
        throttleRef.current = null;
      }, 50); // throttle to 50ms
    }
  }, [showEffects]);

  // Add ripple effect
  const addRipple = useCallback((x: number, y: number) => {
    if (!showEffects) return;
    
    // Limit number of ripples for performance
    if (ripples.length < 5) {
      const newRipple: RippleEffect = {
        x,
        y,
        id: Date.now(),
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
  }, [ripples, showEffects]);

  // Handle click for ripple effect
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      addRipple(x, y);
    }
  }, [addRipple]);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Select option
  const selectOption = useCallback((option: MenuOption) => {
    setSelectedOptions(prev => {
      if (!prev.includes(option)) {
        return [...prev, option];
      }
      return prev;
    });
    setIsMenuOpen(false);
  }, []);

  // Remove option
  const removeOption = useCallback((option: MenuOption) => {
    setSelectedOptions(prev => prev.filter(opt => opt !== option));
  }, []);

  // Create context value
  const contextValue = useMemo(() => ({
    mousePosition,
    ripples,
    addRipple,
    animationDuration,
    glowIntensity,
    textColor,
    showEffects
  }), [mousePosition, ripples, addRipple, animationDuration, glowIntensity, textColor, showEffects]);

  // Check if submit is disabled
  const isSubmitDisabled = disabled || !value.trim();

  // Calculate width classes
  const hasModeSelected = selectedOptions.length > 0;
  const shouldExpandOnFocus = expandOnFocus && !hasModeSelected;
  const baseWidthClass = hasModeSelected ? "w-96" : "w-56";
  const focusWidthClass = shouldExpandOnFocus ? "focus-within:w-96" : "";

  // Background opacity class
  const backgroundClass = `bg-[#FAF9F6]/20 backdrop-blur-2xl border border-white/10`;

  return (
    <ChatInputContext.Provider value={contextValue}>
      {/* Message Pop-up Area */}
      <div 
        className={`fixed bottom-28 right-8 z-[200] flex flex-col gap-6 items-end max-w-[400px] pointer-events-auto transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] max-h-[60vh] overflow-y-auto scrollbar-hide p-8 scroll-smooth ${isChatOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="h-16 shrink-0" />
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.23, 1, 0.32, 1] }}
            key={msg.id} 
            className={`px-7 py-5 rounded-[32px] text-[15.5px] leading-relaxed shadow-[0_30px_70px_rgba(0,0,0,0.4)] backdrop-blur-[32px] border border-white/10 pointer-events-auto transition-all duration-500 hover:scale-[1.03] hover:border-white/20 active:scale-100 ${
              msg.sender === 'user' 
                ? 'bg-white/15 text-white rounded-br-none ml-12 shadow-white/5' 
                : 'bg-black/60 text-white/95 font-medium rounded-bl-none mr-12 shadow-black/80'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-7 py-4 bg-white/5 backdrop-blur-2xl border border-white/5 text-white/30 text-[13px] tracking-wider uppercase font-oswald rounded-[24px] rounded-bl-none animate-pulse"
          >
            Salt Route is analyzing...
          </motion.div>
        )}
        <div ref={messagesEndRef} className="h-16 shrink-0" />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`fixed bottom-6 right-8 z-[200] min-h-10 ${baseWidthClass} transition-all duration-${animationDuration} ease-out ${focusWidthClass} translate-y-0 opacity-100 flex items-center justify-center`}
        style={{
          transition: `transform ${animationDuration}ms, opacity 200ms, width ${animationDuration}ms`,
        }}
      >
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          className={`relative flex flex-col w-full min-h-full ${backgroundClass} shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-2xl p-1 overflow-visible group transition-all duration-${animationDuration} border border-white/5`}
          style={{
            transition: `all ${animationDuration}ms ease, box-shadow ${animationDuration}ms ease`,
          }}
        >
          {/* Visual effects */}
          <GlowEffects 
            glowIntensity={glowIntensity} 
            mousePosition={mousePosition} 
            animationDuration={animationDuration}
            enabled={showEffects}
          />
          
          {/* Ripple effects */}
          <RippleEffects ripples={ripples} enabled={showEffects} />
          
          {/* Input row */}
          <div className="flex items-center relative z-20 h-9 overflow-hidden">
            <div className="pl-4 pr-3 border-r border-white/10 flex items-center h-full self-center">
              <span className="text-[9px] uppercase tracking-[0.25em] font-oswald text-white/40 whitespace-nowrap leading-none">Salt Route</span>
            </div>
            
            <InputArea
              value={value}
              setValue={setValue}
              placeholder={placeholder}
              handleKeyDown={handleKeyDown}
              disabled={disabled}
              isSubmitDisabled={isSubmitDisabled}
              textColor={textColor}
            />

            <div className="flex items-center gap-1 pr-1">
              <button 
                type="button"
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="h-7 w-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all shrink-0"
              >
                <svg 
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-transform duration-500 ${isChatOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>
    </ChatInputContext.Provider>
  );
}
