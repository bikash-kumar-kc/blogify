import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import QueryProvider from './lib/tanstack_query/QueryProvider.jsx'
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>
 <BrowserRouter>
 <QueryProvider>
   <AuthProvider>
     <App />
  </AuthProvider>
 </QueryProvider>
 </BrowserRouter>
  </StrictMode>,
)
