import express from 'express'

const app = express()
app.use(express.json())

// Mock in-memory store
const sessions: Record<string, any> = {}

app.post('/api/quiz/register', (req, res) => {
  const { name, isOnline } = req.body || {}
  if (!name) return res.status(400).json({ error: 'name required' })
  const id = Date.now().toString()
  sessions[id] = { id, name, isOnline: !!isOnline, createdAt: Date.now() }
  return res.json({ success: true, student: sessions[id] })
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

const PORT = process.env.PORT ? Number(process.env.PORT) : 9000
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock API running on http://localhost:${PORT}`)
})
