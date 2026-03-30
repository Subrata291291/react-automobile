import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// AOS
import 'aos/dist/aos.css'

// Custom CSS
import './styles/main.css'

// Global CSS
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={2000} />
  </React.StrictMode>
)
