import { expect, suite, test } from 'vitest'
import { findMostLeftCompactRotation } from './findMostLeftCompactRotation'

suite.concurrent('findMostLeftCompactRotation', () => {
  test('returns single candidate unchanged', () => {
    const candidates = [[0, 4, 7]]
    expect(findMostLeftCompactRotation(candidates)).toEqual([0, 4, 7])
  })

  test('chooses rotation with smallest first-to-last span', () => {
    const candidates = [
      [0, 4, 7], // span: 7-0 = 7
      [4, 7, 0], // span: (0+12)-4 = 8
      [7, 0, 4], // span: (4+12)-7 = 9
    ]
    expect(findMostLeftCompactRotation(candidates)).toEqual([0, 4, 7])
  })

  test('uses recursive tie-breaking for first-to-last ties', () => {
    const candidates = [
      [0, 2, 4, 6, 8, 10], // first-to-last: 10-0 = 10, first-to-second-last: 8-0 = 8
      [2, 4, 6, 8, 10, 0], // first-to-last: (0+12)-2 = 10, first-to-second-last: 10-2 = 8
      [4, 6, 8, 10, 0, 2], // first-to-last: (2+12)-4 = 10, first-to-second-last: (0+12)-4 = 8
    ]
    // All have same first-to-last and first-to-second-last spans, should return first
    expect(findMostLeftCompactRotation(candidates)).toEqual([0, 2, 4, 6, 8, 10])
  })

  test('breaks ties at deeper levels of recursion', () => {
    const candidates = [
      [0, 1, 5, 6], // spans: 6-0=6, 5-0=5, 1-0=1
      [1, 5, 6, 0], // spans: (0+12)-1=11, 6-1=5, 5-1=4
      [5, 6, 0, 1], // spans: (1+12)-5=8, (0+12)-5=7, 6-5=1
      [6, 0, 1, 5], // spans: (5+12)-6=11, 1-6+12=7, (0+12)-6=6
    ]
    // Should choose [0, 1, 5, 6] as it has smallest first-to-last span (6)
    expect(findMostLeftCompactRotation(candidates)).toEqual([0, 1, 5, 6])
  })

  test('handles diminished chord (all intervals equal)', () => {
    const candidates = [
      [0, 3, 6, 9], // all spans: 9-0=9, 6-0=6, 3-0=3
      [3, 6, 9, 0], // all spans: (0+12)-3=9, 9-3=6, 6-3=3
      [6, 9, 0, 3], // all spans: (3+12)-6=9, (0+12)-6=6, 9-6=3
      [9, 0, 3, 6], // all spans: (6+12)-9=9, 3-9+12=6, (0+12)-9=3
    ]
    // All have identical spans at every level, should return first
    expect(findMostLeftCompactRotation(candidates)).toEqual([0, 3, 6, 9])
  })

  test('handles two-element rotations', () => {
    const candidates = [
      [0, 7], // span: 7-0 = 7
      [7, 0], // span: (0+12)-7 = 5
    ]
    expect(findMostLeftCompactRotation(candidates)).toEqual([7, 0])
  })

  test('handles three-element rotations with clear winner', () => {
    const candidates = [
      [0, 1, 8], // spans: 8-0=8, 1-0=1
      [1, 8, 0], // spans: (0+12)-1=11, 8-1=7
      [8, 0, 1], // spans: (1+12)-8=5, (0+12)-8=4
    ]
    expect(findMostLeftCompactRotation(candidates)).toEqual([8, 0, 1])
  })

  test('handles chromatic clusters', () => {
    const candidates = [
      [0, 1, 2, 3], // spans: 3-0=3, 2-0=2, 1-0=1
      [1, 2, 3, 0], // spans: (0+12)-1=11, 3-1=2, 2-1=1
      [2, 3, 0, 1], // spans: (1+12)-2=11, (0+12)-2=10, 3-2=1
      [3, 0, 1, 2], // spans: (2+12)-3=11, 1-3+12=10, (0+12)-3=9
    ]
    expect(findMostLeftCompactRotation(candidates)).toEqual([0, 1, 2, 3])
  })

  test('handles edge case with wrap-around calculations', () => {
    const candidates = [
      [10, 11, 0, 1], // spans: (1+12)-10=3, (0+12)-10=2, 11-10=1
      [11, 0, 1, 10], // spans: (10+12)-11=11, 1-11+12=2, (0+12)-11=1
      [0, 1, 10, 11], // spans: 11-0=11, 10-0=10, 1-0=1
      [1, 10, 11, 0], // spans: (0+12)-1=11, 11-1=10, 10-1=9
    ]
    expect(findMostLeftCompactRotation(candidates)).toEqual([10, 11, 0, 1])
  })
})
