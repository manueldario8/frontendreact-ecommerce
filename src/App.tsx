import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/home/home.tsx'
import Navbar from './components/navbar/navbar.tsx';

function App() {
  
  return (
    <>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App