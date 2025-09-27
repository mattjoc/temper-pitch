import { interval as intervalFn } from '@/interval/interval'
import type { Interval, IntervalClass, Pitch } from '@/types'
import { modEdo } from '@/utils/modEdo'

export function intervalClass(interval: Interval): IntervalClass
export function intervalClass(startPitch: Pitch, endPitch: Pitch): IntervalClass
export function intervalClass(
  intervalOrStartPitch: Interval | Pitch,
  endPitch?: Pitch,
): number {
  const interval =
    endPitch !== undefined
      ? intervalFn(intervalOrStartPitch, endPitch)
      : intervalOrStartPitch
  const normalizedInterval = modEdo(Math.abs(interval))
  return Math.min(normalizedInterval, 12 - normalizedInterval)
}
