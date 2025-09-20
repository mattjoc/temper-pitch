import { describe, expect, it, suite } from 'vitest'
import { accumulate } from './accumulate'

suite.concurrent('accumulate', () => {
  describe('basic functionality', () => {
    it('should accumulate a single number', () => {
      expect(accumulate([5])).toEqual([5])
    })

    it('should accumulate two numbers', () => {
      expect(accumulate([1, 2])).toEqual([1, 3])
    })

    it('should accumulate multiple positive numbers', () => {
      expect(accumulate([1, 2, 3, 4])).toEqual([1, 3, 6, 10])
    })

    it('should accumulate multiple numbers with negatives', () => {
      expect(accumulate([1, -2, 3, -4])).toEqual([1, -1, 2, -2])
    })

    it('should accumulate starting with negative number', () => {
      expect(accumulate([-1, 2, -3, 4])).toEqual([-1, 1, -2, 2])
    })

    it('should accumulate zeros', () => {
      expect(accumulate([0, 0, 0])).toEqual([0, 0, 0])
    })

    it('should accumulate mixed with zeros', () => {
      expect(accumulate([1, 0, 2, 0, 3])).toEqual([1, 1, 3, 3, 6])
    })
  })

  describe('edge cases', () => {
    it('should handle decimal numbers', () => {
      expect(accumulate([1.5, 2.5, -1])).toEqual([1.5, 4, 3])
    })

    it('should handle very small numbers', () => {
      expect(accumulate([0.1, 0.2, 0.3])).toEqual([
        0.1, 0.30000000000000004, 0.6000000000000001,
      ])
    })

    it('should handle large numbers', () => {
      expect(accumulate([1000000, 2000000, -500000])).toEqual([
        1000000, 3000000, 2500000,
      ])
    })
  })

  describe('mathematical sequences', () => {
    it('should accumulate consecutive integers', () => {
      expect(accumulate([1, 2, 3, 4, 5])).toEqual([1, 3, 6, 10, 15])
    })

    it('should accumulate alternating positive and negative', () => {
      expect(accumulate([1, -1, 1, -1, 1])).toEqual([1, 0, 1, 0, 1])
    })

    it('should accumulate powers of 2', () => {
      expect(accumulate([1, 2, 4, 8])).toEqual([1, 3, 7, 15])
    })
  })
})
