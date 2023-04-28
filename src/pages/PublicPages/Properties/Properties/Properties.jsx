import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import Header from '../../../../shared/Header/Header'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx';
import { GrFormSearch } from 'react-icons/gr';
import { BiFilter } from 'react-icons/bi';
import { HiOutlineBellAlert } from 'react-icons/hi2'
import { BsArrowDownUp } from 'react-icons/bs'
import { FiPlayCircle } from 'react-icons/fi'
import image1 from '.././../../../assets/media/images/image_1.jpg'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Properties.css';
import 'react-multi-carousel/lib/styles.css';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const Properties = ({ google }) => {
	const location = useLocation();
	const { city, country, propertyType, purpose } = location.state;

	useEffect(() => {
		const filterData = () => {
			alert();
		}

		filterData();
	}, [location]);
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
	const [proData, setProData] = useState('');
	const [showingInfoWindow, setShowIngInfoWindow] = useState(false);

	const [selectedPlace, setSelectedPlace] = useState({});


	const [activeMarker, setActiveMarker] = useState(null);


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
									<div className='Headroom-unfixed' style={{ height: '68px' }}>
										<div className='filter-inline'>
											<div className="bjl0o1-3 cpRqIu">
												<div className="bjl0o1-8 bxsa-dB">
													<button type="button" className="sc-125xj6w-0 iZogEd">
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
					<div className='r0xktz-0 efKKDz'>
						<div className='r0xktz-1 bkBfQn'>
							<header aria-label="Search summary" className="u8rllx-0 kigdhw">
								<div className="sc-15z6z4m-0 fVUrto">
									<span className="sc-15z6z4m-1 iFYwzu">For Rent</span>
									<a href="/for-rent/melbourne-vic-3000/real-estate" className="sc-15z6z4m-1 lcnZym">Melbourne (CBD), VIC 3000</a>
								</div><h1 className="u8rllx-1 jaHnaj">Rental properties in Melbourne (CBD), VIC 3000</h1>
								<div className="u8rllx-2 iHZmYi"><h2 className="u8rllx-3 gCIxxJ">1,312 properties including surrounding and nearby suburbs</h2>
								</div>
							</header>

							<section>
								<div className='sc-1yg0wqx-0 kSqCqh'>
									<div className='sc-1ti9q65-0 ggJHdq'>
										<article className='sc-1e63uev-0 kydbmE'>
											<Link className="sc-1fvt3tm-0 eRPHdN">
												<div className='sc-3i257o-0 iMMhrs'>
													<Carousel responsive={responsive} showDots={true} arrows={false} className="carosal">
														<div className="body">
															<img src={image1} loading="lazy" alt="1908/568 Collins Street, Melbourne VIC 3000" width={'100%'} />

														</div>
														<div className="body">
															<h1>two</h1>
														</div>
														<div className="body">
															<h1>three</h1>
														</div>
														<div className="body">
															<h1>four</h1>
														</div>


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
											</Link>
										</article>
									</div>
								</div>
							</section>
						</div>
						<div className='r0xktz-2 gPahXz'>
							<div style={{ position: 'relative' }}>


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
									width="600" height="450" style={{ border: 0, width: '100%' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
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
			</article>
			{/* <Footer /> */}
		</>
	)
}

// export default Properties;


export default GoogleApiWrapper({
	apiKey: (process.env.REACT_APP_API_KEY)
})(Properties)