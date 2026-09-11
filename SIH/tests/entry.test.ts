import { describe, it, expect } from 'vitest'
import { parseQRData, validateBand, createDemoBand } from '../src/services/entry'

describe('Entry Service', () => {
  describe('parseQRData', () => {
    it('parses valid URL with band parameter', () => {
      const url = 'https://sih.example.com/?band=DEMO-BHOPAL-2024&dest=bhopal'
      const result = parseQRData(url)
      expect(result).not.toBeNull()
      expect(result?.id).toBe('DEMO-BHOPAL-2024')
      expect(result?.destination).toBe('bhopal')
    })

    it('parses direct band ID', () => {
      const result = parseQRData('BAND-TEST-123')
      expect(result).not.toBeNull()
      expect(result?.id).toBe('BAND-TEST-123')
      expect(result?.destination).toBe('bhopal')
    })

    it('returns null for invalid data', () => {
      expect(parseQRData('')).toBeNull()
      expect(parseQRData('ab')).toBeNull()
    })

    it('handles URL without band parameter', () => {
      const url = 'https://sih.example.com/?dest=bhopal'
      expect(parseQRData(url)).toBeNull()
    })
  })

  describe('validateBand', () => {
    it('accepts demo band', () => {
      const band = createDemoBand()
      const result = validateBand(band)
      expect(result.valid).toBe(true)
    })

    it('rejects expired band', () => {
      const result = validateBand({
        id: 'BAND-123456',
        destination: 'bhopal',
        token: '',
        expiresAt: '2020-01-01T00:00:00Z'
      })
      expect(result.valid).toBe(false)
      expect(result.error).toBe('expired')
    })

    it('rejects short band IDs', () => {
      const result = validateBand({
        id: 'ABC',
        destination: 'bhopal',
        token: ''
      })
      expect(result.valid).toBe(false)
      expect(result.error).toBe('invalid')
    })

    it('accepts valid non-expired band', () => {
      const result = validateBand({
        id: 'LONG-BAND-ID-123',
        destination: 'bhopal',
        token: 'test'
      })
      expect(result.valid).toBe(true)
    })
  })

  describe('createDemoBand', () => {
    it('creates a demo band with correct properties', () => {
      const band = createDemoBand()
      expect(band.id).toBe('DEMO-BHOPAL-2024')
      expect(band.destination).toBe('bhopal')
      expect(band.token).toBe('demo-token')
    })
  })
})
