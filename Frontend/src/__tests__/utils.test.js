import { describe, it, expect } from 'vitest'

// ---------------------------------------------------------------------------
// Utility helpers — lib/utils.js
// ---------------------------------------------------------------------------
import { cn } from '../lib/utils.js'

describe('cn (class name merger)', () => {
  it('returns a single class unchanged', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('merges multiple class strings', () => {
    const result = cn('text-sm', 'font-bold')
    expect(result).toContain('text-sm')
    expect(result).toContain('font-bold')
  })

  it('handles undefined and null gracefully', () => {
    const result = cn('base', undefined, null, 'extra')
    expect(result).toContain('base')
    expect(result).toContain('extra')
  })

  it('deduplicates conflicting Tailwind classes (tailwind-merge)', () => {
    // tailwind-merge resolves conflicts: last one wins
    const result = cn('text-sm', 'text-lg')
    expect(result).toBe('text-lg')
  })

  it('returns empty string when given no arguments', () => {
    expect(cn()).toBe('')
  })
})
