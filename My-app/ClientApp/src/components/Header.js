import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavMenu.css';

const Header = ({ User }) => {
    const [isOpen, setIsOpen] = useState(false);
    let user = User;
    console.log("header", user)
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate();
    const handleNavProf = () => {
        navigate('/userProfile')
    }
    console.log("from header :", user)
    return (
        <div>
            <nav className='navbar col-12'>
                <div className='nav-section'>
                    <img src="https://thumbs.dreamstime.com/b/google-logo-editorial-vector-symbol-isolated-transparent-background-279621757.jpg?w=1400" alt='Logo' className='nav-logo' />
                    <input type="text" className="search-inpuut" placeholder="Search for Product here" />
                    <button className='nav-toggle' onClick={toggleMenu}>
                        ☰
                    </button>
                    <div className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
                        <Link to="#home">HOME</Link>
                        <Link to="#about">ABOUT US</Link>
                        <Link to="/cart">🛒  CART</Link>
                        <Link to="/favlist">Favourites</Link>

                        <>
                            
                            {user ? <span  className='user-name'  onClick={handleNavProf}>{user.userName}</span> : <Link to="/login">LOGIN</Link>}
                        </>

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;