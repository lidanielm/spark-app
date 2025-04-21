import { useContext, useState, useEffect } from 'react';
import { ClueContextType, ClueContext } from '../context/ClueContext';
import { GridContextType, GridContext } from '../context/GridContext';

interface WordSearchProps {
    onSearch: (word: string) => Promise<string[]>;
}

const WordSearch = ({ onSearch }: WordSearchProps) => {
    const [searchWord, setSearchWord] = useState("");
    const { grid } = useContext<GridContextType>(GridContext);
    const { selectedClue } = useContext<ClueContextType>(ClueContext);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [displayedResults, setDisplayedResults] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const RESULTS_PER_PAGE = 20;

    useEffect(() => {
        if (selectedClue) {
            const { row, col, direction, length } = selectedClue;
            let newWord = "";
            if (direction === "Across") {
                for (let i = 0; i < length; i++) {
                    if (grid[row][col + i] === " ") {
                        newWord += "?";
                    } else {
                        newWord += grid[row][col + i];
                    }
                }
            } else if (direction === "Down") {
                for (let i = 0; i < length; i++) {
                    if (grid[row + i][col] === " ") {
                        newWord += "?";
                    } else {
                        newWord += grid[row + i][col];
                    }
                }
            }
            setSearchWord(newWord);
        }
        
    }, [grid, selectedClue]);

    useEffect(() => {
        // Reset pagination when search results change
        setCurrentPage(0);
        setDisplayedResults(searchResults.slice(0, RESULTS_PER_PAGE));
    }, [searchResults]);

    const handleSearch = async () => {
        if (!searchWord) {
            console.log("No word to search for");
            return;
        }

        setIsSearching(true);
        try {
            const results = await onSearch(searchWord);
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handlePreviousPage = () => {
        const previousPage = currentPage - 1;
        const startIndex = previousPage * RESULTS_PER_PAGE;
        const endIndex = startIndex + RESULTS_PER_PAGE;
        setDisplayedResults(searchResults.slice(startIndex, endIndex));
        setCurrentPage(previousPage);
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        const startIndex = nextPage * RESULTS_PER_PAGE;
        const endIndex = startIndex + RESULTS_PER_PAGE;
        setDisplayedResults(searchResults.slice(startIndex, endIndex));
        setCurrentPage(nextPage);
    };

    return (
        <div className="word-search-panel">
            <h3>Word Search</h3>
            <p>Current search: {searchWord.replace(" ", "?")}</p>
            <button 
                className="border-2" 
                onClick={handleSearch}
                disabled={isSearching}
            >
                {isSearching ? 'Searching...' : 'Search'}
            </button>
            <div className="search-results">
                <h4>Search Results</h4>
                {isSearching ? (
                    <p>Searching...</p>
                ) : displayedResults.length > 0 ? (
                    <>
                        <ul>
                            {displayedResults.map((word, index) => (
                                <li key={index}>{word}</li>
                            ))}
                        </ul>
                        {displayedResults.length < searchResults.length && (
                            <>
                                <button 
                                    className={`mt-2 px-3 py-1 bg-gray-200 rounded ${currentPage > 0 ? 'hover:bg-gray-300' : 'bg-gray-100 text-gray-400'}`}
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 0}
                                >
                                    Previous Page
                                </button>
                                <button 
                                    className={`mt-2 px-3 py-1 bg-gray-200 rounded ${currentPage < Math.ceil(searchResults.length / RESULTS_PER_PAGE) - 1 ? 'hover:bg-gray-300' : 'bg-gray-100 text-gray-400'}`}
                                    onClick={handleNextPage}
                                    disabled={currentPage === Math.ceil(searchResults.length / RESULTS_PER_PAGE) - 1}
                                >
                                    Next Page
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default WordSearch;