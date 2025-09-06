import { expect, suite, test } from 'vitest'
import type { Chord } from '@/types'
import { intervals } from './intervals'

suite.concurrent('intervals', () => {
  test('returns empty array for empty chord', () => {
    const chord: Chord = []
    expect(intervals(chord)).toEqual([])
  })

  test('returns empty array for single note chord', () => {
    const chord: Chord = [60]
    expect(intervals(chord)).toEqual([])
  })

  test('calculates interval for two-note chord', () => {
    const chord: Chord = [60, 64]
    expect(intervals(chord)).toEqual([4])
  })

  test('calculates intervals for three-note chord', () => {
    const chord: Chord = [60, 64, 67]
    expect(intervals(chord)).toEqual([4, 3])
  })

  test('calculates intervals for four-note chord', () => {
    const chord: Chord = [60, 64, 67, 72]
    expect(intervals(chord)).toEqual([4, 3, 5])
  })

  test('handles descending intervals (negative)', () => {
    const chord: Chord = [67, 64, 60]
    expect(intervals(chord)).toEqual([-3, -4])
  })

  test('handles mixed ascending and descending intervals', () => {
    const chord: Chord = [60, 67, 64, 72]
    expect(intervals(chord)).toEqual([7, -3, 8])
  })

  test('handles large intervals', () => {
    const chord: Chord = [60, 84]
    expect(intervals(chord)).toEqual([24])
  })

  test('handles chromatic sequence', () => {
    const chord: Chord = [60, 61, 62, 63, 64]
    expect(intervals(chord)).toEqual([1, 1, 1, 1])
  })

  test('handles zero intervals (unison)', () => {
    const chord: Chord = [60, 60, 60]
    expect(intervals(chord)).toEqual([0, 0])
  })

  test('calculates intervals for C major triad', () => {
    const chord: Chord = [60, 64, 67]
    expect(intervals(chord)).toEqual([4, 3])
  })

  test('calculates intervals for C minor triad', () => {
    const chord: Chord = [60, 63, 67]
    expect(intervals(chord)).toEqual([3, 4])
  })

  test('calculates intervals for C major 7th chord', () => {
    const chord: Chord = [60, 64, 67, 71]
    expect(intervals(chord)).toEqual([4, 3, 4])
  })

  test('handles floating point pitches', () => {
    const chord: Chord = [60.5, 64.5, 67.5]
    expect(intervals(chord)).toEqual([4, 3])
  })

  test('handles very large chord', () => {
    const chord: Chord = [48, 52, 55, 60, 64, 67, 72, 76, 79]
    expect(intervals(chord)).toEqual([4, 3, 5, 4, 3, 5, 4, 3])
  })
})
