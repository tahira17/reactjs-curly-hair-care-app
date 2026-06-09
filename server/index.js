import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are Curl Haven's friendly AI hair assistant, specialising in curly, wavy and coily hair care.

You help users with:
- Building a curly hair routine
- Understanding their hair porosity and curl type
- Product recommendations (always CG friendly)
- Solving common curly hair problems like frizz, dryness, lack of definition
- The Curly Girl method explained simply

Rules:
- Always be warm, encouraging and friendly
- Keep answers concise and practical
- If you recommend products, mention ingredients to look for not specific brands
- If someone seems frustrated with their hair, be empathetic first
- Always remind users they can take the porosity or curl type quiz for more personalised advice
- Never recommend sulfates, silicones or drying alcohols`

app.post('/chat', async (req, res) => {
  const { messages } = req.body

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  })

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta') {
      res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`)
    }
  }

  res.write('data: [DONE]\n\n')
  res.end()
})

app.listen(3001, () => console.log('Server running on port 3001'))