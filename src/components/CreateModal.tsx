import React, { useState, useContext } from 'react';
import { GridContext } from '../context/GridContext';


export type SymmetryType = "none" | "horizontal" | "vertical" | "rotational";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (title: string, author: string, size: number, symmetry: SymmetryType) => void;
}

const CreateModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    // const [title, setTitle] = useState("");
    // const [size, setSize] = useState(5);
    // const [author, setAuthor] = useState("");
    const [error, setError] = useState("");
    // const [symmetry, setSymmetry] = useState<SymmetryType>("none");
    const { title, setTitle, size, setSize, author, setAuthor, symmetry, setSymmetry } = useContext(GridContext);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!validate()) return;

        console.log(size);

        onClose();
    };

    const validate = () => {
        if (!title.trim()) {
            setError("Title is required");
            return false;
        }

        if (!author.trim()) {
            setError("Author is required");
            return false;
        }

        if (size < 5 || size > 15) {
            setError("Size should be at least 5x5");
            return false;
        }

        setError("");
        return true
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border-2 border-sky-500">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">Enter Grid Details</h1>

                <form className="space-y-6">
                    <div>
                        <label className="block font-medium text-gray-700">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            className="mt-1 block w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700">Author:</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Enter name"
                            className="mt-1 block w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Size:</label>
                        <input
                            type="number"
                            value={size}
                            min="5"
                            max="15"
                            onChange={(e) => setSize(Number(e.target.value))}
                            placeholder="Enter size"
                            className="mt-1 block w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Symmetry:</label>
                        <select
                            value={symmetry}
                            onChange={(e) => setSymmetry(e.target.value as SymmetryType)}
                            className="mt-1 block w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        >
                            <option value="none">None</option>
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                            <option value="rotational">Rotational</option>
                        </select>
                    </div>
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

export default CreateModal;