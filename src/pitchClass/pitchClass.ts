import type { Pitch, PitchClass } from '@/types'
import { modEdo } from '@/utils/modEdo'

export const pitchClass = (pitch: Pitch): PitchClass => modEdo(pitch)
