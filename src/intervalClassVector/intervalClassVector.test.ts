import { expect, suite, test } from 'vitest'
import { intervalClassVector } from './intervalClassVector'

suite.concurrent('intervalClassVector', () => {
  test('returns empty ICV for empty chord', () => {
    const result = intervalClassVector([])
    expect(result.icv).toEqual([0, 0, 0, 0, 0, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('returns empty ICV for single note', () => {
    const result = intervalClassVector([60])
    expect(result.icv).toEqual([0, 0, 0, 0, 0, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('calculates ICV for major triad (C-E-G)', () => {
    const result = intervalClassVector([0, 4, 7])
    expect(result.icv).toEqual([0, 0, 1, 1, 1, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('calculates ICV for minor triad (A-C-E)', () => {
    // A minor triad: A, C, E (9, 0, 4)
    // Set class: [0, 3, 7] (transposed to start with 0)
    // Intervals: 3 (minor third), 4 (major third), 5 (perfect fourth)
    const result = intervalClassVector([9, 0, 4])
    expect(result.icv).toEqual([0, 0, 1, 1, 1, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('calculates ICV for diminished chord', () => {
    // Diminished chord: C, Eb, Gb, A (0, 3, 6, 9)
    // All intervals are minor thirds (3 semitones)
    const result = intervalClassVector([0, 3, 6, 9])
    expect(result.icv).toEqual([0, 0, 4, 0, 0, 2])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('calculates ICV for augmented chord', () => {
    // Augmented chord: C, E, G# (0, 4, 8)
    // All intervals are major thirds (4 semitones)
    const result = intervalClassVector([0, 4, 8])
    expect(result.icv).toEqual([0, 0, 0, 3, 0, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('calculates ICV for chromatic cluster', () => {
    // Chromatic cluster: C, C#, D (0, 1, 2)
    // Intervals: 1 (semitone), 1 (semitone), 2 (whole tone)
    const result = intervalClassVector([0, 1, 2])
    expect(result.icv).toEqual([2, 1, 0, 0, 0, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('calculates ICV for whole tone scale subset', () => {
    // Whole tone: C, D, E (0, 2, 4)
    // Intervals: 2 (whole tone), 2 (whole tone), 2 (whole tone)
    const result = intervalClassVector([0, 2, 4])
    expect(result.icv).toEqual([0, 2, 0, 1, 0, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('calculates ICV for seventh chord', () => {
    // Major 7th chord: C, E, G, B (0, 4, 7, 11)
    // Intervals include: 4, 3, 5, 1, 4, 3
    const result = intervalClassVector([0, 4, 7, 11])
    expect(result.icv).toEqual([1, 0, 1, 2, 2, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('handles pitch classes from different octaves', () => {
    // Same as major triad but in different octaves
    const result = intervalClassVector([60, 76, 67]) // C4, E5, G4
    expect(result.icv).toEqual([0, 0, 1, 1, 1, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('handles duplicate pitch classes', () => {
    // Major triad with duplicates
    const result = intervalClassVector([0, 0, 4, 4, 7])
    expect(result.icv).toEqual([0, 0, 1, 1, 1, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('calculates ICV for complex chord', () => {
    // All 12 chromatic notes
    const chromaticScale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const result = intervalClassVector(chromaticScale)
    // Each interval class should appear many times
    expect(result.icv).toEqual([12, 12, 12, 12, 12, 6])
    expect(result.icv.reduce((sum, count) => sum + count, 0)).toBe(66) // 12 choose 2
    expect(result.leastIntervalClass).toBe(1)
  })
  test('handles microtonal intervals with 0.5 least interval class', () => {
    // Test with quarter-tone intervals that would require 0.5 LIC
    // Using intervals that are multiples of 0.5 but not 1
    const result = intervalClassVector([0, 0.5, 1])
    expect(result.leastIntervalClass).toBe(0.5)
    expect(result.icv.length).toBe(12) // 12 / 2 / 0.5 = 12
  })
  test('handles microtonal intervals with 0.25 least interval class', () => {
    // Test with eighth-tone intervals that would require 0.25 LIC
    const result = intervalClassVector([0, 0.25, 0.5])
    expect(result.leastIntervalClass).toBe(0.25)
    expect(result.icv.length).toBe(24) // 12 / 2 / 0.25 = 24
  })
  test('maintains symmetry property', () => {
    // ICV should be symmetric under inversion
    const chord1 = [0, 4, 7] // Major triad
    const chord2 = [0, 3, 7] // Minor triad (inversion of major with same intervals)
    const result1 = intervalClassVector(chord1)
    const result2 = intervalClassVector(chord2)
    // Both should have the same interval content
    expect(result1.icv).toEqual(result2.icv)
  })
  test('calculates ICV for perfect fifths', () => {
    // Stack of perfect fifths: C, G (0, 7)
    const result = intervalClassVector([0, 7])
    expect(result.icv).toEqual([0, 0, 0, 0, 1, 0])
    expect(result.leastIntervalClass).toBe(1)
  })
  test('calculates ICV for tritone', () => {
    // Tritone: C, F# (0, 6)
    const result = intervalClassVector([0, 6])
    expect(result.icv).toEqual([0, 0, 0, 0, 0, 1])
  })
})
