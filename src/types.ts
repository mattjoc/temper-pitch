// A MIDI pitch, where 60 is middle C
export type Pitch = number

// A pitch between 0 and 12, non-inclusive
// For any pitch `p`, `p % 12` is its pitch class
export type PitchClass = number

// An array of Pitches
export type Chord = Array<Pitch>

// The most compact representation of a set of pitch classes related by transposition and/or inversion
export type SetClass = Array<PitchClass>

// The ordered difference in semitones between two pitches
export type Interval = number

// The smallest interval obtaining between two pitch classes
export type IntervalClass = number

// An array with a length equal to 1/2 the number of pitch classes available in the octave
// For 12TET pitch space, this is 6; 24TET -> 12; 48TET -> 24.
export type IntervalClassVector = Array<number>
