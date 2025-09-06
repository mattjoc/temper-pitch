import { describe, expect, suite, test } from 'vitest'
import { intervalClass } from './intervalClass'

suite.concurrent('intervalClass', () => {
  describe('integers', () => {
    const expectations: Array<[[number, number], number]> = [
      [[0, 0], 0],
      [[0, 12], 0],
      [[0, 14], 2],
      [[0, 1], 1],
      [[0, -1], 1],
      [[-10, 2], 0],
    ]

    for (const [input, expected] of expectations) {
      test(`intervalClass(${input[0]}, ${input[1]}) should return ${expected}`, () => {
        const result = intervalClass(input[0], input[1])
        expect(result).toBe(expected)
      })
    }
  })

  describe('floats', () => {
    const expectations: Array<[[number, number], number]> = [
      [[0, 0.5], 0.5],
      [[0, -2.5], 2.5],
      [[-2.5, 0], 2.5],
    ]

    for (const [input, expected] of expectations) {
      test(`intervalClass(${input[0]}, ${input[1]}) should return ${expected}`, () => {
        const result = intervalClass(input[0], input[1])
        expect(result).toBe(expected)
      })
    }
  })
})
