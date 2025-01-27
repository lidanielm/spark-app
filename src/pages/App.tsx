import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import Create from '../components/Create';
import Solve from '../components/Solve';
import Search from '../components/Search';
import { LoggedInContext } from '../context/LoggedInContext';
import { jwtDecode } from "jwt-decode";

function App() {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: any = jwtDecode(token);
            setLoggedInUser(decoded.username);
        }
    }, []);

    return (
        <>
            <LoggedInContext.Provider value={{ loggedInUser, setLoggedInUser }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/solve" element={<Solve />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/solve/:_id" element={<Solve />} />
                </Routes>
            </LoggedInContext.Provider>
        </>
    );
}

export default App;
