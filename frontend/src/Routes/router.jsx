import { createBrowserRouter } from "react-router-dom"
import Home from "../Pages/Home"
import Main from "../Layout/Main"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ]
    }
])