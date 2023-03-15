import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import Header from '../../../shared/Header/Header'
import Footer from '../../../shared/Footer/Footer'
import './ResetPassword.css'
import axios from 'axios'

function ResetPassword() {

    const [email, setEmail] = useState('');

    const reset = async (event) => {
        let item = { email }
        console.log(item);
        event.preventDefault(); // 👈️ prevent page refresh

        axios.post('/user/forgot-password', item)
            .then((res) => {
                console.log(res.data.data.user);
                localStorage.setItem('user', JSON.stringify({
                    login: true,
                    token: res.data.data.user
                }))
                // if (localStorage.getItem('user')) {
                //     navigate('/')
                // }
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Header />
            <div className='reset-form' style={{ backgroundImage: `url(${bgOne})` }}>
            <div className="container">
                <div className="row no-gutters justify-content-center align-items-center">
                    <div className="col-lg-5 col-md-5 col-sn-12 d-flex align-items-end">
                        <div className='resetForm'>
                            <form onSubmit={reset}>
                                <div className='heading'>
                                <h1 className='main-he'>Enter Your Account</h1>
                                </div>
                                <div className="input">
                                <p>Please enter your email address and we'll send you a link to reset your password.</p>
                                <input type="email" placeholder="Email" onChange={e => { setEmail(e.target.value) }} />
                                </div>
                                <div className='button'>
                                <button>
                                <Link to='/login'>Back To Login</Link></button>
                                <button type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        <Footer/>
        </>
    )
}

export default ResetPassword