
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Login from './Components/login.jsx'
import Register from './Components/register.jsx'
import ErrorPage from './Components/404page.jsx'
import Home from './Components/home.jsx'
import VideoPlayerPage from './Components/videoPlayerPage.jsx'
import ViewChannel from './Components/viewChannel.jsx'


const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        errorElement : <ErrorPage/>,
        children:[
            {
                path : "/",
                element : <Home/>,
                errorElement : <ErrorPage/>,
            },
              {
                path : "/video/:videoId",
                element : <VideoPlayerPage/>,
                errorElement : <ErrorPage/>,
            },
               {
                path : "/viewChannel",
                element : <ViewChannel/>,
                errorElement : <ErrorPage/>,
            }
        ]
    },
    {
        path : "/login",
        element : <Login/>,
        errorElement : <ErrorPage/>
    },
    {
         path : "/register",
        element : <Register/>,
        errorElement : <ErrorPage/>
    }
])

createRoot(document.getElementById('root')).render(
<RouterProvider router={appRouter}>
</RouterProvider>

)
