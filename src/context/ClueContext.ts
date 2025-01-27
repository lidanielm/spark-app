import { createContext } from 'react';
import ClueType from '../types/ClueType';

export const ClueContext = createContext({
    clues: [] as ClueType[],
    setClues: (_: ClueType[]) => { },
    selectedClue: {} as any,
    setSelectedClue: (_: ClueType) => { },
});