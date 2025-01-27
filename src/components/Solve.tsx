import Grid from './Grid';
import { GridContext } from '../context/GridContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ClueContext } from '../context/ClueContext';
import ClueTable from './ClueTable';
import FallbackComponent from './FallbackComponent';
import ClueType from '../types/ClueType';

function Create() {
    const [size, setSize] = useState(0);
    const [title, setTitle] = useState("");
    const [grid, setGrid] = useState<string[][]>(Array(size).fill(null).map(() => Array(size).fill(" ")));
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

    const [selectedClue, setSelectedClue] = useState<ClueType | null>(null);
    const [clues, setClues] = useState<ClueType[]>([]);

    const importCrossword = (file: File) => {
        let reader = new FileReader();
        reader.onload = function (e) {
            let crossword = JSON.parse(e.target?.result as string);
            setGrid(crossword.grid);
            setClues(crossword.clues);
        }
        reader.readAsText(file);
    }

    const checkGrid = () => {
        let isComplete = true;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] === " ") {
                    isComplete = false;
                    break;
                }
            }
        }

        if (!isComplete) return false;

        for (let i = 0; i < clues.length; i++) {
            const clue = clues[i];
            let row = clue.row;
            let col = clue.col;
            let length = clue.length;
            let direction = clue.direction;
            let answer = clue.answer;

            let answerArray = answer.split("");
            let gridArray: string[] = [];
            if (direction === "Across") {
                gridArray = grid[row].slice(col, col + length);
            } else {
                for (let k = 0; k < length; k++) {
                    gridArray.push(grid[row + k][col]);
                }
            }

            if (gridArray.join("") !== answerArray.join("")) {
                return false;
            }
        }

        return true;
    }

    return (
        <>
            <GridContext.Provider value={{ size, title, grid, setGrid, selectedCell, setSelectedCell }}>
                <ClueContext.Provider value={{ clues, setClues, selectedClue, setSelectedClue }}>
                    <ErrorBoundary FallbackComponent={FallbackComponent}>
                        <h1>Solve</h1>
                        <div className="flex justify-center">
                            <Grid isCreating={false} />
                            <ClueTable isCreating={false} />
                        </div>
                        <input
                            type="file"
                            className="border-2"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    importCrossword(e.target.files[0]);
                                }
                            }}
                        />
                        <button className="border-2" onClick={() => alert(checkGrid() ? "Complete" : "Incomplete")}>Check</button>
                    </ErrorBoundary>
                </ClueContext.Provider>
            </GridContext.Provider>
        </>
    );
}

export default Create;