import Grid from './Grid'
import { GridContext } from '../context/GridContext'
import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ClueContext, ClueType } from '../context/ClueContext'
import InfoPanel from './InfoPanel'
import FallbackComponent from './FallbackComponent'
import CreateModal, { SymmetryType } from './CreateModal'
import axios from 'axios'
import NavBar from './Navbar'

const Create = () => {
    const [showModal, setShowModal] = useState(true)
    const [title, setTitle] = useState<string>("")
    const [size, setSize] = useState<number>(5)
    const [author, setAuthor] = useState<string>("")
    const [grid, setGrid] = useState<string[][]>(Array(size).fill(null).map(() => Array(size).fill(" ")))
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 })
    const [symmetry, setSymmetry] = useState<SymmetryType>("none")

    const [selectedClue, setSelectedClue] = useState<ClueType | null>(null)
    const [clues, setClues] = useState<ClueType[]>([])

    const exportCrossword = () => {
        if (!checkComplete()) {
            alert("Please complete the crossword before exporting")
            return
        }

        updateAnswers()

        let crossword = {
            size: size,
            title: title,
            author: author,
            grid: grid,
            clues: clues
        }
        const element = document.createElement('a')
        const file = new Blob([JSON.stringify(crossword)], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = `${title}.json`
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const checkComplete = () => {
        let isComplete = true
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] === " ") {
                    isComplete = false
                    break
                }
            }
        }

        return isComplete
    }

    const updateAnswers = () => {
        for (let i = 0; i < clues.length; i++) {
            let clue = clues[i]
            let length = clue.length

            let j = 0;
            if (clue.direction === "Across") {
                while (j < length) {
                    clue.answer += grid[clue.row][clue.col + j]
                    j++
                }
            } else {
                while (j < length) {
                    clue.answer += grid[clue.row + j][clue.col]
                    j++
                }
            }
        }
    }

    const handleModalSubmit = () => {
        // console.log("sym")

        // setTitle(title)
        // setSize(size)
        // setAuthor(author)
        setGrid(Array(size).fill(null).map(() => Array(size).fill(" ")))
        setSelectedCell({ row: 0, col: 0 })
        setClues([])
        setShowModal(false)
        // setSymmetry(sym)
    }

    const publishCrossword = async () => {
        if (!checkComplete()) {
            alert("Please complete the crossword before saving")
            return
        }

        updateAnswers()

        let crossword = {
            title: title,
            author: author,
            grid: grid,
            clues: clues
        }

        console.log(crossword)

        try {
            await axios.post('http://localhost:5050/api/crossword/create', crossword, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            alert("Crossword saved successfully")
        } catch (err: any) {
            console.error(err.response.data)
            alert("Failed to save crossword")
        }

        localStorage.setItem(title, JSON.stringify(crossword))
    }

    return (
        <>
            <GridContext.Provider value={{ size, setSize, title, setTitle, author, setAuthor, grid, setGrid, selectedCell, setSelectedCell, symmetry, setSymmetry }}>
                <ClueContext.Provider value={{ clues, setClues, selectedClue, setSelectedClue }}>
                    <ErrorBoundary FallbackComponent={FallbackComponent}>
                        <CreateModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleModalSubmit} />
                        <NavBar />
                        <div className="flex flex-col items-center space-y-4 p-4">
                            <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-8">{title}</h1>
                            <div className="grid grid-cols-2 space-x-6 space-y-4 md:space-y-0">
                                <div className="flex justify-center items-center shadow-lg rounded-lg p-4 border border-gray-300 w-min h-min">
                                    <Grid isCreating={true} />
                                </div>
                                <div className="shadow-lg rounded-lg p-4 border border-gray-300">
                                    <InfoPanel />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                                    onClick={exportCrossword}
                                >
                                    Export
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                                    onClick={publishCrossword}
                                >
                                    Publish
                                </button>
                            </div>
                        </div>

                    </ErrorBoundary>
                </ClueContext.Provider>
            </GridContext.Provider>
        </>
    )
}

export default Create