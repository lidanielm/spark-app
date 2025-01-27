import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import Home from './Home.tsx'
import Create from './components/Create.tsx'
import Solve from './components/Solve.tsx'
import { Provider } from 'react-redux'
import store from './store/store'
import {
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom'

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
                path: "/solve",
                element: <Solve />
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
)
