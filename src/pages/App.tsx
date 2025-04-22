import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Solve from './Solve';
import Search from './Search';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from '../components/ProtectedRoute';
import { LoggedInContext } from '../context/LoggedInContext';
import { isTokenValid, getUsernameFromToken } from '../utils/auth';

function App() {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        if (isTokenValid()) {
            const username = getUsernameFromToken();
            setLoggedInUser(username);
        } else {
            setLoggedInUser(null);
        }
    }, []);

    return (
        <>
            <LoggedInContext.Provider value={{ loggedInUser, setLoggedInUser }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={
                        <ProtectedRoute>
                            <Create />
                        </ProtectedRoute>
                    } />
                    <Route path="/solve" element={
                        <ProtectedRoute>
                            <Solve />
                        </ProtectedRoute>
                    } />
                    <Route path="/search" element={
                        <ProtectedRoute>
                            <Search />
                        </ProtectedRoute>
                    } />
                    <Route path="/solve/:_id" element={
                        <ProtectedRoute>
                            <Solve />
                        </ProtectedRoute>
                    } />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </LoggedInContext.Provider>
        </>
    );
}

export default App;
