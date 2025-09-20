import type { Chord, Interval } from '@/types'

export const transpose = (chord: Chord, interval: Interval): Chord => {
  return chord.map((note) => note + interval)
}

export const t = transpose
