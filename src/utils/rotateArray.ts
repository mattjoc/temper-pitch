/**
 * Rotates an array by moving elements from a specified index to the beginning.
 *
 * @template T - The type of elements in the array
 * @param arr - The array to rotate
 * @param startIndex - The index from which to start the rotation
 * @returns A new array with elements rotated from the start index
 *
 * @example
 * rotateArray([1, 2, 3, 4, 5], 2) // Returns [3, 4, 5, 1, 2]
 * rotateArray(['a', 'b', 'c', 'd'], 3) // Returns ['d', 'a', 'b', 'c']
 */
export const rotateArray = <T>(arr: T[], startIndex: number): T[] => {
  return [...arr.slice(startIndex), ...arr.slice(0, startIndex)]
}
