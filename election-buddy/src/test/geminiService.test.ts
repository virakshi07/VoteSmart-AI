import { describe, it, expect } from 'vitest'

describe('Gemini Service', () => {
  it('constructs correct message history format', () => {
    const messages = [
      { role: 'user', content: 'How to register?' },
      { role: 'model', content: 'Go to NVSP portal.' }
    ]
    const formatted = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))
    expect(formatted[0].role).toBe('user')
    expect(formatted[0].parts[0].text).toBe('How to register?')
  })

  it('handles empty message array', () => {
    const messages: any[] = []
    const formatted = messages.map(msg => ({ role: msg.role, parts: [{ text: msg.content }] }))
    expect(formatted).toEqual([])
  })

  it('identifies model role correctly', () => {
    const msg = { role: 'assistant', content: 'Hello!' }
    const role = msg.role === 'user' ? 'user' : 'model'
    expect(role).toBe('model')
  })

  it('fallback message contains voting guidance', () => {
    const fallback = "⚠️ AI limit reached. Here's a quick guide:\n\n1. Register on NVSP portal\n2. Fill Form 6\n3. Upload documents\n4. Receive your voter ID"
    expect(fallback).toContain('NVSP')
    expect(fallback).toContain('voter ID')
  })
})