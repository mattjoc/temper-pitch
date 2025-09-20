import { intervals } from '@/intervals'
import type { Chord } from '@/types'
import { accumulate } from '@/utils/accumulate'

export const invert = (chord: Chord): Chord => {
  const deltas = accumulate(intervals(chord))
  return [chord[0]!, ...deltas.map((delta) => chord[0]! - delta)]
}
