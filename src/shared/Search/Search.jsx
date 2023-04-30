import React, { useEffect, useRef, useState } from 'react';
import { MdGpsFixed, MdKeyboardArrowDown } from 'react-icons/md';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import './Search.css'
import 'react-dropdown/style.css';
import { usePlacesWidget } from 'react-google-autocomplete';

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
            // setSearchData({...searchData , address:value})
        }

        // Extract state
        if (types.includes("administrative_area_level_1")) {
            address.state = value

            console.log(address.state + 'state');
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

const Search = (props) => {
    const location = useLocation();
    const navigate = useNavigate()
    const propertytypeOptions = [
        { value: 'all', label: 'All' },
        { value: 'newHome', label: 'New Home' },
        { value: 'room', label: 'Room' },
        { value: 'office', label: 'Office' },
        { value: 'land', label: 'Land' },
        { value: 'building', label: 'Building' },
        { value: 'garage', label: 'Garage' },
        { value: 'commercialProperties', label: 'Commercial Properties' },
        { value: 'home', label: 'Home' },
    ]

    const [propertyType, setPropertyType] = useState({ value: 'all', label: 'All' })
    const [buy, setBuy] = useState(false)
    const [rent, setRent] = useState(false)
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lng, setLng] = useState('')
    const [lat, setLat] = useState('')
    const searchInput = useRef(null);
    const [address, setAddress] = useState({});
    const [planAddress, setPlanAddress] = useState('');

    const { ref } = usePlacesWidget({
        apiKey: apiKey,
        onPlaceSelected: ((place) => {
            onChangeAddress(place)
            return;
        }),
        options: {
            types: ['(cities)'],
            // componentRestrictions: { country: "pk" },
        },
    })

    // do something on address change
    const onChangeAddress = (autocomplete) => {
        // const place = autocomplete.getPlace();
        const place = autocomplete;
        setPlanAddress(place.formatted_address);
        place.address_components.forEach(component => {
            const types = component.types;
            const value = component.long_name;
            // Extract country
            if (types.includes("country")) {
                setCountry(value)
            }

            // Extract state
            if (types.includes("administrative_area_level_1")) {
                setState(value)
            }

            // Extract city
            if (types.includes("locality")) {
                setCity(value)
            }
        });

        const latitude = place.geometry.location.lat();
        setLat(latitude)
        const longitude = place.geometry.location.lng();
        setLng(longitude)
        return;
    }

    //init autocomplete
    const initAutocomplete = () => {
        if (!searchInput.current) return;
        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
        autocomplete.setFields(["address_component", "geometry", "formatted_address"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
        const address = extractAddress(autocomplete)

    }


    const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
        const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
        searchInput.current.value = "Getting your location...";
        fetch(url)
            .then(response => response.json())
            .then(location => {
                const place = location.results[0];
                place.address_components.forEach(component => {
                    const types = component.types;
                    const value = component.long_name;

                    // Extract country
                    if (types.includes("country")) {
                        setCountry(value)
                    }

                    // Extract state
                    if (types.includes("administrative_area_level_1")) {
                        setState(value)
                    }

                    // Extract city
                    if (types.includes("locality")) {
                        setCity(value)
                    }
                });
                console.log(place.geometry.location.lat);
                setLat(place.geometry.location.lat)
                console.log(place.geometry.location.lng);
                setLng(place.geometry.location.lng)
                const _address = extractAddress(place);
                console.log(_address);
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

    const test = 'rent'

    const sendSearchData = (e) => {
        e.preventDefault();
        try {
            if (buy === false && rent === false) {
                alert('please select rent or buy');
                return false;
            }
            // if(propertyType.value ==)
            // console.log({ purpose: 'buy', propertyType: propertyType.value, country: country, city: city, state: state, lat: lat, lng: lng, planAddress: planAddress });
            // return;
            if (location.pathname === '/') {
                if (buy) {
                    navigate("/properties", { state: { purpose: 'buy', propertyType: propertyType.value, country: country, city: city, state: state, lat: lat, lng: lng, planAddress: planAddress } })
                }
                if (rent) {
                    navigate("/properties", { state: { purpose: 'rent', propertyType: propertyType.value, country: country, city: city, state: state, lat: lat, lng: lng, planAddress: planAddress } })
                }
                if (!buy && !rent) {
                    navigate("/properties", { purpose: 'buy', state: { propertyType: propertyType.value, country: country, city: city, state: state, lat: lat, lng: lng, planAddress: planAddress } })
                }
            } else {
                const item = {
                    purpose: rent ? 'rent' : 'sale',
                    propertyType: propertyType.value,
                    country: country,
                    city: city,
                    state: state,
                    lat: lat,
                    lng: lng

                }
                props.updateState(item);
            }


        } catch (error) {
            console.error(error)
        }
    }


    //load map script after mounted
    useEffect(() => {
        initAutocomplete()
    }, []);



    return (
        <>
            <div className='property-search'>
                <form onSubmit={(e) => sendSearchData(e)}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className='row'>

                                <div className="col-lg-3 p-0">
                                    <div className="chack-box-custom">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={e => { setBuy(e.target.checked); setRent(false) }} />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Buy
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={e => { setRent(e.target.checked); setBuy(false) }} />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Rent
                                            </label>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-lg-3 p-0">
                                    <Dropdown options={propertytypeOptions} onChange={(e) => setPropertyType(e)} value={propertyType.value} placeholder="Select property type" />
                                </div>
                                <div className="col-lg-4 p-0">
                                    <div className='form-item-block'>
                                        <input type="text" ref={ref} id='campoBus' placeholder='Search Properties' onKeyDown={(e) => {

                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                            }
                                        }} />
                                        <MdGpsFixed className='search-icons' onClick={findMyLocation} />
                                    </div>
                                </div>
                                <div className="col-lg-2 p-0">
                                    <button type='submit' className='btn action' >Search</button>
                                </div>

                            </div>
                            <div>

                            </div>

                        </div>
                    </div>
                </form>
            </div>
            {/* <div>
            <div><span> buy : </span>{buy ? 'true' : 'false'}</div>
            <div><span> rent : </span>{rent ? 'true' : 'false'}</div>
            <div><span> property Type : </span> {propertyType.value}</div>
            <div><span> country : </span>{country}</div>
            <div><span> city : </span>{city}</div>
            <div><span> state : </span>{state}</div>
            <div><span> lat : </span>{lat}</div>
            <div><span> lng : </span>{lng}</div>
        </div> */}
        </>

    )
}

export default Search
