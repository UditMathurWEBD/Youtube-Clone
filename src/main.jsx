
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
import { Provider } from 'react-redux'
import youtubeStore from './utils/store.js'
import { Toaster } from 'react-hot-toast';
import SearchPage from './Components/searchPage.jsx'


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
                path : "/viewChannel/:channelUsername",
                element : <ViewChannel/>,
                errorElement : <ErrorPage/>,
            },
            {
                path : "/searchPage/:searchString",
                element : <SearchPage/>,
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
    <Provider store={youtubeStore}>
    <Toaster position="bottom-right" reverseOrder={false} />
<RouterProvider router={appRouter}>
</RouterProvider>
    </Provider>

)
