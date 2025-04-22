import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import Home from './pages/Home.tsx'
import Create from './pages/Create.tsx'
import Solve from './pages/Solve.tsx'
import Search from './pages/Search.tsx'
import {
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/create",
                element: <Create />
            },
            {
                path: "/solve/:id?",
                element: <Solve />
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
