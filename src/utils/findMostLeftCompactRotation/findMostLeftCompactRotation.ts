/**
 * Finds the most left-compact rotation by comparing intervals from outside in.
 * Compares first-to-last, then first-to-second-to-last, etc. until a tie is broken.
 * This implements the recursive tie-breaking algorithm used in normal order calculation.
 */
export const findMostLeftCompactRotation = (
  candidates: Array<Array<number>>,
): Array<number> => {
  if (candidates.length === 1) {
    return candidates[0]!
  }

  const n = candidates[0]!.length

  // Compare intervals from outside in: first-to-last, first-to-second-to-last, etc.
  for (let distance = n - 1; distance >= 1; distance--) {
    const spans = candidates.map((rotation) => {
      const first = rotation[0]!
      const target = rotation[distance]!
      // Handle wrap-around by adding 12 if target is before first
      return target >= first ? target - first : target + 12 - first
    })

    const minSpan = Math.min(...spans)
    const remainingCandidates = candidates.filter(
      (_, index) => spans[index] === minSpan,
    )

    if (remainingCandidates.length === 1) {
      return remainingCandidates[0]!
    }

    // Continue with remaining candidates for next iteration
    candidates = remainingCandidates
  }

  // If all comparisons are tied, return the first candidate
  return candidates[0]!
}
