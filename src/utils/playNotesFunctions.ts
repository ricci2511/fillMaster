import { MeasureDivision } from '../consts/measureDivisions';
import { PlayNotes } from '../consts/playNotes';
import assertUnreachable from './assertUnreachable';

export function getUnicodeForPlayNotes(playNotes: PlayNotes) {
  switch (playNotes) {
    case 'wholeNotes':
      return '\u{1D15D}';
    case 'halfNotes':
      return '\u{1D15E}';
    case 'quarterNotes':
      return '\u{1D15F}';
    case 'eighthNotes':
      return '\u{1D160}';
    case 'sixteenthNotes':
      return '\u{1D161}';
    default:
      return assertUnreachable(playNotes);
  }
}

export function getNamesForPlayNotes(playNotes: PlayNotes) {
  switch (playNotes) {
    case 'wholeNotes':
      return 'Whole Notes';
    case 'halfNotes':
      return 'Half Notes';
    case 'quarterNotes':
      return 'Quarter Notes';
    case 'eighthNotes':
      return 'Eighth Notes';
    case 'sixteenthNotes':
      return 'Sixteenth Notes';
    default:
      return assertUnreachable(playNotes);
  }
}

export function getPlayNotesByMeasureDivision(measureDivision: MeasureDivision): PlayNotes {
  switch (measureDivision) {
    case '2':
      return 'halfNotes';
    case '4':
      return 'quarterNotes';
    case '8':
      return 'eighthNotes';
    case '16':
      return 'sixteenthNotes';
    default:
      return assertUnreachable(measureDivision);
  }
}
