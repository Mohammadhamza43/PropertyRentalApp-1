import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import axios from 'axios'
import './ResetPassword.css'
import Header from '../../../shared/Header/Header'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import Footer from '../../../shared/Footer/Footer'
import Apiloader from '../../../shared/ApiLoader/Apiloader'
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik'
import { resetPasswordSchema } from '../../../schemas/index';




function useQuery() {
    return new URLSearchParams(useLocation().search);
}



function ResetPassword() {

    let query = useQuery();
    const navigate = useNavigate()

    const initialValues = {
        email: decodeURIComponent(query.get('email')),
        token: query.get('token'),
        password: '',
        confirmPassword: '',

    }

    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [email, setEmail] = useState('');
    // const [token, setToken] = useState('');
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');
    const [loader, setLoader] = useState(false);




    // useEffect(() =>{
    //     setEmail(decodeURIComponent(query.get('email')))
    //     setToken(query.get('token'))
    // }, [query])

    const togglePassword = (e) => {
        if (e === 'password') {
            if (passwordType === "password") {
                setPasswordType("text")
                return;
            }
            setPasswordType("password")
        }
        if (e === 'confirmPassword') {
            if (confirmPasswordType === "password") {
                setConfirmPasswordType("text")
                return;
            }
            setConfirmPasswordType("password")
        }

    }

    // const Password = async (event) => {
    //     let item = { password, confirmPassword, email, token }
    //     console.log(item);
    //     event.preventDefault(); // 👈️ prevent page refresh
    //     setLoader(true)
    //     axios.post('user/reset-password', item)
    //         .then((res) => {
    //             setLoader(false);
    //             navigate('/login')
    //         }).catch((error) => {
    //             setLoader(false);
    //             toast.error('error', {
    //                 position: toast.POSITION.BOTTOM_RIGHT
    //             });
    //         })
    // }



    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: resetPasswordSchema,
        onSubmit: (values) => {
            console.log(values);

            setLoader(true)
        axios.post('user/reset-password', values)
            .then((res) => {
                setLoader(false);
                navigate('/login')
            }).catch((error) => {
                setLoader(false);
                console.log(error.response.data.message);
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
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
                                        <h1 className='main-he'>Enter New Password</h1>
                                    </div>
                                    <div className="input">
                                        <p>Please enter your new password.</p>
                                        <div className='password-filed'>

                                            <input
                                                type={passwordType}
                                                autoComplete='off'
                                                name='password'
                                                id='password'
                                                placeholder='Enter your password'
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <span onClick={() => togglePassword('password')}>
                                                {passwordType === "password" ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                            </span>
                                        </div>
                                        {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                                        <div className='password-filed'>
                                            <input
                                                type={confirmPasswordType}
                                                autoComplete='off'
                                                name='confirmPassword'
                                                id='confirmPassword'
                                                placeholder='Enter your confirm Password'
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <span onClick={() => togglePassword('confirmPassword')}>
                                                {confirmPasswordType === "password" ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                            </span>
                                        </div>
                                        {errors.confirmPassword && touched.confirmPassword && <p className='error-last'>{errors.confirmPassword}</p>}
                                        <div className='button-reset'>
                                            <button type='submit'>Submit</button>
                                        </div>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer />
            <Footer />
        </>
    )
}

export default ResetPassword