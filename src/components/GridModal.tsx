import React, { useState, useContext } from 'react';
import { GridContext } from '../context/GridContext';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (title: string, size: number) => void;
}

const CreateModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [size, setSize] = useState(0);
    // const { gridSize, gridTitle, grid, setGrid, selectedCell, setSelectedCell } = useContext(GridContext);

    const handleSubmit = () => {
        onSubmit(title, size);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center z-10">
            <div className="bg-white p-20 border-r-2 shadow-lg w-100 text-center">
                <h2>Enter Grid Details</h2>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Size:
                    <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} />
                </label>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default CreateModal;