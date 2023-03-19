import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiUser } from 'react-icons/fi'

function Header() {

  var image = ''
  // const [image , setImage] = useState('')

  if (localStorage.getItem('user')) {
    // image = JSON.parse(localStorage.getItem('user')).token.image;
    image = JSON.parse(localStorage.getItem('image'))?.userPic;
  }

  const [show, setShow] = useState(false)

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('image')
    navigate('/')
    console.log('working');
  }


  return (
    <>
      {localStorage.getItem('user') ?



        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
          <div className="container">
            <a className="navbar-brand" href="/">Homely</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="oi oi-menu"><GiHamburgerMenu /></span>
            </button>

            <div className="collapse navbar-collapse" id="ftco-nav">
              <ul className="navbar-nav ml-auto">
                <li className='nav-item'><NavLink to="/" className="nav-link">Home</NavLink></li>
                <li className='nav-item'><NavLink to="/about" className="nav-link">About</NavLink></li>
                <li className='nav-item'><NavLink to="/agent" className="nav-link">Agent</NavLink></li>
                <li className='nav-item'><NavLink to="/services" className="nav-link">Services</NavLink></li>
                <li className='nav-item'><NavLink to="/properties" className="nav-link">Properties</NavLink></li>
                <li className='nav-item'><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
                <li className='nav-item desk-hide' onClick={logout}><Link className="nav-link">Logout</Link></li>
                <li className='nav-item desk-hide'><NavLink to="/profile" className="nav-link">Profile</NavLink></li>
                <li className='nav-item mobile-hide dropdown' onClick={() => { setShow(!show) }} style={{ position: 'relative', margin: 'auto' }}>




                    <div className="dropdown">
                      <button className="dd-buttom" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {image !== ''
                    ?
                        <span style={{ padding: '10px', display: 'flex' }}>
                          <img src={image} alt="" width={'35px'} height={'35px'} style={{ borderRadius: '50%' }} />
                        </span>
                         :
                         <span className='header-user-icon' style={{ padding: '10px', display: 'flex', marginLeft: '20px' }}>
                           <FiUser />
                         </span>}
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <ul>
                        <li className='nav-item' onClick={logout}><Link className="nav-link">Logout</Link></li>
                        <li className='nav-item'><NavLink to="/profile" className="nav-link">Profile</NavLink></li>
                      </ul>
                      </div>
                    </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        :

        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
          <div className="container">
            <a className="navbar-brand" href="/">Homely</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="oi oi-menu"><GiHamburgerMenu /></span>
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


      }

    </>
  )
}

export default Header