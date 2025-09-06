// A MIDI pitch, where 60 is middle C
export type Pitch = number

// A pitch between 0 and 12, non-inclusive
// For any pitch `p`, `p % 12` is its pitch class
export type PitchClass = number

// An array of Pitches
export type Chord = Array<Pitch>

// The ordered difference in semitones between two pitches
export type Interval = number

// The smallest interval obtaining between two pitch classes
export type IntervalClass = number
