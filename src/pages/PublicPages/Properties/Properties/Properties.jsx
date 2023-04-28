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

function Properties() {
	const [list, setList] = useState([])
	const [loader, setLoader] = useState(true)
	const [proData, setProData] = useState('')
	const location = useLocation()
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
	const [PropertyDT, setPropertyDT] = useState('')
	const [bedRoomDT, setBedRoomDT] = useState('')
	const [interested, setInterested] = useState('Buy')
	const [slider, setSlider] = useState(false)
	const propertydata = [
		{ name: 'All', count: 1876 },
		{ name: 'House', count: 97 },
		{ name: 'Apartment', count: 1676 },
		{ name: 'Unit', count: 124 },
		{ name: 'Townhouse', count: 131 },
		{ name: 'Villa', count: 0 }
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

	const [priceRange, setPriceRange] = useState({ min: 0, max: 100 }); // initial price range

	const handleSliderChange = (value) => {
		// update the price range when slider value changes
		setPriceRange({
			min: value[0],
			max: value[1]
		});
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
											<div class="bjl0o1-3 cpRqIu">
												<div class="bjl0o1-8 bxsa-dB">
													<button type="button" class="sc-125xj6w-0 iZogEd" data-toggle="modal" data-target="#myModal2">
														<BiFilter />
														Filters
													</button>
												</div>
												<div class="sc-1xux7xn-0 grRvLZ">
													<button type="button" class="sc-125xj6w-0 cTGHMu">
														<BsArrowDownUp />
														Sort:
														<Dropdown options={homeOptions} onChange={(e) => {
															setHome(e)
														}} value={home.label} placeholder="Select advertising for" />
													</button>
												</div>
												<div class="bjl0o1-7 byfVMq">
													<div class="im11km-0 gIxqrN" aria-label="Save search icon">
														<span class="im11km-2 iBqXQh">
															<button type="button" class="sc-125xj6w-0 cTGHMu">
																<span class="im11km-1 hpowuj">
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
							<header aria-label="Search summary" class="u8rllx-0 kigdhw">
								<div class="sc-15z6z4m-0 fVUrto">
									<span class="sc-15z6z4m-1 iFYwzu">For Rent</span>
									<a href="/for-rent/melbourne-vic-3000/real-estate" class="sc-15z6z4m-1 lcnZym">Melbourne (CBD), VIC 3000</a>
								</div><h1 class="u8rllx-1 jaHnaj">Rental properties in Melbourne (CBD), VIC 3000</h1>
								<div class="u8rllx-2 iHZmYi"><h2 class="u8rllx-3 gCIxxJ">1,312 properties including surrounding and nearby suburbs</h2>
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
												<div class="sc-1e63uev-4 eyFERU">
													<time datetime="2023-05-02T05:00:00+00:00" class="sc-1e63uev-6 bKsBdR">Inspection Tue 2 May 3:00pm</time>
													<div>
														<span title="Video" class="sc-1e63uev-5 cavmBy">
															<span class="sc-1h490wc-0 cmMTHu icon-wrapper" role="presentation">
																<FiPlayCircle className='sc-1h490wc-0 cmMTHu icon-wrapper' />
															</span>
														</span>
													</div>
												</div>
												<div class="sc-1e63uev-1 dyWqS">
													<div aria-label="Property Listing Status Label" class="sc-1e63uev-2 emUQRl">
														<div class="sc-111qxzs-0 lfdbms">
															<h3 class="sc-111qxzs-1 mQJFy">New</h3>
														</div>
													</div>
													<h3 class="sc-1e63uev-3 swIbZ">$1,200</h3>
													<div class="ijsdcd-0 gWTwZn">
														<h2 class="ijsdcd-1 bjJoNh">4508/560 Lonsdale Street,
															<span class="ijsdcd-2 dHYeSr">Melbourne VIC 3000</span>
														</h2>
														<ul class="rkh7f0-0 doqKNP">
															<li class="rkh7f0-1 ddpQTN">
																<span role="img" aria-label="Bed" class="rkh7f0-2 iMDBSi"><BiBed /></span>3
															</li>
															<li class="rkh7f0-1 ddpQTN">
																<span role="img" aria-label="Bath" class="rkh7f0-2 iMDBSi"><TbBath /></span> 2
															</li>
															<li class="rkh7f0-1 ddpQTN">
																<span role="img" aria-label="Car" class="rkh7f0-2 iMDBSi"><AiOutlineCar /></span> 1
															</li>
														</ul>
														<div class="mna96j-0 hcVMxo">
															<h4 class="mna96j-1 bWMeDG">Apartment for Rent</h4>
															<h4 class="mna96j-1 bWMeDG">NEW on Homely</h4>
														</div>
													</div>
												</div>
												<div class="ou1x8i-0 kXLBZg">
													<div class="sc-2sewnk-0 kSoMrH">
														<button type="button" title="Add to collection" aria-label="Add to collection" class="sc-1pk2hw7-0 bToTeF">
															<span width="32px" stroke="currentColor" role="presentation" class="suraxk-0 coJfiJ">
																<AiOutlineHeart className='sc-1h490wc-1 fmZa-d icon' />
															</span>
														</button>
													</div>
												</div>
											</Link>
										</article>
									</div>
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
												<div class="sc-1e63uev-4 eyFERU">
													<time datetime="2023-05-02T05:00:00+00:00" class="sc-1e63uev-6 bKsBdR">Inspection Tue 2 May 3:00pm</time>
													<div>
														<span title="Video" class="sc-1e63uev-5 cavmBy">
															<span class="sc-1h490wc-0 cmMTHu icon-wrapper" role="presentation">
																<FiPlayCircle className='sc-1h490wc-0 cmMTHu icon-wrapper' />
															</span>
														</span>
													</div>
												</div>
												<div class="sc-1e63uev-1 dyWqS">
													<div aria-label="Property Listing Status Label" class="sc-1e63uev-2 emUQRl">
														<div class="sc-111qxzs-0 lfdbms">
															<h3 class="sc-111qxzs-1 mQJFy">New</h3>
														</div>
													</div>
													<h3 class="sc-1e63uev-3 swIbZ">$1,200</h3>
													<div class="ijsdcd-0 gWTwZn">
														<h2 class="ijsdcd-1 bjJoNh">4508/560 Lonsdale Street,
															<span class="ijsdcd-2 dHYeSr">Melbourne VIC 3000</span>
														</h2>
														<ul class="rkh7f0-0 doqKNP">
															<li class="rkh7f0-1 ddpQTN">
																<span role="img" aria-label="Bed" class="rkh7f0-2 iMDBSi"><BiBed /></span>3
															</li>
															<li class="rkh7f0-1 ddpQTN">
																<span role="img" aria-label="Bath" class="rkh7f0-2 iMDBSi"><TbBath /></span> 2
															</li>
															<li class="rkh7f0-1 ddpQTN">
																<span role="img" aria-label="Car" class="rkh7f0-2 iMDBSi"><AiOutlineCar /></span> 1
															</li>
														</ul>
														<div class="mna96j-0 hcVMxo">
															<h4 class="mna96j-1 bWMeDG">Apartment for Rent</h4>
															<h4 class="mna96j-1 bWMeDG">NEW on Homely</h4>
														</div>
													</div>
												</div>
												<div class="ou1x8i-0 kXLBZg">
													<div class="sc-2sewnk-0 kSoMrH">
														<button type="button" title="Add to collection" aria-label="Add to collection" class="sc-1pk2hw7-0 bToTeF">
															<span width="32px" stroke="currentColor" role="presentation" class="suraxk-0 coJfiJ">
																<AiOutlineHeart className='sc-1h490wc-1 fmZa-d icon' />
															</span>
														</button>
													</div>
												</div>
											</Link>
										</article>
									</div>
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
												<div class="sc-1e63uev-4 eyFERU">
													<time datetime="2023-05-02T05:00:00+00:00" class="sc-1e63uev-6 bKsBdR">Inspection Tue 2 May 3:00pm</time>
													<div>
														<span title="Video" class="sc-1e63uev-5 cavmBy">
															<span class="sc-1h490wc-0 cmMTHu icon-wrapper" role="presentation">
																<FiPlayCircle className='sc-1h490wc-0 cmMTHu icon-wrapper' />
															</span>
														</span>
													</div>
												</div>
												<div class="sc-1e63uev-1 dyWqS">
													<div aria-label="Property Listing Status Label" class="sc-1e63uev-2 emUQRl">
														<div class="sc-111qxzs-0 lfdbms">
															<h3 class="sc-111qxzs-1 mQJFy">New</h3>
														</div>
													</div>
													<h3 class="sc-1e63uev-3 swIbZ">$1,200</h3>
													<div class="ijsdcd-0 gWTwZn">
														<h2 class="ijsdcd-1 bjJoNh">4508/560 Lonsdale Street,
															<span class="ijsdcd-2 dHYeSr">Melbourne VIC 3000</span>
														</h2>
														<ul class="rkh7f0-0 doqKNP">
															<li class="rkh7f0-1 ddpQTN">
																<span role="img" aria-label="Bed" class="rkh7f0-2 iMDBSi"><BiBed /></span>3
															</li>
															<li class="rkh7f0-1 ddpQTN">
																<span role="img" aria-label="Bath" class="rkh7f0-2 iMDBSi"><TbBath /></span> 2
															</li>
															<li class="rkh7f0-1 ddpQTN">
																<span role="img" aria-label="Car" class="rkh7f0-2 iMDBSi"><AiOutlineCar /></span> 1
															</li>
														</ul>
														<div class="mna96j-0 hcVMxo">
															<h4 class="mna96j-1 bWMeDG">Apartment for Rent</h4>
															<h4 class="mna96j-1 bWMeDG">NEW on Homely</h4>
														</div>
													</div>
												</div>
												<div class="ou1x8i-0 kXLBZg">
													<div class="sc-2sewnk-0 kSoMrH">
														<button type="button" title="Add to collection" aria-label="Add to collection" class="sc-1pk2hw7-0 bToTeF">
															<span width="32px" stroke="currentColor" role="presentation" class="suraxk-0 coJfiJ">
																<AiOutlineHeart className='sc-1h490wc-1 fmZa-d icon' />
															</span>
														</button>
													</div>
												</div>
											</Link>
										</article>
									</div>
								</div>
							</section>
						</div>
						<div className='r0xktz-2 gPahXz'>
							<div style={{ position: 'relative', height: '100%' }}>
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3983011955306!2d67.08029287430013!3d24.918497742934793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f30a2906a33%3A0xdb9604986cf70811!2sBlock%201%20Gulshan-e-Iqbal%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1682632392566!5m2!1sen!2s"
									width="600" className='map-iframe' style={{ border: 0, width: '100%', height: 'cal(100% -20px)' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
								<div class="v95puu-4 fuUXys">
									<span class="LoadingFade" style={{ opacity: 1, display: "inline-block" }}>
										<button type="button" class="sc-2vypzd-0 RMyYB">Search this area</button>
									</span>
									<span class="LoadingFade" style={{ opacity: 1, display: "inline-block" }}>
										<button type="button" class="sc-2vypzd-0 boRNLg">Show more pins</button>
									</span>
								</div>
								<div class="v95puu-2 dTmuAW">
									<h2 class="nf405-0 jFAjTY">50 of 1,314 properties · Median list price $650</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="container demo">



					<div class="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div className='sc-1kr6rly-2 fycLmA'>
									<div className='sc-1y0l0ze-0 jOespU'>
										<header class="sc-1y0l0ze-1 etQrqG">
											<div class="sc-1y0l0ze-2 hktXrC">
												<h2 class="sc-1y0l0ze-3 cbRSA">Filters</h2>
												<button class="sc-1y0l0ze-4 lcxzRD" data-dismiss="modal" aria-label="Close">
													<RxCross2 className='sc-1h490wc-1 fKOyQl icon' />
												</button>
											</div>
										</header>
										<div className='if8eux-0 hbxTUi'>
											<div className='sc-1y0l0ze-5 gOGxgr'>
												<div className='sc-136vf55-0 equYRv'>
													<div className='sc-11yfpl8-0 cZxCSd'>
														<h3 className='sc-11yfpl8-2 kvGcLL'>
															<button type="button" id="side-mode-section" class="sc-11yfpl8-1 jcRztj">
																<div class="sc-11yfpl8-3 iBnkJT">I'm interested in...</div>
															</button>
														</h3>
														<div id="side-mode-region" role="region" aria-labelledby="side-mode-section">
															<div aria-label="Search mode"><div class="sc-10mewe-0 fXoFer">
																{intresteddata.map((item, i) => {
																	return (
																		<button
																			type="button"
																			class={`sc-1oven2p-0 ${interested === item ? 'gZszZo' : 'jUPYmK'} `}
																			onClick={() => setInterested(item)}
																		>{item}</button>
																	)
																})}
																{/* <button type="button" class="sc-1oven2p-0 gZszZo">Buy</button>
																<button type="button" class="sc-1oven2p-0 jUPYmK">Rent</button>
																<button type="button" class="sc-1oven2p-0 jUPYmK">Sold</button> */}
															</div>
															</div>
														</div>
													</div>
													<div class={`sc-11yfpl8-0  ${slider ? 'ikzRsx' : 'kKonjn'}`}>
														<h3 class="sc-11yfpl8-2 kPUAQh">
															<button type="button" onClick={() => { setSlider(!slider) }} id="side-proptype-section" aria-label="Property type filters" aria-expanded="false" aria-controls="side-proptype-region" class="sc-11yfpl8-1 gsheHX">
																<div class="sc-11yfpl8-3 iBnkJT">Price</div>
																<div class="sc-11yfpl8-4 kpgnTE">
																	<span class="sc-1h490wc-0 cZohV icon-wrapper" role="presentation">
																		<IoIosArrowDown className='sc-1h490wc-1 clDIaZ icon' />
																	</span>
																</div>
															</button>
														</h3>
														<div class="sc-11yfpl8-5 gbsVeP"></div>
														{slider &&
															<div id="side-proptype-region" role="region" aria-labelledby="side-proptype-section" class="hide"><div>
																<Slider
																	range
																	min={0}
																	max={100}
																	defaultValue={[0, 100]}
																	onChange={handleSliderChange}
																/>
																<div className='range-number'>
																	<div>0</div>
																	<div>${priceRange.min} - ${priceRange.max}</div>
																	<div>100</div>
																</div>
															</div>
															</div>
														}

													</div>
													<div class={`sc-11yfpl8-0  ${toogle1 ? 'ikzRsx' : 'kKonjn'}`}>
														<h3 class="sc-11yfpl8-2 kPUAQh">
															<button type="button" onClick={() => { setToggle1(!toogle1) }} id="side-proptype-section" aria-label="Property type filters" aria-expanded="false" aria-controls="side-proptype-region" class="sc-11yfpl8-1 gsheHX">
																<div class="sc-11yfpl8-3 iBnkJT">Property type</div>
																<div class="sc-11yfpl8-4 kpgnTE">
																	<span class="sc-1h490wc-0 cZohV icon-wrapper" role="presentation">
																		<IoIosArrowDown className='sc-1h490wc-1 clDIaZ icon' />
																	</span>
																</div>
															</button>
														</h3>
														<div class="sc-11yfpl8-5 gbsVeP"></div>
														{toogle1 &&
															<div id="side-proptype-region" role="region" aria-labelledby="side-proptype-section" class="hide"><div>
																<ul role="group" class="sc-316fzr-0 jDEIHe">
																	{propertydata.map((item, i) => {
																		return (
																			<li class="sc-1tyddxu-0 hRTczC">
																				<button type="button" class="sc-10375bz-0 inAQUt" onClick={() => { setPropertyDT(item.name) }}>
																					{PropertyDT === item.name ?
																						<GrCheckboxSelected className='chack-icons' />
																						:
																						<GrCheckbox className='sc-1h490wc-1 clDIaZ icon' />
																					}
																					<span aria-label="All Property Types">{item.name}</span>
																					<span aria-label="1873 properties" class="sc-1uzywjh-0 emTcCo">{item.count}</span>
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
														<h3 class="sc-11yfpl8-2 kPUAQh">
															<button type="button" onClick={() => { setToggle2(!toogle2) }} id="side-proptype-section" aria-label="Property type filters" aria-expanded="false" aria-controls="side-proptype-region" class="sc-11yfpl8-1 gsheHX">
																<div class="sc-11yfpl8-3 iBnkJT">BedRooms</div>
																<div class="sc-11yfpl8-4 kpgnTE">
																	<span class="sc-1h490wc-0 cZohV icon-wrapper" role="presentation">
																		<IoIosArrowDown className='sc-1h490wc-1 clDIaZ icon' />
																	</span>
																</div>
															</button>
														</h3>
														<div class="sc-11yfpl8-5 gbsVeP"></div>
														{toogle2 &&
															<div id="side-proptype-region" role="region" aria-labelledby="side-proptype-section" class="hide"><div>
																<ul role="group" class="sc-316fzr-0 jDEIHe">
																	{bedRoomdata.map((item, i) => {
																		return (
																			<li class="sc-1tyddxu-0 hRTczC">
																				<button type="button" class="sc-10375bz-0 inAQUt" onClick={() => { setBedRoomDT(item.name) }}>
																					{bedRoomDT === item.name ?
																						<GrCheckboxSelected className='chack-icons' />
																						:
																						<GrCheckbox className='sc-1h490wc-1 clDIaZ icon' />
																					}
																					<span aria-label="All Property Types">{item.name}</span>
																					<span aria-label="1873 properties" class="sc-1uzywjh-0 emTcCo">{item.count}</span>
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
										<footer class="sc-1y0l0ze-6 epnMmH">
											<div class="sc-1y0l0ze-7 ipxbJD">
												<div class="sc-1y0l0ze-8 ikpcuX">
													<button type="button" class="sc-1lxqdjp-0 bkTCAh">Clear all</button>
												</div>
												<div class="sc-1y0l0ze-9 iuAQpx">
													<button type="button" class="sc-9rc7kn-0 hyeZAL">Search 1,873 properties</button>
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

export default Properties