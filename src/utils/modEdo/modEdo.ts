import { EQUAL_DIVISIONS_OF_THE_OCTAVE } from '@/consts'

/**
 * Calculates the modulo of a value with respect to the equal divisions of the octave.
 * This ensures the result is always positive and within the range [0, EQUAL_DIVISIONS_OF_THE_OCTAVE).
 *
 * @param value - The input value to be taken modulo EQUAL_DIVISIONS_OF_THE_OCTAVE
 * @returns A number in the range [0, EQUAL_DIVISIONS_OF_THE_OCTAVE)
 *
 * @example
 * // Assuming EQUAL_DIVISIONS_OF_THE_OCTAVE = 12
 * modEdo(13) // returns 1
 * modEdo(-1) // returns 11
 * modEdo(0)  // returns 0
 */
export const modEdo = (value: number) =>
  ((value % EQUAL_DIVISIONS_OF_THE_OCTAVE) + EQUAL_DIVISIONS_OF_THE_OCTAVE) %
  EQUAL_DIVISIONS_OF_THE_OCTAVE
