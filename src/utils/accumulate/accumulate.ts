export const accumulate = (numbers: Array<number>): Array<number> => {
  const result = [numbers[0]!]

  for (let i = 1; i < numbers.length; i++) {
    result.push(result[i - 1]! + numbers[i]!)
  }

  return result
}
