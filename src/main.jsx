import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'

const router=createBrowserRouter([
  {
    path:'/', 
    element:<Home></Home>, 
    children:[
      { 
        path:'/login', 
        element:<Login></Login>
      }, 
      { 
        path:'/registration', 
        element:<Registration></Registration>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
