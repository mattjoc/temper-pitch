import { expect, suite, test } from 'vitest'
import { intervalClass } from './intervalClass'

suite.concurrent('intervalClassVector', () => {
  test('handles unity and octaves', () => {
    expect(intervalClass(0)).toEqual(0)
    expect(intervalClass(12)).toEqual(0)
  })

  test('handles intervals less than 6 within the octave', () => {
    expect(intervalClass(1)).toEqual(1)
    expect(intervalClass(2)).toEqual(2)
    expect(intervalClass(3)).toEqual(3)
    expect(intervalClass(4)).toEqual(4)
    expect(intervalClass(5)).toEqual(5)
  })

  test('handles intervals larger than 6 within the octave', () => {
    expect(intervalClass(7)).toEqual(5)
    expect(intervalClass(8)).toEqual(4)
    expect(intervalClass(9)).toEqual(3)
    expect(intervalClass(10)).toEqual(2)
    expect(intervalClass(11)).toEqual(1)
    expect(intervalClass(12)).toEqual(0)
  })

  test('handles intervals larger than an octave', () => {
    expect(intervalClass(13)).toEqual(1)
    expect(intervalClass(14)).toEqual(2)
    expect(intervalClass(15)).toEqual(3)
    expect(intervalClass(16)).toEqual(4)
    expect(intervalClass(17)).toEqual(5)
    expect(intervalClass(18)).toEqual(6)
  })

  test('handles microtonal intervals', () => {
    expect(intervalClass(0.5)).toEqual(0.5)
    expect(intervalClass(1.5)).toEqual(1.5)
    expect(intervalClass(2.25)).toEqual(2.25)
    expect(intervalClass(6.5)).toEqual(5.5)
    expect(intervalClass(7.5)).toEqual(4.5)
    expect(intervalClass(11.75)).toEqual(0.25)
  })

  test('handles 2-argument variant with basic intervals', () => {
    expect(intervalClass(60, 61)).toEqual(1)
    expect(intervalClass(60, 65)).toEqual(5)
    expect(intervalClass(60, 67)).toEqual(5)
    expect(intervalClass(60, 72)).toEqual(0)
  })

  test('handles 2-argument variant with overflow and negative intervals', () => {
    expect(intervalClass(61, 60)).toEqual(1)
    expect(intervalClass(65, 60)).toEqual(5)
    expect(intervalClass(72, 60)).toEqual(0)
    expect(intervalClass(60, 48)).toEqual(0)
    expect(intervalClass(60, 73)).toEqual(1)
    expect(intervalClass(72, 84)).toEqual(0)
  })

  test('handles 2-argument variant with microtonal pitches', () => {
    expect(intervalClass(60, 60.5)).toEqual(0.5)
    expect(intervalClass(60.25, 61.75)).toEqual(1.5)
    expect(intervalClass(60, 66.5)).toEqual(5.5)
    expect(intervalClass(67.5, 60)).toEqual(4.5)
  })
})
