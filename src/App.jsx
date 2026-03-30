import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Career from './pages/Career'
import Csr from './pages/Csr'
import SingleBlog from "./pages/SingleBlog";
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout"

import Models from './components/Models'
import SingleProduct from './pages/SingleProduct'
import Showroom from './pages/Showroom'

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-in-out',
    })
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [location.pathname])

  useEffect(() => {
  // Close any open offcanvas (Bootstrap JS API)
  document.querySelectorAll('.offcanvas.show').forEach((el) => {
    const instance = window.bootstrap?.Offcanvas.getInstance(el);
    if (instance) {
      instance.hide();
    }
  });

  // HARD RESET body state (after Bootstrap finishes)
  setTimeout(() => {
    document.body.classList.remove(
      'modal-open',
      'offcanvas-open'
    );

    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    document
      .querySelectorAll('.offcanvas-backdrop')
      .forEach(el => el.remove());
  }, 50);

}, [location.pathname]);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/career" element={<Career />} />
      <Route path="/csr" element={<Csr />} />
      <Route path="/blog/:slug" element={<SingleBlog />} />
      <Route path="/showroom" element={<Showroom />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Products Routes */}
      <Route path="/products" element={<Models />} />
      {/* <Route path="/product/:id" element={<SingleProduct />} /> */}
      <Route path="/product/:slug" element={<SingleProduct />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
