import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './screens/ErrorPage'
import HomePage from './screens/HomePage'
import './App.scss'
import LoginPage from './screens/LoginPage'
import CoursePage from './screens/CoursePage'

import VideoPage from './screens/VideoPage'
import RegistrationPage from './screens/RegistrationPage'
import ProfilePage from './screens/ProfilePage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/home',
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/course',
      element: <CoursePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/video',
      element: <VideoPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/register',
      element: <RegistrationPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
