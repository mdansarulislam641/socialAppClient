import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Pages/About/About";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login";
import Media from "../Pages/Media/Media";
import PostDetails from "../Pages/Media/PostDetails";
import Message from "../Pages/Message/Message";
import Register from "../Pages/Register";
import PrivateRoutes from "./PrivateRoute";

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
                path:'/media',
                element:<Media></Media>
            },
            {
                path:'/message',
                element:<PrivateRoutes><Message></Message></PrivateRoutes>
            },
            {
                path:'/about',
                element:<About></About>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/postDetails/:id',
                element:<PrivateRoutes><PostDetails></PostDetails></PrivateRoutes>
            },

        ]
    }
    
])

export default router ;