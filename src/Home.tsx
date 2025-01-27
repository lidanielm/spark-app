import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoggedInContext } from './context/LoggedInContext';

const Home = () => {

    const { loggedInUser, setLoggedInUser } = useContext(LoggedInContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedInUser(null);
        navigate("/");
    }

    useEffect(() => {
        const cells = document.querySelectorAll('.home-grid-cell');
        cells.forEach((cell, index) => {
            (cell as HTMLElement).style.transitionDelay = `${(index % 16) * 0.06}s`;
        });
    }, []);

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <table className="border-4">
                    <tr>
                        {Array(16).fill(null).map(() => {
                            return <td className="home-grid-cell bg-black"></td>
                        })}
                    </tr>
                    <tr>
                        <td className="home-grid-cell bg-black"></td>
                        <td className="home-grid-cell font-bold bg-black text-white ">C</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">R</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">U</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">C</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">I</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">V</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">E</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">R</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">B</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">A</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">L</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">I</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">Z</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">E</td>
                        <td className="home-grid-cell bg-black"></td>
                    </tr>
                    <tr>
                        {Array(16).fill(null).map(() => {
                            return <td className="home-grid-cell bg-black"></td>
                        })}
                    </tr>
                    <tr>{Array(16).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    <tr className="hover:bg-black hover:text-white">
                        <td className="home-grid-cell" onClick={() => navigate("/create")}>C</td>
                        <td className="home-grid-cell" onClick={() => navigate("/create")}>R</td>
                        <td className="home-grid-cell" onClick={() => navigate("/create")}>E</td>
                        <td className="home-grid-cell" onClick={() => navigate("/create")}>A</td>
                        <td className="home-grid-cell" onClick={() => navigate("/create")}>T</td>
                        <td className="home-grid-cell" onClick={() => navigate("/create")}>E</td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                    </tr>
                    <tr>{Array(16).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    <tr className="hover:bg-black hover:text-white">
                        <td className="home-grid-cell" onClick={() => navigate("/solve")}>S</td>
                        <td className="home-grid-cell" onClick={() => navigate("/solve")}>O</td>
                        <td className="home-grid-cell" onClick={() => navigate("/solve")}>L</td>
                        <td className="home-grid-cell" onClick={() => navigate("/solve")}>V</td>
                        <td className="home-grid-cell" onClick={() => navigate("/solve")}>E</td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                    </tr>
                    <tr>{Array(16).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    <tr className="hover:bg-black hover:text-white">
                        <td className="home-grid-cell" onClick={() => navigate("/search")}>S</td>
                        <td className="home-grid-cell" onClick={() => navigate("/search")}>E</td>
                        <td className="home-grid-cell" onClick={() => navigate("/search")}>A</td>
                        <td className="home-grid-cell" onClick={() => navigate("/search")}>R</td>
                        <td className="home-grid-cell" onClick={() => navigate("/search")}>C</td>
                        <td className="home-grid-cell" onClick={() => navigate("/search")}>H</td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                    </tr>
                    {Array(7).fill(null).map(() =>
                        <tr>
                            {Array(16).fill(null).map(() => {
                                return <td className="home-grid-cell"></td>
                            })}
                        </tr>)}
                </table >
            </div>
        </>
    );
};

export default Home;
