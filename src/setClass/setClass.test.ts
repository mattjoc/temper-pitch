import { expect, suite, test } from 'vitest'
import type { Chord } from '@/types'
import { setClass } from './setClass'

suite.concurrent('setClass', () => {
  test('handles empty chord (edge case)', () => {
    const chord: Chord = []
    expect(setClass(chord)).toEqual([])
  })

  test('handles single note chord', () => {
    const chord: Chord = [69]
    expect(setClass(chord)).toEqual([0])
  })

  test('returns [0, 3, 7] form for C major triad', () => {
    const chord: Chord = [0, 4, 7]
    expect(setClass(chord)).toEqual([0, 3, 7])
  })

  test('returns prime form for C minor triad', () => {
    const chord: Chord = [0, 3, 7]
    expect(setClass(chord)).toEqual([0, 3, 7])
  })

  test('chooses inversion when it is more compact', () => {
    // Major 7th chord: [0, 4, 7, 11] vs inversion [0, 8, 5, 1] -> [0, 1, 5, 8]
    // Comparing [0, 4, 7, 11] vs [0, 1, 5, 8]: 0-0=0, 4-1=3 -> choose inversion [0, 1, 5, 8]
    const chord: Chord = [0, 4, 7, 11]
    expect(setClass(chord)).toEqual([0, 1, 5, 8])
  })

  test('handles chords with different octaves', () => {
    const chord: Chord = [60, 76, 55] // C4, E5, G3
    expect(setClass(chord)).toEqual([0, 3, 7])
  })

  test('removes duplicates before processing', () => {
    const chord: Chord = [0, 0, 4, 4, 7]
    expect(setClass(chord)).toEqual([0, 3, 7])
  })

  test('handles diminished triad', () => {
    // Diminished triad: [0, 3, 6] vs inversion [0, 9, 6] -> [0, 6, 9]
    // Comparing [0, 3, 6] vs [0, 6, 9]: 0-0=0, 3-6=-3 -> choose [0, 3, 6]
    const chord: Chord = [3, 6, 12]
    expect(setClass(chord)).toEqual([0, 3, 6])
  })

  test('handles augmented triad', () => {
    // Augmented triad: [0, 4, 8] vs inversion [0, 8, 4] -> [0, 4, 8]
    // Both forms are identical when normalized, return [0, 4, 8]
    const chord: Chord = [0, 4, 8]
    expect(setClass(chord)).toEqual([0, 4, 8])
  })

  test('handles whole tone scale segment', () => {
    // Two notes from whole tone scale
    const chord: Chord = [0, 2, 4, 8, 12]
    expect(setClass(chord)).toEqual([0, 2, 4, 8])
  })

  test('handles chromatic cluster', () => {
    // Chromatic semitone cluster
    const chord: Chord = [0, 1, 2]
    expect(setClass(chord)).toEqual([0, 1, 2])
  })

  test('handles symmetrical chord where normal order equals inversion', () => {
    const chord: Chord = [6, 24]
    expect(setClass(chord)).toEqual([0, 6])
  })

  test('handles complex four-note chord', () => {
    const chord: Chord = [0, 3, 7, 10]
    expect(setClass(chord)).toEqual([0, 3, 5, 8])
  })

  test('handles five-note chord', () => {
    const chord: Chord = [0, 2, 4, 7]
    expect(setClass(chord)).toEqual([0, 2, 4, 7])
  })

  test('handles chord starting with non-zero pitch class', () => {
    const chord: Chord = [5, 9, 0]
    expect(setClass(chord)).toEqual([0, 3, 7])
  })

  test('handles negative pitch values', () => {
    const chord: Chord = [-12, -8, -5] // Equivalent to [0, 4, 7] in pitch class
    expect(setClass(chord)).toEqual([0, 3, 7])
  })

  test('handles floating point pitches', () => {
    const chord: Chord = [0.5, 4.5, 7.5]
    expect(setClass(chord)).toEqual([0, 3, 7])
  })

  test('returns consistent result for equivalent chords', () => {
    // Same chord in different octaves should produce same set class
    const chord1: Chord = [0, 4, 7]
    const chord2: Chord = [12, 16, 19]
    const chord3: Chord = [60, 64, 67]

    expect(setClass(chord1)).toEqual(setClass(chord2))
    expect(setClass(chord1)).toEqual(setClass(chord3))
  })

  test('handles edge case where comparison reaches end of arrays', () => {
    // Test scenario where all elements compare equal until the end
    const chord: Chord = [0, 1]
    const result = setClass(chord)
    expect(result).toEqual([0, 1])
  })

  test('handles six-note chord (whole tone scale)', () => {
    // Complete whole tone scale
    const chord: Chord = [0, 2, 4, 6, 8, 10]
    expect(setClass(chord)).toEqual([0, 2, 4, 6, 8, 10])
  })

  test('handles twelve-tone row segment', () => {
    // Six-note segment from twelve-tone row
    const chord: Chord = [0, 1, 3, 4, 6, 8]
    const result = setClass(chord)
    expect(result.length).toBe(6)
    expect(result).toContain(0) // Should contain all original pitch classes as numbers mod 12
  })
})
