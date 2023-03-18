import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { insert, useFormik } from 'formik'
import { toast, ToastContainer } from 'react-toastify';
import bgOne from '../../../assets/media/images/bg_1.jpg'
import Footer from '../../../shared/Footer/Footer'
import Header from '../../../shared/Header/Header'
import Apiloader from '../../../shared/ApiLoader/Apiloader'
import { signUpSchema } from '../../../schemas';
import './Signup.css'



const initialValues = {
    name: '',
    email: '',
    password: '',
    conformPassword: '',

}


function Signup() {
    const navigate = useNavigate()
    const [passwordType, setPasswordType] = useState("password");
    const [conformPasswordType, setConformPasswordType] = useState('password');
    const [loader, setLoader] = useState(false);

    const togglePassword = (e) => {
        if (e === 'password') {
            if (passwordType === "password") {
                setPasswordType("text")
                return;
            }
            setPasswordType("password")
        }
        if (e === 'conformPassword') {
            if (conformPasswordType === "password") {
                setConformPasswordType("text")
                return;
            }
            setConformPasswordType("password")
        }

    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            let data = { ...values };
            delete data.conformPassword;

            setLoader(true);
            axios.post('user/create', data)
            .then((res) => {
                navigate('/login')

            }).catch((error) => {
                setLoader(false);
                toast.error(error, {
                    position: toast.POSITION.BOTTOM_RIGHT 
                });
            })

        }
    });

    return (
        <>
            <Header />
            <div className="hero-wrap ftco-degree-bg" style={{ backgroundImage: `url(${bgOne})` }} data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text justify-content-center align-items-center">
                        <div className="col-lg-12 col-md-12 col-sm-12 d-flex align-items-end">
                            <div className="text text-center">
                                <div className='login-sigin' style={{ position: 'relative' }}>
                                    {loader && <Apiloader />}
                                    <div className='containerr right-panel-active' id="containerr">
                                        <div className="form-containerr sign-up-container">
                                            <form onSubmit={handleSubmit}>
                                                <h1 className='main-he'>Sign up</h1>
                                                <div style={{width:'100%'}}>
                                                    <input
                                                        type="name"
                                                        autoComplete='off'
                                                        name='name'
                                                        id='name'
                                                        placeholder='Enter your name'
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.name && touched.name && <p className='error'>{errors.name}</p>}
                                                </div>
                                                <div style={{width:'100%'}}>
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
                                                        type={conformPasswordType}
                                                        autoComplete='off'
                                                        name='conformPassword'
                                                        id='conformPassword'
                                                        placeholder='Enter your conformPassword'
                                                        value={values.conformPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <span onClick={() => togglePassword('conformPassword')}>
                                                        {conformPasswordType === "password" ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                    </span>
                                                </div>
                                                    {errors.conformPassword && touched.conformPassword && <p className='error-last'>{errors.conformPassword}</p>}
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
            <ToastContainer />
            <Footer />
        </>
    )
}

// const initialValues ={
//     name : '',
//     email : '',
//     password : '',
//     conformPassword : '',

// }

// const Signup = () => {

//     const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//         initialValues: initialValues,
//         validationSchema: signUpSchema,
//         onSubmit: (values) => {
//             let data = { ...values };
//             delete data.conformPassword;
//             console.log(data);

//         }
//     });


//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <div className="input-block">
//                     <label htmlFor="name" className='input-lable'>Name</label>

//                     <input
//                         type="name"
//                         autoComplete='off'
//                         name='name'
//                         id='name'
//                         placeholder='Enter your name'
//                         value={values.name}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                     {errors.name && touched.name && <p>{errors.name}</p>}

//                 </div>
//                 <div className="input-block">
//                     <label htmlFor="email" className='input-lable'>Email</label>
//                     <input
//                         type="email"
//                         autoComplete='off'
//                         name='email'
//                         id='email'
//                         placeholder='Enter your email'
//                         value={values.email}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                     {errors.email && touched.email && <p>{errors.email}</p>}
//                 </div>

//                 <div className="input-block">
//                     <label htmlFor="password" className='input-lable'>Password</label>
//                     <input
//                         type="password"
//                         autoComplete='off'
//                         name='password'
//                         id='password'
//                         placeholder='Enter your password'
//                         value={values.password}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                     {errors.password && touched.password && <p>{errors.password}</p>}
//                 </div>
//                 <div className="input-block">
//                     <label htmlFor="conformPassword" className='input-lable'>Conform Password</label>
//                     <input
//                         type="conformPassword"
//                         autoComplete='off'
//                         name='conformPassword'
//                         id='conformPassword'
//                         placeholder='Enter your conformPassword'
//                         value={values.conformPassword}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                     />
//                     {errors.conformPassword && touched.conformPassword && <p>{errors.conformPassword}</p>}
//                 </div>
//                 <button type='submit'>Submit</button>
//             </form>

//         </>
//     )
// }

export default Signup