import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { toast, ToastContainer } from 'react-toastify';
import { MdDelete } from 'react-icons/md';

import Footer from '../../../shared/Footer/Footer';
import Header from '../../../shared/Header/Header';
import '../UploadProperty/UploadProperty.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const UpdateProperty = () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token.token;
    const query = useQuery();
    const navigate = useNavigate()
    const [id, setId] = useState('');
    const [list, setList] = useState([])
    const advertisingOptions = [{ value: 'sale', label: 'Sale' }, { value: 'rent', label: 'Rent' }]
    const propertytypeOptions = [{ value: 'propertytype', label: 'Property Type' },
    { value: 'newHome', label: 'New Home' },
    { value: 'room', label: 'Room' },
    { value: 'office', label: 'Office' },
    { value: 'land', label: 'Land' },
    { value: 'building', label: 'Building' },
    { value: 'garage', label: 'Garage' },
    { value: 'commercialProperties', label: 'Commercial Properties' },
    { value: 'home', label: 'Home' },
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
    const elevatorOptions = [{ value: false, label: 'No' }, { value: true, label: 'Yes' }]
    const statusOptions = [{ value: 'active', label: 'Active' },{ value: 'inactive', label: 'Inactive' },{ value: 'sold', label: 'Sold' },{ value: 'rented', label: 'Rented' }]
    const areaUnitOptions = [{ value: 'mm', label: 'MM' }, { value: 'cm', label: 'CM' }, { value: 'm', label: 'M' }, { value: 'km', label: 'KM' }]

    const [advertising, setAdvertising] = useState({ value: 'sale', label: 'Sale' })
    const [get, setGet] = useState(true)
    const [propertyType, setPropertyType] = useState({ value: 'propertytype', label: 'Property Type' })
    const [title, setTitle] = useState('')
    const [pricee, setPricee] = useState('')
    const [date, setDate] = useState('')
    const [areaa, setAreaa] = useState('')
    const [areaUnit, setAreaUnit] = useState({ value: 'mm', label: 'MM' })
    const [type, setType] = useState('')
    const [room, setRoom] = useState('')
    const [window, setWindow] = useState({ value: false, label: 'No' })
    const [fenced, setFenced] = useState({ value: false, label: 'No' })
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
    const [security, setSecurity] = useState({ value: false, label: 'No' })
    const [deck, setDeck] = useState({ value: false, label: 'No' })
    const [elevetor, setElevetor] = useState({ value: false, label: 'No' })
    const [parking, setParking] = useState({ value: false, label: 'No' })
    const [airConditioning, setAirConditioning] = useState({ value: false, label: 'No' })
    const [balcony, setBalcony] = useState({ value: false, label: 'No' })
    const [furnished, setFurnished] = useState({ value: false, label: 'No' })
    const [elevator, setElevator] = useState({ value: false, label: 'No' })
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [areaLocation, setAreaLocation] = useState('')
    const [propertyStatus, setPropertyStatus] = useState({ value: 'active', label: 'Active' })
    const [selectedImages, setSelectedImages] = useState([]);
    const [otherFeatuers, setotherFeaturs] = useState([{ name: '', value: '' }]);
    const [unit, setUnit] = useState(0);
    const [wide, setWide] = useState(0);
    const [long, setLong] = useState(0);
    const [height, setheight] = useState(0);
    const [landType, setLandType] = useState('');
    const [floorMap, setFloorMap] = useState('');
    const [video, setVideo] = useState('');
    const [tour, setTour] = useState([]);
    let property;




   
    useEffect(() => {

        fetch('https://walrus-app-ovpy2.ondigitalocean.app/property/user', {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "AUTHORIZATION": `BEARER ${token}`
            }
        }).then((res) => {
            res.json().then((result) => {
                const data = result;
                console.log(query.get('id'));
                setId(query.get('id'))
                console.log({ id });
                console.log(result.data.find(x => x._id == query.get('id')));

                const selectedProperty = result.data.find(x => x._id == query.get('id'));
                console.log(selectedProperty.availableFrom);

                const input = selectedProperty.availableFrom
                const [year, month, day] = input.split('T')[0].split('-')
                const date = `${year}-${month}-${day}`
                console.log({ date });
               
                if (selectedProperty) {
                    setPropertyType({ value: selectedProperty.type, label: selectedProperty.type })
                    setTitle(selectedProperty.title)
                    setPropertyStatus(selectedProperty.status)
                    setDate(date)
                    setPricee(selectedProperty.price)
                    setAdvertising(selectedProperty.purpose)
                    setAreaa(selectedProperty.area.value)
                    setAreaUnit(selectedProperty.area.unit)
                    setSelectedImages(selectedProperty.photos)
                    setVideo(selectedProperty.video)
                    setCountry(selectedProperty.location.country)
                    setCity(selectedProperty.location.city)
                    setAddress(selectedProperty.location.address)
                    setAreaLocation(selectedProperty.location.areaLocation)
                    setStreetNumber(selectedProperty.location.streetNumber)
                    setPinLocation(selectedProperty.location.pinLocation)
                    setPostalCode(selectedProperty.location.postalCode)
                    setDescription(selectedProperty.description)

                    if (selectedProperty.type === 'newHome') {
                        setRoom(selectedProperty.newHomeAmenities.rooms)
                        setKitchen(selectedProperty.newHomeAmenities.kitchen)
                        setBath(selectedProperty.newHomeAmenities.bath)
                        setLivingRoom(selectedProperty.newHomeAmenities.livingRoom)
                        setParking(selectedProperty.newHomeAmenities.parking ? 'Yes' : 'No')
                        setAirConditioning(selectedProperty.newHomeAmenities.airConditioning ? 'Yes' : 'No')
                        setBalcony(selectedProperty.newHomeAmenities.balcony ? 'Yes' : 'No')
                        setWindow(selectedProperty.newHomeAmenities.window ? 'Yes' : 'No')
                        setFurnished(selectedProperty.newHomeAmenities.furnished ? 'Yes' : 'No')
                        setTotalFloors(selectedProperty.newHomeAmenities.floors)
                        setSecurity(selectedProperty.newHomeAmenities.security ? 'Yes' : 'No')
                        setElevator(selectedProperty.newHomeAmenities.elevator ? 'Yes' : 'No')
                        setotherFeaturs(selectedProperty.newHomeAmenities.otherAmenities)
                    }
                    if (selectedProperty.type === 'home') {
                        setRoom(selectedProperty.homeAmenities.rooms)
                        setKitchen(selectedProperty.homeAmenities.kitchen)
                        setBath(selectedProperty.homeAmenities.bath)
                        setLivingRoom(selectedProperty.homeAmenities.livingRoom)
                        setParking(selectedProperty.homeAmenities.parking ? 'Yes' : 'No')
                        setAirConditioning(selectedProperty.homeAmenities.airConditioning ? 'Yes' : 'No')
                        setBalcony(selectedProperty.homeAmenities.balcony ? 'Yes' : 'No')
                        setWindow(selectedProperty.homeAmenities.window ? 'Yes' : 'No')
                        setFurnished(selectedProperty.homeAmenities.furnished ? 'Yes' : 'No')
                        setTotalFloors(selectedProperty.homeAmenities.floors)
                        setSecurity(selectedProperty.homeAmenities.security ? 'Yes' : 'No')
                        setElevator(selectedProperty.homeAmenities.elevator ? 'Yes' : 'No')
                        setotherFeaturs(selectedProperty.homeAmenities.otherAmenities)
                    }
                    else if (selectedProperty.type === 'room') {
                        setKitchen(selectedProperty.roomAmenities.kitchen)
                        setBath(selectedProperty.roomAmenities.bath)
                        setParking(selectedProperty.roomAmenities.parking ? 'Yes' : 'No')
                        setAirConditioning(selectedProperty.roomAmenities.airConditioning ? 'Yes' : 'No')
                        setBalcony(selectedProperty.roomAmenities.balcony ? 'Yes' : 'No')
                        setSecurity(selectedProperty.roomAmenities.security ? 'Yes' : 'No')
                        setElevator(selectedProperty.roomAmenities.elevator ? 'Yes' : 'No')
                        setWindow(selectedProperty.roomAmenities.window ? 'Yes' : 'No')
                        setFurnished(selectedProperty.roomAmenities.furnished ? 'Yes' : 'No')
                        setFlatNumber(selectedProperty.roomAmenities.floorNo)
                        setotherFeaturs(selectedProperty.roomAmenities.otherAmenities)
                    }
                    else if (selectedProperty.type === 'building') {
                        setKitchen(selectedProperty.commercialAmenities.kitchen)
                        setBath(selectedProperty.commercialAmenities.bath)
                        setParking(selectedProperty.commercialAmenities.parking ? 'Yes' : 'No')
                        setAirConditioning(selectedProperty.commercialAmenities.airConditioning ? 'Yes' : 'No')
                        setSecurity(selectedProperty.commercialAmenities.security ? 'Yes' : 'No')
                        setBalcony(selectedProperty.commercialAmenities.balcony ? 'Yes' : 'No')
                        setWindow(selectedProperty.commercialAmenities.window ? 'Yes' : 'No')
                        setFurnished(selectedProperty.commercialAmenities.furnished ? 'Yes' : 'No')
                        setFloorNumber(selectedProperty.commercialAmenities.floorNo)
                        setotherFeaturs(selectedProperty.roomAmenities.otherAmenities)
                    }
                    else if (selectedProperty.type === 'commercialProperties') {
                        setKitchen(selectedProperty.commercialAmenities.kitchen)
                        setBath(selectedProperty.commercialAmenities.bath)
                        setParking(selectedProperty.commercialAmenities.parking ? 'Yes' : 'No')
                        setAirConditioning(selectedProperty.commercialAmenities.airConditioning ? 'Yes' : 'No')
                        setSecurity(selectedProperty.commercialAmenities.security ? 'Yes' : 'No')
                        setBalcony(selectedProperty.commercialAmenities.balcony ? 'Yes' : 'No')
                        setWindow(selectedProperty.commercialAmenities.window ? 'Yes' : 'No')
                        setFurnished(selectedProperty.commercialAmenities.furnished ? 'Yes' : 'No')
                        setFloorNumber(selectedProperty.commercialAmenities.floorNo)
                        setotherFeaturs(selectedProperty.roomAmenities.otherAmenities)
                    }
                    else if (selectedProperty.type === 'Office') {
                        setKitchen(selectedProperty.commercialAmenities.kitchen)
                        setBath(selectedProperty.commercialAmenities.bath)
                        setParking(selectedProperty.commercialAmenities.parking ? 'Yes' : 'No')
                        setAirConditioning(selectedProperty.commercialAmenities.airConditioning ? 'Yes' : 'No')
                        setSecurity(selectedProperty.commercialAmenities.security ? 'Yes' : 'No')
                        setBalcony(selectedProperty.commercialAmenities.balcony ? 'Yes' : 'No')
                        setWindow(selectedProperty.commercialAmenities.window ? 'Yes' : 'No')
                        setFurnished(selectedProperty.commercialAmenities.furnished ? 'Yes' : 'No')
                        setFloorNumber(selectedProperty.commercialAmenities.floorNo)
                        setotherFeaturs(selectedProperty.roomAmenities.otherAmenities)
                    }
                    else if (selectedProperty.type === 'garage') {
                        setUnit(selectedProperty.garageAmenities.unit)
                        setWide(selectedProperty.garageAmenities.wide)
                        setLong(selectedProperty.garageAmenities.long)
                        setheight(selectedProperty.garageAmenities.height)
                        setotherFeaturs(selectedProperty.roomAmenities.otherAmenities)
                    }
                    else if (selectedProperty.type === 'land') {
                        setFenced(selectedProperty.landAmenities.fenced ? 'Yes' : 'No')
                        setLandType(selectedProperty.landAmenities.type)
                        setotherFeaturs(selectedProperty.roomAmenities.otherAmenities)
                    }
                }
            })

        })
    }, [])

    const submit = async (event) => {
        event.preventDefault()
        const location = { country: country, city: city, address: address, areaLocation: areaLocation, pinLocation: pinLocation, postalCode: postalCode, streetNumber: streetNumber };
        const area = { value: areaa, unit: (areaUnit?.value ? areaUnit?.value : areaUnit) };
        const purpose = advertising.value ? advertising?.value : advertising;
        const availableFrom = date;
        let newHomeAmenities = {}
        let homeAmenities = {}
        let roomAmenities = {}
        let commercialAmenities = {}
        let garageAmenities = {}
        let landAmenities = {}



        switch (propertyType?.value ? propertyType.value : propertyType) {
            case 'newHome':
                newHomeAmenities = {
                    rooms: room,
                    kitchen: kitchen,
                    bath: bath,
                    livingRoom: livingRoom,
                    parking: parking?.value ? parking?.value : parking,
                    airConditioning: airConditioning?.value ? airConditioning?.value : airConditioning,
                    balcony: balcony?.value ? balcony?.value : balcony,
                    window: window?.value ? window?.value : window,
                    furnished: furnished?.value ? furnished?.value : furnished,
                    floors: totalFloors,
                    security: security?.value ? security?.value : security,
                    elevator: elevetor?.value ? elevetor?.value : elevetor,
                    otherAmenities: otherFeatuers ? [...otherFeatuers] : []
                }
                break;
            case 'home':
                newHomeAmenities = {
                    rooms: room,
                    kitchen: kitchen,
                    bath: bath,
                    livingRoom: livingRoom,
                    parking: parking?.value ? parking?.value : parking,
                    airConditioning: airConditioning?.value ? airConditioning?.value : airConditioning,
                    balcony: balcony?.value ? balcony?.value : balcony,
                    window: window?.value ? window?.value : window,
                    furnished: furnished?.value ? furnished?.value : furnished,
                    floors: totalFloors,
                    security: security?.value ? security?.value : security,
                    elevator: elevetor?.value ? elevetor?.value : elevetor,
                    otherAmenities: otherFeatuers ? [...otherFeatuers] : []
                }
                break;
            case 'room':
                roomAmenities = {
                    kitchen: kitchen,
                    bath: bath,
                    parking: parking?.value ? parking?.value : parking,
                    airConditioning: airConditioning?.value ? airConditioning?.value : airConditioning,
                    balcony: balcony?.value ? balcony?.value : balcony,
                    window: window?.value ? window?.value : window,
                    security: security?.value ? security?.value : security,
                    elevator: elevetor?.value ? elevetor?.value : elevetor,
                    furnished: furnished?.value ? furnished?.value : furnished,
                    floorNo: floorNumber,
                    otherAmenities: otherFeatuers ? [...otherFeatuers] : []

                }
                console.log(roomAmenities);
                break;
            case 'building':
                commercialAmenities = {
                    kitchen: kitchen,
                    bath: bath,
                    parking: parking?.value ? parking?.value : parking,
                    airConditioning: airConditioning?.value ? airConditioning?.value : airConditioning,
                    balcony: balcony?.value ? balcony?.value : balcony,
                    window: window?.value ? window?.value : window,
                    security: security?.value ? security?.value : security,
                    furnished: furnished?.value ? furnished?.value : furnished,
                    floorNo: floorNumber,
                    otherAmenities: otherFeatuers ? [...otherFeatuers] : []

                }
                break;
            case 'office':
                commercialAmenities = {
                    kitchen: kitchen,
                    bath: bath,
                    parking: parking?.value ? parking?.value : parking,
                    airConditioning: airConditioning?.value ? airConditioning?.value : airConditioning,
                    balcony: balcony?.value ? balcony?.value : balcony,
                    window: window?.value ? window?.value : window,
                    security: security?.value ? security?.value : security,
                    furnished: furnished?.value ? furnished?.value : furnished,
                    floorNo: floorNumber,
                    otherAmenities: otherFeatuers ? [...otherFeatuers] : []

                }
                break;
            case 'commercialProperties':
                commercialAmenities = {
                    kitchen: kitchen,
                    bath: bath,
                    parking: parking?.value ? parking?.value : parking,
                    airConditioning: airConditioning?.value ? airConditioning?.value : airConditioning,
                    balcony: balcony?.value ? balcony?.value : balcony,
                    window: window?.value ? window?.value : window,
                    security: security?.value ? security?.value : security,
                    furnished: furnished?.value ? furnished?.value : furnished,
                    floorNo: floorNumber,
                    otherAmenities: otherFeatuers ? [...otherFeatuers] : []

                }
                break;
            case 'land':
                landAmenities = {
                    type: type,
                    fenced: fenced?.value ? fenced.value : fenced,
                    otherAmenities: otherFeatuers ? [...otherFeatuers] : []

                }
                console.log('Land');
                break;
            case 'garage':
                garageAmenities = {
                    unit: unit,
                    wide: wide,
                    long: long,
                    height: height,
                    otherAmenities: otherFeatuers ? [...otherFeatuers] : []

                }
                console.log('Garage');
                break;
            default:
        }

        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('type', propertyType.value ? propertyType.value : propertyType)
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

        for (let i = 0; i < selectedImages.length - 1; i++) {

            formData.append('photos', selectedImages[i])
        }
        formData.append('videos ', video)
        formData.append('tours ', '[]')
        for (var pair of formData.entries()) {
            console.log(pair[0] + ' - ' + pair[1]);
        }


        await fetch(`https://walrus-app-ovpy2.ondigitalocean.app/property/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "AUTHORIZATION": `BEARER ${token}`
            },
            body: formData
        })
            .then((res) => {
                if (res.ok) {
                    toast.success('Property Successfully uploaded.',
                        { position: toast.POSITION.BOTTOM_RIGHT })

                        navigate('/user-properties')
                }
            })
            .catch((error) => {
                if (error) {

                    toast.error(error, { position: toast.POSITION.BOTTOM_RIGHT })


                } else {
                    toast.error('400 Error',
                        { position: toast.POSITION.BOTTOM_RIGHT }
                    )
                }
            })

    }

    const addlines = () => {

        setotherFeaturs([...otherFeatuers, { name: '', value: '' }])
    }

    const updatefeature = (e, index) => {
        const { name, value } = e.target;
        const list = [...otherFeatuers];
        list[index][name] = value;
        setotherFeaturs(list)
    }

    const removelines = (index) => {
        const featureList = [...otherFeatuers]
        featureList.splice(index, 1)
        setotherFeaturs(featureList)
    }

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        setSelectedImages(selectedFilesArray);
        console.log(selectedImages);
        event.target.value = "";
    };
    const onfloorMapSelected = (event) => {
        setFloorMap(event)
        console.log(event);
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



    return (
        <>
            <Header />
            <section className='profile-section upload-property'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mx-auto mt-5">
                            <div className='user-card' style={{ position: 'relative' }}>
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
                                                    <Dropdown options={advertisingOptions} onChange={(e) => { setAdvertising(e) }} value={advertising?.value ? advertising?.value : advertising} placeholder="Select advertising for" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className='password-filed'>
                                                    <label>Property Type</label>
                                                    <Dropdown options={propertytypeOptions} onChange={(e) => { setPropertyType(e) }} value={propertyType?.value ? propertyType?.value : propertyType} placeholder="Select property type" />
                                                </div>
                                            </div>
                                            {propertyType?.value !== 'propertytype' && propertyType !== 'propertytype' && propertyType !== ''
                                                &&
                                                <>
                                                    <div className="col-lg-4">
                                                        <label>Title</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='text'
                                                                className="input"
                                                                placeholder='Enter title'
                                                                onChange={(e) => {setTitle(e.target.value) }}
                                                                defaultValue={title}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Price</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='number'
                                                                className="input"
                                                                placeholder='Enter Price'
                                                                onChange={(e) => { setPricee(e.target.value) }}
                                                                defaultValue={pricee}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Available From</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='date'
                                                                className="input"
                                                                placeholder='Enter Date'
                                                                onChange={(e) => { setDate(e.target.value) }}
                                                                defaultValue={date}
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
                                                                placeholder='Enter area in square yard'
                                                                onChange={(e) => { setAreaa(e.target.value) }}
                                                                defaultValue={areaa}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Area unit</label>
                                                        <Dropdown options={areaUnitOptions} onChange={(e) => { setAreaUnit(e) }} value={areaUnit?.label ? areaUnit.label : areaUnit} placeholder="Select area unit" />
                                                    </div>
                                                    <div className="col-lg-6"></div>
                                                    
                                                    {((propertyType?.value !== 'garage')
                                                        && (propertyType?.value !== 'land')
                                                        && (propertyType?.value !== 'room')
                                                        && (propertyType?.value !== 'office')
                                                        &&( propertyType?.value !== 'building')
                                                        && (propertyType?.value !== 'commercialProperties'))
                                                         ?
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Room</label>
                                                            <div className='password-filed'>
                                                                <input
                                                                    type='number'
                                                                    className="input"
                                                                    placeholder='Enter number of rooms'
                                                                    onChange={(e) => { setRoom(e.target.value) }}
                                                                    defaultValue={room}
                                                                    required
                                                                />
                                                            </div>
                                                        </div> : ''
                                                    }

                                                    {(propertyType?.value !== 'garage' && propertyType?.value !== 'land') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Window</label>
                                                            <Dropdown options={windowsOptions} onChange={(e) => { setWindow(e) }} value={window?.label ? window?.label : window} placeholder="Select window" />
                                                        </div>}


                                                    {(propertyType?.value !== 'propertytype' && propertyType?.value !== 'garage' && propertyType?.value !== 'land') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Security</label>
                                                            <Dropdown options={securityOptions} onChange={(e) => { setSecurity(e) }} value={security?.label ? security?.label : security} placeholder="Select Security" />
                                                        </div>
                                                    }

                                                    {(propertyType?.value !== 'office' && propertyType?.value !== 'building' && propertyType?.value !== 'garage' && propertyType?.value !== 'land' && propertyType?.value !== 'commercialProperties') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Elevator</label>
                                                            <Dropdown options={elevatorOptions} onChange={(e) => { setElevator(e) }} value={elevator?.label ? elevator?.label : elevator} placeholder="Select area unit" />
                                                        </div>}

                                                    {(propertyType?.value !== 'garage' && propertyType?.value !== 'land') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Parking</label>
                                                            <Dropdown options={parkingOptions} onChange={(e) => { setParking(e) }} value={parking?.label ? parking?.label : parking} placeholder="Select parking" />

                                                        </div>
                                                    }
                                                    {(propertyType?.value !== 'garage' && propertyType?.value !== 'land') && 
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Air conditioning</label>
                                                            <Dropdown options={airConditioningOptions} onChange={(e) => { setAirConditioning(e) }} value={airConditioning?.label ? airConditioning.label : airConditioning} placeholder="Select gerage" />

                                                        </div>
                                                    }

                                                    {(propertyType?.value !== 'garage' && propertyType?.value !== 'land') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Balcony</label>
                                                            <Dropdown options={balconyOptions} onChange={(e) => { setBalcony(e) }} value={balcony?.label ? balcony?.label : balcony} placeholder="Select balcony" />

                                                        </div>
                                                    }

                                                    {(propertyType?.value !== 'garage' && propertyType?.value !== 'land') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Furnished</label>
                                                            <Dropdown options={furnishedOptions} onChange={(e) => { setFurnished(e) }} value={furnished?.label ? furnished?.label : furnished} placeholder="Select furnished" />

                                                        </div>
                                                    }

                                                    {(propertyType?.value === 'land') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>fenced</label>
                                                            <Dropdown options={fencedOptions} onChange={(e) => { setFurnished(e) }} value={fenced?.label ? fenced?.label : fenced} placeholder="Select fenced" />

                                                        </div>
                                                    }
                                                    {(propertyType?.value === 'land') &&
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
                                                                    defaultValue={type}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }

                                                    {(propertyType?.value === 'garage') &&
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
                                                                    defaultValue={unit}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                      {(propertyType?.value === 'garage') &&
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
                                                                    defaultValue={wide}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                      {(propertyType?.value === 'garage') &&
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
                                                                    defaultValue={long}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                      {(propertyType?.value === 'garage' )&&
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
                                                                    defaultValue={height}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }


                                                    {(propertyType?.value !== 'garage' && propertyType?.value !== 'land') &&
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
                                                                    defaultValue={kitchen}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType?.value === 'land') &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label> Land Type</label>
                                                            <div className='password-fil'>
                                                                <input
                                                                    type='text'
                                                                    className="input"
                                                                    autoComplete='off'
                                                                    name=''
                                                                    id=''
                                                                    placeholder='Enter land type'
                                                                    onChange={(e) => { setLandType(e.target.value) }}
                                                                    defaultValue={landType}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType?.value !== 'land' && propertyType?.value !== 'garage') &&
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
                                                                    defaultValue={bath}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType?.value !== 'garage' 
                                                        && propertyType?.value !== 'land'
                                                        && propertyType?.value !== 'room'
                                                        && propertyType?.value !== 'office'
                                                        && propertyType?.value !== 'building'
                                                        && propertyType?.value !== 'commercialProperties')
                                                        &&
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
                                                                    defaultValue={livingRoom}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType?.value !== 'newHome' 
                                                    && propertyType?.value !== 'home'
                                                    && propertyType?.value !== 'garage'
                                                    && propertyType?.value !== 'land')
                                                    &&
                                                        <div className="col-lg-4 mt-4">
                                                            <label>Floor number</label>
                                                            <div className='password-filed'>
                                                                <input
                                                                    type='number'
                                                                    className="input"
                                                                    autoComplete='off'
                                                                    placeholder='Enter floor number'
                                                                    onChange={(e) => { setFloorNumber(e.target.value) }}
                                                                    defaultValue={floorNumber}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    {(propertyType?.value !== 'garage' 
                                                        && propertyType?.value !== 'land'
                                                        && propertyType?.value !== 'room'
                                                        && propertyType?.value !== 'office'
                                                        && propertyType?.value !== 'building'
                                                        && propertyType?.value !== 'commercialProperties')
                                                        &&
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
                                                                    onChange={(e) => { setTotalFloors(e.target.value) }}
                                                                    defaultValue={totalFloors}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className="col-lg-12 mt-4">
                                                        <label>Description</label>
                                                        <textarea  
                                                        type="text"
                                                        className='input' 
                                                        placeholder='Enter drscription'
                                                        rows="5"
                                                        required
                                                        onChange={(e) => { setDescription(e.target.value) }}
                                                        value={description}>
                                                        </textarea>
                                                    </div>

                                                    <div className="col-lg-12 mt-4">
                                                        <label>Other features </label>
                                                        <div >
                                                            {
                                                                otherFeatuers.map((value, index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            <div id={index} className='add-feature mb-3'>
                                                                                <input defaultValue={value.name} className='input' type="text" name='name' placeholder='Enter name' onChange={e => { updatefeature(e, index) }} />
                                                                                <input defaultValue={value.value} className='input  ml-3' type="text" name='value' placeholder='Enter value' onChange={e => { updatefeature(e, index) }} />
                                                                                {otherFeatuers.length !== 1 &&
                                                                                    <button className='remove' type='text' onClick={() => { removelines(index) }}>Remove</button>
                                                                                }
                                                                            </div>
                                                                            {otherFeatuers.length - 1 === index &&
                                                                                <button className='button mt-4' type='text' onClick={addlines}>Add Feature</button>
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>



                                                    <div className="col-lg-12 mt-4">
                                                        <label>Address</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='textarea'
                                                                style={{ padding: '10px 16px' }}
                                                                className="input"
                                                                placeholder='Enter address'
                                                                onChange={(e) => { setAddress(e.target.value) }}
                                                                defaultValue={address}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Postal Code</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='textarea'
                                                                style={{ padding: '10px 16px' }}
                                                                className="input"
                                                                placeholder='Enter postal code'
                                                                onChange={(e) => { setPostalCode(e.target.value) }}
                                                                defaultValue={postalCode}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>City</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='textarea'
                                                                style={{ padding: '10px 16px' }}
                                                                className="input"
                                                                placeholder='Enter city'
                                                                onChange={(e) => { setCity(e.target.value) }}
                                                                defaultValue={city}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Country</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='textarea'
                                                                style={{ padding: '10px 16px' }}
                                                                className="input"
                                                                placeholder='Enter country'
                                                                onChange={(e) => { setCountry(e.target.value) }}
                                                                defaultValue={country}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Street number</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='number'
                                                                className="input"
                                                                placeholder='Enter street number'
                                                                onChange={(e) => { setStreetNumber(e.target.value) }}
                                                                defaultValue={streetNumber}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Property Status</label>
                                                        <Dropdown options={statusOptions} onChange={(e) => { setPropertyStatus(e.value) }} value={propertyStatus?.label ? propertyStatus.label : propertyStatus} />

                                                    </div>
                                                    <div className="col-lg-12 mt-4">
                                                        <div className='uploadimage-section'>
                                                            <div className="images">
                                                                {selectedImages &&
                                                                    selectedImages.map((image, index) => {
                                                                        let imagesArray;
                                                                        if (image.type) {
                                                                            imagesArray = URL.createObjectURL(image)
                                                                        } else {
                                                                            imagesArray = image
                                                                        }
                                                                        return (
                                                                            <div key={index} className="image">
                                                                                <img src={imagesArray} height="150" alt="upload" />
                                                                                <button onClick={() => deleteHandler(index)}>
                                                                                    <MdDelete />
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
                                                                    name="images"
                                                                    onChange={onSelectFile}
                                                                    multiple
                                                                    accept="image/png , image/jpeg, image/webp"
                                                                />
                                                            </label>
                                                            <br />

                                                            {selectedImages.length > 0 &&
                                                                (selectedImages.length > 10 &&
                                                                    <p className="error-upload">
                                                                        You can't upload more than 10 images! <br />
                                                                        <span>
                                                                            please delete <b> {selectedImages.length - 10} </b> of them{" "}
                                                                        </span>
                                                                    </p>
                                                                )}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className='uploadimage-section'>
                                                            {floorMap !== '' &&
                                                                <div className="images">
                                                                    <div className="image">

                                                                        <img src={URL.createObjectURL(floorMap)} width={'100%'} alt="upload" />


                                                                    </div>
                                                                </div>
                                                            }

                                                            <label>
                                                                Add Tour
                                                                <input
                                                                    type="file"
                                                                    name="images"
                                                                    onChange={(e) => onfloorMapSelected(e.target.files[0])}
                                                                    accept="image/png , image/jpeg, image/webp"
                                                                />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 mt-4">
                                                        <div className='uploadimage-section'>
                                                            <label>
                                                                Upload Video
                                                                <span>{video?.name}</span>
                                                                <input
                                                                    type="file"
                                                                    name="" id=""
                                                                    onChange={(e) => onVideoSelected(e.target.files[0])}
                                                                    accept="video/mp4,video/x-m4v,video/*" />
                                                            </label>
                                                        </div>
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
            <ToastContainer />
            <Footer />

        </>
    )
}

export default UpdateProperty
