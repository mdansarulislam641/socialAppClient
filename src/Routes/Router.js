import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import LoginUser from "../components/LoginUser";
import Register from "../components/Register";
import Main from "../Layout/Main";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<LoginUser></LoginUser>
            },
            {
                path:'/register',
                element:<Register></Register>
            }
        ]
    }
    
])

export default router ;