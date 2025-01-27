import Grid from './Grid'
import { GridContext } from '../context/GridContext'
import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ClueContext } from '../context/ClueContext'
import ClueTable from './ClueTable'
import FallbackComponent from './FallbackComponent'
import ClueType from '../types/ClueType'
import CreateModal from './GridModal'

const Create = () => {
    const [showModal, setShowModal] = useState(true)
    const [title, setTitle] = useState("")
    const [size, setSize] = useState(0)
    const [grid, setGrid] = useState<string[][]>(Array(size).fill(null).map(() => Array(size).fill(" ")))
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 })

    const [selectedClue, setSelectedClue] = useState<ClueType | null>(null)
    const [clues, setClues] = useState<ClueType[]>([])

    const exportCrossword = () => {
        if (!checkComplete()) {
            alert("Please complete the crossword before exporting")
            return
        }

        let crossword = {
            size: size,
            grid: grid,
            clues: clues
        }
        const element = document.createElement('a')
        const file = new Blob([JSON.stringify(crossword)], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = 'crossword.json'
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

    const handleModalSubmit = (title: string, size: number) => {
        setTitle(title)
        setSize(size)
        setGrid(Array(size).fill(null).map(() => Array(size).fill(" ")))
        setSelectedCell({ row: 0, col: 0 })
        setClues([])
        setShowModal(false)
    }

    return (
        <>
            <CreateModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={(title: string, size: number) => handleModalSubmit(title, size)} />
            <GridContext.Provider value={{ size, title, grid, setGrid, selectedCell, setSelectedCell }}>
                <ClueContext.Provider value={{ clues, setClues, selectedClue, setSelectedClue }}>
                    <ErrorBoundary FallbackComponent={FallbackComponent}>
                        <h1>Create</h1>
                        <div className="flex justify-center">
                            <Grid isCreating={true} />
                            <ClueTable isCreating={true} />
                        </div>
                        <button className="border-2" onClick={exportCrossword}>Export</button>
                    </ErrorBoundary>
                </ClueContext.Provider>
            </GridContext.Provider>
        </>
    )
}

export default Create