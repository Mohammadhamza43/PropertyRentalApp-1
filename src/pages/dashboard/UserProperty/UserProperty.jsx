import React, {useEffect, useState} from 'react'
import {MdOutlineMapsHomeWork} from 'react-icons/md'
import workOne from '../../../assets/media/images/work-1.jpg'
import {BiBed} from 'react-icons/bi'
import {TbBath} from 'react-icons/tb'
import Header from '../../../shared/Header/Header'
import Footer from '../../../shared/Footer/Footer'
import './UserProperty.css'
import {Link} from 'react-router-dom'
import Loading from '../../../shared/Loading/Loading'

const UserProperty = () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token.token;
    const [list, setList] = useState([])
    const [data, setData] = useState('')
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getPropertyList()
    }, [])

    const getPropertyList = async () => {
        const response = await fetch('https://walrus-app-ovpy2.ondigitalocean.app/property/user', {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "AUTHORIZATION": `BEARER ${token}`
            }
        })

        const data = await response.json()
        setLoader(false)
        setList(data.data)
        console.log(data.data);

        // .then((response) =>   response.json() )
        // .then((res) => {
        //     // console.log(res.data);
        //     setList(res.data); })

        // .catch((error) => {
        //     console.log(error);
        // });
    }

    return (
        <>
            {loader ?
                <Loading/>
                :
                <>
                    <Header/>
                    <section className="ftco-section">
                        <div className="container">
                            <div className="row">
                                {list.map((x, index) => {
                                    return (
                                        <div className="col-md-4">
                                            <div className="property-wrap" style={{position: 'relative'}}>
                                                <span className='status'>{x.status}</span>
                                                <span className='edit'><Link to={`/update-properties/?id=${x._id}`}>Edit</Link></span>
                                                {(x.photos.length > 1) ?
                                                    <a href="properties/1" className="img"
                                                       style={{backgroundImage: `url(${x.photos[0]})`}}></a> :
                                                    <a href="properties/1" className="img"
                                                       style={{backgroundImage: `url(${workOne})`}}></a>}
                                                <div className="text">
                                                    <p className="price">
                                                        {/* <span className="old-price">800,000</span> */}
                                                        <span className="orig-price">${x.price.toLocaleString()}<small>{x.purpose.includes('rent') ? ' / month' : ''}</small></span></p>
                                                    <ul className="property_list">
                                                        <li><span
                                                            className="flaticon-bed three-margin-icon"><BiBed/></span>{x[x.type + 'Amenities'].kitchen}
                                                        </li>
                                                        <li><span
                                                            className="flaticon-bathtub three-margin-icon"><TbBath/></span>{x[x.type + 'Amenities'].bath}
                                                        </li>
                                                        <li><span
                                                            className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>{x?.area?.value.toLocaleString() + ' ' + x?.area?.unit}
                                                        </li>
                                                    </ul>
                                                    <h3><a href="properties/1">{x.title}</a></h3>
                                                    <span className="location">{x.location.pinLocation}</span>
                                                    {/*<a href="properties/1"
                                                       className="d-flex align-items-center justify-content-center btn-custom">
                                                        <span className="ion-ios-link"></span>
                                                    </a>*/}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            {/* <div className="row mt-5">
          <div className="col text-center">
            <div className="block-27">
              <ul>
                <li className='p-1'><a href="#">&lt;</a></li>
                <li className="active p-1"><span>1</span></li>
                <li className='p-1'><a href="#">2</a></li>
                <li className='p-1'><a href="#">3</a></li>
                <li className='p-1'><a href="#">4</a></li>
                <li className='p-1'><a href="#">5</a></li>
                <li className='p-1'><a href="#">&gt;</a></li>
              </ul>
            </div>
          </div>
        </div> */}
                        </div>
                    </section>
                    <Footer/>
                </>
            }
        </>
    )
}
export default UserProperty
