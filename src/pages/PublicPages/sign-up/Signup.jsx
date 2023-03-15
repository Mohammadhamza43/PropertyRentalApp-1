import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import Footer from '../../../shared/Footer/Footer'
import Header from '../../../shared/Header/Header'
import './Signup.css'

function Signup() {
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [conformPassword , setConformPassword] = useState('');
    // const [status  , setStatus] = useState('notActive');
    // const [type  , setType] = useState('agent');
    // const [contact  , setContact] = useState('03332192649');

    const signup = async (event) =>{
        let item = {name , email , password}
        event.preventDefault(); // 👈️ prevent page refresh

        if(password === conformPassword){

            axios.post('user/create', item)
            .then((res) => {
                console.log(res);
             
            }).catch((error) => {
                console.log(error);
                alert('password doesnot match')
            })
        }
    }

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
                                            <form onSubmit={signup}>
                                                <h1 className='main-he'>Sign up</h1>
                                                <input type="text" placeholder="Name" onChange={e =>{setName(e.target.value)}}/>
                                                <input type="email" placeholder="Email" onChange={e =>{setEmail(e.target.value)}}/>
                                                <input type="password" placeholder="Password" onChange={e =>{setPassword(e.target.value)}}/>
                                                <input type="password" placeholder="Conform Password" onChange={e =>{setConformPassword(e.target.value)}}/>
                                                <button type="submit">Submit</button>
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
            <Footer/>
        </>
    )
}

export default Signup