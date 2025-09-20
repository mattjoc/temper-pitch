import { describe, expect, it, suite } from 'vitest'
import { rotateArray } from './rotateArray'

suite.concurrent('rotateArray', () => {
  describe('basic functionality', () => {
    it('should rotate array from index 0 (no rotation)', () => {
      expect(rotateArray([1, 2, 3, 4, 5], 0)).toEqual([1, 2, 3, 4, 5])
    })

    it('should rotate array from index 1', () => {
      expect(rotateArray([1, 2, 3, 4, 5], 1)).toEqual([2, 3, 4, 5, 1])
    })

    it('should rotate array from index 2', () => {
      expect(rotateArray([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5, 1, 2])
    })

    it('should rotate array from middle index', () => {
      expect(rotateArray([1, 2, 3, 4, 5], 3)).toEqual([4, 5, 1, 2, 3])
    })

    it('should rotate array from last index', () => {
      expect(rotateArray([1, 2, 3, 4, 5], 4)).toEqual([5, 1, 2, 3, 4])
    })
  })

  describe('different data types', () => {
    it('should rotate string arrays', () => {
      expect(rotateArray(['a', 'b', 'c', 'd'], 2)).toEqual(['c', 'd', 'a', 'b'])
    })

    it('should rotate arrays with mixed types', () => {
      expect(rotateArray([1, 'a', true, null], 1)).toEqual(['a', true, null, 1])
    })

    it('should rotate object arrays', () => {
      const objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
      expect(rotateArray(objects, 1)).toEqual([{ id: 2 }, { id: 3 }, { id: 1 }])
    })

    it('should rotate boolean arrays', () => {
      expect(rotateArray([true, false, true, false], 2)).toEqual([
        true,
        false,
        true,
        false,
      ])
    })
  })

  describe('edge cases', () => {
    it('should handle empty array', () => {
      expect(rotateArray([], 0)).toEqual([])
    })

    it('should handle single element array', () => {
      expect(rotateArray([1], 0)).toEqual([1])
    })

    it('should handle two element array', () => {
      expect(rotateArray([1, 2], 1)).toEqual([2, 1])
    })

    it('should handle index equal to array length', () => {
      expect(rotateArray([1, 2, 3], 3)).toEqual([1, 2, 3])
    })

    it('should handle index greater than array length', () => {
      expect(rotateArray([1, 2, 3], 5)).toEqual([1, 2, 3])
    })

    it('should handle negative index', () => {
      expect(rotateArray([1, 2, 3, 4], -1)).toEqual([4, 1, 2, 3])
    })
  })

  describe('mathematical sequences', () => {
    it('should rotate consecutive integers', () => {
      expect(rotateArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5)).toEqual([
        5, 6, 7, 8, 9, 0, 1, 2, 3, 4,
      ])
    })

    it('should rotate fibonacci sequence', () => {
      expect(rotateArray([1, 1, 2, 3, 5, 8], 3)).toEqual([3, 5, 8, 1, 1, 2])
    })

    it('should rotate powers of 2', () => {
      expect(rotateArray([1, 2, 4, 8, 16], 2)).toEqual([4, 8, 16, 1, 2])
    })
  })

  describe('immutability', () => {
    it('should not modify the original array', () => {
      const original = [1, 2, 3, 4, 5]
      const result = rotateArray(original, 2)
      expect(original).toEqual([1, 2, 3, 4, 5])
      expect(result).toEqual([3, 4, 5, 1, 2])
      expect(result).not.toBe(original)
    })

    it('should create a new array reference', () => {
      const original = [1, 2, 3]
      const result = rotateArray(original, 1)
      expect(result).not.toBe(original)
    })
  })
})
