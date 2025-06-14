import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Home from "../Pages/Home"
import MenuPage from "../Pages/MenuPage"
import Cart from "../Pages/Cart"
import Login from "../Pages/Auth/Login"
import Register from "../Pages/Auth/Register"
import CheckoutPage from "../Pages/CheckoutPage"
import Profile from "../Pages/Profile"
import OrderPage from "../Pages/OrderPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/menu",
                element: <MenuPage />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/checkout/:orderId",
                element: <CheckoutPage />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/order/:orderId",
                element: <OrderPage />
            },

        ]
    }
])