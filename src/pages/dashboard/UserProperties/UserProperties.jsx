import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiBed } from "react-icons/bi";
import { FiPlayCircle } from "react-icons/fi";
import { TbBath, T } from "react-icons/tb";
import { AiFillHeart, AiOutlineCar, AiOutlineHeart } from "react-icons/ai";

import "react-dropdown/style.css";
import "../../PublicPages/Properties/Properties/Properties.css";
import "react-multi-carousel/lib/styles.css";
import "rc-slider/assets/index.css";
import axiosInstance from "../../../shared/HttpClient/axiosInstance";
import Header from "../../../shared/Header/Header";
import { BsThreeDotsVertical } from "react-icons/bs";


const UserProperties = () => {
    // const propertyUrl = 'http://localhost:3000/property';
    const propertyUrl = `${process.env.REACT_APP_BASE_URL}/property`;
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
    const [data, setData] = useState('')
    const [loader, setLoader] = useState(true)
    const [list, setList] = useState([])

    const [isLoading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [interested, setInterested] = useState(purpose);



    const [addressFilter, setAddressFilter] = useState("");


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
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(null)
    const [limit, setLimit] = useState(5);
    const [propertyData,setPropertyData] = useState()

    const [favorited, setFavorited] = useState(null)
    
    const navigate = useNavigate()
    useEffect(() => {
        getPropertiesList()
    }, [])
    const getPropertiesList = async () => {
        const response = await axiosInstance.get('property/user')
        console.log(response, "check data for user prpoerties")
        const data = await response.data
        setLoader(false)
        setList(data.data)
        setCount(data.count)
    }
    const handleEditProperty = (id)=>{
        navigate(`/upload-property/${id}`)
    }
    return (<>
        <Header />
        <div className="w-75 mx-auto mt-5">
            <header aria-label="Search summary" className="u8rllx-0 kigdhw">
                {/* <div className="sc-15z6z4m-0 fVUrto"> */}
                {/* {interested !== "" && interested !== "" ? (
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
                    )} */}
                {/* </div> */}
                {/* <h1 className="u8rllx-1 jaHnaj"> */}
                <h1 >
                    My Properties
                </h1>
                <div className="u8rllx-2 iHZmYi">
                    <h2 className="u8rllx-3 gCIxxJ">
                        Total Properties: {count}
                    </h2>
                </div>
            </header>
            <section>
                <div className="sc-1yg0wqx-0 kSqCqh">
                    {isLoading === true ? (
                        <div class="text-center mt-5">
                            <div style={{ color: "deeppink" }} class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : list && list.length > 0 ? (
                        list.map((item, index) => {
                            const ifFavorite = item.favorites.some((el) => el == JSON.parse(localStorage.getItem('user')).token.id)
                            return (<>
                                <div key={item["_id"]} className="sc-1ti9q65-0 ggJHdq">
                                    <article className="sc-1e63uev-0 kydbmE">
                                        {/* <Link
                                            to={`/properties/${item["_id"]}`}
                                            className="sc-1fvt3tm-0 eRPHdN listing"
                                        > */}
                                        <div className="sc-1fvt3tm-0 eRPHdN listing" >


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
                                                <div className="d-flex justify-content-between">
                                                    <h3 className="sc-1e63uev-3 swIbZ">
                                                        ${item["price"]}
                                                        {/* {item["description"]} */}

                                                    </h3>
                                                    <BsThreeDotsVertical 
                                                        className="dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        cursor={'pointer'} 
                                                        fontSize={"20px"} 
                                                    />
                                                     <div class="dropdown-menu">
                                                      <a onClick={()=>handleEditProperty(item._id)} class="dropdown-item" href="#">Edit Property</a>
                                                    </div>
                                                    {/* <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false" data-offset="10,20">
                                                        Offset
                                                    </button>
                                                    <div class="dropdown-menu">
                                                        <a class="dropdown-item" href="#">Action</a>
                                                        <a class="dropdown-item" href="#">Another action</a>
                                                        <a class="dropdown-item" href="#">Something else here</a>
                                                    </div> */}
                                                </div>
                                                <div className="ijsdcd-0 gWTwZn">
                                                    <h2 className="ijsdcd-1 bjJoNh">
                                                        {item["location"]["pinLocation"]}
                                                    </h2>
                                                    {/* {item["newHomeAmenities"] && (
                                                        <>
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
                                                        
                                                        </>
                                                    )} */}

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

                                        </div>

                                        {/* </Link> */}

                                        {/* {
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
                                        } */}

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
                    {/* <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={(e) => handlePageChange(e)}
                    count={totalPages}
                  /> */}
                </div>
            </section>
        </div>
    </>)
}

export default UserProperties