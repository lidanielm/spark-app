import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import Create from '../components/Create';
import Solve from '../components/Solve';

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/solve" element={<Solve />} />
            </Routes>
        </>
    );
}

export default App;
