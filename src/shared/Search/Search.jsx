import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import './Search.css'

function Search() {

    const [toggle, setToggle] = useState(false)
    const [showType, setShowType] = useState(false)
    const [showBed, setShowBed] = useState(false)
    const [showBath, setShowBath] = useState(false)

    const [location, setLocation] = useState({ value: 0, Name: 'NewYork' })
    const [type, setType] = useState({ value: 0, Name: 'Apartment' })
    const [bed, setBed] = useState({ value: 0, Name: '01' })
    const [bath, setBath] = useState({ value: 0, Name: '01' })
    return (
        <div className='property-search'>
            <form>
                <div className="row">
                    <div className="col-lg-12">
                        <div className='d-flex'>
                            {/* <div className='p-locations' onClick={() =>{setShowLocation(!showLocation); setShowType(false);setShowBath(false);setShowBed(false)  }}>
                            <label htmlFor="">Location</label>
                            <div className="data">
                                <span>{location.Name}</span>
                                {showLocation ? <ul>
                                    <li onClick={() =>{setLocation({value : 0 , Name : 'NewYork' }); setShowLocation(false)}}>NewYork</li>
                                    <li onClick={() =>{setLocation({value : 1 , Name : 'Bangladesh' }); setShowLocation(false)}}>Bangladesh</li>
                                    <li onClick={() =>{setLocation({value : 2 , Name : 'India' }); setShowLocation(false)}}>India</li>
                                </ul> : ''}
                                <MdKeyboardArrowDown/>
                            </div>
                        </div>
                        <div className='p-locations' onClick={() =>{setShowLocation(false); setShowType(!showType);setShowBath(false);setShowBed(false)  }}>
                            <label htmlFor="">Property type</label>
                            <div className="data">
                                <span>{type.Name}</span>
                                {showType ? <ul>
                                    <li onClick={() =>{setType({value : 0 , Name : 'Apartment' }); setShowType(false)}}>Apartment</li>
                                    <li onClick={() =>{setType({value : 1 , Name : 'House' }); setShowType(false)}}>House</li>
                                    <li onClick={() =>{setType({value : 2 , Name : 'Complex' }); setShowType(false)}}>Complex</li>
                                </ul> : ''}
                                <MdKeyboardArrowDown/>
                            </div>
                        </div>
                        <div className='p-locations' onClick={() =>{setShowLocation(false); setShowType(false);setShowBath(false);setShowBed(!showBed)  }}>
                            <label htmlFor="">Bed Room</label>
                            <div className="data">
                                <span>{bed.Name}</span>
                                {showBed ? <ul>
                                    <li onClick={() =>{setBed({value : 0 , Name : '01' }); setShowBed(false)}}>01</li>
                                    <li onClick={() =>{setBed({value : 1 , Name : '02' }); setShowBed(false)}}>02</li>
                                    <li onClick={() =>{setBed({value : 2 , Name : '03' }); setShowBed(false)}}>03</li>
                                </ul> : ''}
                                <MdKeyboardArrowDown/>
                            </div>
                        </div>
                        <div className='p-locations' onClick={() =>{setShowLocation(false); setShowType(false);setShowBath(!showBath);setShowBed(false)  }}>
                            <label htmlFor="">Bath Room</label>
                            <div className="data">
                                <span>{bath.Name}</span>
                                {showBath ? 
                                <ul>
                                    <li onClick={() =>{setBath({value : 0 , Name : '01' }); setShowBath(false)}}>01</li>
                                    <li onClick={() =>{setBath({value : 1 , Name : '02' }); setShowBath(false)}}>02</li>
                                    <li onClick={() =>{setBath({value : 2 , Name : '03' }); setShowBath(false)}}>03</li>
                                </ul> : ''}
                                <MdKeyboardArrowDown/>
                            </div>
                        </div>
                        
                        <div className='s-icon'>
                            <a><AiOutlineSearch/></a>
                            </div> */}
                            <div className="chack-box-wrap">
                            <div className="chack-box">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="home-tab" data-toggle="tab" data-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Buy</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="profile-tab" data-toggle="tab" data-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Rent</button>
                                </li>
                            </ul>
                            </div>
                            </div>
                            <div className='form-typology-wrapper'>
                                <div className={`dropdown-wrapper ${toggle ? 'active' : ''}`} onClick={() =>{setToggle(!toggle)}}>
                                    <span className='placeholder'>Property Type</span>
                                    <MdKeyboardArrowDown/>
                                    <ul className='dropdown'>
                                        <li>New Home</li>
                                        <li>Room</li>
                                        <li>Office</li>
                                        <li> Land</li>
                                        <li>Building</li>
                                        <li>Garage</li>
                                        <li>Commercial Properties</li>
                                        <li>Home</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='form-item-block'>
                                <input type="text" id='campoBus' placeholder='Search in Spain'/>
                                <AiOutlineSearch className='search-icons'/>
                            </div>
                            <button className='btn action'>Search</button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search