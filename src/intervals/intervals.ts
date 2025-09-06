import type { Chord, Interval } from '@/types'

export const intervals = (chord: Chord): Array<Interval> => {
  if (chord.length < 2) {
    return []
  }

  const intervals: Array<Interval> = []

  for (let i = 0; i < chord.length - 1; i++) {
    intervals.push(chord[i + 1]! - chord[i]!)
  }

  return intervals
}
