# @temper.sh/pitch

A TypeScript library for working with pitch, intervals, and pitch collections in arbitrary equal temperament systems.

## Installation

```bash
pnpm add @temper.sh/pitch
```

## Features

- **Pitch Class Operations**: Convert MIDI pitches to pitch classes
- **Interval Calculations**: Calculate intervals between pitches and interval classes
- **Normal Order**: Find the most compact representation of pitch collections
- **Set Theory**: Tools for analyzing pitch collections using music theory principles
- **Equal Temperament Support**: Works with any equal division of the octave (12-TET, 24-TET, etc.)

## Core Types

```typescript
type Pitch = number           // MIDI pitch (60 = middle C)
type PitchClass = number      // Pitch class (0-11 in 12-TET)
type Chord = Array<Pitch>     // Array of pitches
type Interval = number        // Semitone difference between pitches
type IntervalClass = number   // Smallest interval between given pitch classes
```

## API Reference

### Pitch Class

Convert MIDI pitches to pitch classes:

```typescript
import { pitchClass } from '@temper.sh/pitch'

pitchClass(60)  // 0 (C)
pitchClass(61)  // 1 (C#)
pitchClass(72)  // 0 (C, octave higher)
```

### Intervals

Calculate intervals between pitches:

```typescript
import { interval, intervals } from '@temper.sh/pitch'

// Single interval
interval(60, 64)  // 4 (major third)

// All consecutive intervals in a chord
intervals([60, 64, 67])  // [4, 3] (major third, minor third)
```

### Interval Classes

Calculate the smallest interval between pitch classes:

```typescript
import { intervalClass } from '@temper.sh/pitch'

// From interval
intervalClass(7)   // 5 (perfect fourth, smaller than tritone)
intervalClass(11)  // 1 (minor second, smaller than major seventh)

// From two pitches
intervalClass(60, 67)  // 5
```

### Normal Order

Find the most compact representation of a pitch collection:

```typescript
import { normalOrder } from '@temper.sh/pitch'

normalOrder([60, 64, 67])      // [0, 4, 7] (C major triad)
normalOrder([67, 60, 64])      // [0, 4, 7] (same result, different input order)
normalOrder([61, 65, 68])      // [1, 5, 8] (C# major triad)
```

## Music Theory Background

This library implements standard music theory concepts for computer-assisted analysis:

- **Pitch Classes**: Pitches reduced to their octave equivalents (C, C#, D, etc.)
- **Normal Order**: The most left-compressed arrangement of a pitch class set
- **Interval Classes**: The smallest possible interval between two pitch classes
- **Equal Temperament**: Musical tuning systems that divide the octave into equal parts

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm dev

# Build
pnpm build

# Format and lint
pnpm format-and-lint
```
