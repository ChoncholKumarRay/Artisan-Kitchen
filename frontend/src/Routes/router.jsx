import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Home from "../Pages/Home"
import MenuPage from "../Pages/MenuPage"
import Cart from "../Pages/Cart"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/menu",
                element: <MenuPage/>
            },
            {
                path: "/cart",
                element: <Cart/>
            }
        ]
    }
])