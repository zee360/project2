import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CartProvider } from "react-use-cart";
import { AuthProvider } from './auth/AuthProvider'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
   <CartProvider>
    <App />
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
