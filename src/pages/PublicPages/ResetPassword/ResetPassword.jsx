import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import axios from 'axios'
import './ResetPassword.css'
import Header from '../../../shared/Header/Header'
import Footer from '../../../shared/Footer/Footer'

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

    useEffect(() =>{
        setEmail(decodeURIComponent(query.get('email')))
        setToken(query.get('token'))
    }, [query])

    const Password = async (event) => {
        let item = { password , confirmPassword , email , token  }
        console.log(item);
        event.preventDefault(); // 👈️ prevent page refresh

        axios.post('/user/change-password', item)
            .then((res) => {
                console.log(res);
                navigate('/login')
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
                            <form onSubmit={Password}>
                                <div className='heading'>
                                <h1 className='main-he'>Enter New Password</h1>
                                </div>
                                <div className="input">
                                <p>Please enter your new password.</p>
                                <input type="password" placeholder="Password" onChange={e => { setPassword(e.target.value) }} />
                                <input type="password" placeholder="Conform Password" onChange={e => { setConformPassword(e.target.value) }} />
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
        <Footer/>
        </>
    )
}

export default ResetPassword