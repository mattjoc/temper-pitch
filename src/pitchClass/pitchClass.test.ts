import { describe, expect, it, suite } from 'vitest'
import { pitchClass } from './pitchClass'

suite.concurrent('pitchClass', () => {
  describe('integers', () => {
    const expectations: Array<[number, number]> = [
      [-12, 0],
      [-11, 1],
      [-10, 2],
      [-9, 3],
      [-8, 4],
      [-7, 5],
      [-6, 6],
      [-5, 7],
      [-4, 8],
      [-3, 9],
      [-2, 10],
      [-1, 11],
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
      [8, 8],
      [9, 9],
      [10, 10],
      [11, 11],
      [12, 0],
      [13, 1],
      [14, 2],
      [15, 3],
      [16, 4],
      [17, 5],
      [18, 6],
      [19, 7],
      [20, 8],
      [21, 9],
      [22, 10],
      [23, 11],
    ]
    for (const [pitch, expectedPitchClass] of expectations) {
      it(`should return ${expectedPitchClass} for pitch ${pitch}`, () => {
        expect(pitchClass(pitch)).toBe(expectedPitchClass)
      })
    }
  })

  describe('floats', () => {
    const expectations: Array<[number, number]> = [
      [-6.75, 5.25],
      [-0.5, 11.5],
      [0.25, 0.25],
      [6.75, 6.75],
    ]
    for (const [pitch, expectedPitchClass] of expectations) {
      it(`should return ${expectedPitchClass} for pitch ${pitch}`, () => {
        expect(pitchClass(pitch)).toBe(expectedPitchClass)
      })
    }
  })
})
