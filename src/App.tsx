import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/home/home.tsx'
import Navbar from './components/navbar/navbar.tsx';
import DetailsProduct from './components/detailsproduct/detailsproduct.tsx';
import { CartProvider } from './components/cartcontext/cartcontext.tsx';
import Cart from './components/cart/cart.tsx';
import {useState} from 'react'
import Search from "./components/search/search.tsx"
function App() {
  

  const [buscarTermino, setBuscarTermino] = useState<string>("");
  const handleBuscar = (termino:string) => {
    setBuscarTermino(termino.toLowerCase())
  }

  return (
    <>
    <CartProvider>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home buscarTermino= {buscarTermino} onSearch={handleBuscar}/>}></Route>
        <Route path="/producto/:id" element={<DetailsProduct/>}></Route>
        <Route path="/carrito" element={<Cart/>}></Route>
        <Route path="/search" element={<Search onSearch = {handleBuscar}/>}></Route>
      </Routes>
    </Router>
    </CartProvider>
    </>
  )
}

export default App