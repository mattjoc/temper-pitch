import { expect, suite, test } from 'vitest'
import { modEdo } from './modEdo'

suite.concurrent('modEdo', () => {
  test('returns same value for inputs within range [0, 12)', () => {
    expect(modEdo(0)).toBe(0)
    expect(modEdo(1)).toBe(1)
    expect(modEdo(5)).toBe(5)
    expect(modEdo(11)).toBe(11)
  })

  test('wraps positive values greater than or equal to 12', () => {
    expect(modEdo(12)).toBe(0)
    expect(modEdo(13)).toBe(1)
    expect(modEdo(24)).toBe(0)
    expect(modEdo(25)).toBe(1)
    expect(modEdo(17)).toBe(5)
  })

  test('handles negative values correctly', () => {
    expect(modEdo(-1)).toBe(11)
    expect(modEdo(-2)).toBe(10)
    expect(modEdo(-12)).toBe(0)
    expect(modEdo(-13)).toBe(11)
    expect(modEdo(-24)).toBe(0)
    expect(modEdo(-25)).toBe(11)
  })

  test('handles decimal values', () => {
    expect(modEdo(12.5)).toBeCloseTo(0.5)
    expect(modEdo(13.7)).toBeCloseTo(1.7)
    expect(modEdo(-0.5)).toBeCloseTo(11.5)
    expect(modEdo(-1.3)).toBeCloseTo(10.7)
  })

  test('handles large positive values', () => {
    expect(modEdo(144)).toBe(0)
    expect(modEdo(145)).toBe(1)
    expect(modEdo(156)).toBe(0)
  })

  test('handles large negative values', () => {
    expect(modEdo(-144)).toBe(0)
    expect(modEdo(-145)).toBe(11)
    expect(modEdo(-156)).toBe(0)
  })

  test('always returns value in range [0, 12)', () => {
    const testValues = [0, 1, -1, 12, -12, 25, -25, 144, -144, 12.5, -12.5]

    testValues.forEach((value) => {
      const result = modEdo(value)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(12)
    })
  })
})
