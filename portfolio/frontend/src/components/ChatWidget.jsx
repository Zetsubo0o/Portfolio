import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiMessageCircle, FiX, FiSend, FiCpu, FiArrowRight, FiCalendar, FiExternalLink } from 'react-icons/fi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const WELCOME_MESSAGE = {
  role: 'model',
  text: "Hey! I'm Pranav's AI assistant. I can tell you about his services, help figure out what you need, or walk you through how he works. What brings you here today?",
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const chatContainerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
      setHasUnread(false)
    }
  }, [isOpen])

  const doSend = useCallback(async (text, currentMessages) => {
    const userMessage = { role: 'user', text }
    const updatedMessages = [...currentMessages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const history = updatedMessages
        .slice(1, -1)
        .map((m) => ({ role: m.role, text: m.text }))

      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })

      if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          { role: 'model', text: "You've been chatting a lot! Feel free to [Send a message →](/contact) or [Book a call →](https://calendly.com/kpranav715/30min)." },
        ])
        return
      }

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: data.reply || 'Sorry, I could not process that.' },
      ])

      if (!isOpen) setHasUnread(true)
    } catch (err) {
      console.error('Chat error:', err)
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: "I'm having trouble connecting right now. You can [Send Pranav a message →](/contact) or email him at kpranav715@gmail.com!" },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [isOpen])

  const sendMessage = () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return
    doSend(trimmed, messages)
  }

  const handleQuickSend = (text) => {
    if (isLoading) return
    doSend(text, messages)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Handle link clicks — internal pages use React Router, external open in new tab
  const handleLinkClick = (href, e) => {
    e.preventDefault()
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      navigate(href)
      setIsOpen(false) // close chat when navigating
    }
  }

  // Extract {{suggest:...}} tags from message text
  const extractSuggestions = (text) => {
    if (!text) return { cleanText: text, suggestions: [] }
    const suggestions = []
    const cleanText = text.replace(/\{\{suggest:([^}]+)\}\}/g, (_, s) => {
      suggestions.push(s.trim())
      return ''
    }).replace(/\n{3,}/g, '\n\n').trim()
    return { cleanText, suggestions }
  }

  // Parse message text into rich content with clickable links and bold
  const formatText = (text) => {
    if (!text) return ''

    return text.split('\n').map((line, lineIdx) => {
      // Skip empty lines left over from suggestion removal
      if (!line.trim()) {
        return lineIdx > 0 ? <br key={lineIdx} /> : null
      }

      // Split line by markdown links [text](url) and **bold**
      const parts = line.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g)

      const formatted = parts.map((part, partIdx) => {
        // Markdown link: [text](url)
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (linkMatch) {
          const linkText = linkMatch[1]
          const href = linkMatch[2]
          const isExternal = href.startsWith('http')
          const isCalendly = href.includes('calendly')

          if (isCalendly) {
            return (
              <button
                key={partIdx}
                onClick={(e) => handleLinkClick(href, e)}
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150"
                style={{
                  background: 'linear-gradient(135deg, #F5A623 0%, #D4881C 100%)',
                  color: '#070E1A',
                  boxShadow: '0 0 12px rgba(245,166,35,0.25)',
                }}
              >
                <FiCalendar size={13} />
                {linkText}
              </button>
            )
          }

          if (isExternal) {
            return (
              <button
                key={partIdx}
                onClick={(e) => handleLinkClick(href, e)}
                className="inline-flex items-center gap-1 text-accent hover:underline font-medium"
              >
                {linkText} <FiExternalLink size={11} />
              </button>
            )
          }

          // Internal page link — styled as a navigation chip
          return (
            <button
              key={partIdx}
              onClick={(e) => handleLinkClick(href, e)}
              className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-1 rounded-md text-[11.5px] font-medium transition-all duration-150 hover:border-accent/50"
              style={{
                color: '#F5A623',
                background: 'rgba(245,166,35,0.08)',
                border: '1px solid rgba(245,166,35,0.2)',
              }}
            >
              {linkText} <FiArrowRight size={11} />
            </button>
          )
        }

        // Bold: **text**
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="text-heading font-semibold">
              {part.slice(2, -2)}
            </strong>
          )
        }

        return part
      })

      return (
        <span key={lineIdx}>
          {lineIdx > 0 && <br />}
          {formatted}
        </span>
      )
    })
  }

  return (
    <>
      {/* Chat bubble button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group"
            style={{
              background: 'linear-gradient(135deg, #F5A623 0%, #D4881C 100%)',
              boxShadow: '0 0 20px rgba(245,166,35,0.35), 0 4px 16px rgba(0,0,0,0.4)',
            }}
            aria-label="Open AI chat"
          >
            <FiMessageCircle size={24} className="text-surface group-hover:scale-110 transition-transform" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-surface animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[390px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden"
            style={{
              height: 'min(600px, calc(100vh - 6rem))',
              background: '#070E1A',
              border: '1px solid rgba(245,166,35,0.15)',
              boxShadow: '0 0 40px rgba(245,166,35,0.12), 0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{
                background: 'linear-gradient(180deg, rgba(245,166,35,0.08) 0%, transparent 100%)',
                borderBottom: '1px solid rgba(245,166,35,0.1)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,166,35,0.2) 0%, rgba(245,166,35,0.08) 100%)',
                    border: '1px solid rgba(245,166,35,0.25)',
                  }}
                >
                  <FiCpu size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-heading leading-tight">Pranav's AI Assistant</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] text-muted">Online now</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted hover:text-heading"
                aria-label="Close chat"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Messages area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(245,166,35,0.2) transparent',
              }}
            >
              {messages.map((msg, i) => {
                const isLastAiMsg = msg.role === 'model' && i === messages.length - 1
                const { cleanText, suggestions } = msg.role === 'model'
                  ? extractSuggestions(msg.text)
                  : { cleanText: msg.text, suggestions: [] }

                return (
                  <div key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[88%] px-4 py-2.5 text-[13.5px] leading-relaxed ${
                          msg.role === 'user'
                            ? 'rounded-2xl rounded-br-md text-surface font-medium'
                            : 'rounded-2xl rounded-bl-md text-body'
                        }`}
                        style={
                          msg.role === 'user'
                            ? {
                                background: 'linear-gradient(135deg, #F5A623 0%, #D4881C 100%)',
                              }
                            : {
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.06)',
                              }
                        }
                      >
                        {formatText(cleanText)}
                      </div>
                    </motion.div>

                    {/* Follow-up suggestions — only show on the last AI message, and not while loading */}
                    {isLastAiMsg && suggestions.length > 0 && !isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.15 }}
                        className="flex flex-wrap gap-1.5 mt-2 ml-1"
                      >
                        {suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => handleQuickSend(s)}
                            className="text-[11px] px-2.5 py-1.5 rounded-full border transition-all duration-150 hover:border-accent/40 hover:text-accent hover:bg-accent/5"
                            style={{
                              color: '#7A8FA6',
                              borderColor: 'rgba(255,255,255,0.1)',
                              background: 'rgba(255,255,255,0.02)',
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions (shown only when just welcome message) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {[
                  'What services do you offer?',
                  'Tell me about AI features',
                  'I want to book a call',
                  'Show me your projects',
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickSend(q)}
                    className="text-[11.5px] px-3 py-1.5 rounded-full border transition-all duration-150 hover:border-accent/40 hover:text-accent"
                    style={{
                      color: '#7A8FA6',
                      borderColor: 'rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input area */}
            <div
              className="px-4 py-3 shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-2.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-[13.5px] text-heading placeholder:text-muted/50 outline-none disabled:opacity-50"
                  maxLength={2000}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-1.5 rounded-lg transition-all duration-150 disabled:opacity-30"
                  style={{
                    color: input.trim() ? '#F5A623' : '#7A8FA6',
                  }}
                  aria-label="Send message"
                >
                  <FiSend size={16} />
                </button>
              </div>
              <p className="text-[10px] text-muted/40 text-center mt-2">
                AI-powered by Pranav · Responses may not always be perfect
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
