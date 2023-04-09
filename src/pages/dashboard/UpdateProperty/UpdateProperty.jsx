import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {toast, ToastContainer} from 'react-toastify';
import {MdDelete, MdGpsFixed} from 'react-icons/md';
import Footer from '../../../shared/Footer/Footer';
import Header from '../../../shared/Header/Header';
import '../UploadProperty/UploadProperty.css';
import Apiloader from '../../../shared/ApiLoader/Apiloader';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const apiKey = process.env.REACT_APP_API_KEY;
const mapApiJs = process.env.REACT_APP_MAP_API_JS;
const geocodeJson = process.env.REACT_APP_GEOCODE_JSON;
let myWindowObject = window

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


const UpdateProperty = () => {

    const searchInput = useRef(null);

    const token = JSON.parse(localStorage.getItem('user'))?.token.token;
    const query = useQuery();
    const navigate = useNavigate()
    const [id, setId] = useState('');
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
    const parkingOptions = [{value: false, label: 'No'}, {value: true, label: 'Yes'}]
    const securityOptions = [{value: false, label: 'No'}, {value: true, label: 'Yes'}]
    const elevetorOptions = [{value: false, label: 'No'}, {value: true, label: 'Yes'}]
    const deckrOptions = [{value: false, label: 'No'}, {value: true, label: 'Yes'}]
    const furnishedOptions = [{value: false, label: 'No'}, {value: true, label: 'Yes'}]
    const airConditioningOptions = [{value: false, label: 'No'}, {value: true, label: 'Yes'}]
    const balconyOptions = [{value: false, label: 'No'}, {value: true, label: 'Yes'}]
    const windowsOptions = [{value: false, label: 'No'}, {value: true, label: 'Yes'}]
    const fencedOptions = [{value: false, label: 'No'}, {value: true, label: 'Yes'}]
    const elevatorOptions = [{value: false, label: 'No'}, {value: true, label: 'Yes'}]
    const statusOptions = [{value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}, {
        value: 'sold',
        label: 'Sold'
    }, {value: 'rented', label: 'Rented'}]
    const areaUnitOptions = [{value: 'mm', label: 'MM'}, {value: 'cm', label: 'CM'}, {
        value: 'm',
        label: 'M'
    }, {value: 'km', label: 'KM'}]
    const [formLoader, setFormLoader] = useState(false)
    const [advertising, setAdvertising] = useState({value: 'sale', label: 'Sale'})
    const [get, setGet] = useState(true)
    const [propertyType, setPropertyType] = useState({value: 'propertytype', label: 'Property Type'})
    const [title, setTitle] = useState('')
    const [pricee, setPricee] = useState('')
    const [date, setDate] = useState('')
    const [areaa, setAreaa] = useState('')
    const [areaUnit, setAreaUnit] = useState({value: 'mm', label: 'MM'})
    const [type, setType] = useState('')
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
    const [elevator, setElevator] = useState({value: false, label: 'No'})
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [areaLocation, setAreaLocation] = useState('')
    const [propertyStatus, setPropertyStatus] = useState({value: 'active', label: 'Active'})
    const [selectedImages, setSelectedImages] = useState([]);
    const [otherFeatuers, setotherFeaturs] = useState([{name: '', value: ''}]);
    const [unit, setUnit] = useState(0);
    const [wide, setWide] = useState(0);
    const [long, setLong] = useState(0);
    const [height, setheight] = useState(0);
    const [landType, setLandType] = useState('');
    const [floorMap, setFloorMap] = useState('');
    const [oldImages, setOldImages] = useState('');
    const [oldTour, setOldTour] = useState('');
    const [oldVideo, setOldVideo] = useState('');
    const [imageId, setImageId] = useState('');
    const [video, setVideo] = useState('');
    const [tour, setTour] = useState('');

    useEffect(() => {

        initAutocomplete();
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
                setId(query.get('id'))
                const selectedProperty = result.data.find(x => x._id == query.get('id'));

                const input = selectedProperty.availableFrom
                const [year, month, day] = input.split('T')[0].split('-')
                const date = `${year}-${month}-${day}`

                if (selectedProperty) {
                    setPropertyType({value: selectedProperty.type, label: selectedProperty.type})
                    setTitle(selectedProperty.title)
                    setPropertyStatus(selectedProperty.status)
                    setDate(date)
                    setPricee(selectedProperty.price)
                    setAdvertising(selectedProperty.purpose)
                    setAreaa(selectedProperty.area.value)
                    setAreaUnit(selectedProperty.area.unit)
                    setOldImages(selectedProperty.photos)
                    setImageId(selectedProperty._id)
                    setOldTour(selectedProperty.tours && selectedProperty.tours.length > 0  ? selectedProperty.tours : [])
                    setOldVideo(selectedProperty.videos && selectedProperty.videos.length > 0 ? selectedProperty.videos : [])
                    setCountry(selectedProperty.location.country)
                    setCity(selectedProperty.location.city)
                    setAddress(selectedProperty.location.address)
                    if (searchInput && searchInput.current) {
                        searchInput.current.value = address;
                    }
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
                    } else if (selectedProperty.type === 'room') {
                        setKitchen(selectedProperty.roomAmenities.kitchen)
                        setBath(selectedProperty.roomAmenities.bath)
                        setParking(selectedProperty.roomAmenities.parking ? 'Yes' : 'No')
                        setAirConditioning(selectedProperty.roomAmenities.airConditioning ? 'Yes' : 'No')
                        setBalcony(selectedProperty.roomAmenities.balcony ? 'Yes' : 'No')
                        setSecurity(selectedProperty.roomAmenities.security ? 'Yes' : 'No')
                        setElevator(selectedProperty.roomAmenities.elevator ? 'Yes' : 'No')
                        setWindow(selectedProperty.roomAmenities.window ? 'Yes' : 'No')
                        setFurnished(selectedProperty.roomAmenities.furnished ? 'Yes' : 'No')
                        setFloorNumber(selectedProperty.roomAmenities.floorNo)
                        setotherFeaturs(selectedProperty.roomAmenities.otherAmenities)
                    } else if (selectedProperty.type === 'building') {
                        setKitchen(selectedProperty.commercialAmenities.kitchen)
                        setBath(selectedProperty.commercialAmenities.bath)
                        setParking(selectedProperty.commercialAmenities.parking ? 'Yes' : 'No')
                        setAirConditioning(selectedProperty.commercialAmenities.airConditioning ? 'Yes' : 'No')
                        setSecurity(selectedProperty.commercialAmenities.security ? 'Yes' : 'No')
                        setBalcony(selectedProperty.commercialAmenities.balcony ? 'Yes' : 'No')
                        setWindow(selectedProperty.commercialAmenities.window ? 'Yes' : 'No')
                        setFurnished(selectedProperty.commercialAmenities.furnished ? 'Yes' : 'No')
                        setFloorNumber(selectedProperty.commercialAmenities.floorNo)
                        setotherFeaturs(selectedProperty.commercialAmenities.otherAmenities)
                    } else if (selectedProperty.type === 'commercialProperties') {
                        setKitchen(selectedProperty.commercialAmenities.kitchen)
                        setBath(selectedProperty.commercialAmenities.bath)
                        setParking(selectedProperty.commercialAmenities.parking ? 'Yes' : 'No')
                        setAirConditioning(selectedProperty.commercialAmenities.airConditioning ? 'Yes' : 'No')
                        setSecurity(selectedProperty.commercialAmenities.security ? 'Yes' : 'No')
                        setBalcony(selectedProperty.commercialAmenities.balcony ? 'Yes' : 'No')
                        setWindow(selectedProperty.commercialAmenities.window ? 'Yes' : 'No')
                        setFurnished(selectedProperty.commercialAmenities.furnished ? 'Yes' : 'No')
                        setFloorNumber(selectedProperty.commercialAmenities.floorNo)
                        setotherFeaturs(selectedProperty.commercialAmenities.otherAmenities)
                    } else if (selectedProperty.type === 'Office') {
                        setKitchen(selectedProperty.commercialAmenities.kitchen)
                        setBath(selectedProperty.commercialAmenities.bath)
                        setParking(selectedProperty.commercialAmenities.parking ? 'Yes' : 'No')
                        setAirConditioning(selectedProperty.commercialAmenities.airConditioning ? 'Yes' : 'No')
                        setSecurity(selectedProperty.commercialAmenities.security ? 'Yes' : 'No')
                        setBalcony(selectedProperty.commercialAmenities.balcony ? 'Yes' : 'No')
                        setWindow(selectedProperty.commercialAmenities.window ? 'Yes' : 'No')
                        setFurnished(selectedProperty.commercialAmenities.furnished ? 'Yes' : 'No')
                        setFloorNumber(selectedProperty.commercialAmenities.floorNo)
                        setotherFeaturs(selectedProperty.commercialAmenities.otherAmenities)
                    } else if (selectedProperty.type === 'garage') {
                        setUnit(selectedProperty.garageAmenities.unit)
                        setWide(selectedProperty.garageAmenities.wide)
                        setLong(selectedProperty.garageAmenities.long)
                        setheight(selectedProperty.garageAmenities.height)
                        setotherFeaturs(selectedProperty.garageAmenities.otherAmenities)
                    } else if (selectedProperty.type === 'land') {
                        setFenced(selectedProperty.landAmenities.fenced === 'Yes' ? 'Yes' : 'No')
                        setLandType(selectedProperty.landAmenities.type)
                        setotherFeaturs(selectedProperty.landAmenities.otherAmenities)
                    }
                }
            })

        })
    }, [formLoader])

    const DeleteOldImages = async (url, index) => {
        // console.log(url , index , id );
        setFormLoader(true)
        await fetch(`https://walrus-app-ovpy2.ondigitalocean.app/property/delete/image/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "AUTHORIZATION": `BEARER ${token}`
            },
            body: JSON.stringify({url: url})

        }).then((res) => {
            const deletimage = [...oldImages]
            deletimage.splice(index, 1)
            setOldImages(deletimage)
            setFormLoader(false)
            if (res.ok) (
                toast.success('Image deleted succesfully.',
                    {position: toast.POSITION.BOTTOM_RIGHT}))

        }).catch((error) => {
                setFormLoader(false)
                toast.error('error.message', {position: toast.POSITION.BOTTOM_RIGHT})
            }
        )
    }
    const DeleteOldTour = async (url) => {

        setFormLoader(true)
        await fetch(`https://walrus-app-ovpy2.ondigitalocean.app/property/delete/tour/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "AUTHORIZATION": `BEARER ${token}`
            },
            body: JSON.stringify({url: url})

        }).then((res) => {
            setOldTour('')
            setFormLoader(false)
            if (res.ok) (
                toast.success('Tour deleted succesfully.',
                    {position: toast.POSITION.BOTTOM_RIGHT})
            )

        }).catch((error) => {
                setFormLoader(false)
                if (error) {
                    toast.error('error.message', {position: toast.POSITION.BOTTOM_RIGHT})
                }
            }
        )
    }
    const DeleteOldVideo = async (url) => {

        await fetch(`https://walrus-app-ovpy2.ondigitalocean.app/property/delete/video/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "AUTHORIZATION": `BEARER ${token}`
            },
            body: JSON.stringify({url: url})

        }).then((res) => {
            setOldVideo('')
            if (res.ok) (
                toast.success('Video deleted succesfully.',
                    {position: toast.POSITION.BOTTOM_RIGHT}))

        }).catch((error) => {
                toast.error('error.message', {position: toast.POSITION.BOTTOM_RIGHT})
            }
        )
    }

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
        const area = {value: areaa, unit: (areaUnit?.value ? areaUnit?.value : areaUnit)};
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
                    type: landType,
                    fenced: fenced?.value ? fenced.value : fenced,
                    otherAmenities: otherFeatuers ? [...otherFeatuers] : []

                }
                break;
            case 'garage':
                garageAmenities = {
                    unit: unit,
                    wide: wide,
                    long: long,
                    height: height,
                    otherAmenities: otherFeatuers ? [...otherFeatuers] : []

                }
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
        formData.append('videos', video)
        formData.append('tours', tour)

        for (let i = 0; i < selectedImages.length - 1; i++) {
            formData.append('photos', selectedImages[i])
        }
        for (var pair of formData.entries()) {
            console.log(pair[0] + ' - ' + pair[1]);
        }

        setFormLoader(true)
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
                    setFormLoader(false)
                    setVideo('')
                    setSelectedImages('')
                    setTour('')
                    window.location.reload(false);
                    toast.success('Property Successfully uploaded.',
                        {position: toast.POSITION.BOTTOM_RIGHT})
                    // navigate('/user-properties')
                }

            })
            .catch((error) => {
                if (error) {
                    setFormLoader(false)
                    toast.error(error, {position: toast.POSITION.BOTTOM_RIGHT})


                } else {
                    toast.error('400 Error',
                        {position: toast.POSITION.BOTTOM_RIGHT}
                    )
                }
            })

    }

    const addlines = () => {

        setotherFeaturs([...otherFeatuers, {name: '', value: ''}])
    }

    const updatefeature = (e, index) => {
        const {name, value} = e.target;
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
        // const selectedFilesArray = Array.from(selectedFiles);
        setSelectedImages((pre) => [...pre, ...selectedFilesArray]);
        event.target.value = "";
    };
    const onfloorMapSelected = (event) => {
        setFloorMap(event)
    };
    const onVideoSelected = (event) => {
        setVideo(event)
    };

    const onTourSelected = (event) => {
        setTour(event)
    };

    const deleteHandler = (index) => {
        const deleteImage = [...selectedImages];
        deleteImage.splice(index, 1)
        setSelectedImages(deleteImage)
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


    return (
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
                                            <h1> Update Property</h1>
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
                                                    }} value={advertising?.value ? advertising?.value : advertising}
                                                              placeholder="Select advertising for"/>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className='password-filed'>
                                                    <label>Property Type</label>
                                                    <Dropdown options={propertytypeOptions} onChange={(e) => {
                                                        setPropertyType(e)
                                                    }} value={propertyType?.value ? propertyType?.value : propertyType}
                                                              placeholder="Select property type"/>
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
                                                            onChange={(e) => {
                                                                setTitle(e.target.value)
                                                            }}
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
                                                            onChange={(e) => {
                                                                setPricee(e.target.value)
                                                            }}
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
                                                            onChange={(e) => {
                                                                setDate(e.target.value)
                                                            }}
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
                                                            onChange={(e) => {
                                                                setAreaa(e.target.value)
                                                            }}
                                                            defaultValue={areaa}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mt-4">
                                                    <label>Area unit</label>
                                                    <Dropdown options={areaUnitOptions} onChange={(e) => {
                                                        setAreaUnit(e)
                                                    }} value={areaUnit?.label ? areaUnit.label : areaUnit}
                                                              placeholder="Select area unit"/>
                                                </div>
                                                <div className="col-lg-6"></div>

                                                {(propertyType?.value === 'newHome') &&
                                                <>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Room</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='number'
                                                                className="input"
                                                                placeholder='Enter number of rooms'
                                                                onChange={(e) => {
                                                                    setRoom(e.target.value)
                                                                }}
                                                                defaultValue={room}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                onChange={(e) => {
                                                                    setKitchen(e.target.value)
                                                                }}
                                                                defaultValue={kitchen}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                onChange={(e) => {
                                                                    setBath(e.target.value)
                                                                }}
                                                                defaultValue={bath}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                onChange={(e) => {
                                                                    setLivingRoom(e.target.value)
                                                                }}
                                                                defaultValue={livingRoom}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Parking</label>
                                                        <Dropdown options={parkingOptions} onChange={(e) => {
                                                            setParking(e)
                                                        }} value={parking?.label ? parking?.label : parking}
                                                                  placeholder="Select parking"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Air conditioning</label>
                                                        <Dropdown options={airConditioningOptions} onChange={(e) => {
                                                            setAirConditioning(e)
                                                        }}
                                                                  value={airConditioning?.label ? airConditioning.label : airConditioning}
                                                                  placeholder="Select gerage"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Balcony</label>
                                                        <Dropdown options={balconyOptions} onChange={(e) => {
                                                            setBalcony(e)
                                                        }} value={balcony?.label ? balcony?.label : balcony}
                                                                  placeholder="Select balcony"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Window</label>
                                                        <Dropdown options={windowsOptions} onChange={(e) => {
                                                            setWindow(e)
                                                        }} value={window?.label ? window?.label : window}
                                                                  placeholder="Select window"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Furnished</label>
                                                        <Dropdown options={furnishedOptions} onChange={(e) => {
                                                            setFurnished(e)
                                                        }} value={furnished?.label ? furnished?.label : furnished}
                                                                  placeholder="Select furnished"/>

                                                    </div>

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
                                                                defaultValue={totalFloors}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Security</label>
                                                        <Dropdown options={securityOptions} onChange={(e) => {
                                                            setSecurity(e)
                                                        }} value={security?.label ? security?.label : security}
                                                                  placeholder="Select Security"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Elevator</label>
                                                        <Dropdown options={elevatorOptions} onChange={(e) => {
                                                            setElevator(e)
                                                        }} value={elevator?.label ? elevator?.label : elevator}
                                                                  placeholder="Select area unit"/>
                                                    </div>

                                                </>

                                                }
                                                {(propertyType?.value === 'home') &&
                                                <>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Room</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='number'
                                                                className="input"
                                                                placeholder='Enter number of rooms'
                                                                onChange={(e) => {
                                                                    setRoom(e.target.value)
                                                                }}
                                                                defaultValue={room}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                onChange={(e) => {
                                                                    setKitchen(e.target.value)
                                                                }}
                                                                defaultValue={kitchen}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                onChange={(e) => {
                                                                    setBath(e.target.value)
                                                                }}
                                                                defaultValue={bath}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                onChange={(e) => {
                                                                    setLivingRoom(e.target.value)
                                                                }}
                                                                defaultValue={livingRoom}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Parking</label>
                                                        <Dropdown options={parkingOptions} onChange={(e) => {
                                                            setParking(e)
                                                        }} value={parking?.label ? parking?.label : parking}
                                                                  placeholder="Select parking"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Air conditioning</label>
                                                        <Dropdown options={airConditioningOptions} onChange={(e) => {
                                                            setAirConditioning(e)
                                                        }}
                                                                  value={airConditioning?.label ? airConditioning.label : airConditioning}
                                                                  placeholder="Select gerage"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Balcony</label>
                                                        <Dropdown options={balconyOptions} onChange={(e) => {
                                                            setBalcony(e)
                                                        }} value={balcony?.label ? balcony?.label : balcony}
                                                                  placeholder="Select balcony"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Window</label>
                                                        <Dropdown options={windowsOptions} onChange={(e) => {
                                                            setWindow(e)
                                                        }} value={window?.label ? window?.label : window}
                                                                  placeholder="Select window"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Furnished</label>
                                                        <Dropdown options={furnishedOptions} onChange={(e) => {
                                                            setFurnished(e)
                                                        }} value={furnished?.label ? furnished?.label : furnished}
                                                                  placeholder="Select furnished"/>

                                                    </div>

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
                                                                defaultValue={totalFloors}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Security</label>
                                                        <Dropdown options={securityOptions} onChange={(e) => {
                                                            setSecurity(e)
                                                        }} value={security?.label ? security?.label : security}
                                                                  placeholder="Select Security"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Elevator</label>
                                                        <Dropdown options={elevatorOptions} onChange={(e) => {
                                                            setElevator(e)
                                                        }} value={elevator?.label ? elevator?.label : elevator}
                                                                  placeholder="Select area unit"/>
                                                    </div>

                                                </>

                                                }
                                                {(propertyType?.value === 'room') &&
                                                <>

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
                                                                onChange={(e) => {
                                                                    setKitchen(e.target.value)
                                                                }}
                                                                defaultValue={kitchen}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                onChange={(e) => {
                                                                    setBath(e.target.value)
                                                                }}
                                                                defaultValue={bath}
                                                                required
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Parking</label>
                                                        <Dropdown options={parkingOptions} onChange={(e) => {
                                                            setParking(e)
                                                        }} value={parking?.label ? parking?.label : parking}
                                                                  placeholder="Select parking"/>

                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Air conditioning</label>
                                                        <Dropdown options={airConditioningOptions} onChange={(e) => {
                                                            setAirConditioning(e)
                                                        }}
                                                                  value={airConditioning?.label ? airConditioning.label : airConditioning}
                                                                  placeholder="Select gerage"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Balcony</label>
                                                        <Dropdown options={balconyOptions} onChange={(e) => {
                                                            setBalcony(e)
                                                        }} value={balcony?.label ? balcony?.label : balcony}
                                                                  placeholder="Select balcony"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Security</label>
                                                        <Dropdown options={securityOptions} onChange={(e) => {
                                                            setSecurity(e)
                                                        }} value={security?.label ? security?.label : security}
                                                                  placeholder="Select Security"/>
                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Elevator</label>
                                                        <Dropdown options={elevatorOptions} onChange={(e) => {
                                                            setElevator(e)
                                                        }} value={elevator?.label ? elevator?.label : elevator}
                                                                  placeholder="Select area unit"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Window</label>
                                                        <Dropdown options={windowsOptions} onChange={(e) => {
                                                            setWindow(e)
                                                        }} value={window?.label ? window?.label : window}
                                                                  placeholder="Select window"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Furnished</label>
                                                        <Dropdown options={furnishedOptions} onChange={(e) => {
                                                            setFurnished(e)
                                                        }} value={furnished?.label ? furnished?.label : furnished}
                                                                  placeholder="Select furnished"/>
                                                    </div>

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
                                                                defaultValue={floorNumber}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                </>

                                                }
                                                {(propertyType?.value === 'commercialProperties') &&
                                                <>

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
                                                                onChange={(e) => {
                                                                    setKitchen(e.target.value)
                                                                }}
                                                                defaultValue={kitchen}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                onChange={(e) => {
                                                                    setBath(e.target.value)
                                                                }}
                                                                defaultValue={bath}
                                                                required
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Parking</label>
                                                        <Dropdown options={parkingOptions} onChange={(e) => {
                                                            setParking(e)
                                                        }} value={parking?.label ? parking?.label : parking}
                                                                  placeholder="Select parking"/>

                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Air conditioning</label>
                                                        <Dropdown options={airConditioningOptions} onChange={(e) => {
                                                            setAirConditioning(e)
                                                        }}
                                                                  value={airConditioning?.label ? airConditioning.label : airConditioning}
                                                                  placeholder="Select gerage"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Balcony</label>
                                                        <Dropdown options={balconyOptions} onChange={(e) => {
                                                            setBalcony(e)
                                                        }} value={balcony?.label ? balcony?.label : balcony}
                                                                  placeholder="Select balcony"/>

                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Window</label>
                                                        <Dropdown options={windowsOptions} onChange={(e) => {
                                                            setWindow(e)
                                                        }} value={window?.label ? window?.label : window}
                                                                  placeholder="Select window"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Security</label>
                                                        <Dropdown options={securityOptions} onChange={(e) => {
                                                            setSecurity(e)
                                                        }} value={security?.label ? security?.label : security}
                                                                  placeholder="Select Security"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Furnished</label>
                                                        <Dropdown options={furnishedOptions} onChange={(e) => {
                                                            setFurnished(e)
                                                        }} value={furnished?.label ? furnished?.label : furnished}
                                                                  placeholder="Select furnished"/>
                                                    </div>

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
                                                                defaultValue={floorNumber}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                </>
                                                }
                                                {(propertyType?.value === 'building') &&
                                                <>

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
                                                                onChange={(e) => {
                                                                    setKitchen(e.target.value)
                                                                }}
                                                                defaultValue={kitchen}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                onChange={(e) => {
                                                                    setBath(e.target.value)
                                                                }}
                                                                defaultValue={bath}
                                                                required
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Parking</label>
                                                        <Dropdown options={parkingOptions} onChange={(e) => {
                                                            setParking(e)
                                                        }} value={parking?.label ? parking?.label : parking}
                                                                  placeholder="Select parking"/>

                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Air conditioning</label>
                                                        <Dropdown options={airConditioningOptions} onChange={(e) => {
                                                            setAirConditioning(e)
                                                        }}
                                                                  value={airConditioning?.label ? airConditioning.label : airConditioning}
                                                                  placeholder="Select gerage"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Balcony</label>
                                                        <Dropdown options={balconyOptions} onChange={(e) => {
                                                            setBalcony(e)
                                                        }} value={balcony?.label ? balcony?.label : balcony}
                                                                  placeholder="Select balcony"/>

                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Window</label>
                                                        <Dropdown options={windowsOptions} onChange={(e) => {
                                                            setWindow(e)
                                                        }} value={window?.label ? window?.label : window}
                                                                  placeholder="Select window"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Security</label>
                                                        <Dropdown options={securityOptions} onChange={(e) => {
                                                            setSecurity(e)
                                                        }} value={security?.label ? security?.label : security}
                                                                  placeholder="Select Security"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Furnished</label>
                                                        <Dropdown options={furnishedOptions} onChange={(e) => {
                                                            setFurnished(e)
                                                        }} value={furnished?.label ? furnished?.label : furnished}
                                                                  placeholder="Select furnished"/>
                                                    </div>

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
                                                                defaultValue={floorNumber}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                </>
                                                }
                                                {(propertyType?.value === 'office') &&
                                                <>

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
                                                                onChange={(e) => {
                                                                    setKitchen(e.target.value)
                                                                }}
                                                                defaultValue={kitchen}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

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
                                                                onChange={(e) => {
                                                                    setBath(e.target.value)
                                                                }}
                                                                defaultValue={bath}
                                                                required
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Parking</label>
                                                        <Dropdown options={parkingOptions} onChange={(e) => {
                                                            setParking(e)
                                                        }} value={parking?.label ? parking?.label : parking}
                                                                  placeholder="Select parking"/>

                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Air conditioning</label>
                                                        <Dropdown options={airConditioningOptions} onChange={(e) => {
                                                            setAirConditioning(e)
                                                        }}
                                                                  value={airConditioning?.label ? airConditioning.label : airConditioning}
                                                                  placeholder="Select gerage"/>

                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Balcony</label>
                                                        <Dropdown options={balconyOptions} onChange={(e) => {
                                                            setBalcony(e)
                                                        }} value={balcony?.label ? balcony?.label : balcony}
                                                                  placeholder="Select balcony"/>

                                                    </div>


                                                    <div className="col-lg-4 mt-4">
                                                        <label>Window</label>
                                                        <Dropdown options={windowsOptions} onChange={(e) => {
                                                            setWindow(e)
                                                        }} value={window?.label ? window?.label : window}
                                                                  placeholder="Select window"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Security</label>
                                                        <Dropdown options={securityOptions} onChange={(e) => {
                                                            setSecurity(e)
                                                        }} value={security?.label ? security?.label : security}
                                                                  placeholder="Select Security"/>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Furnished</label>
                                                        <Dropdown options={furnishedOptions} onChange={(e) => {
                                                            setFurnished(e)
                                                        }} value={furnished?.label ? furnished?.label : furnished}
                                                                  placeholder="Select furnished"/>
                                                    </div>

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
                                                                defaultValue={floorNumber}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                </>
                                                }

                                                {(propertyType?.value === 'garage') &&

                                                <>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>Unit</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='number'
                                                                style={{padding: '10px 16px'}}
                                                                className="input"
                                                                autoComplete='off'
                                                                name='confirmNewPassword'
                                                                id='confirmNewPassword'
                                                                placeholder='Enter unit'
                                                                onChange={(e) => {
                                                                    setUnit(e.target.value)
                                                                }}
                                                                defaultValue={unit}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Wide</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='number'
                                                                style={{padding: '10px 16px'}}
                                                                className="input"
                                                                autoComplete='off'
                                                                name='confirmNewPassword'
                                                                id='confirmNewPassword'
                                                                placeholder='Enter unit'
                                                                onChange={(e) => {
                                                                    setWide(e.target.value)
                                                                }}
                                                                defaultValue={wide}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Long</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='number'
                                                                style={{padding: '10px 16px'}}
                                                                className="input"
                                                                autoComplete='off'
                                                                name='confirmNewPassword'
                                                                id='confirmNewPassword'
                                                                placeholder='Enter unit'
                                                                onChange={(e) => {
                                                                    setLong(e.target.value)
                                                                }}
                                                                defaultValue={long}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Height</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='number'
                                                                style={{padding: '10px 16px'}}
                                                                className="input"
                                                                autoComplete='off'
                                                                name='confirmNewPassword'
                                                                id='confirmNewPassword'
                                                                placeholder='Enter unit'
                                                                onChange={(e) => {
                                                                    setheight(e.target.value)
                                                                }}
                                                                defaultValue={height}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                </>}

                                                {(propertyType?.value === 'land') &&
                                                <>
                                                    <div className="col-lg-4 mt-4">
                                                        <label>Land Type</label>
                                                        <div className='password-filed'>
                                                            <input
                                                                type='text'
                                                                style={{padding: '10px 16px'}}
                                                                className="input"
                                                                placeholder='Enter land type'
                                                                onChange={(e) => {
                                                                    setLandType(e.target.value)
                                                                }}
                                                                defaultValue={landType}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 mt-4">
                                                        <label>fenced</label>
                                                        <Dropdown options={fencedOptions} onChange={(e) => {
                                                            setFurnished(e)
                                                        }} value={fenced?.label ? fenced?.label : fenced}
                                                                  placeholder="Select fenced"/>

                                                    </div>
                                                </>
                                                }

                                                <div className="col-lg-12 mt-4">
                                                    <label>Description</label>
                                                    <textarea
                                                        type="text"
                                                        className='input'
                                                        placeholder='Enter drscription'
                                                        rows="5"
                                                        required
                                                        onChange={(e) => {
                                                            setDescription(e.target.value)
                                                        }}
                                                        value={description}>
                                                        </textarea>
                                                </div>

                                                <div className="col-lg-12 mt-4">
                                                    <label>Other features </label>
                                                    <div>
                                                        {
                                                            otherFeatuers.map((value, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <div id={index} className='add-feature mb-3'>
                                                                            <input defaultValue={value.name}
                                                                                   className='input' type="text"
                                                                                   name='name' placeholder='Enter name'
                                                                                   onChange={e => {
                                                                                       updatefeature(e, index)
                                                                                   }}/>
                                                                            <input defaultValue={value.value}
                                                                                   className='input  ml-3' type="text"
                                                                                   name='value'
                                                                                   placeholder='Enter value'
                                                                                   onChange={e => {
                                                                                       updatefeature(e, index)
                                                                                   }}/>
                                                                            {otherFeatuers.length !== 1 &&
                                                                            <button className='remove' type='text'
                                                                                    onClick={() => {
                                                                                        removelines(index)
                                                                                    }}>Remove</button>
                                                                            }
                                                                        </div>
                                                                        {otherFeatuers.length - 1 === index &&
                                                                        <button className='button mt-4' type='text'
                                                                                onClick={addlines}>Add Feature</button>
                                                                        }
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>


                                                <div className="col-lg-12 mt-4">
                                                    <label>Address</label>
                                                    <div className='password-filed address-field'>
                                                        <input
                                                            ref={searchInput}
                                                            type='textarea'
                                                            style={{padding: '10px 16px'}}
                                                            className="input"
                                                            placeholder='Enter address'
                                                            /*onChange={(e) => {
                                                                setAddress(e.target.value)
                                                            }}
                                                            defaultValue={address}*/
                                                            required
                                                        />
                                                        <MdGpsFixed className='search-icons' onClick={findMyLocation}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mt-4">
                                                    <label>Postal Code</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type='textarea'
                                                            style={{padding: '10px 16px'}}
                                                            className="input"
                                                            placeholder='Enter postal code'
                                                            onChange={(e) => {
                                                                setPostalCode(e.target.value)
                                                            }}
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
                                                            style={{padding: '10px 16px'}}
                                                            className="input"
                                                            placeholder='Enter city'
                                                            onChange={(e) => {
                                                                setCity(e.target.value)
                                                            }}
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
                                                            style={{padding: '10px 16px'}}
                                                            className="input"
                                                            placeholder='Enter country'
                                                            onChange={(e) => {
                                                                setCountry(e.target.value)
                                                            }}
                                                            defaultValue={country}
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

                                                <div className="col-lg-4 mt-4">
                                                    <label>Street number</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            type='number'
                                                            className="input"
                                                            placeholder='Enter street number'
                                                            onChange={(e) => {
                                                                setStreetNumber(e.target.value)
                                                            }}
                                                            defaultValue={streetNumber}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 mt-4">
                                                    <label>Location</label>
                                                    <div className='password-filed'>
                                                        <input
                                                            ttype="text"
                                                            className="input"
                                                            placeholder='Enter Location'
                                                            onChange={(e) => { setPinLocation(e.target.value) }}
                                                            value={pinLocation}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                {/*<div className="col-lg-4 mt-4">
                                                    <label>Property Status</label>
                                                    <Dropdown options={statusOptions} onChange={(e) => {
                                                        setPropertyStatus(e.value)
                                                    }}
                                                              value={propertyStatus?.label ? propertyStatus.label : propertyStatus}/>

                                                </div>*/}
                                                <div className="col-lg-12 mt-4">
                                                    <div>
                                                        <h1 className='form-sec-heading'>Upload Media</h1>
                                                        <div className='uploadimage-section'>
                                                            <div className="images">
                                                                {selectedImages &&
                                                                selectedImages.map((image, index) => {
                                                                    let imagesArray;
                                                                    imagesArray = URL.createObjectURL(image)

                                                                    return (
                                                                        <div key={index} className="image">
                                                                            <img src={imagesArray} height="150"
                                                                                 alt="upload"/>
                                                                            <button type='text'
                                                                                    onClick={() => deleteHandler(index)}>
                                                                                <MdDelete/>
                                                                            </button>
                                                                            {/* <p>{index + 1}</p> */}
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
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className='uploadimage-section'>
                                                        <label>
                                                            Add Tour
                                                            <input
                                                                type="file"
                                                                name="tour"
                                                                id="tour"
                                                                onChange={(event) => onTourSelected(event.target.files[0])}
                                                                accept="video/mp4,video/x-m4v,video/*"
                                                            />
                                                        </label>
                                                    </div>
                                                    {tour &&
                                                    <table class="table">
                                                        <thead class="thead-dark">
                                                        <tr>
                                                            <th scope="col">Type</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Size</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>{tour.type}</td>
                                                            <td>{tour.name}</td>
                                                            <td>{(tour.size / (1024 * 1024)).toFixed(2)}MB</td>
                                                            <td onClick={() => {setTour('')}}><MdDelete/></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    }
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className='uploadimage-section'>
                                                        <label>
                                                            Upload Video
                                                            <input
                                                                type="file"
                                                                name="videos"
                                                                id="videos"
                                                                onChange={(e) => onVideoSelected(e.target.files[0])}
                                                                accept="video/mp4,video/x-m4v,video/*"/>
                                                        </label>
                                                    </div>
                                                    {video &&
                                                    <table class="table">
                                                        <thead class="thead-dark">
                                                        <tr>
                                                            <th scope="col">Type</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Size</th>
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
                                                {((oldImages && oldImages.length > 0) || (oldTour && oldTour.length > 0) ||
                                                    (oldVideo && oldVideo.length > 0)) &&
                                                <h1 className='form-sec-heading' style={{width: '100%'}}>All Media</h1>}
                                                {oldImages && oldImages.length > 0 &&
                                                <div className="col-lg-12 mt-4">
                                                    <div className=''>
                                                        <h1>Photos</h1>
                                                        <div className='uploadimage-section'>
                                                            <div className="images">
                                                                {oldImages.map((image, index) => {
                                                                    return (
                                                                        <div key={index} className="image">
                                                                            <img src={image} height="150"
                                                                                 alt="upload"/>
                                                                            <button type='reset'
                                                                                    onClick={() => DeleteOldImages(image, index)}>
                                                                                <MdDelete/>
                                                                            </button>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>}
                                                {(oldTour && oldTour.length > 0) &&
                                                <div className="col-lg-6 mt-3">
                                                    <h1>Tour</h1>
                                                    <div className='uploadTour-section'>

                                                        <div className="tour">

                                                            <iframe width="250" height="250"
                                                                    src={oldTour[0]}>
                                                            </iframe>

                                                            <button type='reset'
                                                                    onClick={() => DeleteOldTour(oldTour[0])}>
                                                                <MdDelete/>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>}
                                                {oldVideo && oldVideo.length > 0 &&
                                                <div className="col-lg-6 mt-3">
                                                    <h1>Video</h1>
                                                    <div className='uploadVideo-section'>
                                                        <div className="video">

                                                            <iframe width="250" height="250"
                                                                    src={oldVideo[0]}>
                                                            </iframe>
                                                            <button type='reset'
                                                                    onClick={() => DeleteOldVideo(oldVideo[0])}>
                                                                <MdDelete/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>}
                                                <div className="col-lg-12 mt-4">
                                                    <button type="submit" value="submit" className='button'>
                                                        Update Property
                                                    </button>
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

export default UpdateProperty
