'use client'
import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { mockChatMessages } from '@/lib/mock-data'
import { Send } from 'lucide-react'

const suggestedQueries = [
  "What's important today?",
  'When is my next flight?',
  'Any bills due soon?',
  'Show me recent deliveries',
]

export default function AssistantPage() {
  const [messages, setMessages] = useState(mockChatMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: input, timestamp: 'Just now' },
      {
        role: 'assistant',
        content: "I'm analyzing your emails... Here's what I found based on your query.",
        timestamp: 'Just now',
      },
    ])
    setInput('')
  }

  return (
    <AppShell title="Assistant">
      <div className="flex h-[calc(100vh-120px)] gap-4">
        {/* Chat */}
        <div className="flex-1 flex flex-col bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-lg overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'user' ? (
                  <div className="max-w-[70%] px-4 py-2.5 rounded-lg bg-[#F0F0EE] dark:bg-[#1A1A1A]">
                    <p className="text-[13px] text-[#111111] dark:text-[#F2F2F2]">{msg.content}</p>
                    <p className="text-[10px] text-[#AAAAAA] dark:text-[#4A4A4A] mt-1 text-right">{msg.timestamp}</p>
                  </div>
                ) : (
                  <div className="max-w-[80%] pl-4 border-l-2 border-[#2E2E2E] dark:border-[#2E2E2E]">
                    <p className="text-[13px] text-[#111111] dark:text-[#F2F2F2] whitespace-pre-line leading-relaxed">
                      {msg.content}
                    </p>
                    <p className="text-[10px] text-[#AAAAAA] dark:text-[#4A4A4A] mt-1">{msg.timestamp}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Suggested queries */}
          <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
            {suggestedQueries.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="px-2.5 py-1 text-[11px] text-[#888888] dark:text-[#4A4A4A] bg-[#F0F0EE] dark:bg-[#1A1A1A] border border-[#DDDDD8] dark:border-[#2E2E2E] rounded-lg hover:border-[#888888] dark:hover:border-[#888888] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input bar */}
          <div className="p-3 border-t border-[#E4E4E0] dark:border-[#1F1F1F]">
            <div className="flex items-center gap-2 bg-[#F7F7F5] dark:bg-[#111111] border border-[#DDDDD8] dark:border-[#2E2E2E] rounded-lg px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your emails..."
                className="flex-1 text-[13px] bg-transparent text-[#111111] dark:text-[#F2F2F2] placeholder:text-[#AAAAAA] dark:placeholder:text-[#4A4A4A] outline-none"
              />
              <button
                onClick={handleSend}
                className="p-1 text-[#888888] dark:text-[#8A8A8A] hover:text-[#111111] dark:hover:text-[#F2F2F2] transition-colors"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Context panel */}
        <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#111111] border border-[#E4E4E0] dark:border-[#1F1F1F] rounded-lg p-4">
          <h3 className="text-[12px] font-medium text-[#111111] dark:text-[#F2F2F2] mb-3">Used insights</h3>
          <div className="space-y-2">
            {['Flight 6E 342 · Today 18:45', 'HDFC Bill · ₹8,240 due tomorrow', 'Pushpa 2 · PVR Forum'].map((item) => (
              <div
                key={item}
                className="px-3 py-2 bg-[#F7F7F5] dark:bg-[#1A1A1A] rounded-lg border border-[#E4E4E0] dark:border-[#1F1F1F]"
              >
                <p className="text-[11px] text-[#888888] dark:text-[#8A8A8A]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
