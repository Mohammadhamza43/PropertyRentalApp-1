import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import Header from '../../../shared/Header/Header'
import './Signup.css'

function Signup() {

    return (
        <>
        <Header/>
            <div className="hero-wrap ftco-degree-bg" style={{ backgroundImage: `url(${bgOne})` }} data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text justify-content-center align-items-center">
                        <div className="col-lg-12 col-md-12 col-sm-12 d-flex align-items-end">
                            <div className="text text-center">
                                <div className='login-sigin'>
                                    <div className='containerr right-panel-active' id="containerr">
                                        <div className="form-containerr sign-up-container">
                                            <form action="#">
                                                <h1 className='main-he'>Sign up</h1>
                                                <input type="text" placeholder="Name" />
                                                <input type="email" placeholder="Email" />
                                                <input type="password" placeholder="Password" />
                                                <button>Sign Up</button>
                                            </form>
                                        </div>
                                        
                                        <div className="overlay-container">
                                            <div className="overlay">
                                                <div className="overlay-panel overlay-left">
                                                    <h1 className='main-hee'>Welcome Back!</h1>
                                                    <p className='main-p'>To keep connected with us please login with your personal info</p>
                                                    <Link to='/login'> <button className="ghost" id="signIn">
                                                        Login
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

        </>
    )
}

export default Signup