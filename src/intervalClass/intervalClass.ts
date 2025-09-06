import type { Pitch } from '@/types'
import { modEdo } from '@/utils/modEdo'
import { interval } from '../interval/interval'

export const intervalClass = (start: Pitch, end: Pitch) =>
  modEdo(Math.abs(interval(start, end)))
