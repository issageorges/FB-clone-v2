import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import UserProvider from "./context/user-context.jsx";
import PostProvider from "./context/post-context.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PostProvider>
            <App />
        </PostProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
