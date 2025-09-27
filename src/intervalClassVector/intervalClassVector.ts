import { LEAST_INTERVAL_CLASS_OPTIONS } from '@/consts'
import { intervalClass } from '@/intervalClass/intervalClass'
import { setClass } from '@/setClass/setClass'
import type { Chord, IntervalClass, IntervalClassVector } from '@/types'

export const intervalClassVector = (
  chord: Chord,
): { icv: IntervalClassVector; leastIntervalClass: IntervalClass } => {
  const sc = setClass(chord)

  // Calculate all pairwise intervals
  const intervals = []
  for (let i = 0; i < sc.length; i++) {
    for (let j = i + 1; j < sc.length; j++) {
      const interval = Math.abs(sc[j]! - sc[i]!)
      const ic = intervalClass(interval)
      intervals.push(ic)
    }
  }

  const leastIntervalClass = determineLeastIntvervalClass(intervals)
  const countOfIntervalClasses = 12 / 2 / leastIntervalClass
  const icv = Array.from({ length: countOfIntervalClasses }, () => 0)

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i]!
    const index = interval / leastIntervalClass - 1
    icv[index]!++
  }

  return { icv, leastIntervalClass }
}

const determineLeastIntvervalClass = (
  intervals: Array<IntervalClass>,
): (typeof LEAST_INTERVAL_CLASS_OPTIONS)[number] => {
  const leastIntervalClassOptions = LEAST_INTERVAL_CLASS_OPTIONS.map((lic) => {
    const remainders = intervals.map((ic) => ic % lic)
    const sumOfRemainders = remainders.reduce((acc, val) => acc + val, 0)
    return {
      lic,
      accommodatesIntervals: sumOfRemainders === 0,
    }
  })

  return (
    leastIntervalClassOptions.find((option) => option.accommodatesIntervals)
      ?.lic || 1
  )
}
