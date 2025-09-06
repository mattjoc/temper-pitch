import { describe, expect, suite, test } from 'vitest'
import { interval } from './interval'

suite.concurrent('interval', () => {
  describe('integers', () => {
    const expectations: Array<[[number, number], number]> = [
      [[0, 0], 0],
      [[0, 1], 1],
      [[0, -1], -1],
      [[-10, 2], 12],
    ]

    for (const [input, expected] of expectations) {
      test(`interval(${input[0]}, ${input[1]}) should return ${expected}`, () => {
        const result = interval(input[0], input[1])
        expect(result).toBe(expected)
      })
    }
  })

  describe('floats', () => {
    const expectations: Array<[[number, number], number]> = [
      [[0, 0.5], 0.5],
      [[0, -2.5], -2.5],
      [[-2.5, 0], 2.5],
    ]

    for (const [input, expected] of expectations) {
      test(`interval(${input[0]}, ${input[1]}) should return ${expected}`, () => {
        const result = interval(input[0], input[1])
        expect(result).toBe(expected)
      })
    }
  })
})
