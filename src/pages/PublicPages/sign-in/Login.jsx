import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import Footer from '../../../shared/Footer/Footer'
import Header from '../../../shared/Header/Header'
import { loginSchema } from '../../../schemas/index';
import { useLocation, useNavigate } from 'react-router-dom'


// Importing toastify module
import { toast, ToastContainer } from 'react-toastify';

import './Login.css'
import Apiloader from '../../../shared/ApiLoader/Apiloader'

import { useFormik } from 'formik'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const initialValues = {
    email: '',
    password: '',
}


const Login = () => {
    const [incorrectPass , setInncorrectPass] = useState(false)


    const navigate = useNavigate()
    let query = useQuery();
    const message = useRef()

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log('called');
        if (localStorage.getItem('user')) {
            navigate('/')
        };


        message.current = query.get('message')
        if (message !== '') {
            toast.success((message.current?.replace(/-/g, ' ')),
                { position: toast.POSITION.TOP_LEFT })
        }
    }, [message])


    // const [message, setMessage] = useState('');





    const [passwordType, setPasswordType] = useState("password");
    const [loader, setLoader] = useState(false);

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            setLoader(true)
            axios.post('user/login', values)
                .then((res) => {
                    setLoader(false)
                    toast.success('Successfully login',
                        { position: toast.POSITION.TOP_LEFT })
                    localStorage.setItem('user', JSON.stringify({
                        login: true,
                        token: res.data.data.user
                    }))
                    localStorage.setItem('token', res.data.data.user.token)
                    localStorage.setItem('image', JSON.stringify({
                        userPic: res.data.data.user.image
                    }))
                    if (localStorage.getItem('user')) {
                        navigate('/')
                    }
                }).catch((error) => {
                    setLoader(false)
                    console.log(error);
                    if(error.response.data.message[0] === 'Password incorrect'){
                        setInncorrectPass(true)
                        console.log('Password incorrect');
                    }
                    toast.error(error.response.data.message[0],
                        { position: toast.POSITION.TOP_LEFT }
                    )
                })

        }
    });


    return (
        <>

            <Header />
            <div className="hero-wrap ftco-degree-bg" style={{ backgroundImage: `url(${bgOne})` , position : 'relative'}} data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text justify-content-center align-items-center">
                        <div className="col-lg-12 col-md-12 col-sn-12 d-flex align-items-end">
                            <div className="text text-center">
                                <div className='login-sigin' style={{ position: 'relative' }}>
                                    {loader && <Apiloader />}

                                    <div className='containerr' id="containerr">
                                        <div className="form-container sign-up-container">
                                        </div>
                                        <div className="form-container sign-in-container">
                                            <form onSubmit={handleSubmit}>
                                                <h1 className='main-he'>Log in</h1>
                                                <div style={{ width: '100%' }}>
                                                    <input
                                                        type="email"
                                                        autoComplete='off'
                                                        name='email'
                                                        id='email'
                                                        placeholder='Enter your email'
                                                        style={{borderColor : errors.email && '#e86ed0'}}
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                                                </div>

                                                <div className='password-filed'>
                                                    <input
                                                        type={passwordType}
                                                        autoComplete='off'
                                                        name='password'
                                                        id='password'
                                                        placeholder='Enter your password'
                                                        value={values.password}
                                                        style={{borderColor : errors.password && '#e86ed0'}}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <span onClick={() => togglePassword('password')}>
                                                        {passwordType === "password" ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                    </span>
                                                </div>
                                                {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                                                {incorrectPass && <p className='error'>Password incorrect</p>}
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
                <ToastContainer />
            </div>
            <Footer />
        </>

    )
}

export default Login
