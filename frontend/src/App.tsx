import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage';
import LoginRegister from './components/LoginRegister/LoginRegister';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import Profile from './components/Profile';
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/Cart/CartContext';
const Loading = () => <h1>Loading...</h1>;


function App() {
  return (
    <>
      <Router>
        <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/loading' element={<Loading/>} />
        </Routes>
        </CartProvider>
      </Router>
    </>
  )
}

export default App
