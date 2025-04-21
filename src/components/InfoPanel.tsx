import { useState } from 'react';
import ClueTable from './ClueTable';
import WordSearch from './WordSearch';


type InfoPanelMode =
    | "default"
    | "clues"
    | "wordsearch";

// css for button type
const buttonStyle = "bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";
const buttonStyleActive = "bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow";

const InfoPanel = () => {
    const [mode, setMode] = useState<InfoPanelMode>("default");
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleWordSearch = async (word: string) => {
        try {
            // Convert the word pattern to a regex
            // Replace spaces with dots and handle wildcards
            const regexPattern = word.replace(/\s/g, '.').replace(/\?/g, '.');
            const regex = new RegExp(`^${regexPattern}$`, 'i');

            // Fetch the word dictionary
            const response = await fetch('/words_dictionary.json');
            const dictionary = await response.json();

            // Filter words that match the regex
            const matches = Object.keys(dictionary).filter(word => regex.test(word));
            setSearchResults(matches);
            return matches;
        } catch (error) {
            console.error('Error searching dictionary:', error);
            return [];
        }
    }

    return (
        <div className="info-panel">
            <div className="flex justify-center space-x-4 mb-4">
                <button
                    className={mode === "default" ? buttonStyleActive : buttonStyle}
                    onClick={() => setMode("default")}
                >
                    Default
                </button>
                <button
                    className={mode === "clues" ? buttonStyleActive : buttonStyle}
                    onClick={() => setMode("clues")}
                >
                    Clues
                </button>
                <button
                    className={mode === "wordsearch" ? buttonStyleActive : buttonStyle}
                    onClick={() => setMode("wordsearch")}
                >
                    Word Search
                </button>
            </div>
            {mode === "default" && (
                <div>
                    <h3>Default Mode</h3>
                    <p>This is the default mode where you can provide general information.</p>
                </div>
            )}
            {mode === "clues" && (
                <ClueTable isCreating={true} />
            )}
            {mode === "wordsearch" && (
                <div>
                    <WordSearch
                        onSearch={handleWordSearch}
                    />
                </div>
            )}
        </div>
    );
}

export default InfoPanel;