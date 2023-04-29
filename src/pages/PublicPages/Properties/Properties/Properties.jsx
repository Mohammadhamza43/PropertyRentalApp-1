import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import Header from '../../../../shared/Header/Header'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx';
import { GrFormSearch } from 'react-icons/gr';
import { BiFilter } from 'react-icons/bi';
import { HiOutlineBellAlert } from 'react-icons/hi2'
import { BiBed } from 'react-icons/bi'
import { BsArrowDownUp, BsFillCheckSquareFill } from 'react-icons/bs'
import { FiPlayCircle } from 'react-icons/fi'
import { TbBath } from 'react-icons/tb'
import { AiOutlineCar, AiOutlineHeart } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import { GrCheckboxSelected, GrCheckbox } from 'react-icons/gr'
import image1 from '.././../../../assets/media/images/image_1.jpg'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Properties.css';
import 'react-multi-carousel/lib/styles.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const mapApiJs = process.env.REACT_APP_MAP_API_JS;
const geocodeJson = process.env.REACT_APP_GEOCODE_JSON;

const Properties = ({ google }) => {

	const location = useLocation();
	console.log(location);
	var purpose, propertyType, city, lat, lng = '';
	if (location.state !== null && location.state !== '') {
		if (typeof location.state.purpose !== "undefined") {
			purpose = location.state.purpose.charAt(0).toUpperCase() + location.state.purpose.slice(1);
		}
		propertyType = location.state.propertyType;
		city = location.state.city;
		lat = location.state.lat;
		lng = location.state.lng;
	}
	const [filteredData, setFilteredData] = useState([]);
	const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 }); // initial price range
	const [interested, setInterested] = useState(purpose);
	const [PropertyDT, setPropertyDT] = useState(propertyType);

	const [cityFilter, setCityFilter] = useState(city);
	const [latFilter, setLatFilter] = useState(lat);
	const [longFilter, setLongFilter] = useState(lng);
	// const { city, country, propertyType, purpose } = location?.state;


	useEffect(() => {
		const filterData = () => {
			var url = `https://walrus-app-ovpy2.ondigitalocean.app/property/list`;;
			if (priceRange) {
				url += `?&priceFrom=${priceRange['min']}&priceTo=${priceRange['max']}`;
			}
			if (typeof interested !== "undefined" && interested !== null && interested !== '') {
				url += `&purpose=${interested.toLowerCase()}`;
			}
			if (typeof cityFilter !== "undefined" && cityFilter !== null && cityFilter !== '') {
				url += `&search=${cityFilter}`;
			}
			if (typeof PropertyDT !== "undefined" && PropertyDT !== null && PropertyDT !== '' && PropertyDT !== 'all') {
				url += `&type=${PropertyDT}`;
			}


			console.log(url);
			axios({
				method: 'get',
				url: url,
			})
				.then(function (response) {
					setFilteredData(response.data.data);
				});
		}

		filterData();
	}, [priceRange, interested, PropertyDT, cityFilter]);


	const locations = [
		{
			id: 1,
			name: "Chicago, Illinois",
			position: { lat: 37.778519, lng: -122.40564 }
		},
		{
			id: 2,
			name: "Denver, Colorado",
			position: { lat: 37.759703, lng: -122.428093 }
		},

	];

	const [list, setList] = useState([])
	const [loader, setLoader] = useState(true)
	const [proData, setProData] = useState('')
	const [activeMarker, setActiveMarker] = useState(null);


	const homeOptions = [
		{ value: 'one', label: 'Homes for you' },
		{ value: 'two', label: 'Homes One' },
		{ value: 'three', label: 'Homes for you' },
		{ value: 'four', label: 'Homes for you' },
		{ value: 'five', label: 'Homes for you' },
		{ value: 'six', label: 'Homes for you' }
	]

	const [home, setHome] = useState({ value: 'one', label: 'Homes for you' })

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 1
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};

	const [toogle1, setToggle1] = useState(false)
	const [toogle2, setToggle2] = useState(false)

	const [bedRoomDT, setBedRoomDT] = useState('')

	const [slider, setSlider] = useState(false)
	const propertydata = [
		{ name: 'All', value: 'all', count: 1876 },
		{ name: 'New Home', value: 'newHome', count: 0 },
		{ name: 'Room', value: 'room', count: 20 },
		{ name: 'Office', value: 'office', count: 20 },
		{ name: 'Land', value: 'land', count: 200 },
		{ name: 'Building', value: 'building', count: 1 },
		{ name: 'Garage', value: 'garage', count: 20 },
		{ name: 'Commercial Properties', value: 'commercialProperties', count: 23 },
		{ name: 'Home', value: 'home', count: 10 }
	]
	const bedRoomdata = [
		{ name: 'Studio', count: 10 },
		{ name: 1, count: 333 },
		{ name: 2, count: 22 },
		{ name: 3, count: 44 },
		{ name: 4, count: 1 },
		{ name: '5+', count: 0 }
	]
	const intresteddata = ['Buy', 'Rent', 'Sale']


	const handleSliderChange = (value) => {
		// update the price range when slider value changes
		setPriceRange({
			min: value[0],
			max: value[1]
		});
	};



	const handleActiveMarker = (marker) => {
		if (marker === activeMarker) {
			return;
		}
		setActiveMarker(marker);
	};

	const handleOnLoad = (map) => {
		const bounds = new google.maps.LatLngBounds();
		locations.forEach(({ position }) => bounds.extend(position));
		map.fitBounds(bounds);
	};

	return (
		<>
			<Header />
			<article className='ListingsFaceted'>
				<div className='bjl0o1-0 bhskcS'>
					<div className='bjl0o1-1 btiWiV'>
						<div className='bjl0o1-2 dmEQCF'>
							<div className='rjsm5l-0 cLARDm'>
								<div className='rjsm5l-1 dEOkTn'>
									<div className='sc-1m7uu2m-0 lExsy'>
										<div className='sc-1m7uu2m-6 bimUfb'>
											<div className='sc-1m7uu2m-7 gPABWM'>
												<div className='sc-1m7uu2m-8 ciruMZ'>
													<form className='sc-1m7uu2m-1 cvMAEu'>
														<input type="input" className='sc-1m7uu2m-2 jweLbp' />
													</form>
												</div>
												<div className='sc-1m7uu2m-9 fcca-di'>
													<button className='sc-1m7uu2m-10 kpnlB'>
														<RxCross2 />
													</button>
													<button className='sc-1m7uu2m-12 kcAJIc'>
														<GrFormSearch className='clDIaZ' />
														Search
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className='Headroom-unfixed' style={{ height: '54px' }}>
										<div className='filter-inline'>
											<div className="bjl0o1-3 cpRqIu">
												<div className="bjl0o1-8 bxsa-dB">
													<button type="button" className="sc-125xj6w-0 iZogEd" data-toggle="modal" data-target="#myModal2">
														<BiFilter />
														Filters
													</button>
												</div>
												<div className="sc-1xux7xn-0 grRvLZ">
													<button type="button" className="sc-125xj6w-0 cTGHMu">
														<BsArrowDownUp />
														Sort:
														<Dropdown options={homeOptions} onChange={(e) => {
															setHome(e)
														}} value={home.label} placeholder="Select advertising for" />
													</button>
												</div>
												<div className="bjl0o1-7 byfVMq">
													<div className="im11km-0 gIxqrN" aria-label="Save search icon">
														<span className="im11km-2 iBqXQh">
															<button type="button" className="sc-125xj6w-0 cTGHMu">
																<span className="im11km-1 hpowuj">
																	<HiOutlineBellAlert />
																</span>Save search</button>
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
					<div className='.r0xktz-0 efKKDz'>
						<div className='r0xktz-1 bkBfQn'>
							<header aria-label="Search summary" className="u8rllx-0 kigdhw">
								<div className="sc-15z6z4m-0 fVUrto">
									{interested !== "" && interested !== "" ?
										<>
											<span className="sc-15z6z4m-1 iFYwzu">For {interested}</span>
											<a href="/for-rent/melbourne-vic-3000/real-estate" className="sc-15z6z4m-1 lcnZym">Melbourne (CBD), VIC 3000</a>
										</>
										: <></>}
								</div><h1 className="u8rllx-1 jaHnaj">Rental properties in Melbourne (CBD), VIC 3000</h1>
								<div className="u8rllx-2 iHZmYi"><h2 className="u8rllx-3 gCIxxJ">{filteredData.length} properties including surrounding and nearby suburbs</h2>
								</div>
							</header>

							<section>
								<div className='sc-1yg0wqx-0 kSqCqh'>
									{
										(filteredData.length > 0) ? filteredData.map((item, index) => {
											return (
												<div className='sc-1ti9q65-0 ggJHdq'>
													<article className='sc-1e63uev-0 kydbmE'>
														<Link className="sc-1fvt3tm-0 eRPHdN">
															<div className='sc-3i257o-0 iMMhrs'>
																<Carousel responsive={responsive} showDots={true} arrows={false} className="carosal">
																	{item['photos'].map((img, i) => (
																		<div className="body">
																			<img src={img} loading="lazy" alt="1908/568 Collins Street, Melbourne VIC 3000" width={'100%'} />
																		</div>
																	))}

																</Carousel>
															</div>
															<div className="sc-1e63uev-4 eyFERU">
																<time dateTime="2023-05-02T05:00:00+00:00" className="sc-1e63uev-6 bKsBdR">Inspection Tue 2 May 3:00pm</time>
																<div>
																	<span title="Video" className="sc-1e63uev-5 cavmBy">
																		<span className="sc-1h490wc-0 cmMTHu icon-wrapper" role="presentation">
																			<FiPlayCircle className='sc-1h490wc-0 cmMTHu icon-wrapper' />
																		</span>
																	</span>
																</div>
															</div>
															<div className="sc-1e63uev-1 dyWqS">
																<div aria-label="Property Listing Status Label" className="sc-1e63uev-2 emUQRl">
																	<div className="sc-111qxzs-0 lfdbms">
																		<h3 className="sc-111qxzs-1 mQJFy">New</h3>
																	</div>
																</div>
																<h3 className="sc-1e63uev-3 swIbZ">${item['price']}</h3>
																<div className="ijsdcd-0 gWTwZn">
																	<h2 className="ijsdcd-1 bjJoNh">{item['location']['pinLocation']}
																		{/* <span className="ijsdcd-2 dHYeSr">Melbourne VIC 3000</span> */}
																	</h2>
																	{item['newHomeAmenities'] &&
																		<ul className="rkh7f0-0 doqKNP">
																			<li className="rkh7f0-1 ddpQTN">
																				<span role="img" aria-label="Bed" className="rkh7f0-2 iMDBSi"><BiBed /></span> {item['newHomeAmenities']['room']}
																			</li>
																			<li className="rkh7f0-1 ddpQTN">
																				<span role="img" aria-label="Bath" className="rkh7f0-2 iMDBSi"><TbBath /></span> {item['newHomeAmenities']['bath']}
																			</li>
																			<li className="rkh7f0-1 ddpQTN">
																				<span role="img" aria-label="Car" className="rkh7f0-2 iMDBSi"><AiOutlineCar /></span> {item['newHomeAmenities']['parking']}
																			</li>
																		</ul>
																	}
																	<div className="mna96j-0 hcVMxo">
																		<h4 className="mna96j-1 bWMeDG">Apartment for Rent</h4>
																		<h4 className="mna96j-1 bWMeDG">NEW on Homely</h4>
																	</div>
																</div>
															</div>
															<div className="ou1x8i-0 kXLBZg">
																<div className="sc-2sewnk-0 kSoMrH">
																	<button type="button" title="Add to collection" aria-label="Add to collection" className="sc-1pk2hw7-0 bToTeF">
																		<span width="32px" stroke="currentColor" role="presentation" className="suraxk-0 coJfiJ">
																			<AiOutlineHeart className='sc-1h490wc-1 fmZa-d icon' />
																		</span>
																	</button>
																</div>
															</div>
														</Link>
													</article>
												</div>
											)
										}
										) : <><h3>No Record Found</h3></>}

								</div>
							</section>
						</div>
						<div className='r0xktz-2 gPahXz'>
							<div style={{ position: 'relative', height: '100%' }}>
								<div style={{ width: 600, height: 450 }}>
									<Map
										google={google}
										containerStyle={{
											position: "static",
											width: "100%",
											height: "100%"
										}}
										style={{
											width: "100%",
											height: "100%"
										}}
										center={locations[0]['position']}
										initialCenter={locations[0]['position']}
										zoom={locations.length === 1 ? 15 : 13}
										disableDefaultUI={true}
									>
										{
											locations.map(({ id, name, position }) => {
												return (

													<Marker
														onClick={() => handleActiveMarker(id)}
														title={name}
														name={name}
														position={position}

														icon={{
															url: "https://www.svgrepo.com/show/1276/map-pin.svg",
															anchor: new google.maps.Point(20, 20),
															scaledSize: new google.maps.Size(20, 20)
														}}
													>
													</Marker>
												)
											})
										}

									</Map>
								</div>
								{/* <iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3983011955306!2d67.08029287430013!3d24.918497742934793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f30a2906a33%3A0xdb9604986cf70811!2sBlock%201%20Gulshan-e-Iqbal%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1682632392566!5m2!1sen!2s"
									width="600" className='map-iframe' style={{ border: 0, width: '100%', height: 'cal(100% -20px)' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
								<div className="v95puu-4 fuUXys">
									<span className="LoadingFade" style={{ opacity: 1, display: "inline-block" }}>
										<button type="button" className="sc-2vypzd-0 RMyYB">Search this area</button>
									</span>
									<span className="LoadingFade" style={{ opacity: 1, display: "inline-block" }}>
										<button type="button" className="sc-2vypzd-0 boRNLg">Show more pins</button>
									</span>
								</div>
								<div className="v95puu-2 dTmuAW">
									<h2 className="nf405-0 jFAjTY">50 of 1,314 properties · Median list price $650</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container demo">



					<div className="modal right fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className='sc-1kr6rly-2 fycLmA'>
									<div className='sc-1y0l0ze-0 jOespU'>
										<header className="sc-1y0l0ze-1 etQrqG">
											<div className="sc-1y0l0ze-2 hktXrC">
												<h2 className="sc-1y0l0ze-3 cbRSA">Filters</h2>
												<button className="sc-1y0l0ze-4 lcxzRD" data-dismiss="modal" aria-label="Close">
													<RxCross2 className='sc-1h490wc-1 fKOyQl icon' />
												</button>
											</div>
										</header>
										<div className='if8eux-0 hbxTUi'>
											<div className='sc-1y0l0ze-5 gOGxgr'>
												<div className='sc-136vf55-0 equYRv'>
													<div className='sc-11yfpl8-0 cZxCSd'>
														<h3 className='sc-11yfpl8-2 kvGcLL'>
															<button type="button" id="side-mode-section" className="sc-11yfpl8-1 jcRztj">
																<div className="sc-11yfpl8-3 iBnkJT">I'm interested in...</div>
															</button>
														</h3>
														<div id="side-mode-region" role="region" aria-labelledby="side-mode-section">
															<div aria-label="Search mode"><div className="sc-10mewe-0 fXoFer">
																{intresteddata.map((item, i) => {
																	return (
																		<button
																			type="button"
																			class={`sc-1oven2p-0 ${interested === item ? 'gZszZo' : 'jUPYmK'} `}
																			onClick={() => setInterested(item)}
																		>{item}
																		</button>
																	)
																})}
															</div>
															</div>
														</div>
													</div>
													<div class={`sc-11yfpl8-0  ${slider ? 'ikzRsx' : 'kKonjn'}`}>
														<h3 className="sc-11yfpl8-2 kPUAQh">
															<button type="button" onClick={() => { setSlider(!slider) }} id="side-proptype-section" aria-label="Property type filters" aria-expanded="false" aria-controls="side-proptype-region" className="sc-11yfpl8-1 gsheHX">
																<div className="sc-11yfpl8-3 iBnkJT">Price</div>
																<div className="sc-11yfpl8-4 kpgnTE">
																	<span className="sc-1h490wc-0 cZohV icon-wrapper" role="presentation">
																		<IoIosArrowDown className='sc-1h490wc-1 clDIaZ icon' />
																	</span>
																</div>
															</button>
														</h3>
														<div className="sc-11yfpl8-5 gbsVeP"></div>
														{slider &&
															<div id="side-proptype-region" role="region" aria-labelledby="side-proptype-section" className="hide"><div>
																<Slider
																	range
																	min={0}
																	max={100000}
																	defaultValue={[0, 100000]}
																	onChange={handleSliderChange}
																/>
																<div className='range-number'>
																	<div>0</div>
																	<div>${priceRange.min} - ${priceRange.max}</div>
																	<div>100000</div>
																</div>
															</div>
															</div>
														}

													</div>

													<div class={`sc-11yfpl8-0  ${toogle1 ? 'ikzRsx' : 'kKonjn'}`}>
														<h3 className="sc-11yfpl8-2 kPUAQh">
															<button type="button" onClick={() => { setToggle1(!toogle1) }} id="side-proptype-section" aria-label="Property type filters" aria-expanded="false" aria-controls="side-proptype-region" className="sc-11yfpl8-1 gsheHX">
																<div className="sc-11yfpl8-3 iBnkJT">Property type</div>
																<div className="sc-11yfpl8-4 kpgnTE">
																	<span className="sc-1h490wc-0 cZohV icon-wrapper" role="presentation">
																		<IoIosArrowDown className='sc-1h490wc-1 clDIaZ icon' />
																	</span>
																</div>
															</button>
														</h3>
														<div className="sc-11yfpl8-5 gbsVeP"></div>
														{toogle1 &&
															<div id="side-proptype-region" role="region" aria-labelledby="side-proptype-section" className="hide"><div>
																<ul role="group" className="sc-316fzr-0 jDEIHe">
																	{propertydata.map((item, i) => {
																		return (
																			<li className="sc-1tyddxu-0 hRTczC">
																				<button type="button" className="sc-10375bz-0 inAQUt" onClick={() => { setPropertyDT(item.value) }}>
																					{PropertyDT === item.value ?
																						<GrCheckboxSelected className='chack-icons' />
																						:
																						<GrCheckbox className='sc-1h490wc-1 clDIaZ icon' />
																					}
																					<span aria-label="All Property Types">{item.name}</span>
																					<span aria-label="1873 properties" className="sc-1uzywjh-0 emTcCo">{item.count}</span>
																				</button>
																			</li>
																		)
																	})}
																</ul>
															</div>
															</div>
														}

													</div>
													<div class={`sc-11yfpl8-0  ${toogle2 ? 'ikzRsx' : 'kKonjn'}`}>
														<h3 className="sc-11yfpl8-2 kPUAQh">
															<button type="button" onClick={() => { setToggle2(!toogle2) }} id="side-proptype-section" aria-label="Property type filters" aria-expanded="false" aria-controls="side-proptype-region" className="sc-11yfpl8-1 gsheHX">
																<div className="sc-11yfpl8-3 iBnkJT">BedRooms</div>
																<div className="sc-11yfpl8-4 kpgnTE">
																	<span className="sc-1h490wc-0 cZohV icon-wrapper" role="presentation">
																		<IoIosArrowDown className='sc-1h490wc-1 clDIaZ icon' />
																	</span>
																</div>
															</button>
														</h3>
														<div className="sc-11yfpl8-5 gbsVeP"></div>
														{toogle2 &&
															<div id="side-proptype-region" role="region" aria-labelledby="side-proptype-section" className="hide"><div>
																<ul role="group" className="sc-316fzr-0 jDEIHe">
																	{bedRoomdata.map((item, i) => {
																		return (
																			<li className="sc-1tyddxu-0 hRTczC">
																				<button type="button" className="sc-10375bz-0 inAQUt" onClick={() => { setBedRoomDT(item.name) }}>
																					{bedRoomDT === item.name ?
																						<GrCheckboxSelected className='chack-icons' />
																						:
																						<GrCheckbox className='sc-1h490wc-1 clDIaZ icon' />
																					}
																					<span aria-label="All Property Types">{item.name}</span>
																					<span aria-label="1873 properties" className="sc-1uzywjh-0 emTcCo">{item.count}</span>
																				</button>
																			</li>
																		)
																	})}

																</ul>
															</div>
															</div>
														}

													</div>





												</div>
											</div>
										</div>
										<footer className="sc-1y0l0ze-6 epnMmH">
											<div className="sc-1y0l0ze-7 ipxbJD">
												<div className="sc-1y0l0ze-8 ikpcuX">
													<button type="button" className="sc-1lxqdjp-0 bkTCAh">Clear all</button>
												</div>
												<div className="sc-1y0l0ze-9 iuAQpx">
													<button type="button" className="sc-9rc7kn-0 hyeZAL">Search 1,873 properties</button>
												</div>
											</div>
										</footer>
									</div>
								</div>
								<div>

								</div>

							</div>
						</div>
					</div>


				</div>
			</article>



			{/* <Footer /> */}
		</>
	)
}

export default GoogleApiWrapper({
	apiKey: (process.env.REACT_APP_API_KEY)
})(Properties)