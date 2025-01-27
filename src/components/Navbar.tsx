import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center bg-white text-black relative border-b-2 shadow-md font-mono" role="navigation">
            <div className="m-0 p-0">
                <table>
                    <tr>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>C</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>R</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>U</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>C</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>I</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>V</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>E</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>R</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>B</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>A</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>L</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>I</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>Z</td>
                        <td className='home-grid-cell hover:cursor-pointer' onClick={(e) => navigate("/")}>E</td>
                    </tr>
                </table></div>
            <div className='pr-4'>
                <Link to="/search" className="p-4">Search</Link>
                <Link to="/create" className="p-4">Create</Link>
                <Link to="/solve" className="p-4">Solve</Link>
            </div>
        </nav>
    );
}

export default Navbar;