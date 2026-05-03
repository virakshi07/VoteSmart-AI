import { describe, it, expect } from 'vitest'

describe('Election Utility Logic', () => {
  it('validates non-empty candidate name', () => {
    const isValid = (name: string) => name.trim().length > 0
    expect(isValid('John Doe')).toBe(true)
    expect(isValid('')).toBe(false)
    expect(isValid('  ')).toBe(false)
  })

  it('handles null voter input safely', () => {
    const sanitize = (input: string | null) => input ?? 'Unknown'
    expect(sanitize(null)).toBe('Unknown')
    expect(sanitize('Delhi')).toBe('Delhi')
  })

  it('correctly counts votes', () => {
    const votes = [1, 1, 2, 3, 1, 2]
    const count = (arr: number[], val: number) => arr.filter(v => v === val).length
    expect(count(votes, 1)).toBe(3)
    expect(count(votes, 2)).toBe(2)
  })

  it('validates email format', () => {
    const isEmail = (val: string) => /\S+@\S+\.\S+/.test(val)
    expect(isEmail('voter@example.com')).toBe(true)
    expect(isEmail('invalid')).toBe(false)
  })

  it('formats election date correctly', () => {
    const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US')
    expect(formatDate('2026-11-03')).toBe('11/3/2026')
  })
})