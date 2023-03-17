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

    // const [imageName, setImageName] = useState(userImage)
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');



    useEffect(() => {

        setEmail(decodeURIComponent(query.get('email')))
        setToken(query.get('token'))

        console.log(email);
        console.log(token);
        const verifyUser = async () => {
            let response = fetch(`http://68.183.127.52:3000/user/verify-account/${encodeURIComponent(token)}?email=${email}`)

            await response.then((res) => {
                res.json()
            }).then((data) => {
                console.log(data);
                navigate('/login')
            }).catch((e) => {
                alert("Error submitting form!");
            });;
        }

        verifyUser()


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