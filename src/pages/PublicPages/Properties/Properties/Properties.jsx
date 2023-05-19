import React, { useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import Header from "../../../../shared/Header/Header";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { GrFormSearch } from "react-icons/gr";
import { BiFilter } from "react-icons/bi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { BiBed } from "react-icons/bi";
import { BsArrowDownUp, BsFillCheckSquareFill, BsArrowUp, BsArrowDown } from "react-icons/bs";
import { FiPlayCircle } from "react-icons/fi";
import { TbBath, T } from "react-icons/tb";
import { BiBath } from "react-icons/bi";
import { AiFillHeart, AiOutlineCar, AiOutlineHeart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Properties.css";
import "react-multi-carousel/lib/styles.css";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import MultiSelectCheckbox, { CheckBox } from "../../../../shared/components/checkbox";
import Pagination from "../../../../shared/components/pagination";
import axiosInstance from "../../../../shared/HttpClient/axiosInstance";

const apiKey = process.env.REACT_APP_API_KEY;
const mapApiJs = process.env.REACT_APP_MAP_API_JS;
const geocodeJson = process.env.REACT_APP_GEOCODE_JSON;

const Properties = ({ google }) => {
  
  // const propertyUrl = process.env.PROPERTY_URL;
  // const propertyUrl = 'http://localhost:3000/property';
  const propertyUrl = process.env.REACT_APP_PROPERTY_URL
  console.log(propertyUrl,"propertyUrl")
  const location = useLocation();
  var purpose,
    propertyType,
    cityFiltertxt,
    latFiltertxt,
    lngFiltertxt,
    filtersType,
    pAddress = "";
  if (location.state !== null && location.state !== "") {
    if (typeof location.state.purpose !== "undefined") {
      purpose = location.state.purpose;
    }
    propertyType = location.state.propertyType;
    cityFiltertxt = location.state.city;
    latFiltertxt = location.state.lat;
    lngFiltertxt = location.state.lng;
    pAddress = location.state.planAddress;
    // filtersType = locations.state.filtersType;
  }
  const [isLoading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 }); // initial price range
  const [interested, setInterested] = useState(purpose);
  const [PropertyDT, setPropertyDT] = useState([propertyType]);
  const [filtersDt, setFiltersDt] = useState([]);

  const [cityFilter, setCityFilter] = useState(cityFiltertxt);
  const [latFilter, setLatFilter] = useState(latFiltertxt);
  const [longFilter, setLongFilter] = useState(lngFiltertxt);

  const [bedRoomDT, setBedRoomDT] = useState([]);
  const searchInput = useRef(null);
  const [country, setCountry] = useState("");

  const [bathRoomDt, setBathRoomDT] = useState([]);
  const [parkingDt, setparkingDt] = useState([]);
  const [filtersData, setFiltersData] = useState([
    { name: "Furnished", dbName: "furnished", value: null, count: 0 },
    { name: "Air Conditioning", dbName: "airConditioning", value: null, count: 0 },
    { name: "Security", dbName: "security", value: null, count: 0 },
    { name: "Elevator", dbName: "elevator", value: null, count: 0 },
    { name: "Balcony", dbName: "balcony", value: null, count: 0 },
    { name: "Fenced", dbName: "fenced", value: null, count: 0 },
  ]);
  const [handleSearch, setHandleSearch] = useState(false)

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [bedRoomOptions, setBedRoomOptions] = useState([]);
  const [bathRoomOptions, setBathRoomOptions] = useState([]);
  const [parkingOptions, setParkingOptions] = useState([]);
  const [moreFilterOptions, setMoreFiltersOptions] = useState([]);
  const [addressFilter, setAddressFilter] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");

  const [planAddress, setPlanAddress] = useState(pAddress);
  const [sortingFilter, setSortingFilter] = useState(null);
  const [propertydata, setPropertyData] = useState([
    { name: "All", value: "all", count: 0 },
    { name: "New Home", value: "newHome", count: 0 },
    { name: "Room", value: "room", count: 0 },
    { name: "Office", value: "office", count: 0 },
    { name: "Land", value: "land", count: 0 },
    { name: "Building", value: "building", count: 0 },
    { name: "Garage", value: "garage", count: 0 },
    { name: "Commercial Properties", value: "commercialProperties", count: 0 },
    { name: "Home", value: "home", count: 0 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(null)
  const [limit, setLimit] = useState(5);
  const [searchValue, setSearchValue] = useState('')

  const [favorited, setFavorited] = useState(null)


  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();

    setAddressFilter(place.formatted_address);
    place.address_components.forEach((component) => {
      const types = component.types;
      const value = component.long_name;

      // Extract country
      if (types.includes("country")) {
        setCountry(value);
      }

      // Extract state
      if (types.includes("administrative_area_level_1")) {
        setState(value);
      }

      // Extract city
      if (types.includes("locality")) {
        setCity(value);
      }

    });

    const latitude = place.geometry.location.lat();

    setLat(latitude);
    const longitude = place.geometry.location.lng();
    setLng(longitude);
  };

  const extractAddress = (place) => {
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
      },
    };

    if (!Array.isArray(place?.address_components)) {
      return address;
    }

    place.address_components.forEach((component) => {
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
        address.state = value;
        console.log(address.state + "state");
      }

      // Extract city
      if (types.includes("locality")) {
        address.city = value;
      }

      // Extract street number
      if (types.includes("street_number")) {
        address.streetNumber = value;
      }

      // Extract postal code
      if (types.includes("postal_code")) {
        address.zip = value;
      }
    });

    return address;
  };

  //init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    var options = {
      types: ["establishment"],
      // componentRestrictions: {country: "us"}
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current,
    );
    autocomplete.setFields([
      "address_component",
      "geometry",
      "formatted_address",
    ]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
    const address = extractAddress(autocomplete);
  };

  useEffect(() => {
    initAutocomplete();
    searchInput.current.value = pAddress;
    let newArr = [...PropertyDT]
    // setPropertyDT(['room','newHome','office','land','building','garage','home','commercialProperties'])
    let tempObj = {
      key: 'all',
      checked: true
    }
    setPropertyDT(['all'])
    setSelectedOptions([tempObj])
    // console.log(,"check localstorageuser")
  }, []);

  useEffect(() => {
    setFavorited(null)
    setLoading(true);
    const loadAllData = async () => {
      // var url = `https://walrus-app-ovpy2.ondigitalocean.app/property/list`;
      var url = `http://localhost:3000/property/list`;
      axios({
        method: "get",
        url: url,
      }).then(async function (response) {
        var res = response.data.data;
        propertydata[0]['count'] = 100;
        propertydata.map((item, index) => {

          var count = res.filter((curElem) => {
            return curElem.type.toLowerCase().includes(item.value);
          }).length;
          item["count"] = count;
        });

      });
    };


    const filterData = async () => {
      // var url = `https://walrus-app-ovpy2.ondigitalocean.app/property/list`;
      var url = `http://localhost:3000/property/list`;

      if (priceRange) {
        url += `?&priceFrom=${priceRange["min"]}&priceTo=${priceRange["max"]}`;
      }
      if (
        typeof interested !== "undefined" &&
        interested !== null &&
        interested !== ""
      ) {
        url += `&purpose=${interested.toLowerCase()}`;
      }
      if (
        typeof cityFilter !== "undefined" &&
        cityFilter !== null &&
        cityFilter !== ""
      ) {
        url += `&search=${cityFilter}`;
      }
      // if (
      //   typeof PropertyDT !== "undefined" &&
      //   PropertyDT !== null &&
      //   PropertyDT !== "" &&
      //   PropertyDT !== "all"
      // ) {
      //   url += `&type=${PropertyDT}`;
      // }
      // console.log
      // url += `&type=room&type=newHome&type=office&type=land&type=building&type=garage&home=room&type=commercialProperties`

      if (PropertyDT[0] == 'all') {
        url += `&type=room&type=newHome&type=office&type=land&type=building&type=garage&type=home&type=commercialProperties`
        // ['room','newHome','office','land','building','garage','home','commercialProperties']
      } else {
        if (PropertyDT.length > 0) {
          // let newArr = PropertyDT.filter((el)=>el !== undefined)
          if (PropertyDT.length == 1) {
            url += `&type=${PropertyDT[0]}`;
          } else {
            let newUrl = url
            PropertyDT.forEach((el) => {
              newUrl += `&type=${el}`
            })
            // url += `&type=${PropertyDT}`;
            url = newUrl;
          }
        }
      }


      if (filtersDt.length > 0) {
        const checkIfAnyFiltersTrue = filtersDt.filter((el) => el.filtersType !== null && el.filtersType !== false);
        checkIfAnyFiltersTrue.forEach((el) => {
          url += `&${el.dbName}=${el.filtersType}`
        })
      } else {
        if (
          filtersDt[0] !== null && filtersDt[0] != undefined
        ) {
          url += `&${filtersDt[0].dbName}=${filtersDt[0].filtersType}`
        }
      }

      // if(
      //   typeof filtersDt.filtersType != null &&
      //   filtersDt.filtersType != undefined,
      //   filtersDt.filtersType != ""
      // ){
      //   console.log(filtersDt,"check filtersDt")
      //   url += `&${filtersDt.dbName}=${filtersDt.filtersType}`
      //   console.log(url)
      // }
      if (bedRoomDT.length > 0) {
        if (bedRoomDT.length == 1) {
          url += `&rooms=${bedRoomDT[0]}`;
        } else {
          let newUrl = url
          bedRoomDT.forEach((el) => {
            newUrl += `&rooms=${el}`
          })
          // url += `&rooms=${bedRoomDT}`;
          url = newUrl;
        }
      }
      // if (
      //   typeof bedRoomDT !== "undefined" &&
      //   bedRoomDT !== null &&
      //   bedRoomDT !== ""
      // ) {
      //   url += `&rooms=${bedRoomDT}`;
      // }
      if (bathRoomDt.length > 0) {
        console.log(bathRoomDt, "check bathRoomDt")
        if (bathRoomDt.length == 1) {
          url += `&bath=${bathRoomDt[0]}`;
        } else {
          let newUrl = url
          console.log(bathRoomDt + typeof bathRoomDt, "bathRoomDt in else")
          bathRoomDt.forEach((el) => {
            newUrl += `&bath=${el}`
          })
          url = newUrl;
        }
      }

      // if (
      //   typeof bathRoomDt !== "undefined" &&
      //   bathRoomDt !== null &&
      //   bathRoomDt !== ""
      // ) {
      //   url += `&bath=${bathRoomDt}`;
      // }

      if (parkingDt.length > 0) {
        console.log(parkingDt, "check parkingDt")
        if (parkingDt.length == 1) {
          url += `&parking=${parkingDt[0]}`;
        } else {
          let newUrl = url
          parkingDt.forEach((el)=>{
            newUrl += `&parking=${el}`
          })
          url = newUrl
        }
      }

      // if (
      //   typeof parkingDt !== "undefined" &&
      //   parkingDt !== null &&
      //   parkingDt !== ""
      // ) {
      //   url += `&parking=${parkingDt}`;
      // }

      // if(typeof filtersDt != null){
      //   if(filtersDt.)
      // }


      if (
        typeof sortingFilter !== "undefined" &&
        sortingFilter !== null
      ) {
        if (sortingFilter.key == 'Oldest') {
          console.log("Oldest")
          url += `&sortAttr=${sortingFilter.value}&sort='ASC'`;
        }
        if (sortingFilter.key == 'Newest') {
          console.log("Newest")
          url += `&sortAttr=${sortingFilter.value}&sort='DESC'`;
        }
        if (sortingFilter.key == 'Expensive') {
          url += `&sortAttr=${sortingFilter.value}&sort='DESC'`;

        }
        if (sortingFilter.key == 'Cheapest') {
          url += `&sortAttr=${sortingFilter.value}&sort='ASC'`;

        }
        if (
          sortingFilter.key != 'Oldest' &&
          sortingFilter.key != 'Newest' &&
          sortingFilter.key != 'Expensive' &&
          sortingFilter.key != 'Cheapest'

        ) {
          url += `&sortAttr=${sortingFilter.value}`;
        }
        // else{
        //   console.log("notoldest")
        //   console.log("notoldest")
        //   url += `&sortAttr=${sortingFilter.value}`;
        // }
      }

      url += `&limit=${limit}&offset=${(currentPage * limit) - limit}`;
      // url += `&limit=2&skip=2`;
      axios({
        method: "get",
        url: url,
      }).then(async function (response) {
        var res = response.data.data;
        res.map((item, index) => {
          var position = {
            lat: item.location.latitude,
            lng: item.location.longitude,
          };
          item["location"]["position"] = position;
        });

        setFilteredData(res);
        setCount(response.data.count)
        setLoading(false);
      });

    };

    filterData();
    loadAllData();
  }, [
    priceRange,
    interested,
    PropertyDT,
    cityFilter,
    bedRoomDT,
    bathRoomDt,
    parkingDt,
    filtersDt,
    sortingFilter,
    currentPage,
    favorited,
    handleSearch
    // handleFavoriteClick
  ]);

  const locations = [
    {
      id: 1,
      name: "Chicago, Illinois",
      position: { lat: 37.778519, lng: -122.40564 },
      full_address: "asdfasdfasdf asdf",
    },
    {
      id: 2,
      name: "Denver, Colorado",
      position: { lat: 37.759703, lng: -122.428093 },
      full_address: "ABC 1234567",
    },
  ];

  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [proData, setProData] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  const [markerDetail, setMarkerDetail] = useState(null);
  const sortOptions = [
    { value: "price", label: "Expensive" },
    { value: "price", label: "Cheapest" },
    { value: "createdAt", label: "Newest" },
    { value: "createdAt", label: "Oldest" },
    { value: "city", label: "City" },
    // { value: "type", label: "Type" },
    // { value: "availableFrom", label: "Available From" },
  ];

  const [home, setHome] = useState({ value: "city", label: "City" });

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [toggle5, setToggle5] = useState(false);
  const [slider, setSlider] = useState(false);

  const bedRoomdata = [
    { name: 1, count: 0, value:"bedRoom1" },
    { name: 2, count: 0, value:"bedRoom2" },
    { name: 3, count: 0, value:"bedRoom3" },
    { name: 4, count: 0, value:"bedRoom4" },
    { name: 5, count: 0, value:"bedRoom5" },
  ];
  const intresteddata = [{ name: "Buy", value: "sale" }, { name: "Rent", value: "rent" }];

  const bathRoomData = [
    { name: 1, count: 0, value:'bathRoom1' },
    { name: 2, count: 0, value:'bathRoom2' },
    { name: 3, count: 0, value:'bathRoom3' },
    { name: 4, count: 0, value:'bathRoom4' },
    { name: 5, count: 0, value:'bathRoom5' },
  ]

  const parkingData = [
    { name: 1, count: 0,value:'parking1' },
    { name: 2, count: 0,value:'parking2' },
    { name: 3, count: 0,value:'parking3' },
    { name: 4, count: 0,value:'parking4' },
    { name: 5, count: 0,value:'parking5' },
  ]


  const handleSliderChange = (value) => {
    // update the price range when slider value changes
    setPriceRange({
      min: value[0],
      max: value[1],
    });
  };

  const handleActiveMarker = (props, marker) => {
    console.log(props);
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
    setMarkerDetail(props);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    locations.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const searchHandler = () => {
    if (searchInput.current.value === "") {
      alert("please select any location");
      return false;
    }
    setCityFilter(city);
  };
  const clearFilterHandler = () => {
    setPriceRange({
      min: 0,
      max: 100000,
    });
    setInterested("");
    setPropertyDT(["all"]);
    setSelectedOptions([])
    setParkingOptions([])
    setparkingDt([])
    setBathRoomDT([])
    setBedRoomDT([])
    setBedRoomOptions([])
    setFiltersDt([])

    setCityFilter("");
    setCity("");
    searchInput.current.value = "";
  };

  const handleSearchProperties = ()=>{
        setHandleSearch(!handleSearch)
  }

  const sortingHandler = (e) => {
    console.log(e.value, "check sorting")
    console.log(e.label, "check sorting")
    let obj = {
      key: e.label,
      value: e.value
    }
    // setSortingFilter(e.value);
    setSortingFilter(obj)
  };


  const handlePropertyType = (item) => {
    console.log(item, "check property item")
    let array = []
    setPropertyDT(array)
    if (PropertyDT.length > 0) {
      const findIndex = PropertyDT.findIndex((el) => el == item.value)
      if (findIndex == -1) {
        let initArr = [...PropertyDT]
        setPropertyDT([...initArr, item.value])
      }
    } else {
      let initArr = [...PropertyDT]
      setPropertyDT([...initArr, item.value])
    }
  }
  const handleBedRoom = (item) => {
    if (bedRoomDT.length > 0) {
      const findIndex = bedRoomDT.findIndex((el) => el == item.name)
      if (findIndex == -1) {
        let initArr = [...bedRoomDT]
        setBedRoomDT([...initArr, item.name])
      }
    } else {
      let init = [...bedRoomDT]
      setBedRoomDT([...init, item.name])
    }
  }
  const handleBathRoom = (item) => {
    if (bathRoomDt.length > 0) {
      const findIndex = bathRoomDt.findIndex((el) => el == item.name)
      if (findIndex == -1) {
        let initArr = [...bathRoomDt]
        setBathRoomDT([...initArr, item.name])
      }
    } else {
      let init = [...bathRoomDt]
      setBathRoomDT([...init, item.name])
    }
  }

  const handleParking = (item) => {
    if (parkingDt.length > 0) {
      const findIndex = parkingDt.findIndex((el) => el == item.name)
      if (findIndex == -1) {
        let initArr = [...parkingDt]
        setparkingDt([...initArr, item.name])
      }
    } else {
      let init = [...bathRoomDt]
      setparkingDt([...init, item.name])
    }
  }
  const handleCheckboxChange = async (e, key) => {
    console.log("checkbox", key)
    console.log("checkbox", PropertyDT[0])
    if (PropertyDT[0] == 'all') {
      PropertyDT.splice(0, 1)
      selectedOptions.splice(0, 1)
      console.log(selectedOptions, "selected OPtions")
      console.log(PropertyDT, "property Dt")
    }
    // else{
    console.log("else block cant find at index 0")

    // let array = []
    // setPropertyDT(array)
    let tempObj = {
      key: key,
      checked: e.target.checked
    }
    let chec = [...selectedOptions]
    let initArr = [...PropertyDT]
    const findIndex = chec.findIndex((el) => el.key === key)
    if (findIndex != -1) {
      chec[findIndex].value = e.target.checked
      chec.splice(findIndex, 1)
      initArr.splice(findIndex, 1)
      setSelectedOptions([...chec])
      setPropertyDT([...initArr])
    } else {
      console.log("asdf")
      setSelectedOptions([...chec, tempObj])
      setPropertyDT([...initArr, tempObj.key])
    }

    // }

    // let arrayToSend = selectedOptions?selectedOptions.map((el)=>{
    //   return el.value
    // }):[]
    // .then((res)=>{
    //   console.log(res,"check response")
    //   setPropertyDT(arrayToSend)
    // })

    // if(selectedOptions.length < 1){
    //   setSelectedOptions([...tempObj])
    // }else{
    //   const findIndex = selectedOptions.findIndex((el)=>e.target.checked === el.checked)
    //   if(findIndex != -1){
    //     selectedOptions[findIndex].value = !selectedOptions[findIndex].value 
    //   } else{
    //     setSelectedOptions([...selectedOptions,tempObj])
    //   }
    // }


    // if (selectedOptions) {
    //   setSelectedOptions();
    // } else {
    //   setSelectedOptions([...selectedOptions, option]);
    // }
  };

  const handleBedRoomDropdownChange = (e, key) => {
    console.log(bedRoomDT,'bedRoomDT')
    // let array = []
    // setBedRoomDT(array)
    let tempObj = {
      key: key,
      checked: e.target.checked
    }
    let chec = [...bedRoomOptions]
    let initArr = [...bedRoomDT]
    const findIndex = chec.findIndex((el) => el.key == key)
    if (findIndex != -1) {
      chec[findIndex].value = e.target.checked
      chec.splice(findIndex, 1)
      setBedRoomOptions([...chec])
      initArr.splice(findIndex, 1)
      setBedRoomDT([...initArr])
    } else {
      console.log("asdf")
      setBedRoomOptions([...chec, tempObj])
      setBedRoomDT([...initArr, tempObj.key])
    }
  }

  const handleBathRoomDropdownChange = (e, key) => {
    // let array = []
    // setBathRoomDT(array)
    let tempObj = {
      key: key,
      checked: e.target.checked
    }
    let chec = [...bathRoomOptions]
    let initArr = [...bathRoomDt]
    const findIndex = chec.findIndex((el) => el.key == key)
    if (findIndex != -1) {
      chec[findIndex].value = e.target.checked
      chec.splice(findIndex, 1)
      setBathRoomOptions([...chec])
      initArr.splice(findIndex, 1)
      setBathRoomDT([...initArr])
    } else {
      console.log("asdf")
      setBathRoomOptions([...chec, tempObj])
      setBathRoomDT([...initArr, tempObj.key])
    }
  }

  const handleParkingDropdownChange = (e, key) => {
    // let array = []
    // setparkingDt(array)
    let tempObj = {
      key: key,
      checked: e.target.checked
    }
    let chec = [...parkingOptions]
    let initArr = [...parkingDt]
    const findIndex = chec.findIndex((el) => el.key == key)
    if (findIndex != -1) {
      chec[findIndex].value = e.target.checked
      initArr.splice(findIndex, 1)
      chec.splice(findIndex, 1)
      setParkingOptions([...chec])
      setparkingDt([...initArr])
    } else {
      console.log("asdf")
      setParkingOptions([...chec, tempObj])
      setparkingDt([...initArr, tempObj.key])
    }
  }
  const moreFilters = (item) => {
    console.log(item, "item in moreFilters")
    console.log("moreFilters function")
    if (filtersDt.length > 0) {
      const findIndex = filtersDt.findIndex((el) => {
        console.log(el.field, "el.field")
        return el.field == item.name
      })
      console.log(findIndex, "findINdex")
      if (findIndex != -1) {
        console.log("findIndex found block")

        // filtersDt.splice(findIndex,1)
        let tempFiltersDt = [...filtersDt]
        tempFiltersDt[findIndex].filtersType = !tempFiltersDt[findIndex].filtersType
        setFiltersDt([...filtersDt, tempFiltersDt])
        console.log(filtersDt)
        console.log("504")

      } else {
        setFiltersDt([...filtersDt, {
          filtersType: true,
          field: item.name,
          dbName: item.dbName
        }])
      }
    } else {
      console.log("first ")
      let init = [...filtersDt]
      let firstFilter = {
        filtersType: true,
        field: item.name,
        dbName: item.dbName
      }
      setFiltersDt([...init, firstFilter])
      console.log(filtersDt, "filtersDt")
    }

  }
  const handleMoreFiltersDropdownChange = (e, item) => {
    console.log(filtersDt,'check filters dt')
    // let array = []
    // setFiltersDt(array)
    let tempObj = {
      key: item.name,
      checked: e.target.checked
    }
    let chec = [...moreFilterOptions]
    let initArr = [...filtersDt]
    const findIndex = chec.findIndex((el) => el.key == item.name)
    if (findIndex != -1) {
      chec[findIndex].value = e.target.checked
      initArr.splice(findIndex, 1)
      chec.splice(findIndex, 1)
      setMoreFiltersOptions([...chec])
      setFiltersDt([...initArr])
    } else {
      console.log("asdf")
      setMoreFiltersOptions([...chec, tempObj])
      setFiltersDt([...initArr, {
        filtersType: true,
        field: item.name,
        dbName: item.dbName
      }])
    }
  }
  const totalPages = Math.ceil(count / limit);
  const handlePageChange = (e, pageNumber) => {
    setCurrentPage(Number(e.target.dataset.value));
    // console.log(pageNumber);
    // get((pageNumber)*limit-limit,limit,searchValue,`id`,'DESC')
    // console.log("first",property)
  };
  const handlePageSizeChange = (event) => {
    setLimit(parseInt(event.target.value))
    // get((currentPage)*parseInt(event.target.value)-parseInt(event.target.value),parseInt(event.target.value),searchValue,'id','DESC')
  };
  const handleFavoriteClick = async (item) => {
    let body = {
      favorite: true
    }
    const response = await axiosInstance.put(`${propertyUrl}/property/favorite/${item._id}`, body)
    if (response.status == 200) {
      let tempData = [...filteredData]
      console.log(tempData,"tempData")
      let index = tempData.findIndex((el)=>el._id == item._id)
      tempData[index].favorites.push(JSON.parse(localStorage.getItem('user')).token.id)
      setFilteredData(tempData)
    }
  }
  const handleRemoveFavorite = async (item) => {
    let body = {
      favorite: false
    }
    const response = await axiosInstance.put(`${propertyUrl}/property/favorite/${item._id}`, body)
    console.log(response.data.message, "check response")
    if (response.status == 200) {
      let tempData = [...filteredData]
      console.log(tempData,"tempData")
      let index = tempData.findIndex((el)=>el._id == item._id)
      let idIndex = tempData[index].favorites.find((el)=>el==JSON.parse(localStorage.getItem('user')).token.id)
      tempData[index].favorites.splice(idIndex,1)
      setFilteredData(tempData)
      // setFavorited(false)
    }
  }
  // console.log(,"check bedRoomDt")
  return (
    <>
      <Header />
      <article className="ListingsFaceted">
        <div className="bjl0o1-0 bhskcS">
          <div className="bjl0o1-1 btiWiV">
            <div className="bjl0o1-2 dmEQCF">
              <div className="rjsm5l-0 cLARDm">
                <div className="rjsm5l-1 dEOkTn">

                  <div className="sc-1m7uu2m-0 lExsy">
                    <div className="sc-1m7uu2m-6 bimUfb">
                      <div className="sc-1m7uu2m-7 gPABWM">
                        <div
                          className="sc-1m7uu2m-8 ciruMZ"
                          style={{ width: "60%" }}
                        >
                          {/* <form className='sc-1m7uu2m-1 cvMAEu'> */}
                          <input
                            type="input"
                            ref={searchInput}
                            className="sc-1m7uu2m-2 jweLbp"
                          />
                          {/* </form> */}
                        </div>
                        <div className="sc-1m7uu2m-9 fcca-di">
                          <button
                            className="sc-1m7uu2m-10 kpnlB"
                            onClick={() => clearFilterHandler()}
                          >
                            <RxCross2 />
                          </button>
                          <button
                            className="sc-1m7uu2m-12 kcAJIc"
                            onClick={() => searchHandler()}
                          >
                            <GrFormSearch className="clDIaZ" />
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="Headroom-unfixed" style={{ height: "54px" }}>
                    <div className="filter-inline">
                      <div className="bjl0o1-3 cpRqIu">
                        <div className="bjl0o1-8 bxsa-dB">
                          <button
                            type="button"
                            className="sc-125xj6w-0 iZogEd"
                            data-toggle="modal"
                            data-target="#myModal2"
                          >
                            <BiFilter />
                            Filters
                          </button>
                        </div>
                        <div className="sc-1xux7xn-0 grRvLZ">
                          <button type="button" className="sc-125xj6w-0 cTGHMu">
                            <BsArrowDownUp onClick={(e) => console.log(e, "arrow down and up")} />
                            Sort:
                            <Dropdown
                              options={sortOptions}

                              onChange={(e) => {
                                setHome(e);
                                sortingHandler(e);
                              }}
                              value={home.label == 'Newest' ? 'Newest' : home.label}
                              placeholder="Select advertising for"
                            />
                          </button>
                        </div>
                        <div className="bjl0o1-7 byfVMq">
                          <div
                            className="im11km-0 gIxqrN"
                            aria-label="Save search icon"
                          >
                            <span className="im11km-2 iBqXQh">
                              <button
                                type="button"
                                className="sc-125xj6w-0 cTGHMu"
                              >
                                <span className="im11km-1 hpowuj">
                                  <HiOutlineBellAlert />
                                </span>
                                Save search
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=".r0xktz-0 efKKDz">
            <div className="r0xktz-1 bkBfQn">
              <header aria-label="Search summary" className="u8rllx-0 kigdhw">
                <div className="sc-15z6z4m-0 fVUrto">
                  {interested !== "" && interested !== "" ? (
                    <>
                      <span className="sc-15z6z4m-1 iFYwzu">
                        For {interested}
                      </span>
                      <a
                        href="/for-rent/melbourne-vic-3000/real-estate"
                        className="sc-15z6z4m-1 lcnZym"
                      >
                        {addressFilter}
                      </a>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <h1 className="u8rllx-1 jaHnaj">
                  Rental properties in {addressFilter}
                </h1>
                <div className="u8rllx-2 iHZmYi">
                  <h2 className="u8rllx-3 gCIxxJ">
                    {count} properties including surrounding and
                    nearby suburbs
                  </h2>
                </div>
              </header>

              <section>
                <div className="sc-1yg0wqx-0 kSqCqh">
                  {isLoading === true ? (
                    // <div>
                    //   <h2>Loading...</h2>
                    // </div>
                    // <div style={{color:"deeppink"}} class="spinner-grow text-center" role="status">
                    //   <span class="sr-only">Loading...</span>
                    // </div>
                    <div class="text-center mt-5">
                      <div style={{color:"deeppink"}}  class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : filteredData && filteredData.length > 0 ? (
                    filteredData.map((item, index) => {
                      // const ifFavorite = item.favorites.some((el) => el == JSON.parse(localStorage.getItem('user')).token.id)
                      const ifFavorite = item.favorites.some((el) => el == JSON.parse(localStorage.getItem('user')).token.id)
                      return (<>
                        <div key={item["_id"]} className="sc-1ti9q65-0 ggJHdq">
                          <article className="sc-1e63uev-0 kydbmE">
                            <Link
                              to={`/properties/${item["_id"]}`}
                              className="sc-1fvt3tm-0 eRPHdN listing"
                            >
                              <div className="sc-3i257o-0 iMMhrs">
                                <Carousel
                                  responsive={responsive}
                                  showDots={true}
                                  arrows={false}
                                  className="carosal"
                                >
                                  {item["photos"].map((img, i) => (
                                    <div key={"img-" + i} className="body">
                                      <img
                                        src={img}
                                        loading="lazy"
                                        alt="1908/568 Collins Street, Melbourne VIC 3000"
                                        width={"100%"}
                                      />
                                    </div>
                                  ))}
                                </Carousel>
                              </div>
                              <div className="sc-1e63uev-4 eyFERU">
                                <time
                                  dateTime="2023-05-02T05:00:00+00:00"
                                  className="sc-1e63uev-6 bKsBdR"
                                >
                                  Inspection Tue 2 May 3:00pm
                                </time>
                                <div>
                                  <span
                                    title="Video"
                                    className="sc-1e63uev-5 cavmBy"
                                  >
                                    <span
                                      className="sc-1h490wc-0 cmMTHu icon-wrapper"
                                      role="presentation"
                                    >
                                      <FiPlayCircle className="sc-1h490wc-0 cmMTHu icon-wrapper" />
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div className="sc-1e63uev-1 dyWqS">
                                <div
                                  aria-label="Property Listing Status Label"
                                  className="sc-1e63uev-2 emUQRl"
                                >
                                  <div className="sc-111qxzs-0 lfdbms">
                                    <h3 className="sc-111qxzs-1 mQJFy">New</h3>
                                  </div>
                                </div>
                                <h3 className="sc-1e63uev-3 swIbZ">
                                  ${item["price"]}
                                  {/* {item["description"]} */}

                                </h3>
                                <div className="ijsdcd-0 gWTwZn">
                                  <h2 className="ijsdcd-1 bjJoNh">
                                    {item["location"]["pinLocation"]}
                                    {/* <span className="ijsdcd-2 dHYeSr">Melbourne VIC 3000</span> */}
                                  </h2>
                                  {item["newHomeAmenities"] && (
                                    <ul className="rkh7f0-0 doqKNP">
                                      <li className="rkh7f0-1 ddpQTN">
                                        <span
                                          role="img"
                                          aria-label="Bed"
                                          className="rkh7f0-2 iMDBSi"
                                        >
                                          <BiBed />
                                        </span>{" "}
                                        {item["newHomeAmenities"]["room"]}
                                      </li>
                                      <li className="rkh7f0-1 ddpQTN">
                                        <span
                                          role="img"
                                          aria-label="Bath"
                                          className="rkh7f0-2 iMDBSi"
                                        >
                                          <TbBath />
                                        </span>{" "}
                                        {item["newHomeAmenities"]["bath"]}
                                      </li>
                                      <li className="rkh7f0-1 ddpQTN">
                                        <span
                                          role="img"
                                          aria-label="Car"
                                          className="rkh7f0-2 iMDBSi"
                                        >
                                          <AiOutlineCar />
                                        </span>{" "}
                                        {item["newHomeAmenities"]["parking"]}
                                      </li>
                                    </ul>
                                  )}
                                  <div className="mna96j-0 hcVMxo">
                                    <h4 className="mna96j-1 bWMeDG">
                                      Apartment for Rent
                                    </h4>
                                    <h4 className="mna96j-1 bWMeDG">
                                      NEW on Homely
                                    </h4>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="ou1x8i-0 kXLBZg">
                                <div className="sc-2sewnk-0 kSoMrH">
                                  <button
                                    type="button"
                                    title="Add to collection"
                                    aria-label="Add to collection"
                                    className="sc-1pk2hw7-0 bToTeF"
                                    onClick={()=>console.log("marked as favorite")}
                                  >
                                    <span
                                      width="32px"
                                      stroke="currentColor"
                                      role="presentation"
                                      className="suraxk-0 coJfiJ"
                                    >
                                      {
                                        ifFavorite ?
                                          <AiFillHeart color='deepPink' className="fmZa-d icon" />
                                          :
                                          <AiOutlineHeart  className="sc-1h490wc-1 fmZa-d icon" />
                                      }
                                    </span>
                                  </button>
                                </div>
                              </div> */}
                            </Link>

                            {
                              // ifFavorite ?
                              ifFavorite ?
                                <div className="ou1x8i-0 kXLBZg">
                                  <div className="sc-2sewnk-0 kSoMrH">
                                    <button
                                      type="button"
                                      title="Add to collection"
                                      aria-label="Add to collection"
                                      className="sc-1pk2hw7-0 bToTeF"
                                      onClick={() => handleRemoveFavorite(item)}
                                    >
                                      <span
                                        width="32px"
                                        stroke="currentColor"
                                        role="presentation"
                                        className="suraxk-0 coJfiJ"
                                      >
                                        <AiFillHeart color='deepPink' className="fmZa-d icon" />
                                      </span>
                                    </button>
                                  </div>
                                </div>
                                :
                                <div className="ou1x8i-0 kXLBZg">
                                  <div className="sc-2sewnk-0 kSoMrH">
                                    <button
                                      onClick={() => handleFavoriteClick(item)}
                                      type="button"
                                      title="Add to collection"
                                      aria-label="Add to collection"
                                      className="sc-1pk2hw7-0 bToTeF"

                                    >
                                      <span
                                        width="32px"
                                        stroke="currentColor"
                                        role="presentation"
                                        className="suraxk-0 coJfiJ"
                                      >
                                        <AiOutlineHeart className="sc-1h490wc-1 fmZa-d icon" />
                                      </span>
                                    </button>
                                  </div>
                                </div>
                            }

                          </article>
                        </div>
                      </>
                      );
                    })
                  ) : (
                    <>
                      <h3>No Record Found</h3>
                    </>
                  )}
                </div>
                <div style={{ width: "80%" }} className="mx-auto d-flex justify-content-between align-items-center">
                  <h6>
                    Displaying results {((currentPage * limit) - limit) + 1}-{count < limit ? count : (limit * currentPage) < count ? limit * currentPage : count} of {count}
                  </h6>
                  {
                    console.log(typeof currentPage + currentPage, "currentPage")
                    // console.log(typeof totalPages + totalPages,"totalPages")
                  }
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={(e) => handlePageChange(e)}
                    count={totalPages}
                  />
                </div>
              </section>
            </div>
            <div className="r0xktz-2 gPahXz">
              <div style={{ position: "relative", height: "100%" }}>
                <div style={{ width: 600, height: 450 }} className="map-width-mobile">
                  {typeof filteredData !== "undefined" &&
                    filteredData !== null &&
                    filteredData.length > 0 ? (
                    <Map
                      google={google}
                      containerStyle={{
                        position: "static",
                        width: "100%",
                        height: "100%",
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      center={filteredData[0]["location"]["position"]}
                      initialCenter={filteredData[0]["location"]["position"]}
                      zoom={filteredData.length === 1 ? 15 : 13}
                      disableDefaultUI={true}
                      streetViewControl={true}
                    >
                      {filteredData.map((item, index) => {
                        return (
                          <Marker
                            key={item['_id'] + index}
                            onClick={handleActiveMarker}
                            position={item.location.position}
                            information={item}
                            icon={{
                              title: "Test",
                              url: "https://www.svgrepo.com/show/1276/map-pin.svg",
                              anchor: new google.maps.Point(20, 20),
                              scaledSize: new google.maps.Size(20, 20),
                            }}
                          ></Marker>
                        );
                      })}

                      <InfoWindow marker={activeMarker} visible={true}>
                        <div className="v95puu-6 ">
                          <article
                            aria-label="Property Listing"
                            data-listing-id="9896476"
                            className="sc-1e63uev-0 kpjXrq"
                          >
                            <a
                              aria-label="609/228 Abeckett Street, Melbourne VIC 3000"
                              href="/homes/609-228-abeckett-street-melbourne-vic-3000/9896476"
                              className="sc-1fvt3tm-0 eRPHdN"
                            >
                              <div className="sc-3i257o-0 bXIqeS">
                                <div className="sc-1qqt7z5-0 bIhZyK fade in">
                                  <img
                                    src={markerDetail?.information.photos[0]}
                                    loading="lazy"
                                    alt={
                                      markerDetail?.information.location.address
                                    }
                                  />
                                </div>
                              </div>
                              <div className="sc-1e63uev-1 dOPMYK">
                                <h3 className="sc-1e63uev-3 swIbZ">
                                  $ {markerDetail?.information.price}
                                </h3>
                                <div className="ijsdcd-0 gWTwZn">
                                  <h2 className="ijsdcd-1 bjJoNh">
                                    {markerDetail?.information.location.address}
                                  </h2>
                                  {typeof markerDetail?.information
                                    .roomAmenities !== "undefined" &&
                                    markerDetail?.information.roomAmenities ? (
                                    <ul className="rkh7f0-0 doqKNP">
                                      <li className="rkh7f0-1 ddpQTN">
                                        <span
                                          role="img"
                                          aria-label="Bed"
                                          className="rkh7f0-2 iMDBSi"
                                        >
                                          <BiBed className="sc-1h490wc-1 fKOyQl icon" />
                                        </span>{" "}
                                        1
                                      </li>
                                      {markerDetail?.information.roomAmenities
                                        .bath ? (
                                        <li className="rkh7f0-1 ddpQTN">
                                          <span
                                            role="img"
                                            aria-label="Bath"
                                            className="rkh7f0-2 iMDBSi"
                                          >
                                            <BiBath className="sc-1h490wc-1 fKOyQl icon" />
                                          </span>{" "}
                                          {
                                            markerDetail?.information
                                              .roomAmenities.bath
                                          }
                                        </li>
                                      ) : (
                                        <></>
                                      )}
                                      {markerDetail?.information.roomAmenities
                                        .parking ? (
                                        <li className="rkh7f0-1 ddpQTN">
                                          <span
                                            role="img"
                                            aria-label="Car"
                                            className="rkh7f0-2 iMDBSi"
                                          >
                                            <AiOutlineCar className="sc-1h490wc-1 fKOyQl icon" />
                                          </span>{" "}
                                          1
                                        </li>
                                      ) : (
                                        <></>
                                      )}
                                    </ul>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </a>
                            <div className="ou1x8i-0 gOrroY">
                              <button
                                type="button"
                                title="Add to collection"
                                aria-label="Add to collection"
                                className="sc-1pk2hw7-0 bToTeF"
                              >
                                <span
                                  width="24px"
                                  stroke="currentColor"
                                  role="presentation"
                                  className="suraxk-0 exDrMm"
                                >

                                  {/* <AiOutlineHeart className="sc-1h490wc-1 fKOyQl icon" /> */}
                                  <AiFillHeart fill="none" />
                                </span>
                              </button>
                            </div>
                          </article>
                        </div>
                      </InfoWindow>
                    </Map>
                  ) : null}
                </div>
                <div className="v95puu-4 fuUXys">
                  <span
                    className="LoadingFade"
                    style={{ opacity: 1, display: "inline-block" }}
                  >
                    <button type="button" className="sc-2vypzd-0 RMyYB">
                      Search this area
                    </button>
                  </span>
                  <span
                    className="LoadingFade"
                    style={{ opacity: 1, display: "inline-block" }}
                  >
                    <button type="button" className="sc-2vypzd-0 boRNLg">
                      Show more pins
                    </button>
                  </span>
                </div>

                {/* property market tooltip */}
                {/* Start */}

                {/* End */}

                <div className="v95puu-2 dTmuAW">
                  <h2 className="nf405-0 jFAjTY">
                    50 of 1,314 properties · Median list price $650
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Filter */}
        <div className="container demo">

          <div
            className="modal right fade"
            id="myModal2"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel2"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="sc-1kr6rly-2 fycLmA">
                  <div className="sc-1y0l0ze-0 jOespU">
                    <header className="sc-1y0l0ze-1 etQrqG">
                      <div className="sc-1y0l0ze-2 hktXrC">
                        <h2 className="sc-1y0l0ze-3 cbRSA">Filters</h2>
                        <button
                          className="sc-1y0l0ze-4 lcxzRD"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <RxCross2 className="sc-1h490wc-1 fKOyQl icon" />
                        </button>
                      </div>
                    </header>

                    <div className="if8eux-0 hbxTUi">
                      <div className="sc-1y0l0ze-5 gOGxgr">
                        <div className="sc-136vf55-0 equYRv">
                          <div className="sc-11yfpl8-0 cZxCSd">
                            <h3 className="sc-11yfpl8-2 kvGcLL">
                              <button
                                type="button"
                                id="side-mode-section"
                                className="sc-11yfpl8-1 jcRztj"
                              >
                                <div className="sc-11yfpl8-3 iBnkJT">
                                  I'm interested in...
                                </div>
                              </button>
                            </h3>
                            <div
                              id="side-mode-region"
                              role="region"
                              aria-labelledby="side-mode-section"
                            >
                              <div aria-label="Search mode">
                                <div className="sc-10mewe-0 fXoFer">
                                  {intresteddata.map((item, i) => {
                                    return (
                                      <button
                                        key={item + i}
                                        type="button"
                                        className={`sc-1oven2p-0 ${interested === item.value
                                          ? "gZszZo"
                                          : "jUPYmK"
                                          } `}
                                        onClick={() => setInterested(item.value)}
                                      >
                                        {item.name}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Price drop down */}
                          <div
                            className={`sc-11yfpl8-0  ${slider ? "ikzRsx" : "kKonjn"
                              }`}
                          >
                            <h3 className="sc-11yfpl8-2 kPUAQh">
                              <button
                                type="button"
                                onClick={() => {
                                  setSlider(!slider);
                                }}
                                id="side-proptype-section"
                                aria-label="Property type filters"
                                aria-expanded="false"
                                aria-controls="side-proptype-region"
                                className="sc-11yfpl8-1 gsheHX"
                              >
                                <div className="sc-11yfpl8-3 iBnkJT">Price</div>
                                <div className="sc-11yfpl8-4 kpgnTE">
                                  <span
                                    className="sc-1h490wc-0 cZohV icon-wrapper"
                                    role="presentation"
                                  >
                                    <IoIosArrowDown className="sc-1h490wc-1 clDIaZ icon" />
                                  </span>
                                </div>
                              </button>
                            </h3>
                            <div className="sc-11yfpl8-5 gbsVeP"></div>

                            {slider && (
                              <div
                                id="side-proptype-region"
                                role="region"
                                aria-labelledby="side-proptype-section"
                                className="hide"
                              >
                                <div>
                                  <Slider
                                    range
                                    min={0}
                                    max={100000}
                                    value={[priceRange.min, priceRange.max]}
                                    onChange={handleSliderChange}
                                  />
                                  <div className="range-number">
                                    <div>0</div>
                                    <div>
                                      ${priceRange.min} - ${priceRange.max}
                                    </div>
                                    <div>100000</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Property type drop down */}

                          <div
                            className={`sc-11yfpl8-0  ${toggle1 ? "ikzRsx" : "kKonjn"
                              }`}
                          >
                            <h3 className="sc-11yfpl8-2 kPUAQh">
                              <button
                                type="button"
                                onClick={() => {
                                  setToggle1(!toggle1);
                                }}
                                id="side-proptype-section"
                                aria-label="Property type filters"
                                aria-expanded="false"
                                aria-controls="side-proptype-region"
                                className="sc-11yfpl8-1 gsheHX"
                              >
                                <div className="sc-11yfpl8-3 iBnkJT">
                                  Property type
                                </div>
                                <div className="sc-11yfpl8-4 kpgnTE">
                                  <span
                                    className="sc-1h490wc-0 cZohV icon-wrapper"
                                    role="presentation"
                                  >
                                    <IoIosArrowDown className="sc-1h490wc-1 clDIaZ icon" />
                                  </span>
                                </div>
                              </button>
                            </h3>
                            <div className="sc-11yfpl8-5 gbsVeP"></div>

                            {toggle1 && (
                              <div
                                id="side-proptype-region"
                                role="region"
                                aria-labelledby="side-proptype-section"
                                className="hide"
                              >
                                <div>
                                  <ul
                                    role="group"
                                    className="sc-316fzr-0 jDEIHe"
                                  >
                                    {propertydata.map((item, i) => {
                                      return (
                                        <li
                                          key={item.value + i}
                                          className="sc-1tyddxu-0 hRTczC"
                                        >

                                          <CheckBox
                                            id={item.name}
                                            name={item.name}
                                            handleCheckboxChange={(e) => handleCheckboxChange(e, item.value)}
                                            checked={PropertyDT.find((ml) => ml == item.value) ? true : false}
                                            
                                         />
                                          {/* <button
                                            type="button"
                                            className="sc-10375bz-0 inAQUt"
                                            onClick={() => {
                                              // setPropertyDT(item.value);
                                              handlePropertyType(item)
                                            }}
                                          >
                                            {PropertyDT === item.value ? (
                                              <GrCheckboxSelected className="chack-icons" />
                                            ) : (
                                              <GrCheckbox className="sc-1h490wc-1 clDIaZ icon" />
                                            )}
                                            <span aria-label="All Property Types">
                                              {item.name}
                                            </span>
                                            <span
                                              aria-label="1873 properties"
                                              className="sc-1uzywjh-0 emTcCo"
                                            >
                                              {item.count}
                                            </span>
                                          </button> */}
                                          {/* <CheckBox
                                            name = {item.name}
                                            handleCheckChange={handleCheckChange}
                                          /> */}


                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Bedroom drop down */}

                          <div
                            className={`sc-11yfpl8-0  ${toggle2 ? "ikzRsx" : "kKonjn"
                              }`}
                          >
                            <h3 className="sc-11yfpl8-2 kPUAQh">
                              <button
                                type="button"
                                onClick={() => {
                                  setToggle2(!toggle2);
                                }}
                                id="side-proptype-section"
                                aria-label="Property type filters"
                                aria-expanded="false"
                                aria-controls="side-proptype-region"
                                className="sc-11yfpl8-1 gsheHX"
                              >
                                <div className="sc-11yfpl8-3 iBnkJT">
                                  BedRooms
                                </div>
                                <div className="sc-11yfpl8-4 kpgnTE">
                                  <span
                                    className="sc-1h490wc-0 cZohV icon-wrapper"
                                    role="presentation"
                                  >
                                    <IoIosArrowDown className="sc-1h490wc-1 clDIaZ icon" />
                                  </span>
                                </div>
                              </button>
                            </h3>
                            <div className="sc-11yfpl8-5 gbsVeP"></div>

                            {toggle2 && (
                              <div
                                id="side-proptype-region"
                                role="region"
                                aria-labelledby="side-proptype-section"
                                className="hide"
                              >
                                <div>
                                  <ul
                                    role="group"
                                    className="sc-316fzr-0 jDEIHe"
                                  >
                                    {bedRoomdata.map((item, i) => {
                                      console.log(item ,'bedRoomItem')
                                      return (
                                        <li
                                          key={item.name + i}
                                          className="sc-1tyddxu-0 hRTczC"
                                        >
                                          <CheckBox
                                            id={item.value}
                                            name={item.name}
                                            handleCheckboxChange={(e) => handleBedRoomDropdownChange(e, item.name)}
                                            checked = {bedRoomDT.find((ml)=>ml ==item.name)? true :false}
                                          />
                                          {/* <button
                                            type="button"
                                            className="sc-10375bz-0 inAQUt"
                                            onClick={() => {
                                              handleBedRoom(item)
                                            }}
                                          >
                                            {bedRoomDT === item.name ? (
                                              <GrCheckboxSelected className="chack-icons" />
                                            ) : (
                                              <GrCheckbox className="sc-1h490wc-1 clDIaZ icon" />
                                            )}
                                            <span aria-label="All Property Types">
                                              {item.name}
                                            </span>
                                            <span
                                              aria-label="1873 properties"
                                              className="sc-1uzywjh-0 emTcCo"
                                            >
                                              {item.count}
                                            </span>
                                          </button> */}
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* Bathroom dropdown */}
                          <div
                            className={`sc-11yfpl8-0  ${toggle3 ? "ikzRsx" : "kKonjn"
                              }`}
                          >
                            <h3 className="sc-11yfpl8-2 kPUAQh">
                              <button
                                type="button"
                                onClick={() => {
                                  setToggle3(!toggle3);
                                }}
                                id="side-proptype-section"
                                aria-label="Property type filters"
                                aria-expanded="false"
                                aria-controls="side-proptype-region"
                                className="sc-11yfpl8-1 gsheHX"
                              >
                                <div className="sc-11yfpl8-3 iBnkJT">
                                  Bathrooms
                                </div>
                                <div className="sc-11yfpl8-4 kpgnTE">
                                  <span
                                    className="sc-1h490wc-0 cZohV icon-wrapper"
                                    role="presentation"
                                  >
                                    <IoIosArrowDown className="sc-1h490wc-1 clDIaZ icon" />
                                  </span>
                                </div>
                              </button>
                            </h3>
                            <div className="sc-11yfpl8-5 gbsVeP"></div>

                            {toggle3 && (
                              <div
                                id="side-proptype-region"
                                role="region"
                                aria-labelledby="side-proptype-section"
                                className="hide"
                              >
                                <div>
                                  <ul
                                    role="group"
                                    className="sc-316fzr-0 jDEIHe"
                                  >
                                    {bathRoomData.map((item, i) => {
                                      return (
                                        <li
                                          key={item.name + i}
                                          className="sc-1tyddxu-0 hRTczC"
                                        >
                                          <CheckBox
                                            id={item.value}
                                            name={item.name}
                                            handleCheckboxChange={(e) => handleBathRoomDropdownChange(e, item.name)}
                                            checked = {bathRoomDt.find((ml)=>ml ==item.name)? true :false}
                                          
                                          />
                                          {/* <button
                                            type="button"
                                            className="sc-10375bz-0 inAQUt"
                                            onClick={() => {
                                              // setBathRoomDT(item.name);
                                              handleBathRoom(item)
                                            }}
                                          >
                                            {bathRoomDt === item.name ? (
                                              <GrCheckboxSelected className="chack-icons" />
                                            ) : (
                                              <GrCheckbox className="sc-1h490wc-1 clDIaZ icon" />
                                            )}
                                            <span aria-label="All Property Types">
                                              {item.name}
                                            </span>
                                            <span
                                              aria-label="1873 properties"
                                              className="sc-1uzywjh-0 emTcCo"
                                            >
                                              {item.count}
                                            </span>
                                          </button> */}
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Parking dropdown */}
                          <div
                            className={`sc-11yfpl8-0  ${toggle4 ? "ikzRsx" : "kKonjn"
                              }`}
                          >
                            <h3 className="sc-11yfpl8-2 kPUAQh">
                              <button
                                type="button"
                                onClick={() => {
                                  setToggle4(!toggle4);
                                }}
                                id="side-proptype-section"
                                aria-label="Property type filters"
                                aria-expanded="false"
                                aria-controls="side-proptype-region"
                                className="sc-11yfpl8-1 gsheHX"
                              >
                                <div className="sc-11yfpl8-3 iBnkJT">
                                  Parking
                                </div>
                                <div className="sc-11yfpl8-4 kpgnTE">
                                  <span
                                    className="sc-1h490wc-0 cZohV icon-wrapper"
                                    role="presentation"
                                  >
                                    <IoIosArrowDown className="sc-1h490wc-1 clDIaZ icon" />
                                  </span>
                                </div>
                              </button>
                            </h3>
                            <div className="sc-11yfpl8-5 gbsVeP"></div>

                            {toggle4 && (
                              <div
                                id="side-proptype-region"
                                role="region"
                                aria-labelledby="side-proptype-section"
                                className="hide"
                              >
                                <div>
                                  <ul
                                    role="group"
                                    className="sc-316fzr-0 jDEIHe"
                                  >
                                    {parkingData.map((item, i) => {
                                      console.log(item, "parking item")
                                      return (
                                        <li
                                          key={item.name + i}
                                          className="sc-1tyddxu-0 hRTczC"
                                        >
                                          {/* <button
                                            type="button"
                                            className="sc-10375bz-0 inAQUt"
                                            onClick={() => {
                                              // setparkingDt(item.name);
                                              handleParking(item)
                                            }}
                                          >
                                            {console.log(parkingDt, "parkingDt parkinDt for checkbox")}
                                            {parkingDt === item.name ? (
                                              <GrCheckboxSelected className="chack-icons" />
                                            ) : (
                                              <GrCheckbox className="sc-1h490wc-1 clDIaZ icon" />
                                            )}
                                            <span aria-label="All Property Types">
                                              {item.name}
                                            </span>
                                            <span
                                              aria-label="1873 properties"
                                              className="sc-1uzywjh-0 emTcCo"
                                            >
                                              {item.count}
                                            </span>
                                          </button> */}
                                          <CheckBox
                                            id={item.value}
                                            name={item.name}
                                            handleCheckboxChange={(e) => handleParkingDropdownChange(e, item.name)}
                                            checked = {parkingDt.find((ml)=>ml ==item.name)? true :false}
                                          
                                          />
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* more Filters */}
                          <div
                            className={`sc-11yfpl8-0  ${toggle5 ? "ikzRsx" : "kKonjn"
                              }`}
                          >
                            <h3 className="sc-11yfpl8-2 kPUAQh">
                              <button
                                type="button"
                                onClick={() => {
                                  setToggle5(!toggle5);
                                }}
                                id="side-proptype-section"
                                aria-label="Property type filters"
                                aria-expanded="false"
                                aria-controls="side-proptype-region"
                                className="sc-11yfpl8-1 gsheHX"
                              >
                                <div className="sc-11yfpl8-3 iBnkJT">
                                  More Filters
                                </div>
                                <div className="sc-11yfpl8-4 kpgnTE">
                                  <span
                                    className="sc-1h490wc-0 cZohV icon-wrapper"
                                    role="presentation"
                                  >
                                    <IoIosArrowDown className="sc-1h490wc-1 clDIaZ icon" />
                                  </span>
                                </div>
                              </button>
                            </h3>
                            <div className="sc-11yfpl8-5 gbsVeP"></div>

                            {toggle5 && (
                              <div
                                id="side-proptype-region"
                                role="region"
                                aria-labelledby="side-proptype-section"
                                className="hide"
                              >
                                <div>
                                  <ul
                                    role="group"
                                    className="sc-316fzr-0 jDEIHe"
                                  >
                                    {filtersData.map((item, i) => {
                                      console.log(item,"check item for filters data")
                                      return (
                                        <li
                                          key={item.name + i}
                                          className="sc-1tyddxu-0 hRTczC"
                                        >
                                          {/* <button
                                            type="button"
                                            className="sc-10375bz-0 inAQUt"
                                            onClick={() => {
                                              // setparkingDt(item.name);
                                              moreFilters(item)


                                              console.log(item.name)
                                            }}
                                          >

                                            {filtersDt.field === item.name ? (
                                              <GrCheckboxSelected className="chack-icons" />
                                            ) : (
                                              <GrCheckbox className="sc-1h490wc-1 clDIaZ icon" />
                                            )}
                                            <span aria-label="All Property Types">
                                              {item.name}
                                            </span>
                                            <span
                                              aria-label="1873 properties"
                                              className="sc-1uzywjh-0 emTcCo"
                                            >
                                              {item.count}
                                            </span>
                                          </button> */}
                                          <CheckBox
                                            id={item.name}
                                            name={item.name}
                                            handleCheckboxChange={(e) => handleMoreFiltersDropdownChange(e, item)}
                                            checked = {filtersDt.find((ml)=>ml.dbName ==item.dbName)? true :false}
                                          
                                          />
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>


                        </div>
                      </div>
                    </div>

                    <footer className="sc-1y0l0ze-6 epnMmH">
                      <div className="sc-1y0l0ze-7 ipxbJD">
                        <div className="sc-1y0l0ze-8 ikpcuX">
                          <button
                            type="button"
                            className="sc-1lxqdjp-0 bkTCAh"
                            onClick={() => clearFilterHandler()}
                          >
                            Clear all
                          </button>
                        </div>
                        <div className="sc-1y0l0ze-9 iuAQpx">
                          <button onClick={handleSearchProperties} type="button" className="sc-9rc7kn-0 hyeZAL">
                            {/* Search {filteredData?.length} properties */}
                            Search {count} properties
                          </button>
                        </div>
                      </div>
                    </footer>
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>
        {/* Filter */}
      </article>

      {/* <Footer /> */}
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
  version: "3.38",
})(Properties);
