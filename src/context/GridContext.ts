/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { SymmetryType } from "../components/CreateModal";

export interface GridContextType {
    size: number;
    setSize: (size: number) => void;
    title: string;
    setTitle: (title: string) => void;
    author: string;
    setAuthor: (author: string) => void;
    grid: string[][];
    setGrid: (grid: string[][]) => void;
    selectedCell: { row: number; col: number };
    setSelectedCell: (cell: { row: number; col: number }) => void;
    symmetry: SymmetryType;
    setSymmetry: (symmetry: SymmetryType) => void;
}

export const GridContext = createContext<GridContextType>({
    size: 5,
    setSize: (_) => { },
    title: "",
    setTitle: (_) => { },
    author: "",
    setAuthor: (_) => { },
    grid: [],
    setGrid: (_) => { },
    selectedCell: { row: 0, col: 0 },
    setSelectedCell: (_) => { },
    symmetry: "none",
    setSymmetry: (_) => { }
});