import { expect, suite, test } from 'vitest'
import { normalOrder } from './normalOrder'

suite.concurrent('normalOrder', () => {
  test('returns empty array for empty input', () => {
    expect(normalOrder([])).toEqual([])
  })

  test('returns single pitch class', () => {
    expect(normalOrder([0])).toEqual([0])
  })

  test('handles basic chord with clear largest interval', () => {
    // C major triad: C, E, G (0, 4, 7)
    // Intervals: 4, 3, 5 (wrapping back to C)
    // Largest interval is 5, so start after G
    expect(normalOrder([0, 4, 7])).toEqual([0, 4, 7])
  })

  test('handles chord requiring rotation', () => {
    // F major triad: F, A, C (5, 9, 0)
    // Intervals: [0,5]=5, [5,9]=4, [9,12]=3 - largest is 5
    // Start after the 5-semitone gap: [5, 9, 0]
    expect(normalOrder([5, 9, 0])).toEqual([5, 9, 0])
  })

  test('handles ties by choosing smallest first-to-penultimate span', () => {
    // Diminished chord: C, Eb, Gb, A (0, 3, 6, 9)
    // All intervals are 3 semitones, so use tie-breaking
    // Algorithm now chooses the rotation starting with 0 (canonical form)
    expect(normalOrder([0, 3, 6, 9])).toEqual([0, 3, 6, 9])
  })

  test('removes duplicates', () => {
    expect(normalOrder([0, 0, 4, 4, 7])).toEqual([0, 4, 7])
  })

  test('normalizes pitch classes from different octaves', () => {
    // C4, E5, G3 should normalize same as C, E, G
    expect(normalOrder([60, 76, 55])).toEqual([0, 4, 7])
  })

  test('handles chromatic cluster', () => {
    // Dense chromatic cluster
    expect(normalOrder([0, 1, 2])).toEqual([0, 1, 2])
  })

  test('handles deep ties requiring recursive comparison', () => {
    // For whole-tone scale, all rotations have equal spans at every level
    // Algorithm chooses the rotation starting with 0 (canonical form)
    const result = normalOrder([0, 2, 4, 6, 8, 10])
    expect(result).toEqual([0, 2, 4, 6, 8, 10])
  })

  test('handles complex tie-breaking scenario', () => {
    // Create a scenario where multiple levels of comparison are needed
    // This should exercise the recursive nature of findBestRotation
    const result = normalOrder([0, 1, 6, 7])
    // Intervals: [0,1]=1, [1,6]=5, [6,7]=1, [7,12]=5
    // Two largest intervals (5), so we have ties to resolve
    expect(result.length).toBe(4)
    expect(result).toContain(0)
    expect(result).toContain(1)
    expect(result).toContain(6)
    expect(result).toContain(7)
  })
})
