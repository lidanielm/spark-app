import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const Search = () => {
    const [search, setSearch] = React.useState<string>("");
    const [results, setResults] = React.useState<any[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.get(`http://localhost:5050/api/crossword/search?search=${search}`)
                .then((res) => {
                    setResults(res.data);
                });
        } catch (err) {
            console.error(err);
            alert("Search failed");
        }
    }

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center space-y-6 p-6">
                <h1 className="text-4xl font-bold text-gray-800">Search Crosswords</h1>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col items-center space-y-4 w-full max-w-lg"
                >
                    <input
                        type="text"
                        placeholder="Enter a title or author"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        Search
                    </button>
                </form>
                <div className="w-full max-w-3xl space-y-4">
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <div
                                key={index}
                                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
                            >
                                <Link to={`/solve/${result._id}`} className="block">
                                    <h2 className="text-2xl font-bold text-gray-800">{result.title}</h2>
                                    <p className="text-gray-600">By: {result.author}</p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No results found. Try searching for something else!</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Search