import { describe, it, expect } from 'vitest'
import { en } from '../src/i18n/en'
import { hi } from '../src/i18n/hi'

describe('i18n', () => {
  it('has matching keys between English and Hindi', () => {
    const getKeys = (obj: Record<string, unknown>): string[] => {
      return Object.keys(obj).reduce((acc: string[], key) => {
        const val = obj[key]
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          return [...acc, ...getKeys(val as Record<string, unknown>).map(k => `${key}.${k}`)]
        }
        return [...acc, key]
      }, [])
    }

    const enKeys = getKeys(en as unknown as Record<string, unknown>)
    const hiKeys = getKeys(hi as unknown as Record<string, unknown>)

    expect(hiKeys.length).toBe(enKeys.length)

    const missingInHi = enKeys.filter(k => !hiKeys.includes(k))
    expect(missingInHi).toEqual([])
  })

  it('has all required sections', () => {
    expect(en.common).toBeDefined()
    expect(en.nav).toBeDefined()
    expect(en.entry).toBeDefined()
    expect(en.home).toBeDefined()
    expect(en.explore).toBeDefined()
    expect(en.place).toBeDefined()
    expect(en.itinerary).toBeDefined()
    expect(en.interests).toBeDefined()
    expect(en.help).toBeDefined()
    expect(en.map).toBeDefined()
  })
})
