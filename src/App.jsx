import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Career from './pages/Career'
import Csr from './pages/Csr'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout";



import Models from './components/Models'
import SingleProduct from './pages/SingleProduct'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/career" element={<Career />} />
        <Route path="/csr" element={<Csr />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        

        {/* Products Routes */}
        <Route path="/products" element={<Models />} />        {/* List of all products */}
        <Route path="/product/:id" element={<SingleProduct />} /> {/* Single product details */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
