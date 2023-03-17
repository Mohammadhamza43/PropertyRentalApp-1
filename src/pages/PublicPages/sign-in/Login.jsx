import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import Footer from '../../../shared/Footer/Footer'
import Header from '../../../shared/Header/Header'

import './Login.css'


function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (event) => {
        let item = { email, password }
        event.preventDefault(); // 👈️ prevent page refresh

        axios.post('user/login', item)
            .then((res) => {
                localStorage.setItem('user', JSON.stringify({
                    login: true,
                    token: res.data.data.user
                }))
                localStorage.setItem('image' , JSON.stringify({
                    userPic : res.data.data.user.image
                 }))
                if (localStorage.getItem('user')) {
                    navigate('/')
                }
            }).catch((error) => {
            })
    }

    return (
        <>
            <Header />
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
                                            <form onSubmit={login}>
                                                <h1 className='main-he'>Login In</h1>
                                                <input type="email" placeholder="Email" onChange={e => { setEmail(e.target.value) }} />
                                                <input type="password" placeholder="Password" onChange={e => { setPassword(e.target.value) }} />
                                                <Link to='/reset-password'>Forgot your password?</Link>
                                                <button type="submit">Login</button>
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
            <Footer />
        </>
    )
}

export default Login