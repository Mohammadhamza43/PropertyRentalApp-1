import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import Header from '../../../shared/Header/Header'
import Footer from '../../../shared/Footer/Footer'
// Importing toastify module
import { toast, ToastContainer } from 'react-toastify';
import './Reset.css'
import axios from 'axios'
import Apiloader from '../../../shared/ApiLoader/Apiloader'

function Reset() {

    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);

    const reset = async (event) => {
        let item = { email }
        console.log(item);
        event.preventDefault(); // 👈️ prevent page refresh
        setLoader(true);
        axios.post('user/forgot-password', item)
            .then((res) => {
                setLoader(false);
                toast.success('Password reset link is sent to your email', {
                    position: toast.POSITION.BOTTOM_RIGHT 
                });
                localStorage.setItem('user', JSON.stringify({
                    login: true,
                    token: res.data.data.user
                }))
            }).catch((error) => {
                setLoader(false);
                toast.error('error', {
                    position: toast.POSITION.BOTTOM_RIGHT 
                });
            })
    }

    return (
        <>
            <Header />
            <div className='reset-form' style={{ backgroundImage: `url(${bgOne})` }}>
            <div className="container">
                <div className="row no-gutters justify-content-center align-items-center">
                    <div className="col-lg-5 col-md-5 col-sn-12 d-flex align-items-end">
                    <div className='resetForm' style={{position : 'relative'}}>
                            {loader &&  <Apiloader/>}
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
            <ToastContainer/>
        <Footer/>
        </>
    )
}

export default Reset
