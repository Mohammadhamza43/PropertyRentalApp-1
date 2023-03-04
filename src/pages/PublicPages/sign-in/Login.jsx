import React, { useState } from 'react'
import bgOne from '../../../assets/media/images/bg_1.jpg'

import './Login.css'

function Login() {

    const [change, setChange] = useState(false)

    //     const signUpButton = document.getElementById('signUp');
    //     const signInButton = document.getElementById('signIn');
    //     const container = document.getElementById('container');

    // signUpButton.addEventListener('click', () => {
    // 	container.classNameList.add("right-panel-active");
    // });

    // signInButton.addEventListener('click', () => {
    // 	container.classNameList.remove("right-panel-active");
    // });

    return (
        <>
            <div className="hero-wrap ftco-degree-bg" style={{ backgroundImage: `url(${bgOne})` }} data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text justify-content-center align-items-center">
                        <div className="col-lg-8 col-md-6 d-flex align-items-end">
                            <div className="text text-center">
                                <div className='login-sigin'>
                                    <div className={`containerr ${change ? 'right-panel-active' : ''}`} id="containerr">
                                        <div className="form-container sign-up-container">
                                            <form action="#">
                                                <h1 className='main-he'>Sign up</h1>
                                                
                                                <input type="text" placeholder="Name" />
                                                <input type="email" placeholder="Email" />
                                                <input type="password" placeholder="Password" />
                                                <button>Sign Up</button>
                                            </form>
                                        </div>
                                        <div className="form-container sign-in-container">
                                            <form action="#">
                                                <h1 className='main-he'>Login In</h1>
                                                <input type="email" placeholder="Email" />
                                                <input type="password" placeholder="Password" />
                                                <a href="#">Forgot your password?</a>
                                                <button>Sign In</button>
                                            </form>
                                        </div>
                                        <div className="overlay-container">
                                            <div className="overlay">
                                                <div className="overlay-panel overlay-left">
                                                    <h1>Welcome Back!</h1>
                                                    <p>To keep connected with us please login with your personal info</p>
                                                    <button className="ghost" id="signIn" onClick={() => { setChange(false) }}>Sign In</button>
                                                </div>
                                                <div className="overlay-panel overlay-right">
                                                    <h1 className='main-he'>Hello, Friend!</h1>
                                                    <p>Enter your personal details and start journey with us</p>
                                                    <button className="ghost" id="signUp" onClick={() => { setChange(true) }}>Sign Up</button>
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

export default Login