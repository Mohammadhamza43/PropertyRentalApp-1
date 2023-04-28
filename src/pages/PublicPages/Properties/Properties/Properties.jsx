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
											<div class="bjl0o1-3 cpRqIu">
												<div class="bjl0o1-8 bxsa-dB">
													<button type="button" class="sc-125xj6w-0 iZogEd">
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
																<FiPlayCircle className='sc-1h490wc-0 cmMTHu icon-wrapper'/>
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
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3983011955306!2d67.08029287430013!3d24.918497742934793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f30a2906a33%3A0xdb9604986cf70811!2sBlock%201%20Gulshan-e-Iqbal%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1682632392566!5m2!1sen!2s"
									width="600" height="450" style={{ border: 0, width: '100%' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
			</article>
			{/* <Footer /> */}
		</>
	)
}

export default Properties