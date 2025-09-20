import { expect, suite, test } from 'vitest'
import type { Chord, Interval } from '@/types'
import { transpose } from './transpose'

suite.concurrent('transpose', () => {
  test('transposes empty chord', () => {
    const chord: Chord = []
    const interval: Interval = 2
    expect(transpose(chord, interval)).toEqual([])
  })

  test('transposes single note up', () => {
    const chord: Chord = [60]
    const interval: Interval = 2
    expect(transpose(chord, interval)).toEqual([62])
  })

  test('transposes single note down', () => {
    const chord: Chord = [60]
    const interval: Interval = -2
    expect(transpose(chord, interval)).toEqual([58])
  })

  test('transposes C major triad up a whole step', () => {
    const chord: Chord = [60, 64, 67]
    const interval: Interval = 2
    expect(transpose(chord, interval)).toEqual([62, 66, 69])
  })

  test('transposes chord down an octave', () => {
    const chord: Chord = [60, 64, 67]
    const interval: Interval = -12
    expect(transpose(chord, interval)).toEqual([48, 52, 55])
  })

  test('transposes by zero (no change)', () => {
    const chord: Chord = [60, 64, 67]
    const interval: Interval = 0
    expect(transpose(chord, interval)).toEqual([60, 64, 67])
  })
})
