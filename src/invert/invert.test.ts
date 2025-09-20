import { expect, suite, test } from 'vitest'
import type { Chord } from '@/types'
import { invert } from './invert'

suite.concurrent('invert', () => {
  test('handles empty chord (edge case)', () => {
    const chord: Chord = []
    expect(invert(chord)).toEqual([undefined, NaN])
  })

  test('handles single note chord (edge case)', () => {
    const chord: Chord = [60]
    expect(invert(chord)).toEqual([60, NaN])
  })

  test('inverts two-note chord', () => {
    const chord: Chord = [60, 64]
    expect(invert(chord)).toEqual([60, 56])
  })

  test('inverts three-note chord', () => {
    const chord: Chord = [60, 64, 67]
    expect(invert(chord)).toEqual([60, 56, 53])
  })

  test('inverts four-note chord', () => {
    const chord: Chord = [60, 64, 67, 72]
    expect(invert(chord)).toEqual([60, 56, 53, 48])
  })

  test('inverts C major triad [0, 4, 7]', () => {
    const chord: Chord = [0, 4, 7]
    expect(invert(chord)).toEqual([0, -4, -7])
  })

  test('inverts C minor triad [0, 3, 7]', () => {
    const chord: Chord = [0, 3, 7]
    expect(invert(chord)).toEqual([0, -3, -7])
  })

  test('inverts C major 7th chord [0, 4, 7, 11]', () => {
    const chord: Chord = [0, 4, 7, 11]
    expect(invert(chord)).toEqual([0, -4, -7, -11])
  })

  test('handles descending chord', () => {
    const chord: Chord = [67, 64, 60]
    expect(invert(chord)).toEqual([67, 70, 74])
  })

  test('handles mixed ascending and descending intervals', () => {
    const chord: Chord = [60, 67, 64, 72]
    expect(invert(chord)).toEqual([60, 53, 56, 48])
  })

  test('handles chord with unisons', () => {
    const chord: Chord = [60, 60, 64]
    expect(invert(chord)).toEqual([60, 60, 56])
  })

  test('handles large intervals', () => {
    const chord: Chord = [60, 84]
    expect(invert(chord)).toEqual([60, 36])
  })

  test('handles chromatic cluster', () => {
    const chord: Chord = [60, 61, 62, 63]
    expect(invert(chord)).toEqual([60, 59, 58, 57])
  })

  test('handles floating point pitches', () => {
    const chord: Chord = [60.5, 64.5, 67.5]
    expect(invert(chord)).toEqual([60.5, 56.5, 53.5])
  })

  test('preserves root note regardless of chord size', () => {
    const chord: Chord = [48, 52, 55, 60, 64, 67, 72]
    const inverted = invert(chord)
    expect(inverted[0]).toBe(48)
  })

  test('double inversion returns to original chord', () => {
    const chord: Chord = [0, 4, 7]
    const inverted = invert(chord)
    const doubleInverted = invert(inverted)
    expect(doubleInverted).toEqual(chord)
  })

  test('handles negative pitch classes', () => {
    const chord: Chord = [-12, -8, -5]
    expect(invert(chord)).toEqual([-12, -16, -19])
  })

  test('inversion of whole tone scale segment', () => {
    const chord: Chord = [60, 62, 64, 66, 68]
    expect(invert(chord)).toEqual([60, 58, 56, 54, 52])
  })
})
