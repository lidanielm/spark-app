import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Create from '../components/Create';
import Solve from '../components/Solve';
import Search from '../components/Search';
import Register from '../components/Register';
import Login from '../components/Login';
import { LoggedInContext } from '../context/LoggedInContext';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    username: string;
    exp: number;
    [key: string]: any;
}

function App() {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const decoded: any = jwtDecode(token);
    //         setLoggedInUser(decoded.username);
    //     }
    // }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);

                if (decoded.exp < Date.now() / 1000) {
                    localStorage.removeItem('token');   
                    setLoggedInUser(null);
                } else {
                    setLoggedInUser(decoded.username);
                }
            } catch (error) {
                console.error('Token verification error:', error);
                localStorage.removeItem('token');
                setLoggedInUser(null);
            }
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
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </LoggedInContext.Provider>
        </>
    );
}

export default App;
