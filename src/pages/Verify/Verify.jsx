import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import loader from '../../assets/media/loader/loader.gif'
import Footer from '../../shared/Footer/Footer'
import Header from '../../shared/Header/Header'
import './Verify.css'


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function Verify() {

    let query = useQuery();
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');



    useEffect(() => {

        setEmail(query.get('email'))
        setToken(query.get('token'))

        console.log(email);
        console.log(token);

        axios.get(`user/verify-account/${token}?email=${email}`)
                .then((res) => {
                    navigate(`/login?message=Email verified successfully`)
                    })
                    .catch((error) => {
                    console.log(`user/verify-account/${token}?email=${email}`);
                })


    } , [query])






    return (
        <>
            <Header />
            <div className='loader_parent'>
                <div className='loader_child'>
                    <img src={loader} alt="" />
                    <p>Verifying Account</p>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Verify