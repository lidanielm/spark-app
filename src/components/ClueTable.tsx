import { useContext } from 'react';
import { ClueContext } from '../context/ClueContext';

const ClueTable = ({ isCreating }: { isCreating: boolean }) => {
    const { clues, setClues, selectedClue, setSelectedClue } = useContext(ClueContext);

    return (
        <div className="overflow-x-auto p-4 overflow-y-auto min-h-[300px] max-h-[700px]">
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold">Number</th>
                        <th className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold">Clue</th>
                    </tr>
                </thead>
                <tbody>
                    {clues
                        .sort((c1, c2) => c1.direction.charCodeAt(0) - c2.direction.charCodeAt(0))
                        .map((clue, i) => {
                            const isSelected = clue.number === selectedClue?.number && clue.direction === selectedClue?.direction;
                            return (
                                <tr
                                    key={i}
                                    className={`border border-gray-300 ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"} transition cursor-pointer`}
                                    onClick={() => setSelectedClue(clue)}
                                >
                                    <td className="px-4 py-2 text-gray-700 font-medium">
                                        {clue.number}
                                        {clue.direction === "Across" ? "A" : "D"}
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            value={clue.text}
                                            className="w-full px-2 py-1 border-b border-gray-400 outline-none focus:border-blue-500 transition"
                                            disabled={!isCreating}
                                            onChange={(e) => {
                                                const newClues = [...clues];
                                                newClues[i].text = e.target.value;
                                                setClues(newClues);
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>

    );
}

export default ClueTable;