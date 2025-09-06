import type { Interval, Pitch } from '@/types'

export const interval = (start: Pitch, end: Pitch): Interval => end - start
