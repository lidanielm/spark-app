import React, { useState, useContext } from 'react';
import { GridContext } from '../context/GridContext';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (title: string, author: string, grid: string[][], clues: any[]) => void;
}

const SolveModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [size, setSize] = useState(0);
    const [grid, setGrid] = useState<string[][]>([]);
    const [clues, setClues] = useState<any[]>([]);
    const [author, setAuthor] = useState("");
    const [error, setError] = useState("");

    const importCrossword = (file: File) => {
        let reader = new FileReader();
        reader.onload = function (e) {
            let crossword = JSON.parse(e.target?.result as string);
            console.log(crossword);
            setTitle(crossword.title);
            setAuthor(crossword.author);
            setSize(crossword.size);
            setGrid(Array(crossword.size).fill(null).map(() => Array(crossword.size).fill("")));
            setClues(crossword.clues);
        }
        reader.readAsText(file);

        console.log(grid);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!validate()) return;

        onSubmit(title, author, grid, clues);
        onClose();
    };

    const validate = () => {

        if (!clues || clues.length === 0) {
            setError("Clues are required");
            return false;
        }

        setError("");
        return true
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border-2 border-sky-500">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">Import Crossword</h1>
                <form className="space-y-6">
                    <input
                        type="file"
                        className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                importCrossword(e.target.files[0]);
                            }
                        }}
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <div className="flex justify-center">
                        <button
                            onClick={(e) => handleSubmit(e)}
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-md font-semibold transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default SolveModal;