import { pitchClass } from '@/pitchClass'
import type { Pitch, PitchClass } from '@/types'
import { findMostLeftCompactRotation } from '@/utils/findMostLeftCompactRotation'
import { rotateArray } from '@/utils/roateArray'

/**
 * Returns the normal order of a chord according to music theory principles.
 * Normal order is the most compressed way to write a given collection of pitch classes.
 *
 * Algorithm:
 * 1. Convert to pitch classes (eliminating duplicates) in ascending order
 * 2. Generate all possible rotations of the pitch class collection
 * 3. Compare rotations using recursive tie-breaking:
 *    - Compare first-to-last spans, choose smallest
 *    - If tied, compare first-to-second-last spans, etc.
 *    - Continue until tie is broken or all comparisons are equal
 *    - If all comparisons are equal, choose the rotation with the smallest first pitch class
 *
 * @param chord Array of pitch numbers
 * @returns Array representing the normal order of the chord
 */
export const normalOrder = (chord: Array<Pitch>): Array<PitchClass> => {
  if (!chord.length) {
    return []
  }

  // Convert chord to pitch classes, dedupe, and sort ascending
  const pitchClasses = Array.from(
    new Set(chord.map((pitch) => pitchClass(pitch))),
  ).sort((a, b) => a - b)

  // Handle single pitch class case
  if (pitchClasses.length === 1) {
    return pitchClasses as Array<PitchClass>
  }

  // Generate all possible rotations
  const allRotations = pitchClasses.map((_, index) => {
    return rotateArray(pitchClasses, index)
  })

  // Use recursive tie-breaking to find the best rotation
  return findMostLeftCompactRotation(allRotations) as Array<PitchClass>
}
