import { createContext } from 'react';

export type ClueType = {
    number: number;
    direction: string;
    text: string;
    length: number;
    answer: string;
    row: number;
    col: number;
}

export interface ClueContextType {
    clues: ClueType[];
    setClues: (clues: ClueType[]) => void;
    selectedClue: ClueType | null;
    setSelectedClue: (clue: ClueType) => void;
}

export const ClueContext = createContext<ClueContextType>({
    clues: [],
    setClues: (_) => { },
    selectedClue: null,
    setSelectedClue: (_) => { },
});