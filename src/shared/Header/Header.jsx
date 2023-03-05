import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  console.log(location.pathname); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div className="container">
      <a className="navbar-brand" href="/">Homely</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="oi oi-menu"></span> Menu
      </button>

      <div className="collapse navbar-collapse" id="ftco-nav">
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item  ${location.pathname == '/' ? 'active' : ''}`}><Link to="/" className="nav-link">Home</Link></li>
          <li className={`nav-item  ${location.pathname == '/about' ? 'active' : ''}`}><Link to="/about" className="nav-link">About</Link></li>
          <li className={`nav-item  ${location.pathname == '/agent' ? 'active' : ''}`} ><Link to="/agent" className="nav-link">Agent</Link></li>
          <li className={`nav-item  ${location.pathname == '/services' ? 'active' : ''}`} ><Link to="/services" className="nav-link">Services</Link></li>
          <li className={`nav-item  ${location.pathname == '/properties' ? 'active' : ''}`} ><Link to="/properties" className="nav-link">Properties</Link></li>
          <li className={`nav-item  ${location.pathname == '/contact' ? 'active' : ''}`} ><Link to="/contact" className="nav-link">Contact</Link></li>
          <li className={`nav-item  ${location.pathname == '/login' ? 'active' : ''}`} ><Link to="/login" className="nav-link">Login/Signup</Link></li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Header