import React, { useEffect, useState } from "react";
import { GridContext } from "../context/GridContext";
import { useContext } from "react";
import { ClueContext } from "../context/ClueContext";

type GridProps = {
    //gridSize: number;
    isCreating: boolean;
    // onCellChange: (row: number, col: number, value: string) => void;
};

function Grid({ isCreating }: GridProps) {
    const { size, grid, setGrid, selectedCell, setSelectedCell } = useContext(GridContext);
    const [currentDirection, setCurrentDirection] = useState("ArrowRight");

    const { clues, setClues, selectedClue, setSelectedClue } = useContext(ClueContext);
    // const selectedClueRef = useRef();

    // const cellRef = useRef({ row: 0, col: 0 });

    useEffect(() => {
        if (grid.length > 0) {
            resetClueNumbering();
        }
    }, [grid]);

    useEffect(() => {
        const selectedClue = getSelectedClue();
        if (selectedClue) {
            setSelectedClue(selectedClue);
        }
    }, [selectedCell]);

    useEffect(() => {
        const selectedClue = getSelectedClue();
        if (selectedClue && !(selectedClue.row === selectedCell.row || selectedClue.col === selectedCell.col)) {
            setSelectedCell({ row: selectedClue.row, col: selectedClue.col });
        }
    }, [selectedClue]);

    const handleCellClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const row = parseInt(e.currentTarget.getAttribute("data-row") || "0");
        const col = parseInt(e.currentTarget.getAttribute("data-col") || "0");

        if (grid[row][col] === "." && !isCreating) {
            return;
        }

        if (row === selectedCell.row && col === selectedCell.col) {
            const changedDirection = currentDirection === "ArrowUp" || currentDirection === "ArrowDown" ? "ArrowRight" : "ArrowDown"
            setCurrentDirection(changedDirection);
            setSelectedCell({ row, col });
            setGrid([...grid]);
        } else {
            setSelectedCell({ row, col });
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();

        if ((e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z") && e.key !== "ArrowUp" && e.key !== "ArrowDown" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Meta" && e.key !== "Backspace") {
            const newGrid = grid.map((r: string[], i: number) => {
                if (i === selectedCell.row) {
                    return r.map((c: string, j: number) => {
                        if (j === selectedCell.col) {
                            return e.key.toUpperCase();
                        }
                        return c;
                    });
                }
                return r;
            });
            setGrid(newGrid);

            const nextCellLocation = moveSelection(currentDirection === "ArrowUp" || currentDirection === "ArrowDown" ? "ArrowDown" : "ArrowRight") || selectedCell;
            setSelectedCell(nextCellLocation);
        } else if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
            const nextCellLocation = moveSelection(e.key) || selectedCell;
            setSelectedCell(nextCellLocation);
            setGrid([...grid]);
        } else if (e.key === "Backspace") {
            const newGrid = grid.map((r: string[], i: number) => {
                if (i === selectedCell.row) {
                    return r.map((c: string, j: number) => {
                        if (j === selectedCell.col) {
                            return " ";
                        }
                        return c;
                    });
                }
                return r;
            });

            setGrid(newGrid);

            // const backwardDirection = currentDirection === "ArrowUp" ? "ArrowDown" : currentDirection === "ArrowDown" ? "ArrowUp" : currentDirection === "ArrowLeft" ? "ArrowRight" : "ArrowLeft";
            // const nextCellLocation = moveSelection(backwardDirection) || selectedCell;
            // setSelectedCell(nextCellLocation);
        } else if (e.key === "." && isCreating) {
            const newGrid = grid.map((r: string[], i: number) => {
                if (i === selectedCell.row) {
                    return r.map((c: string, j: number) => {
                        if (j === selectedCell.col) {
                            return grid[i][j] === "." ? " " : ".";
                        }
                        return c;
                    });
                }
                return r;
            });

            const cell = document.getElementById(`cell-${selectedCell.row}-${selectedCell.col}`);
            if (cell) {
                if (cell.classList.contains("bg-black")) {
                    cell.classList.remove("bg-black");
                } else {
                    cell.classList.add("bg-black");
                }
            }

            setGrid(newGrid);

            const nextCellLocation = moveSelection(currentDirection) || selectedCell;
            setSelectedCell(nextCellLocation);
        }


    }

    const moveSelection = (direction: string) => {
        let rowDelta = 0;
        let colDelta = 0;

        setCurrentDirection(direction);
        switch (direction) {
            case "ArrowUp":
                if (currentDirection === "ArrowRight" || currentDirection === "ArrowLeft") {
                    return { row: selectedCell.row, col: selectedCell.col };
                }
                rowDelta = -1;
                break;
            case "ArrowDown":
                if (currentDirection === "ArrowRight" || currentDirection === "ArrowLeft") {
                    return { row: selectedCell.row, col: selectedCell.col };
                }
                rowDelta = 1;
                break;
            case "ArrowLeft":
                if (currentDirection === "ArrowUp" || currentDirection === "ArrowDown") {
                    return { row: selectedCell.row, col: selectedCell.col };
                }
                colDelta = -1;
                break;
            case "ArrowRight":
                if (currentDirection === "ArrowUp" || currentDirection === "ArrowDown") {
                    return { row: selectedCell.row, col: selectedCell.col };
                }
                colDelta = 1;
                break;
        }

        let r = selectedCell.row + rowDelta;
        let c = selectedCell.col + colDelta;

        while (r >= 0 && r < size && c >= 0 && c < size) {
            if (grid[r][c] !== "." || isCreating) {
                (document.querySelector(`input[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`) as HTMLInputElement)?.blur();
                (document.querySelector(`input[data-row="${r}"][data-col="${c}"]`) as HTMLInputElement)?.focus();
                return { row: r, col: c };
            }
            r += rowDelta;
            c += colDelta;
        }

        if (r < 0 || r >= size || c < 0 || c >= size) {
            return { row: selectedCell.row, col: selectedCell.col };
        } else {
            return { row: r, col: c };
        }
    }

    const resetClueNumbering = () => {
        let newClues: any[] = [];
        let number = 1;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                // Check if cell is the start of an across clue
                let isClueStart = false;
                if ((j === 0 || grid[i][j - 1] === ".") && grid[i][j] !== ".") {
                    const clue = clues.find(c => c.row === i && c.col === j && c.direction === "Across");
                    const text = clue ? clue.text : "";
                    const answer = clue ? clue.answer : "";
                    let length = 1;
                    while (j + length < size) {
                        if (grid[i][j + length] === ".") {
                            break;
                        }
                        length++;
                    }
                    newClues = [...newClues, { number, direction: "Across", text: text, length: length, answer: answer, row: i, col: j }];
                    isClueStart = true;
                }

                // Check if cell is the start of a down clue
                if ((i === 0 || grid[i - 1][j] === ".") && grid[i][j] !== ".") {
                    const clue = clues.find(c => c.row === i && c.col === j && c.direction === "Down");
                    const text = clue ? clue.text : "";
                    const answer = clue ? clue.answer : "";
                    let length = 1;
                    while (i + length < size) {
                        if (grid[i + length][j] === ".") {
                            break;
                        }
                        length++;
                    }
                    newClues = [...newClues, { number, direction: "Down", text: text, length: length, answer: answer, row: i, col: j }];
                    isClueStart = true;
                }
                number += isClueStart ? 1 : 0;
            }
        }
        setClues(newClues);
    }

    const getSelectedClue = () => {
        const row = selectedCell.row;
        const col = selectedCell.col;

        for (let i = 0; i < clues.length; i++) {
            const clue = clues[i];
            if (clue.direction == "Across" && (currentDirection == "ArrowLeft" || currentDirection == "ArrowRight") && row === clue.row && col >= clue.col && col < clue.col + clue.length) {
                return clue;
            } else if (clue.direction == "Down" && (currentDirection == "ArrowUp" || currentDirection == "ArrowDown") && col === clue.col && row >= clue.row && row < clue.row + clue.length) {
                return clue;
            }
        }
    }

    const classNames = (i: number, j: number) => {
        let classes = "cell w-12 h-12 p-0 m-0 border-1 outline-0 text-center caret-transparent select-none";
        if (grid[i][j] === ".") {
            classes += " bg-black";
        }
        if (i === selectedCell.row && j === selectedCell.col) {
            if (grid[i][j] !== ".") {
                classes += " bg-gray-300";
            }
            classes += " inset-shadow-[0_0px_8px_rgba(52,100,255,0.5)]";
        }
        if (selectedClue && selectedClue.direction === "Across" && i === selectedClue.row && j >= selectedClue.col && j < selectedClue.col + selectedClue.length) {
            if (grid[i][j] !== ".") {
                classes += " bg-gray-200";
            }
        } else if (selectedClue && selectedClue.direction === "Down" && j === selectedClue.col && i >= selectedClue.row && i < selectedClue.row + selectedClue.length) {
            if (grid[i][j] !== ".") {
                classes += " bg-gray-200";
            }
        }
        return classes;
    }

    return (
        <table className="grid border-1 w-max h-max" onKeyDown={(e) => handleKeyPress(e)}>
            {grid.map((row, i) => (
                <tr key={`row-${i}`} className="row">
                    {row.map((_: string, j: number) => (
                        <td key={`cell-${i}-${j}`} className="relative">
                            <p className="absolute top-0 left-0.5 z-10 font-light text-sm select-none">
                                {clues.find(c => c.row === i && c.col === j)?.number}
                            </p>
                            <input

                                id={`cell-${i}-${j}`}
                                className={classNames(i, j)}
                                maxLength={1}
                                value={grid[i][j]}
                                type="text"
                                pattern="[A-Za-z]"
                                data-row={i.toString()}
                                data-col={j.toString()}
                                onClick={(e) => handleCellClick(e)}
                            />
                        </td>
                    ))}
                </tr>
            ))
            }
        </ table >
    )
}

export default Grid;