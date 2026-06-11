import { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your Curl Haven AI assistant 🌀 Ask me anything about your curly hair — routines, products, porosity, curl types, you name it!"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
  
    const userMessage = { role: 'user', content: input }
    const updatedHistory = [...messages, userMessage]
  
    setMessages([...updatedHistory, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)
  
    // Filter out any leading assistant messages before sending to API
    const apiMessages = updatedHistory.filter((_, i) => {
      if (i === 0 && updatedHistory[0].role === 'assistant') return false
      return true
    })
  
    const res = await fetch('http://localhost:3001/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiMessages }),
    })
  
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let assistantText = ''
  
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
  
      const lines = decoder.decode(value).split('\n')
      for (const line of lines) {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          const { text } = JSON.parse(line.slice(6))
          assistantText += text
          setMessages((prev) => [
            ...prev.slice(0, -1),
            { role: 'assistant', content: assistantText },
          ])
        }
      }
    }
  
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>AI Hair Assistant — Curly Hair Advice | The Curl Haven</title>
        <meta name="description" content="Ask our AI anything about your curly hair. Get personalised advice on routines, products, porosity and curl types for free." />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading text-charcoal mb-1">AI Hair Assistant</h1>
        <p className="text-charcoal/60 font-sans mb-6">Ask me anything about your curly hair</p>

        {/* Suggested questions */}
        <div className="flex gap-2 flex-wrap mb-6">
          {[
            "How do I build a curly routine?",
            "What is the LOC method?",
            "Why is my hair so frizzy?",
          ].map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              className="text-xs font-sans border border-mauve/60 text-charcoal/70 px-3 py-1.5 rounded-full hover:border-purple hover:text-purple transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="border border-mauve/40 rounded-2xl overflow-hidden">
          <div className="h-[420px] overflow-y-auto p-6 flex flex-col gap-4 bg-cream">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl font-sans text-sm leading-relaxed
                  ${m.role === 'user'
                    ? 'bg-purple text-white rounded-br-none'
                    : 'bg-white border border-mauve/40 text-charcoal rounded-bl-none'
                  }`}>
                  {m.content || '▍'}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-mauve/40 p-4 flex gap-3 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about your curly hair..."
              className="flex-1 font-sans text-sm text-charcoal placeholder-charcoal/40 outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-purple text-white px-5 py-2 rounded-full font-sans text-sm hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}