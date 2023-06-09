import React, { useEffect, useState } from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { FiUser } from 'react-icons/fi'
import Footer from '../../../shared/Footer/Footer'
import Header from '../../../shared/Header/Header'
import Loading from '../../../shared/Loading/Loading'
import { toast, ToastContainer } from 'react-toastify';
import Apiloader from '../../../shared/ApiLoader/Apiloader'
import { useNavigate } from 'react-router-dom'
import { changePasswordSchema } from '../../../schemas';
import './Profile.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsCameraFill } from 'react-icons/bs'
import { useFormik } from 'formik'
import axiosInstance from "../../../shared/HttpClient/axiosInstance";

const initialValues = {
    password: '',
    newPassword: '',
    confirmNewPassword: ''
}


function Profile() {

    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('user'))?.token.token;
    const userImage = JSON.parse(localStorage.getItem('image'))?.userPic;
    const [imageName, setImageName] = useState(userImage)

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [isAgent, setIsAgent] = useState(false);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false)
    const [formLoader, setFormLoader] = useState(false)
    const [rSLoader, setRSLoader] = useState(false)
    const [getUserdata, setGetUserdata] = useState(true)


    const [password, setPassword] = useState('password')
    const [newPassword, setNewPassword] = useState('password')
    const [confirmNewPassword, setConfirmNewPassword] = useState('password')
    const [changePasswordError, setChangePasswordError] = useState('')



    // const oldPassword = useRef(null);
    // const newpassword = useRef(null);
    // const newPasswordConform = useRef(null);

    const updateimage = async (imagee) => {
        const formData = new FormData();
        formData.append('address', address)
        formData.append('city', city)
        formData.append('contact', contact)
        formData.append('image', imagee)
        formData.append('country', country)
        formData.append('name', name)
        formData.append('isAgent', isAgent)

        setFormLoader(true)

        axiosInstance.put('user/profile', formData)
            .then((res) => {
                if (res.status === 200) {
                    setFormLoader(false)
                    toast.success('User Updated Successfully.',
                        { position: toast.POSITION.TOP_LEFT })
                    window.location.reload(false);
                }
            })
            .catch((error) => {
                if (error) {
                    return (setFormLoader(false),
                        toast.error(error, { position: toast.POSITION.TOP_LEFT }))


                } else {
                    setFormLoader(false)
                    toast.error('400 Error',
                        { position: toast.POSITION.TOP_LEFT }
                    )
                }
            })
    }


    useEffect(() => {

        if (getUserdata && localStorage.getItem('user')) {
            setLoader(true)
            axiosInstance.get('user')
                .then((res) => {
                    console.log(res.data);
                    const data = res.data.data;
                    setName(data.name)
                    setContact(data.contact)
                    setAddress(data.address)
                    setIsAgent(data.isAgent)
                    setCountry(data.country)
                    setCity(data.city)
                    localStorage.setItem('image', JSON.stringify({ userPic: data.image }))
                    setImageName(data.image)
                    setEmail(data.email)
                    setLoader(false)
                    setGetUserdata(false)
                })
                .catch((error) => {
                    setGetUserdata(false)
                    setLoader(false)
                    toast.error('error', { position: toast.POSITION.TOP_LEFT })
                });
        }
    },[updateimage])

    const updateProfile = async (event) => {
        event.preventDefault(); // 👈️ prevent page refreslog
        console.log(image);

        const formData = new FormData();
        formData.append('address', address)
        formData.append('city', city)
        formData.append('contact', contact)
        formData.append('image', image)
        formData.append('country', country)
        formData.append('name', name)
        formData.append('isAgent', isAgent)

        setFormLoader(true)

        axiosInstance.put('user/profile', formData)
            .then((res) => {
                if (res.status === 200) {
                    setFormLoader(false)
                    toast.success('User Updated Successfully.',
                        { position: toast.POSITION.TOP_LEFT })
                    window.location.reload(false);
                }
            })
            .catch((error) => {
                if (error) {
                    return (setFormLoader(false),
                        toast.error(error, { position: toast.POSITION.TOP_LEFT }))


                } else {
                    setFormLoader(false)
                    toast.error('400 Error',
                        { position: toast.POSITION.TOP_LEFT }
                    )
                }
            })
    }



    const togglePassword = (e) => {
        if (e === 'password') {
            if (password === "password") {
                setPassword("text")
                return;
            }
            setPassword("password")
        }
        if (e === 'newPassword') {
            if (newPassword === "password") {
                setNewPassword("text")
                return;
            }
            setNewPassword("password")
        }
        if (e === 'confirmNewPassword') {
            if (confirmNewPassword === "password") {
                setConfirmNewPassword("text")
                return;
            }
            setConfirmNewPassword("password")
        }

    }


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: changePasswordSchema,
        onSubmit: (values) => {
            setRSLoader(true)
            axiosInstance.post('user/change-password', values)
                .then((res) => {
                    setRSLoader(false)
                    localStorage.clear()
                    navigate(`/login?message=Password changed`)
                })
                .catch((error) => {
                    setRSLoader(false)
                    console.log(error);
                    setChangePasswordError(error.response.data.message[0])
                    // toast.error(error.response.data.message[0],
                    //     { position: toast.POSITION.TOP_LEFT }
                    // )
                })

        }
    });


    return (

        <>
            {loader ?

                <Loading />

                :

                <>
                    <Header />
                    <section className='profile-section'>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 mx-auto">
                                    <div className='user-card' style={{ position: 'relative' }}>
                                        {formLoader && <Apiloader />}
                                        <div className="user-card-body">
                                            <div className="user-mete">
                                                <div className='user-card-meta-avatar'>
                                                    {imageName === '' ?
                                                        <div className="img img-picture" style={{ position: 'relative' }}>
                                                            <span className='icon'><FiUser /></span>
                                                            <div className='upload-icons'>
                                                                <div className='upload-file'>
                                                                    <button><BsCameraFill style={{color : '#fff' , fontSize : '30px'}}/></button>
                                                                    <input type="file" id="img" name="img" accept="image/*"
                                                                        className='button'
                                                                        onChange={(e) => {
                                                                            updateimage(e.target.files[0])
                                                                        }} />
                                                                </div>
                                                            </div>
                                                        </div> :
                                                        <div className="img-picture" style={{ position: 'relative' }}>
                                                            <img
                                                                src={imageName}
                                                                alt=""
                                                                loading='lazy'
                                                                width={'80px'}
                                                                style={{ borderRadius: '50%' }} />
                                                            {/* <BsCameraFill className='upload-icons' /> */}
                                                            <div className='upload-icons'>
                                                                <div className='upload-file'>
                                                                    <button><BsCameraFill style={{color : '#fff' , fontSize : '30px'}}/></button>
                                                                    <input type="file" id="img" name="img" accept="image/*"
                                                                        className='button'
                                                                        onChange={(e) => {
                                                                            updateimage(e.target.files[0])
                                                                        }} />
                                                                </div>
                                                            </div>


                                                        </div>
                                                    }
                                                </div>
                                                {imageName === '' && imageName === undefined ?
                                                    <div className='user-card-meta-detail'>
                                                        <div className='name'>User</div>
                                                        <div className='email'>user@gmail.com</div>
                                                    </div>
                                                    :
                                                    <div className='user-card-meta-detail'>
                                                        <div className='name'>{name}</div>
                                                        <div className='email'>{email}</div>
                                                    </div>
                                                }
                                            </div>
                                            <div className='divider'></div>
                                            <form onSubmit={updateProfile}>
                                                <div className="row">
                                                    <div className="col-lg-6 mt-4">
                                                        <label>Name</label>
                                                        <input type="name" defaultValue={name} className='input'
                                                            placeholder="Name"
                                                            onChange={(e) => setName(e.target.value)} />
                                                    </div>
                                                    <div className="col-lg-6 mt-4">
                                                        <label>Email</label>
                                                        <input type="email" disabled defaultValue={email}
                                                            className='input' placeholder="Enter email"
                                                            onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                    <div className="col-lg-6 mt-4">
                                                        <label>Number</label>
                                                        <input type="number" defaultValue={contact} className='input'
                                                            placeholder="Enter number"
                                                            onChange={(e) => setContact(e.target.value)} />
                                                    </div>
                                                    <div className="col-lg-6 mt-4">
                                                        <label>Address</label>
                                                        <input type="text" defaultValue={address} className='input'
                                                            placeholder="Enter address"
                                                            onChange={(e) => setAddress(e.target.value)} />
                                                    </div>
                                                    <div className="col-lg-6 mt-4">
                                                        <label>Country</label>
                                                        <input type="text" defaultValue={country} className='input'
                                                            placeholder="Enter country"
                                                            onChange={(e) => {
                                                                setCountry(e.target.value)
                                                            }} />
                                                    </div>
                                                    <div className="col-lg-6 mt-4">
                                                        <label>City</label>
                                                        <input type="text" defaultValue={city} className='input'
                                                            placeholder="Enter city"
                                                            onChange={(e) => setCity(e.target.value)} />
                                                    </div>
                                                    {/* <div className="col-lg-6 mt-4">
                                                        <label>Upload a picture</label>
                                                        <div className='upload-file'>
                                                            <button>Browse and Upload</button>
                                                            <span>{image.name}</span>
                                                            <input type="file" id="img" name="img" accept="image/*"
                                                                className='button'
                                                                onChange={
                                                                    (e) => setImage(e.target.files[0])
                                                                    
                                                                    } />
                                                        </div>
                                                        
                                                    </div> */}
                                                    <div className="col-lg-6 mt-4">
                                                        <label>User Type</label>
                                                        <div>
                                                            <BootstrapSwitchButton
                                                                checked={isAgent}
                                                                onlabel='Agent'
                                                                offlabel='User'
                                                                onChange={(checked) => {
                                                                    setIsAgent(checked)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 mt-4">
                                                        <div className="save-profile">
                                                        <button type='submit' className='button'>Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-9 mx-auto mt-5">
                                    <div className='user-card' style={{ position: 'relative' }}>
                                        {rSLoader && <Apiloader />}
                                        <div className="user-card-body">
                                            <div className="user-mete">
                                                <div className='save-password-title'>
                                                    <h1>Change Password</h1>
                                                </div>
                                            </div>
                                            <div className='divider'></div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-lg-6 mt-4">
                                                        <label>Old Password</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type={password}
                                                                autoComplete='off'
                                                                name='password'
                                                                id='password'
                                                                placeholder='Enter your password'
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className="input"
                                                            />
                                                            <span onClick={() => togglePassword('password')}>
                                                                {password === "password" ? <AiOutlineEyeInvisible /> :
                                                                    <AiOutlineEye />}
                                                            </span>
                                                        </div>
                                                        {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                                                        {changePasswordError && <p className='error'>{changePasswordError}</p>}
                                                    </div>
                                                    <div className="col-lg-6 mt-4">
                                                    </div>
                                                    <div className="col-lg-6 mt-4">
                                                        <label>New Password</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type={newPassword}
                                                                autoComplete='off'
                                                                name='newPassword'
                                                                id='newPassword'
                                                                placeholder='Enter your new password'
                                                                value={values.newPassword}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className="input"
                                                            />
                                                            <span onClick={() => togglePassword('newPassword')}>
                                                                {newPassword === "password" ? <AiOutlineEyeInvisible /> :
                                                                    <AiOutlineEye />}
                                                            </span>
                                                        </div>
                                                        {errors.newPassword && touched.newPassword &&
                                                            <p className='error'>{errors.newPassword}</p>}
                                                    </div>
                                                    <div className="col-lg-6 mt-4">
                                                        <label>Confirm New Password</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type={confirmNewPassword}
                                                                autoComplete='off'
                                                                name='confirmNewPassword'
                                                                id='confirmNewPassword'
                                                                placeholder='Enter your confirm new password'
                                                                value={values.confirmNewPassword}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className="input"
                                                            />
                                                            <span onClick={() => togglePassword('confirmNewPassword')}>
                                                                {confirmNewPassword === "password" ?
                                                                    <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                            </span>
                                                        </div>
                                                        {errors.confirmNewPassword && touched.confirmNewPassword &&
                                                            <p className='error'>{errors.confirmNewPassword}</p>}
                                                    </div>
                                                    <div className="col-lg-12 mt-4">
                                                    <div className="save-profile">
                                                        <button type="submit" className='button'>Change Password
                                                        </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </section>
                    <ToastContainer />
                    <Footer />

                </>

            }

        </>
    )
}

export default Profile
