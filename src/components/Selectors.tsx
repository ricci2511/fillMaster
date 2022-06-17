import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { BeatsPerBar, BEATS_PER_BAR } from '../consts/beatsPerBar';
import { MeasureDivision, MEASURE_DIVISIONS } from '../consts/measureDivisions';
import { PlayNotes } from '../consts/playNotes';
import PatternMaker from '../utils/classes/patternMaker';
import getAvailablePlayNotes from '../utils/getAvailablePlayNotes';
import {
  getNamesForPlayNotes,
  getPlayNotesByMeasureDivision,
  getUnicodeForPlayNotes,
} from '../utils/playNotesFunctions';
import MeasureBottomSelector, {
  MeasureBottomSelectorItems,
} from './elements/MeasureBottomSelector';
import MeasureTopSelector, { MeasureTopSelectorItems } from './elements/MeasureTopSelector';
import NoteDivisionSelector, { NoteDivisionSelectorItems } from './elements/NoteDivisionSelector';

interface SelectorsProps {
  timeSignatureTop: BeatsPerBar;
  timeSignatureBottom: MeasureDivision;
  patternMaker: PatternMaker;
  isCountIn: () => boolean;
  handleSetNoteDivision: (division: string) => void;
  handleSetTimeSignatureTop: (beats: string) => void;
  handleSetTimeSignatureBottom: (division: string) => void;
}
const Selectors = ({
  timeSignatureTop,
  timeSignatureBottom,
  patternMaker,
  isCountIn,
  handleSetNoteDivision,
  handleSetTimeSignatureTop,
  handleSetTimeSignatureBottom,
}: SelectorsProps) => {
  const [key, setKey] = useState(0);

  // reset note division to default when time signature changes
  useEffect(() => {
    setKey(key + 1);
  }, [timeSignatureBottom, timeSignatureTop]);

  // PatternMaker getters must be used for beats/divisions in return() - don't use timeSig top/bottom
  // states here as it becomes a source of crashing.
  const currentBeatsPerBar = () => patternMaker.getCustomSettingsForPattern().timeSignature.beats;
  const currentMeasureDivision = () =>
    patternMaker.getCustomSettingsForPattern().timeSignature.division;

  return (
    <Grid container spacing={2}>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <MeasureTopSelector
          selectorItems={getMeasureTopSelectorOptions(
            [...BEATS_PER_BAR],
            '4',
            currentBeatsPerBar()
          )}
          handleSetItem={handleSetTimeSignatureTop}
          disabled={isCountIn()}
        />
        <MeasureBottomSelector
          selectorItems={getMeasureBottomSelectorOptions(
            [...MEASURE_DIVISIONS],
            '4',
            currentMeasureDivision()
          )}
          handleSetItem={handleSetTimeSignatureBottom}
          disabled={isCountIn()}
        />
      </Grid>
      <Grid item xs={2} sx={{ alignSelf: 'center', marginLeft: '1.5rem' }}>
        <NoteDivisionSelector
          selectorItems={getPlayNotesOptions(
            getAvailablePlayNotes(currentBeatsPerBar(), currentMeasureDivision()),
            currentMeasureDivision(),
            getPlayNotesByMeasureDivision(currentMeasureDivision())
          )}
          handleSetItem={handleSetNoteDivision}
          disabled={isCountIn()}
          disabledPreview={getUnicodeForPlayNotes(
            getPlayNotesByMeasureDivision(currentMeasureDivision())
          )}
          key={key}
        />
      </Grid>
      <Grid item xs={5} />
    </Grid>
  );
};

export default Selectors;

function getPlayNotesOptions(
  playNotesArray: Array<PlayNotes>,
  default_: MeasureDivision,
  selected_: PlayNotes
) {
  const playNoteOptions: NoteDivisionSelectorItems = [];
  for (let i = 0; i < playNotesArray.length; i++) {
    const name = getNamesForPlayNotes(playNotesArray[i]);
    const defaultVar = playNotesArray[i] === getPlayNotesByMeasureDivision(default_);
    const selected = playNotesArray[i] === selected_;
    const stateName = playNotesArray[i];
    const previewName = getUnicodeForPlayNotes(playNotesArray[i]);
    playNoteOptions.push({ name, default: defaultVar, selected, previewName, stateName });
  }
  return playNoteOptions;
}

function getMeasureTopSelectorOptions(
  beatsPerBars: Array<BeatsPerBar>,
  default_: BeatsPerBar,
  selected_: BeatsPerBar
) {
  const beatsPerBarSelectorOptions: MeasureTopSelectorItems = [];
  for (let i = 0; i < beatsPerBars.length; i++) {
    const name = beatsPerBars[i];
    const defaultVar = beatsPerBars[i] === default_;
    const selected = beatsPerBars[i] === selected_;
    const stateName = beatsPerBars[i];
    beatsPerBarSelectorOptions.push({ name, default: defaultVar, selected, stateName });
  }
  return beatsPerBarSelectorOptions;
}

function getMeasureBottomSelectorOptions(
  divisionArray: Array<MeasureDivision>,
  default_: MeasureDivision,
  selected_: MeasureDivision
) {
  const measureBottomSelectorItems: MeasureBottomSelectorItems = [];
  for (let i = 0; i < divisionArray.length; i++) {
    const name = divisionArray[i];
    const defaultVar = divisionArray[i] === default_;
    const selected = divisionArray[i] === selected_;
    const stateName = divisionArray[i];
    measureBottomSelectorItems.push({ name, default: defaultVar, selected, stateName });
  }
  return measureBottomSelectorItems;
}
