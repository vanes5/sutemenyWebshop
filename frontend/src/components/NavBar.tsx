import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { useEffect, useState } from 'react';
import { checkAuthStatus } from '../api';

export default function NavBar(){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();
    
    async function checkAuth() {
            try {
              const response = await checkAuthStatus();
              if (response && response.user) {
                setIsAuthenticated(true);
                navigate('/profile')
              }
            } catch (error) {
              setIsAuthenticated(false);
              alert("Nincsen bejelentkezve")
              navigate('/login')
            }
          return;
    }

    return <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <img className='navbar-logo-img' src="/images/cupcake.png" />
                    </Link>
                    <ul className={`navbar-links`}>
                        <li className="navbar-item">
                            <Link to="/" className="navbar-link">
                                Home
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/cart" className="navbar-link">
                                Cart
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/login-register" className="navbar-link">
                                Login/Register
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to={"/loading"} onClick={checkAuth} className="navbar-link">
                                Profile
                            </Link>
                        </li>                        
                    </ul>
                </div>
            </nav>  
    </>
}