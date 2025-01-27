import { useContext } from 'react';
import { ClueContext } from '../context/ClueContext';

const ClueTable = ({ isCreating }: { isCreating: boolean }) => {
    const { clues, setClues, selectedClue, setSelectedClue } = useContext(ClueContext);

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><b>Number</b></td>
                        <td><b>Clue</b></td>
                    </tr>
                    {clues.sort((c1, c2) => c1.direction.charCodeAt(0) - c2.direction.charCodeAt(0)).map((clue, i) => {
                        return (
                            <tr key={i} className={clue.number === selectedClue?.number && clue.direction === selectedClue?.direction ? "bg-blue-200" : ""} onClick={() => setSelectedClue(clue)}>
                                <td>{clue.number}{clue.direction === "Across" ? "A" : "D"}</td>
                                <td>
                                    <input
                                        value={clue.text}
                                        className="border-b-1 outline-0"
                                        disabled={!isCreating}
                                        onChange={(e) => {
                                            let newClues = [...clues];
                                            newClues[i].text = e.target.value;
                                            setClues(newClues);
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    {/* {clues.filter(clue => clue.direction === "Down").map((clue, i) => {
                        return (
                            <tr key={i} className={clue.number === selectedClue?.number ? "bg-blue-200" : ""} onClick={() => setSelectedClue(clue)}>
                                <td>{clue.number}{"D"}</td>
                                <td><input
                                    value={clue.text}
                                    className="border-b-1 outline-0"
                                    onChange={(e) => {
                                        let newClues = [...clues];
                                        newClues[i].text = e.target.value;
                                        setClues(newClues);
                                    }}
                                >
                                </input></td>
                            </tr>
                        );
                    })} */}
                </tbody>
            </table>
        </div >
    );
}

export default ClueTable;