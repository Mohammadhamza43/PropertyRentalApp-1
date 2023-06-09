import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import Header from '../../../shared/Header/Header'
import Footer from '../../../shared/Footer/Footer'
import { toast, ToastContainer } from 'react-toastify';
import Apiloader from '../../../shared/ApiLoader/Apiloader'
import { useFormik } from 'formik'
import { resetSchema } from '../../../schemas';
import './Reset.css'
import axios from 'axios'


const initialValues = {
    email: ''
}

function Reset() {
    const [loader, setLoader] = useState(false);

    // const reset = async (event) => {
    //     let item = { email }
    //     console.log(item);
    //     event.preventDefault(); // 👈️ prevent page refresh
    //     setLoader(true);
    //     axios.post('user/forgot-password', item)
    //         .then((res) => {
    //             setLoader(false);
    //             toast.success('Password reset link is sent to your email', {
    //                 position: toast.POSITION.TOP_LEFT 
    //             });
    //             localStorage.setItem('user', JSON.stringify({
    //                 login: true,
    //                 token: res.data.data.user
    //             }))
    //         }).catch((error) => {
    //             setLoader(false);
    //             toast.error('error', {
    //                 position: toast.POSITION.TOP_LEFT 
    //             });
    //         })
    // }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: resetSchema,
        onSubmit: (values) => {

            setLoader(true);
                axios.post('user/forgot-password', values)
                    .then((res) => {
                        setLoader(false);
                        toast.success('Password reset link is sent to your email', {
                            position: toast.POSITION.TOP_LEFT 
                        });
                        localStorage.setItem('user', JSON.stringify({
                            login: true,
                            token: res.data.data.user
                        }))
                    }).catch((error) => {
                        setLoader(false);
                        console.log(error);
                        toast.error(error.response.data.message[0], {
                            position: toast.POSITION.TOP_LEFT 
                        });
                    })
        }
    });

    return (
        <>
            <Header />
            <div className='reset-form' style={{ backgroundImage: `url(${bgOne})` }}>
                <div className="container">
                    <div className="row no-gutters justify-content-center align-items-center">
                        <div className="col-lg-5 col-md-5 col-sn-12 d-flex align-items-end">
                            <div className='resetForm' style={{ position: 'relative' }}>
                                {loader && <Apiloader />}
                                <form onSubmit={handleSubmit}>
                                    <div className='heading'>
                                        <h1 className='main-he'>Enter Your Account</h1>
                                    </div>
                                    <div className="input">
                                        <p>Please enter your email address and we'll send you a link to reset your password.</p>
                                        <input
                                            type="email"
                                            autoComplete='off'
                                            name='email'
                                            id='email'
                                            placeholder='Enter your email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                                    </div>
                                    <div className='button-reset'>
                                    <button type='text'><Link to='/login'>Back To Login</Link></button>
                                        <button type='submit'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </>
    )
}

export default Reset
