import Grid from './Grid';
import { GridContext } from '../context/GridContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ClueContext } from '../context/ClueContext';
import ClueTable from './ClueTable';
import FallbackComponent from './FallbackComponent';
import ClueType from '../types/ClueType';
import NavBar from './Navbar';
import SolveModal from './SolveModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Solve() {
    const { _id } = useParams<{ _id: string }>();

    const [size, setSize] = useState(0);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [grid, setGrid] = useState<string[][]>(Array(size).fill(null).map(() => Array(size).fill(" ")));
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
    const [selectedClue, setSelectedClue] = useState<ClueType | null>(null);
    const [clues, setClues] = useState<ClueType[]>([]);

    const [showModal, setShowModal] = useState(_id ? false : true);

    useEffect(() => {
        console.log(_id);
        if (_id) {
            populateCrossword();
        } else {
            setShowModal(true);
        }
    }, [])

    const handleModalSubmit = (title: string, author: string, grid: string[][], clues: any[]) => {
        setTitle(title)
        setSize(grid.length)
        setAuthor(author)
        setGrid(grid)
        setSelectedCell({ row: 0, col: 0 })
        setClues(clues)
        setShowModal(false)
    }

    const populateCrossword = async () => {
        const res = await axios.get(`http://localhost:5050/api/crossword/solve?id=${_id}`)
            .catch((err) => {
                console.error(err);
            })
        if (res && res.data) {
            const data = res.data;
            console.log(data.grid.length)
            setTitle(data.title);
            setSize(data.grid.length);
            setAuthor(data.author);
            setGrid(Array(data.grid.length).fill(null).map(() => Array(data.grid.length).fill("")));
            setClues(data.clues);
        }
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
            <SolveModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={(title: string, author: string, grid: string[][], clues: any[]) => handleModalSubmit(title, author, grid, clues)} />
            <GridContext.Provider value={{ size, title, author, grid, setGrid, selectedCell, setSelectedCell }}>
                <ClueContext.Provider value={{ clues, setClues, selectedClue, setSelectedClue }}>
                    <ErrorBoundary FallbackComponent={FallbackComponent}>
                        <NavBar />
                        <div className="flex flex-col items-center space-y-6 p-6">
                            <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                            <div className="flex flex-col md:flex-row justify-center items-start space-x-6 space-y-4 md:space-y-0">
                                <div className="shadow-lg rounded-lg p-4 border border-gray-300">
                                    <Grid isCreating={false} />
                                </div>
                                <div className="shadow-lg rounded-lg p-4 border border-gray-300">
                                    <ClueTable isCreating={false} />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">

                                <button
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                                    onClick={() => alert(checkGrid() ? "Complete" : "Incomplete")}
                                >
                                    Check
                                </button>
                            </div>
                        </div>

                    </ErrorBoundary>
                </ClueContext.Provider>
            </GridContext.Provider>
        </>
    );
}

export default Solve;