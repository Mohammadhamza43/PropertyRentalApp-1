import React from 'react'
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

function Header() {



  return (
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div className="container">
      <a className="navbar-brand" href="/">Homely</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="oi oi-menu"><GiHamburgerMenu/></span>
      </button>

      <div className="collapse navbar-collapse" id="ftco-nav">
        <ul className="navbar-nav ml-auto">
          <li className='nav-item'><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li className='nav-item'><NavLink to="/about" className="nav-link">About</NavLink></li>
          <li className='nav-item'><NavLink to="/agent" className="nav-link">Agent</NavLink></li>
          <li className='nav-item'><NavLink to="/services" className="nav-link">Services</NavLink></li>
          <li className='nav-item'><NavLink to="/properties" className="nav-link">Properties</NavLink></li>
          <li className='nav-item'><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
          <li className='nav-item'><NavLink to="/login" className="nav-link">Login</NavLink></li>
          <li className='nav-item'><NavLink to="/signup" className="nav-link">Signup</NavLink></li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Header