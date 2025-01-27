import { createContext } from 'react';
import ClueType from '../types/ClueType';

export const ClueContext = createContext({
    clues: [] as ClueType[],
    setClues: (clues: ClueType[]) => { },
    selectedClue: {} as any,
    setSelectedClue: (selectedClue: ClueType) => { },
});