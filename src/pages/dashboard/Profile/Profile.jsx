import axios from 'axios'
import React, { useState  , useEffect} from 'react'
import { FiUser } from 'react-icons/fi'
import Footer from '../../../shared/Footer/Footer'
import Header from '../../../shared/Header/Header'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import './Profile.css'

function Profile() {

    const token = JSON.parse(localStorage.getItem('user')).token.token;

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [isAgent, setIsAgent] = useState(false);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=>{
        let response = fetch('http://68.183.127.52:3000/user' , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "AUTHORIZATION": `BEARER ${token}`
            }
        })
        
        response.then((res) => {
           return res.json()
        }).then((data) => {
            console.log(data.data);
             setName(data.data.name)
             setContact(data.data.contact)
             setAddress(data.data.name)
             setIsAgent(false)
             setCountry(data.data.country)
             setCity(data.data.city)
             setImage(data.data.image)
             setEmail(data.data.email)
        }).catch((e) => {
            alert("Error submitting form!");
        });
    }, [])


    

    

    const updateProfile = async (event) => {
        // setImage(image)
        let item = { name, contact, address, isAgent, country, city, image, email }
        event.preventDefault(); // 👈️ prevent page refresh

        const formData = new FormData();
        formData.append('name', name)
        formData.append('contact', contact)
        formData.append('address', address)
        formData.append('isAgent', isAgent)
        formData.append('country', country)
        formData.append('city', city)
        formData.append('image', image)
        // formData.append('email', email)


        
        fetch('http://68.183.127.52:3000/user/profile', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "AUTHORIZATION": `BEARER ${token}`
            },
            body: formData
        }).then(function (res) {
            if (res.ok) {
                alert("Perfect! ");
                console.log({res});
            } else if (res.status == 401) {
                alert("Oops! ");
            }
        }, function (e) {
            alert("Error submitting form!");
        });
    }


    return (
        <>
            <Header />
            <section className='profile-section'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mx-auto">
                            <div className='user-card'>
                                <div className="user-card-body">
                                    <div className="user-mete">
                                        <div className='user-card-meta-avatar'>
                                            <div className="img">
                                                {image === '' ?
                                                 <span className='icon'><FiUser /></span> : 
                                                 <img src={image} alt="" loading='lazy' width={'50px'} style={{borderRadius : '50px'}}/>
                                                 }
                                                
                                            </div>
                                        </div>
                                        <div className='user-card-meta-detail'>
                                            <div className='name'>{name}</div>
                                            <div className='email'>{email}</div>
                                        </div>
                                    </div>
                                    <div className='divider'></div>
                                    <form onSubmit={updateProfile}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label>Name</label>
                                                <input className='input' value={name} type="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className="col-lg-6">
                                                <label>Email</label>
                                                <input className='input' disabled value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            <div className="col-lg-6 mt-4">
                                                <label>Number</label>
                                                <input className='input' value={contact} type="number" placeholder="Full Name" onChange={(e) => setContact(e.target.value)} />
                                            </div>
                                            <div className="col-lg-6 mt-4">
                                                <label>Address</label>
                                                <input className='input' value={address} type="text" placeholder="Full Name" onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                            <div className="col-lg-6 mt-4">
                                                <label>Country</label>
                                                <select className='input' value={country} onChange={(e) => setCountry(e.target.value)}>
                                                    <option value="One">One</option>
                                                    <option value="Two">Two</option>
                                                    <option value="Three">Three</option>
                                                    <option value="Four">Four</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6 mt-4">
                                                <label>City</label>
                                                <select className='input' value={city} onChange={(e) => setCity(e.target.value)}>
                                                    <option value="one">One</option>
                                                    <option value="two">Two</option>
                                                    <option value="three">Three</option>
                                                    <option value="four">Four</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-6 mt-4">
                                                <label>User Type</label>
                                                <div>
                                                    <BootstrapSwitchButton
                                                        checked={isAgent}
                                                        onlabel='Admin User'
                                                        offlabel='Regular User'
                                                        onChange={(checked) => {
                                                            setIsAgent(checked)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mt-4">
                                                <label>Upload a picture</label>
                                                <div className='upload-file'>
                                                    <button>Browse and Upload</button>
                                                    <input required type="file" id="img" name="img" accept="image/*" className='button' onChange={(e) => setImage(e.target.files[0])} />
                                                </div>
                                                {/* <input required type="file" id="img" name="img" accept="image/*"  onChange={(e) =>setImage(e)}/> */}
                                            </div>
                                            <div className="col-lg-12 mt-4">
                                                <button className='button'>Save changes</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Profile