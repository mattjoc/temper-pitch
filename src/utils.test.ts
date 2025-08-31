import { describe, expect, test } from 'vitest'
import { add } from './utils'

describe('Utils', () => {
     test('should return true', () => {
          expect(true).toBe(true)
     })
     describe('add', () => {
          test('should add two numbers', () => {
               expect(add(1, 2)).toBe(3)
          })
     })
})
