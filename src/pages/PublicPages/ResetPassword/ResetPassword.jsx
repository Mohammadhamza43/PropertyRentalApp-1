import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import axios from 'axios'
import './ResetPassword.css'
import Header from '../../../shared/Header/Header'
import { AiOutlineEyeInvisible , AiOutlineEye } from 'react-icons/ai'
import Footer from '../../../shared/Footer/Footer'
import Apiloader from '../../../shared/ApiLoader/Apiloader'
// Importing toastify module
import { toast, ToastContainer } from 'react-toastify';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function ResetPassword() {

    let query = useQuery();
    const navigate = useNavigate()

    const [password, setPassword] = useState('');
    const [confirmPassword, setConformPassword] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [passwordType, setPasswordType] = useState("password");
    const [conformPasswordType , setConformPasswordType] = useState('password');
    const [loader, setLoader] = useState(false);


    useEffect(() =>{
        setEmail(decodeURIComponent(query.get('email')))
        setToken(query.get('token'))
    }, [query])

    const togglePassword = (e) => {
        if(e === 'password'){
            if (passwordType === "password") {
                setPasswordType("text")
                return;
            }
            setPasswordType("password")
        }
        if(e === 'conformPassword'){
            if (conformPasswordType === "password") {
                setConformPasswordType("text")
                return;
            }
            setConformPasswordType("password")
        }
        
    }

    const Password = async (event) => {
        let item = { password , confirmPassword , email , token  }
        console.log(item);
        event.preventDefault(); // 👈️ prevent page refresh
        setLoader(true)
        axios.post('user/change-password', item)
            .then((res) => {
                setLoader(false);
                navigate('/login')
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
                            <form onSubmit={Password}>
                                <div className='heading'>
                                <h1 className='main-he'>Enter New Password</h1>
                                </div>
                                <div className="input">
                                <p>Please enter your new password.</p>
                                <div className='password-filed'>
                                                <input type={passwordType} placeholder="Password" onChange={e =>{setPassword(e.target.value)}}/>
                                                <span onClick={() => togglePassword('password')}>
                                                        {passwordType === "password" ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                                                </span>
                                                </div>
                                                <div className='password-filed'>
                                                <input type={conformPasswordType} placeholder="Conform Password" onChange={e =>{setConformPassword(e.target.value)}}/>
                                                <span onClick={() => togglePassword('conformPassword')}>
                                                        {conformPasswordType === "password" ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                                                    </span>
                                                </div>
                                </div>
                                <div className='button'>
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

export default ResetPassword