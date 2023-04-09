import React, {useEffect, useRef, useState} from 'react'
import {MdGpsFixed, MdKeyboardArrowDown} from 'react-icons/md'
import './Search.css'

const apiKey = process.env.REACT_APP_API_KEY;
const mapApiJs = process.env.REACT_APP_MAP_API_JS;
const geocodeJson = process.env.REACT_APP_GEOCODE_JSON;

function loadAsyncScript(src) {
    return new Promise(resolve => {
        const script = document.createElement('script');
        Object.assign(script, {
            type: 'text/javascript',
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}

const extractAddress = (place) => {
    console.log(place);
    const address = {
        city: "",
        state: "",
        zip: "",
        country: "",
        streetNumber: "",
        plain() {
            const city = this.city ? this.city + ", " : "";
            const zip = this.zip ? this.zip + ", " : "";
            const state = this.state ? this.state + ", " : "";
            return city + zip + state + this.country;
        }
    }

    if (!Array.isArray(place?.address_components)) {
        return address;
    }

    place.address_components.forEach(component => {
        const types = component.types;
        //   console.log(component.types);
        const value = component.long_name;
        //   console.log(component.long_name);

        // Extract country
        if (types.includes("country")) {
            address.country = value;
        }

        // Extract state
        if (types.includes("administrative_area_level_1")) {
            address.state = value
        }

        // Extract city
        if (types.includes("locality")) {
            address.city = value
        }

        // Extract street number
        if (types.includes("street_number")) {
            address.streetNumber = value
        }

        // Extract postal code
        if (types.includes("postal_code")) {
            address.zip = value
        }
    });

    return address;
}

const Search = () => {

    const [toggle, setToggle] = useState(false)
    const [showType, setShowType] = useState(false)
    const [showBed, setShowBed] = useState(false)
    const [showBath, setShowBath] = useState(false)
    const [location, setLocation] = useState({value: 0, Name: 'NewYork'})
    const [type, setType] = useState({value: 0, Name: 'Apartment'})
    const [bed, setBed] = useState({value: 0, Name: '01'})
    const [bath, setBath] = useState({value: 0, Name: '01'})
    // const [value, setValue] = useState(null);
    // console.log(value);

//     geocodeByAddress(value.value.description)
//   .then(results => getLatLng(results[0]))
//   .then(({ lat, lng }) =>
//     console.log('Successfully got latitude and longitude', { lat, lng })
//   );

    const searchInput = useRef(null);
    const [address, setAddress] = useState({});

    // init gmap script
    /*const initMapScript = () => {
      // if script already loaded
      if(window.google) {
        return Promise.resolve();
      }
      const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
      return loadAsyncScript(src);
    }*/

    // do something on address change
    const onChangeAddress = (autocomplete) => {
        const place = autocomplete.getPlace();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address;
        console.log('Latitude: ' + lat + ', Longitude: ' + lng);
        console.log('Address: ' + address);
        setAddress(address);
    }

    //init autocomplete
    const initAutocomplete = () => {
        if (!searchInput.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
        autocomplete.setFields(["address_component", "geometry", "formatted_address"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
        const address = extractAddress(autocomplete)

    }


    const reverseGeocode = ({latitude: lat, longitude: lng}) => {
        const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
        searchInput.current.value = "Getting your location...";
        fetch(url)
            .then(response => response.json())
            .then(location => {
                const place = location.results[0];
                const _address = extractAddress(place);
                setAddress(_address);
                searchInput.current.value = _address.plain();
            })
    }


    const findMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                reverseGeocode(position.coords)
            })
        }
    }


    //load map script after mounted
    useEffect(() => {
        // initMapScript().then(() => initAutocomplete())
        initAutocomplete()
    }, []);


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
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-toggle="tab"
                                                    data-target="#home" type="button" role="tab" aria-controls="home"
                                                    aria-selected="true">Buy
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-toggle="tab"
                                                    data-target="#profile" type="button" role="tab"
                                                    aria-controls="profile" aria-selected="false">Rent
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='form-typology-wrapper'>
                                <div className={`dropdown-wrapper ${toggle ? 'active' : ''}`} onClick={() => {
                                    setToggle(!toggle)
                                }}>
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
                                <input type="text" ref={searchInput} id='campoBus' placeholder='Search in Spain'/>
                                <MdGpsFixed className='search-icons' onClick={findMyLocation}/>
                            </div>
                            <button className='btn action'>Search</button>

                        </div>

                        {/* <div className="address">
                            <p>City: <span>{address.city}</span></p>
                            <p>State: <span>{address.state}</span></p>
                            <p>Zip: <span>{address.zip}</span></p>
                            <p>Country: <span>{address.country}</span></p>
                        </div> */}
                        <div>

                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search
