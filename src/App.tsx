import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/home/home.tsx'
import Navbar from './components/navbar/navbar.tsx';
import DetailsProduct from './components/detailsproduct/detailsproduct.tsx';
import { CartProvider } from './components/cartcontext/cartcontext.tsx';
import Cart from './components/cart/cart.tsx';

function App() {
  
  return (
    <>
    <CartProvider>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/producto/:id" element={<DetailsProduct/>}></Route>
        <Route path="/carrito" element={<Cart/>}></Route>
      </Routes>
    </Router>
    </CartProvider>
    </>
  )
}

export default App