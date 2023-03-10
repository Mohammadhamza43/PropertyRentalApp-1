import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import Footer from '../../../shared/Footer/Footer'
import Header from '../../../shared/Header/Header'

import './Login.css'

function Login() {

    return (
        <>
        <Header/>
            <div className="hero-wrap ftco-degree-bg" style={{ backgroundImage: `url(${bgOne})` }} data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text justify-content-center align-items-center">
                        <div className="col-lg-12 col-md-12 col-sn-12 d-flex align-items-end">
                            <div className="text text-center">
                                <div className='login-sigin'>
                                    <div className='containerr' id="containerr">
                                        <div className="form-container sign-up-container">
                                        </div>
                                        <div className="form-container sign-in-container">
                                            <form action="#">
                                                <h1 className='main-he'>Login In</h1>
                                                <input type="email" placeholder="Email" />
                                                <input type="password" placeholder="Password" />
                                                <Link to='/reset-password'>Forgot your password?</Link>
                                                <button>Login</button>
                                            </form>
                                        </div>
                                        <div className="overlay-container">
                                            <div className="overlay">
                                                <div className="overlay-panel overlay-right">
                                                    <h1 className='main-hee'>Hello, Friend!</h1>
                                                    <p className='main-p'>Enter your personal details and start journey with us</p>
                                                    <Link to='/signup'><button className="ghostt" id="signUp">
                                                      Sign Up
                                                        </button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    )
}

export default Login