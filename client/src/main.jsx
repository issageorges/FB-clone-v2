import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'


import UserProvider from "./context/user-context.jsx";
import BlogProvider from "./context/blog-context.jsx";



ReactDOM.createRoot(document.getElementById('root')).render(
 
  <React.StrictMode>

  <BrowserRouter>
  <UserProvider>
        <BlogProvider>
    <App />
    </BlogProvider>
      </UserProvider>
  </BrowserRouter>

 

  </React.StrictMode>,
)
