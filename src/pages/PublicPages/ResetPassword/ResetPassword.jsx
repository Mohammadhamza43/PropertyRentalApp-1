import React from 'react'
import { Link } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import Header from '../../../shared/Header/Header'
import Footer from '../../../shared/Footer/Footer'
import './ResetPassword.css'

function ResetPassword() {
    return (
        <>
            <Header />
            <div className='reset-form' style={{ backgroundImage: `url(${bgOne})` }}>
            <div className="container">
                <div className="row no-gutters justify-content-center align-items-center">
                    <div className="col-lg-5 col-md-5 col-sn-12 d-flex align-items-end">
                        <div className='resetForm'>
                            <form action="#">
                                <div className='heading'>
                                <h1 className='main-he'>Enter Your Account</h1>
                                </div>
                                <div className="input">
                                <p>Please enter your email address and we'll send you a link to reset your password.</p>
                                <input type="email" placeholder="Email" />
                                </div>
                                <div className='button'>
                                <button>
                                <Link to='/login'>Back To Login</Link></button>
                                <button>Submit</button>
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