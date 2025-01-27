/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";

export const GridContext = createContext({
    size: 0,
    title: "",
    author: "",
    grid: [] as string[][],
    setGrid: (grid: string[][]) => { },
    selectedCell: { row: 0, col: 0 },
    setSelectedCell: (selectedCell: { row: number, col: number }) => { },
});