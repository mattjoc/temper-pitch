import { invert } from '@/invert'
import { normalOrder } from '@/normalOrder'
import { transpose } from '@/transpose'
import type { Chord, SetClass } from '@/types'
import { modEdo } from '@/utils/modEdo'

export const setClass = (chord: Chord): SetClass => {
  if (chord.length === 0) {
    return []
  }

  if (chord.length === 1) {
    return [0]
  }

  const no = normalOrder(chord)
  const tno = transpose(no, -no[0]!).map(modEdo)

  const ino = normalOrder(invert(chord))
  const tino = transpose(ino, -ino[0]!).map(modEdo)

  for (let i = 0; i < tno.length; i++) {
    const d = tno[i]! - tino[i]!
    if (d > 0) {
      return tino
    } else if (d < 0) {
      return tno
    }
  }

  return tno
}
