import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    useEffect(() => {
        const cells = document.querySelectorAll('.home-grid-cell');
        cells.forEach((cell, index) => {
            (cell as HTMLElement).style.transitionDelay = `${(index % 14) * 0.08}s`;
        });
    }, []);

    return (
        <>
            <div className="flex justify-center items-center mt-10">
                <table className="border-4">
                    <tr>
                        <td className="home-grid-cell font-bold bg-black text-white">C</td>
                        <td className="home-grid-cell font-bold bg-black text-white">R</td>
                        <td className="home-grid-cell font-bold bg-black text-white">U</td>
                        <td className="home-grid-cell font-bold bg-black text-white">C</td>
                        <td className="home-grid-cell font-bold bg-black text-white">I</td>
                        <td className="home-grid-cell font-bold bg-black text-white">V</td>
                        <td className="home-grid-cell font-bold bg-black text-white">E</td>
                        <td className="home-grid-cell font-bold bg-black text-white">R</td>
                        <td className="home-grid-cell font-bold bg-black text-white">B</td>
                        <td className="home-grid-cell font-bold bg-black text-white">A</td>
                        <td className="home-grid-cell font-bold bg-black text-white">L</td>
                        <td className="home-grid-cell font-bold bg-black text-white">I</td>
                        <td className="home-grid-cell font-bold bg-black text-white">Z</td>
                        <td className="home-grid-cell font-bold bg-black text-white">E</td>
                    </tr>
                    <tr>{Array(14).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    <tr onClick={() => window.location.href = "/create"} className="hover:bg-black hover:text-white">
                        <td className="home-grid-cell">C</td>
                        <td className="home-grid-cell">R</td>
                        <td className="home-grid-cell">E</td>
                        <td className="home-grid-cell">A</td>
                        <td className="home-grid-cell">T</td>
                        <td className="home-grid-cell">E</td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                    </tr>
                    <tr>{Array(14).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    <tr onClick={() => window.location.href = "/solve"} className="hover:bg-black hover:text-white">
                        <td className="home-grid-cell">S</td>
                        <td className="home-grid-cell">O</td>
                        <td className="home-grid-cell">L</td>
                        <td className="home-grid-cell">V</td>
                        <td className="home-grid-cell">E</td>
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
                    {Array(9).fill(null).map(() =>
                        <tr>
                            {Array(14).fill(null).map(() => {
                                return <td className="home-grid-cell"></td>
                            })}
                        </tr>)}
                </table >
            </div>
        </>
    );
};

export default Home;
