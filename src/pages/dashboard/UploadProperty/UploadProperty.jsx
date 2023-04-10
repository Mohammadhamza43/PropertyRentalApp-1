import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {MdDelete, MdGpsFixed} from 'react-icons/md'
import {toast, ToastContainer} from 'react-toastify';
import Dropdown from 'react-dropdown';
import Apiloader from '../../../shared/ApiLoader/Apiloader';
import Footer from '../../../shared/Footer/Footer';
import Header from '../../../shared/Header/Header';
import 'react-dropdown/style.css';
import './UploadProperty.css';


const apiKey = process.env.REACT_APP_API_KEY;
const mapApiJs = process.env.REACT_APP_MAP_API_JS;
const geocodeJson = process.env.REACT_APP_GEOCODE_JSON;
let myWindowObject = window

const loadAsyncScript = (src) => {
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
    // console.log(place);
    const address = {
        city: "",
        state: "",
        zip: "",
        country: "",
        streetNumber: "",
        area: "",
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

        // Extract area
        if (types.includes("neighborhood") || types.includes("sublocality") || types.includes("sublocality_level_")) {
            address.area = value;
        }

    });

    return address;
}


const UploadProperty = () => {

    const searchInput = useRef(null);
    const [address, setAddress] = useState('');


    // const [address, setAddress] = useState({});

    const token = JSON.parse(localStorage.getItem('user'))?.token.token;
    const navigate = useNavigate()


    const advertisingOptions = [{value: 'sale', label: 'Sale'}, {value: 'rent', label: 'Rent'}]
    const propertytypeOptions = [{value: 'propertytype', label: 'Property Type'},
        {value: 'newHome', label: 'New Home'},
        {value: 'room', label: 'Room'},
        {value: 'office', label: 'Office'},
        {value: 'land', label: 'Land'},
        {value: 'building', label: 'Building'},
        {value: 'garage', label: 'Garage'},
        {value: 'commercialProperties', label: 'Commercial Properties'},
        {value: 'home', label: 'Home'},
    ]

    const parkingOptions = [{ value: false, label: 'No' }, { value: true, label: 'Yes' }]
    const securityOptions = [{ value: false, label: 'No' }, { value: true, label: 'Yes' }]
    const elevetorOptions = [{ value: false, label: 'No' }, { value: true, label: 'Yes' }]
    const deckrOptions = [{ value: false, label: 'No' }, { value: true, label: 'Yes' }]
    const furnishedOptions = [{ value: false, label: 'No' }, { value: true, label: 'Yes' }]
    const airConditioningOptions = [{ value: false, label: 'No' }, { value: true, label: 'Yes' }]
    const balconyOptions = [{ value: false, label: 'No' }, { value: true, label: 'Yes' }]
    const windowsOptions = [{ value: false, label: 'No' }, { value: true, label: 'Yes' }]
    const fencedOptions = [{ value: false, label: 'No' }, { value: true, label: 'Yes' }]
    const statusOptions = [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'sold', label: 'Sold' }, { value: 'rented', label: 'Rented' }]
    const areaUniyOptions = [{ value: 'mm', label: 'mm' }, { value: 'cm', label: 'cm' }, { value: 'm', label: 'm' }, { value: 'km', label: 'km' }]

    const [advertising, setAdvertising] = useState({value: 'sale', label: 'Sale'})
    const [propertyType, setPropertyType] = useState({value: 'propertytype', label: 'Property Type'})
    const [title, setTitle] = useState('')
    const [pricee, setPricee] = useState('')
    const [date, setDate] = useState('')
    const [areaa, setAreaa] = useState('')
    const [type, setType] = useState('')
    const [areaUnit, setAreaUnit] = useState({value: 'mm', label: 'MM'})
    const [room, setRoom] = useState('')
    const [window, setWindow] = useState({value: false, label: 'No'})
    const [fenced, setFenced] = useState({value: false, label: 'No'})
    const [kitchen, setKitchen] = useState('')
    const [bath, setBath] = useState('')
    const [livingRoom, setLivingRoom] = useState('')
    const [washrooms, setWashrooms] = useState('')
    const [buildingNumber, setBuildingNumber] = useState('')
    const [flatNumber, setFlatNumber] = useState('')
    const [floorNumber, setFloorNumber] = useState('')
    const [totalFloors, setTotalFloors] = useState('')
    const [pinLocation, setPinLocation] = useState('')
    const [number, setNumber] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [description, setDescription] = useState('')
    const [security, setSecurity] = useState({value: false, label: 'No'})
    const [deck, setDeck] = useState({value: false, label: 'No'})
    const [elevetor, setElevetor] = useState({value: false, label: 'No'})
    const [parking, setParking] = useState({value: false, label: 'No'})
    const [airConditioning, setAirConditioning] = useState({value: false, label: 'No'})
    const [balcony, setBalcony] = useState({value: false, label: 'No'})
    const [furnished, setFurnished] = useState({value: false, label: 'No'})
    // const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [areaLocation, setAreaLocation] = useState('')
    const [propertyStatus, setPropertyStatus] = useState({value: 'active', label: 'Active'})
    const [selectedImages, setSelectedImages] = useState([]);
    const [otherFeatures, setOtherFeatures] = useState([{id: Math.random(), name: '', value: ''}]);
    const [unit, setUnit] = useState(0);
    const [wide, setWide] = useState(0);
    const [long, setLong] = useState(0);
    const [height, setheight] = useState(0);
    const [floorMap, setFloorMap] = useState('');
    const [video, setVideo] = useState('');
    const [tour, setTour] = useState('');
    const [formLoader, setFormLoader] = useState(false)
    // console.log(otherFeatuers);

    const submit = async (event) => {
        event.preventDefault()

        const location = {
            country: country,
            city: city,
            address: address,
            areaLocation: areaLocation,
            pinLocation: pinLocation,
            postalCode: postalCode,
            streetNumber: streetNumber
        };
        const area = {value: areaa, unit: areaUnit.value};
        const purpose = advertising.value;
        const availableFrom = date;
        let newHomeAmenities = {}
        let homeAmenities = {}
        let roomAmenities = {}
        let commercialAmenities = {}
        let garageAmenities = {}
        let landAmenities = {}


        switch (propertyType.value) {
            case 'newHome' || 'home':
                newHomeAmenities = {
                    rooms: room,
                    kitchen: kitchen,
                    bath: bath,
                    livingRoom: livingRoom,
                    parking: parking.value,
                    airConditioning: airConditioning.value,
                    balcony: balcony.value,
                    window: window.value,
                    furnished: furnished.value,
                    floors: totalFloors,
                    security: security.value,
                    elevator: elevetor.value,
                    otherAmenities: [...otherFeatures]
                }
                console.log(newHomeAmenities);
                break;
            case 'room':
                roomAmenities = {
                    kitchen: kitchen,
                    bath: bath,
                    parking: parking.value,
                    airConditioning: airConditioning.value,
                    balcony: balcony.value,
                    security: security.value,
                    elevator: elevetor.value,
                    window: window.value,
                    furnished: furnished.value,
                    floorNo: floorNumber,
                    otherAmenities: [...otherFeatures]
                }
                break;
            case 'office' || 'commercialProperties' || 'building':
                commercialAmenities = {
                    kitchen: kitchen,
                    bath: bath,
                    parking: parking.value,
                    airConditioning: airConditioning.value,
                    security: security.value,
                    balcony: balcony.value,
                    window: window.value,
                    furnished: furnished.value,
                    floorNo: floorNumber,
                    otherAmenities: [...otherFeatures]
                }
                break;
            case 'land':
                landAmenities = {
                    type: type,
                    fenced: fenced.value,
                    otherAmenities: [...otherFeatures]
                }
                break;
            case 'garage':
                garageAmenities = {
                    unit: unit,
                    wide: wide,
                    long: long,
                    height: height,
                    otherAmenities: [...otherFeatures]
                }
                break;

            default:
            //   text = "Looking forward to the Weekend";
        }

        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('type', propertyType.value)
        formData.append('location', JSON.stringify(location))
        formData.append('area', JSON.stringify(area))
        formData.append('purpose', purpose)
        formData.append('availableFrom', date)
        formData.append('newHomeAmenities', JSON.stringify(newHomeAmenities))
        formData.append('homeAmenities', JSON.stringify(homeAmenities))
        formData.append('roomAmenities', JSON.stringify(roomAmenities))
        formData.append('commercialAmenities', JSON.stringify(commercialAmenities))
        formData.append('garageAmenities', JSON.stringify(garageAmenities))
        formData.append('landAmenities', JSON.stringify(landAmenities))
        formData.append('price', pricee)
        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('photos', selectedImages[i])
        }

        formData.append('videos', video)
        formData.append('tours', tour)
        for (var pair of formData.entries()) {
            console.log(pair[0] + ' - ' + pair[1]);
        }

        setFormLoader(true)
        if (selectedImages === '') {
            setFormLoader(true)
            return (
                toast.success('Image is required.',
                    { position: toast.POSITION.TOP_LEFT })

            )
        }
        await fetch('https://walrus-app-ovpy2.ondigitalocean.app/property', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "AUTHORIZATION": `BEARER ${token}`
            },
            body: formData
        })
            .then((res) => {

                setFormLoader(false)
                navigate('/user-properties')
                // toast.success('Property Successfully uploaded.',
                //     { position: toast.POSITION.TOP_LEFT })
            })
            .catch((error) => {
                setFormLoader(false)

                toast.error(error, { position: toast.POSITION.TOP_LEFT })


            })

    }


    const addlines = () => {
        // let i = 0
        setOtherFeatures([...otherFeatures, {id: Math.random(), name: '', value: ''}])
        console.log({otherFeatuers: otherFeatures})
    }

    const updatefeature = (e, index) => {
        const {name, value} = e.target;
        const list = [...otherFeatures];
        list[index][name] = value;
        setOtherFeatures(list)
    }

    const removelines = (index) => {
        console.log({index})
        const featureList = otherFeatures.filter((x) => x.id !== index)
        // featureList.splice(index, 1)
        setOtherFeatures(featureList)
    }

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        console.log({selectedFilesArray})
        setSelectedImages(selectedFilesArray);
        event.target.value = "";
    };
    const onfloorMapSelected = (event) => {
        setFloorMap(event)
        console.log(event);
    };
    const onToueSelected = (event) => {
        setTour(event)
    };
    const onVideoSelected = (event) => {
        setVideo(event)
        console.log(event);
    };

    const deleteHandler = (index) => {
        const deletimage = [...selectedImages];
        deletimage.splice(index, 1)
        setSelectedImages(deletimage)
    }

    // init gmap script
    const initMapScript = () => {
        // if script already loaded
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
        return loadAsyncScript(src);
    }

    // do something on address change
    const onChangeAddress = (autocomplete) => {
        console.log('onChangeAddress')
        // console.log({autocomplete})
        const place = autocomplete.getPlace();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address;
        // console.log('Latitude: ' + lat + ', Longitude: ' + lng);
        // console.log('Address: ' + address);
        const placeDetails = extractAddress(place);
        // console.log({placeDetails})
        setAddress(searchInput.current.value);
        setCountry(placeDetails.country)
        setCity(placeDetails.city)
        setPostalCode(placeDetails.zip)
        setStreetNumber(placeDetails.streetNumber)
        setAreaLocation(placeDetails.area)
        setPinLocation(address)

    }

    //init autocomplete
    const initAutocomplete = () => {
        if (!searchInput.current) return;

        /*console.log({window})
        console.log({myWindowObject})
        console.log(myWindowObject?.google)*/

        // let autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);

        // console.log(searchInput.current.value);
        let autocomplete = new myWindowObject.google.maps.places.Autocomplete(searchInput.current);
        autocomplete.setFields(["address_component", "geometry", "formatted_address", "name"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
    }


    const reverseGeocode = ({latitude: lat, longitude: lng}) => {
        const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
        searchInput.current.value = "Getting your location...";
        fetch(url)
            .then(response => response.json())
            .then(location => {
                const place = location.results[0];
                const _address = extractAddress(place);
                setAddress(place.formatted_address);
                setCountry(_address.country)
                setCity(_address.city)
                setPostalCode(_address.zip)
                setStreetNumber(_address.streetNumber)
                setAreaLocation(_address.area)
                setPinLocation(place.formatted_address)
                searchInput.current.value = place.formatted_address;
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
    },);


    return (
        // <Dropdown options={securityOptions} value={defaultSecurityOptions} placeholder="Select an option" />
        <>
            <Header/>
            <section className='profile-section upload-property'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mx-auto mt-5">
                            <div className='user-card' style={{position: 'relative'}}>
                                {formLoader && <Apiloader/>}
                                <div className="user-card-body">
                                    <div className="user-mete">
                                        <div className='user-card-meta-avatar'>
                                            <h1> Add your listing</h1>
                                        </div>
                                    </div>
                                    <div className='divider'></div>
                                    <form onSubmit={submit}>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <label>Advertising for</label>
                                                <div className='password-filed'>
                                                    <Dropdown options={advertisingOptions} onChange={(e) => {
                                                        setAdvertising(e)
                                                    }} value={advertising.label} placeholder="Select advertising for"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className='password-filed'>
                                                    <label>Property Type</label>
                                                    <Dropdown options={propertytypeOptions} onChange={(e) => {
                                                        setPropertyType(e)
                                                    }} value={propertyType.value} placeholder="Select property type"/>
                                                </div>
                                            </div>
                                            {propertyType.value !== 'propertytype' && propertyType.value !== ''
                                                &&
                                                <>
                                                    <div className="col-lg-4">
                                                        <label>Title</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='text'
                                                                className="input"
                                                                autoComplete='off'
                                                                name='confirmNewPassword'
                                                                id='confirmNewPassword'
                                                                placeholder='Enter title'
                                                                required
                                                                onChange={(e) => { setTitle(e.target.value) }}
                                                                value={title}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Price</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='number'
                                                                className="input"
                                                                autoComplete='off'
                                                                name='date'
                                                                id='date'
                                                                placeholder='Enter Price'
                                                                onChange={(e) => { setPricee(e.target.value) }}
                                                                value={pricee}
                                                                required
                                                                data-required-message="price is Required!"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Available From</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='date'
                                                                className="input"
                                                                autoComplete='off'
                                                                name='date'
                                                                id='date'
                                                                placeholder='Enter area in square yard'
                                                                onChange={(e) => { setDate(e.target.value) }}
                                                                value={date}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Area</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='number'
                                                                className="input"
                                                                autoComplete='off'
                                                                name='confirmNewPassword'
                                                                id='confirmNewPassword'
                                                                placeholder='Enter area'
                                                                onChange={(e) => { setAreaa(e.target.value) }}
                                                                value={areaa}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Area unit</label>
                                                        <Dropdown options={areaUniyOptions} onChange={(e) => { setAreaUnit(e) }} value={areaUnit.label} placeholder="Select area unit" />
                                                    </div>
                                                    <div className="col-lg-6"></div>


                                                {(propertyType.value !== 'garage'
                                                    && propertyType.value !== 'land'
                                                    && propertyType.value !== 'room'
                                                    && propertyType.value !== 'office'
                                                    && propertyType.value !== 'building'
                                                    && propertyType.value !== 'commercialProperties'
                                                ) &&
                                                <div className="col-lg-4 mt-4">
                                                    <label>Room</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type='number'
                                                            className="input"
                                                            autoComplete='off'
                                                            name='confirmNewPassword'
                                                            id='confirmNewPassword'
                                                            placeholder='Enter number of rooms'
                                                            required
                                                            onChange={(e) => {
                                                                setRoom(e.target.value)
                                                            }}
                                                            value={room}
                                                        />
                                                    </div>
                                                </div>
                                                }

                                                {(propertyType.value !== 'garage' && propertyType.value !== 'land') &&
                                                <div className="col-lg-4 mt-4">
                                                    <label>Window</label>
                                                    <Dropdown options={windowsOptions} onChange={(e) => {
                                                        setWindow(e)
                                                    }} value={window.label} placeholder="Select window"/>
                                                </div>
                                                }
                                                {(propertyType.value !== 'land' && propertyType.value !== 'garage') &&
                                                <div className="col-lg-4 mt-4">
                                                    <label>Security</label>
                                                    <Dropdown options={securityOptions} onChange={(e) => {
                                                        setSecurity(e)
                                                    }} value={security.label} placeholder="Select Security"/>
                                                </div>
                                                }
                                                {(propertyType.value !== 'garage'
                                                    && propertyType.value !== 'land'
                                                    && propertyType.value !== 'office'
                                                    && propertyType.value !== 'building'
                                                    && propertyType.value !== 'commercialProperties'
                                                ) &&
                                                <div className="col-lg-4 mt-4">
                                                    <label>Elevetor</label>
                                                    <Dropdown options={elevetorOptions} onChange={(e) => {
                                                        setElevetor(e)
                                                    }} value={elevetor.label} placeholder="Select elevetor"/>
                                                </div>
                                                }
                                                {(propertyType.value !== 'garage' && propertyType.value !== 'land') &&
                                                <div className="col-lg-4 mt-4">
                                                    <label>Parking</label>
                                                    <Dropdown options={parkingOptions} onChange={(e) => {
                                                        setParking(e)
                                                    }} value={parking.label} placeholder="Select parking"/>

                                                </div>
                                                }
                                                {(propertyType.value !== 'garage' && propertyType.value !== 'land') &&
                                                <div className="col-lg-4 mt-4">
                                                    <label>Air conditioning</label>
                                                    <Dropdown options={airConditioningOptions} onChange={(e) => {
                                                        setAirConditioning(e)
                                                    }} value={airConditioning.label} placeholder="Select gerage"/>

                                                </div>
                                                }
                                                {(propertyType.value !== 'garage' && propertyType.value !== 'land') &&
                                                <div className="col-lg-4 mt-4">
                                                    <label>Balcony</label>
                                                    <Dropdown options={balconyOptions} onChange={(e) => {
                                                        setBalcony(e)
                                                    }} value={balcony.label} placeholder="Select balcony"/>

                                                </div>
                                                }
                                                {(propertyType.value !== 'garage' && propertyType.value !== 'land') &&
                                                <div className="col-lg-4 mt-4">
                                                    <label>Furnished</label>
                                                    <Dropdown options={furnishedOptions} onChange={(e) => {
                                                        setFurnished(e)
                                                    }} value={furnished.label} placeholder="Select furnished"/>

                                                </div>
                                                }
                                                {(propertyType.value === 'land') &&
                                                <div className="col-lg-4 mt-4">
                                                    <label>Fenced</label>
                                                    <Dropdown options={fencedOptions} onChange={(e) => {
                                                        setFurnished(e)
                                                    }} value={fenced.label} placeholder="Select fenced"/>

                                                        </div>
                                                    }
                                                    {(propertyType.value === 'land') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Land Type</label>
                                                            <div className='password-filed'>
                                                                <input
                                                                    type='text'
                                                                    style={{ padding: '10px 16px' }}
                                                                    className="input"
                                                                    autoComplete='off'
                                                                    name='confirmNewPassword'
                                                                    id='confirmNewPassword'
                                                                    placeholder='Enter unit'
                                                                    onChange={(e) => { setType(e.target.value) }}
                                                                    value={type}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType.value === 'garage') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Unit</label>
                                                            <div className='password-filed'>
                                                                <input
                                                                    type='number'
                                                                    style={{ padding: '10px 16px' }}
                                                                    className="input"
                                                                    autoComplete='off'
                                                                    name='confirmNewPassword'
                                                                    id='confirmNewPassword'
                                                                    placeholder='Enter unit'
                                                                    onChange={(e) => { setUnit(e.target.value) }}
                                                                    value={unit}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType.value === 'garage') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Wide</label>
                                                            <div className='password-filed'>
                                                                <input
                                                                    type='number'
                                                                    style={{ padding: '10px 16px' }}
                                                                    className="input"
                                                                    autoComplete='off'
                                                                    name='confirmNewPassword'
                                                                    id='confirmNewPassword'
                                                                    placeholder='Enter unit'
                                                                    onChange={(e) => { setWide(e.target.value) }}
                                                                    value={wide}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType.value === 'garage') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Long</label>
                                                            <div className='password-filed'>
                                                                <input
                                                                    type='number'
                                                                    style={{ padding: '10px 16px' }}
                                                                    className="input"
                                                                    autoComplete='off'
                                                                    name='confirmNewPassword'
                                                                    id='confirmNewPassword'
                                                                    placeholder='Enter unit'
                                                                    onChange={(e) => { setLong(e.target.value) }}
                                                                    value={long}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType.value === 'garage') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Height</label>
                                                            <div className='password-filed'>
                                                                <input
                                                                    type='number'
                                                                    style={{ padding: '10px 16px' }}
                                                                    className="input"
                                                                    autoComplete='off'
                                                                    name='confirmNewPassword'
                                                                    id='confirmNewPassword'
                                                                    placeholder='Enter unit'
                                                                    onChange={(e) => { setheight(e.target.value) }}
                                                                    value={height}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType.value !== 'garage' && propertyType.value !== 'land') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label> Kitchen</label>
                                                            <div className='password-fil'>
                                                                <input
                                                                    type='number'
                                                                    className="input"
                                                                    autoComplete='off'
                                                                    name='confirmNewPassword'
                                                                    id='confirmNewPassword'
                                                                    placeholder='Enter number of Kitchen'
                                                                    onChange={(e) => { setKitchen(e.target.value) }}
                                                                    value={kitchen}
                                                                    min={1}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType.value !== 'land' && propertyType.value !== 'garage') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Bath</label>
                                                            <div className='password-filed'>
                                                                <input
                                                                    type='number'
                                                                    className="input"
                                                                    autoComplete='off'
                                                                    name='confirmNewPassword'
                                                                    id='confirmNewPassword'
                                                                    placeholder='Enter number of bath'
                                                                    onChange={(e) => { setBath(e.target.value) }}
                                                                    value={bath}
                                                                    min={1}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType.value !== 'garage'
                                                        && propertyType.value !== 'land'
                                                        && propertyType.value !== 'room'
                                                        && propertyType.value !== 'office'
                                                        && propertyType.value !== 'building'
                                                        && propertyType.value !== 'commercialProperties'
                                                    ) &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Living Room</label>
                                                            <div className='password-filed'>
                                                                <input
                                                                    type='number'
                                                                    className="input"
                                                                    autoComplete='off'
                                                                    name='confirmNewPassword'
                                                                    id='confirmNewPassword'
                                                                    placeholder='Enter number of living rooms'
                                                                    onChange={(e) => { setLivingRoom(e.target.value) }}
                                                                    value={livingRoom}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }

                                                {(propertyType.value !== 'newHome'
                                                    && propertyType.value !== 'home'
                                                    && propertyType.value !== 'garage'
                                                    && propertyType.value !== 'land'
                                                ) &&
                                                <div className="col-lg-4 mt-4">
                                                    <label>Floor number</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type='number'
                                                            className="input"
                                                            autoComplete='off'
                                                            placeholder='Enter floor number'
                                                            onChange={(e) => {
                                                                setFloorNumber(e.target.value)
                                                            }}
                                                            value={floorNumber}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                }
                                                {(propertyType.value !== 'garage'
                                                    && propertyType.value !== 'land'
                                                    && propertyType.value !== 'room'
                                                    && propertyType.value !== 'office'
                                                    && propertyType.value !== 'building'
                                                    && propertyType.value !== 'commercialProperties'
                                                ) &&
                                                <div className="col-lg-4 mt-4">
                                                    <label> Total floors</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type='number'
                                                            className="input"
                                                            autoComplete='off'
                                                            name='confirmNewPassword'
                                                            id='confirmNewPassword'
                                                            placeholder='Enter total numner of floors'
                                                            onChange={(e) => {
                                                                setTotalFloors(e.target.value)
                                                            }}
                                                            value={totalFloors}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                }

                                                    <div className="col-lg-12 mt-4">
                                                        <label>Description</label>
                                                        <textarea
                                                            name="textarea"
                                                            type="text"
                                                            id=""
                                                            className='input'
                                                            placeholder='Enter description'
                                                            rows="5"
                                                            required
                                                            onChange={(e) => { setDescription(e.target.value) }}
                                                            value={description}>
                                                        </textarea>
                                                </div>


                                                <div className="col-lg-12 mt-4">
                                                    <label>Other features </label>
                                                    <div>
                                                        {
                                                            otherFeatures.length > 0 && otherFeatures.map((value, index) => {
                                                                return (

                                                                    <div key={value.id}>
                                                                        <div className='add-feature mb-3'>
                                                                            <input className='input' type="text"
                                                                                   name='name' placeholder='Enter name'
                                                                                   onChange={e => {
                                                                                       updatefeature(e, index)
                                                                                   }}/>
                                                                            <input className='input ml-3' type="text"
                                                                                   name='value'
                                                                                   placeholder='Enter value'
                                                                                   onChange={e => {
                                                                                       updatefeature(e, index)
                                                                                   }}/>
                                                                            {otherFeatures.length !== 1 &&
                                                                            <button className='remove' type='button'
                                                                                    onClick={() => {
                                                                                        removelines(value.id)
                                                                                    }}>Remove</button>
                                                                            }
                                                                        </div>
                                                                        {/*{otherFeatures.length - 1 === index &&*/}

                                                                        {/*}*/}
                                                                    </div>


                                                                )
                                                            })}
                                                        <button className='button mt-4' type='button'
                                                                onClick={addlines}>Add Feature</button>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 mt-4">
                                                    <label>Address</label>
                                                    <div className='password-filed address-field'>
                                                        <input
                                                            ref={searchInput}
                                                            type='text'
                                                            className="input"
                                                            placeholder='Enter address'
                                                        />
                                                        <MdGpsFixed className='search-icons' onClick={findMyLocation}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mt-4">
                                                    <label>Postal Code</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type='number'
                                                            style={{padding: '10px 16px'}}
                                                            className="input"
                                                            autoComplete='off'
                                                            name='confirmNewPassword'
                                                            id='confirmNewPassword'
                                                            placeholder='Enter postal code'
                                                            onChange={(e) => {
                                                                setPostalCode(e.target.value)
                                                            }}
                                                            value={postalCode}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mt-4">
                                                    <label>City</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type='textarea'
                                                            style={{padding: '10px 16px'}}
                                                            className="input"
                                                            autoComplete='off'
                                                            name='confirmNewPassword'
                                                            id='confirmNewPassword'
                                                            placeholder='Enter city'
                                                            onChange={(e) => {
                                                                setCity(e.target.value)
                                                            }}
                                                            value={city}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mt-4">
                                                    <label>Country</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type='textarea'
                                                            style={{padding: '10px 16px'}}
                                                            className="input"
                                                            autoComplete='off'
                                                            name='confirmNewPassword'
                                                            id='confirmNewPassword'
                                                            placeholder='Enter country'
                                                            onChange={(e) => {
                                                                setCountry(e.target.value)
                                                            }}
                                                            value={country}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mt-4">
                                                    <label>Area</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type='text'
                                                            style={{padding: '10px 16px'}}
                                                            className="input"
                                                            autoComplete='off'
                                                            name='confirmNewPassword'
                                                            id='confirmNewPassword'
                                                            placeholder='Enter area'
                                                            onChange={(e) => {
                                                                setAreaLocation(e.target.value)
                                                            }}
                                                            value={areaLocation}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-lg-4 mt-4">
                                                        <label>Property Status</label>
                                                        <Dropdown options={statusOptions} onChange={(e) => { setPropertyStatus(e.value) }} value={propertyStatus.label} />

                                                    </div> */}
                                                <div className="col-lg-4 mt-4">
                                                    <label>Street number</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type='number'
                                                            className="input"
                                                            autoComplete='off'
                                                            name='confirmNewPassword'
                                                            id='confirmNewPassword'
                                                            placeholder='Enter street number'
                                                            onChange={(e) => {
                                                                setStreetNumber(e.target.value)
                                                            }}
                                                            value={streetNumber}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mt-4">
                                                    <label>Location</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type="text"
                                                            className="input"
                                                            placeholder='Enter Location'
                                                            onChange={(e) => {
                                                                setPinLocation(e.target.value)
                                                            }}
                                                            value={pinLocation}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mt-4">
                                                    <div className='uploadimage-section'>
                                                        <div className="images">
                                                            {selectedImages &&
                                                            selectedImages.map((image, index) => {
                                                                const imagesArray = URL.createObjectURL(image)
                                                                return (
                                                                    <div key={index} className="image">
                                                                        <img src={imagesArray} height="150"
                                                                             alt="upload"/>
                                                                        <button type={"button"}
                                                                                onClick={() => deleteHandler(index)}>
                                                                            <MdDelete/>
                                                                        </button>
                                                                        <p>{index + 1}</p>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>

                                                        <label>
                                                            + Add Images
                                                            <input
                                                                type="file"
                                                                name="userimages"
                                                                onChange={onSelectFile}
                                                                multiple
                                                                accept="image/png , image/jpeg, image/webp"
                                                            />
                                                        </label>
                                                        <br/>

                                                        {selectedImages.length > 0 &&
                                                        (selectedImages.length > 10 &&
                                                            <p className="error-upload">
                                                                You can't upload more than 10 images! <br/>
                                                                <span>
                                                                            please delete <b> {selectedImages.length - 10} </b> of them{" "}
                                                                        </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className='uploadimage-section'>
                                                        {/* {floorMap !== '' &&
                                                                <div className="images">
                                                                    <div className="image">

                                                                        <img src={URL.createObjectURL(floorMap)} width={'100%'} alt="upload" />


                                                                    </div>
                                                                </div>
                                                            } */}

                                                        <label>
                                                            Add Tour
                                                            <input
                                                                type="file"
                                                                name="images"
                                                                onChange={(e) => onToueSelected(e.target.files[0])}
                                                                accept="video/mp4,video/x-m4v,video/*"
                                                            />
                                                        </label>
                                                    </div>
                                                    {tour &&
                                                    <table className="table">
                                                        <thead className="thead-dark">
                                                        <tr>
                                                            <th scope="col">Video type</th>
                                                            <th scope="col">Viddeo name</th>
                                                            <th scope="col">Video size</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>{tour.type}</td>
                                                            <td>{tour.name}</td>
                                                            <td>{(tour.size / (1024 * 1024)).toFixed(2)}MB</td>
                                                            <td onClick={() => {
                                                                setVideo('')
                                                            }}><MdDelete/></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    }
                                                </div>
                                                <div className="col-lg-12 mt-4">
                                                    <div className='uploadimage-section'>
                                                        <label>
                                                            Upload Video
                                                            <input
                                                                type="file"
                                                                name="" id=""
                                                                onChange={(e) => onVideoSelected(e.target.files[0])}
                                                                accept="video/mp4,video/x-m4v,video/*"/>
                                                        </label>
                                                    </div>
                                                    {video &&
                                                    <table className="table">
                                                        <thead className="thead-dark">
                                                        <tr>
                                                            <th scope="col">Video type</th>
                                                            <th scope="col">Viddeo name</th>
                                                            <th scope="col">Video size</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>{video.type}</td>
                                                            <td>{video.name}</td>
                                                            <td>{(video.size / (1024 * 1024)).toFixed(2)}MB</td>
                                                            <td onClick={() => {
                                                                setVideo('')
                                                            }}><MdDelete/></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    }
                                                </div>

                                                <div className="col-lg-12 mt-4">
                                                    <button type="submit" className='button'>Upload Property</button>
                                                </div>
                                            </>
                                            }


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            <section className='section'>


            </section>


            <ToastContainer/>
            <Footer/>

        </>
    )
}

export default UploadProperty
