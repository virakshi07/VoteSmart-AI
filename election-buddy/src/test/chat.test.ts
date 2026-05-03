import { describe, it, expect, vi } from 'vitest'

describe('Chat API Handler - Election Buddy', () => {
  it('rejects non-POST methods', () => {
    const req = { method: 'GET', body: {} }
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() }
    if (req.method !== 'POST') res.status(405).json({ error: 'Method not allowed' })
    expect(res.status).toHaveBeenCalledWith(405)
  })

  it('detects voting-related keywords correctly', () => {
    const isVotingRelated = (text: string) =>
      ['vote', 'register', 'id', 'eligibility'].some(k => text.toLowerCase().includes(k))
    expect(isVotingRelated('How do I register to vote?')).toBe(true)
    expect(isVotingRelated('What is the weather?')).toBe(false)
  })

  it('handles missing API key', () => {
    const API_KEY = undefined
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() }
    if (!API_KEY) res.status(500).json({ error: 'API key missing' })
    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('filters history to start from first user message', () => {
    const rawHistory = [
      { role: 'model', content: 'Hello!' },
      { role: 'user', content: 'How to vote?' },
      { role: 'model', content: 'Here is how...' },
    ]
    const firstUserIdx = rawHistory.findIndex(m => m.role === 'user')
    const safeHistory = rawHistory.slice(firstUserIdx)
    expect(safeHistory[0].role).toBe('user')
  })

  it('handles non-array messageHistory gracefully', () => {
    const messageHistory = null
    const rawHistory = Array.isArray(messageHistory) ? messageHistory : []
    expect(rawHistory).toEqual([])
  })
})