import React, { useState } from 'react'
import { ReactDOM } from 'react'
import './PropertyDetails.css'
import { SlArrowLeft } from 'react-icons/sl'
import { IoImageOutline } from 'react-icons/io5'
import { BiBed } from 'react-icons/bi'
import { TbBath } from 'react-icons/tb'
import { AiOutlineCar } from 'react-icons/ai'
import { BiArea } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { BsEnvelope } from 'react-icons/bs'
import { IoIosArrowBack } from 'react-icons/io'
import { GoLinkExternal } from 'react-icons/go'
import { FiInfo } from 'react-icons/fi'
import { IoIosArrowForward } from 'react-icons/io'
import floorplan from '../../../../assets/media/svg/floorplan.svg'
import well from '../../../../assets/media/images/well.svg'
import PropertyOne from '../../../../assets/media/images/property/property-1.jpg'
import Propertytwo from '../../../../assets/media/images/property/property-2.jpg'
import Propertythree from '../../../../assets/media/images/property/property-3.jpg'
import Propertyfour from '../../../../assets/media/images/property/property-4.jpg'
import Propertyfive from '../../../../assets/media/images/property/property-5.jpg'
import Propertysix from '../../../../assets/media/images/property/property-6.jpg'
import Propertyseven from '../../../../assets/media/images/property/property-7.jpg'
import Tom from '../../../../assets/media/images/tom.webp'
import GoogleMapReact from 'google-map-react';
import Header from '../../../../shared/Header/Header'
import Footer from '../../../../shared/Footer/Footer'
// import { AiFillStar} from 'react-icons/ai'
// import {MdKeyboardArrowRight} from 'react-icons/md'
// import { IoArrowUndoSharp } from 'react-icons/io5'
// import { BiCheck } from 'react-icons/bi'
// import bgOne from '../../../../assets/media/images/bg_1.jpg'
// import workOne from '../../../../assets/media/images/work-1.jpg'
// import PersonOne from '../../../../assets/media/images/person_1.jpg'
// import PersonTwo from '../../../../assets/media/images/person_2.jpg'
// import PersonThree from '../../../../assets/media/images/person_3.jpg'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function PropertiesDetails() {
	const [gallery, setGallery] = useState(true)
	const defaultProps = {
		center: {
			lat: 10.99835602,
			lng: 77.01502627
		},
		zoom: 11
	};

	return (
		<>
		<Header/>

			{
				gallery ?

					<div>
						<div className='pd-s-1'>
							<div className="container">
								<div className="row">
									<a href="http://#" className='one'><SlArrowLeft /></a>
									<span className='six'> Buy</span>
									<a href="http://#" className='two'>Mudgee, NSW 2850</a>
									<a href="http://#" className='three'>Houses</a>
									<a href="http://#" className='four'>4 Bedrooms</a>
									<a href="http://#" className='five'>6 Rowe Street.</a>
								</div>
							</div>
						</div>
						<div className="parent">
							<div className="one" onClick={() => { setGallery(!gallery) }}> <img src={PropertyOne} alt="" /> </div>
							<div className="two" onClick={() => { setGallery(!gallery) }}> <img src={Propertytwo} alt="" />  </div>
							<div className="three" onClick={() => { setGallery(!gallery) }}> <img src={Propertyseven} alt="" />  </div>
							<div className="four" onClick={() => { setGallery(!gallery) }}> <img src={Propertyfour} alt="" />  </div>
							<div className="five" onClick={() => { setGallery(!gallery) }}>
								<div className="count-overlay">
									<div className="div">
										+12
									</div>
								</div>
								<img src={Propertyfive} alt="" />  </div>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-lg-11 mx-auto">
									<div className="row">
										<div className="col-lg-7">

											<header className='dxisrb-0 fekefs'>
												<div className='mmdb4c-0 lfkLMn'>
													<div className='lx5udd-0 jfiNFn'>
														<span className='lx5udd-1 ggKaWr'>
															<h1 className='mmdb4c-1 gnckwn'>
																3 Gilmour Road,
																<span className='mmdb4c-2 ibgEut'>Camberwell VIC 3124</span>
															</h1>
														</span>
													</div>
													<h2 className='sc-3fov70-0 lkPbBK'>$1,600,000 - $1,700,000</h2>
												</div>
												<div className='sc-3uk6xp-0 lisvtD'>
													<div className='sc-1xfkwrb-0 kvtvrt'>
														<div className='sc-1xfkwrb-1 idMCEY'>
															<a href="" className='sc-1xfkwrb-2 kVTTPK'>
																View agent price guide
																<span className='sc-1xfkwrb-3 gPpUTg'>
																	<span className='sc-1h490wc-0 hjZwmm icon-wrapper'>
																		<GoLinkExternal />
																	</span>
																</span>
															</a>
														</div>
														<h3 className='sc-1xfkwrb-4 huPFMQ'>
															<ul className='rkh7f0-0 czlRfG'>
																<li className='rkh7f0-1 ddpQSA'>
																	<span className='rkh7f0-2 ceBtWt'>
																		<BiBed />
																	</span>
																	3 Bed
																</li>
																<li className='rkh7f0-1 ddpQSA'>
																	<span className='rkh7f0-2 ceBtWt'>
																		<TbBath />
																	</span>
																	1 Bath
																</li>
																<li className='rkh7f0-1 ddpQSA'>
																	<span className='rkh7f0-2 ceBtWt'>
																		<AiOutlineCar />
																	</span>
																	3 Car
																</li>
																<li className='rkh7f0-1 ddpQSA'>
																	<span className='rkh7f0-2 ceBtWt'>
																		<BiArea />
																	</span>
																	715m²
																</li>
															</ul>
														</h3>
														<span className='sc-1xfkwrb-5 lnjHjN'>
															<h3 className='sc-1xfkwrb-6 kBiwNe'>
																<span className='sc-1xfkwrb-8 ieslir'>
																	House for sale
																</span>
																<span className='sc-1xfkwrb-8 ieslir'>NEW on Homely</span>
															</h3>
														</span>
														<div className='sc-1xfkwrb-9 bmBiNe'>
															<button className='sc-8c9wwf-0 jofquV'>Request an inspection</button>
														</div>
													</div>
												</div>
											</header>
											<div className='t78wb3-0 eLgfqh'>
												<section className='dxisrb-0 fekefs'>
													<div className='kjj246-0 cQtDXd'>
														<div className='sc-3uk6xp-0 lisvtD'>
															<div className='kjj246-1 fNZMEP'>
																<h3 className='kjj246-2 bGLUUS'>Home loan calculator</h3>
																<div className='ovoybj-0 edPgTo'>
																	<div className='pc4y6p-0 dtompX'>
																		<div className='pc4y6p-1 faHqiF'><FiInfo /></div>
																	</div>
																</div>
																<img src={well} width={105} height={22} className='kjj246-6 lortmt' alt="" />
															</div>
															<div className='kjj246-3 eOyPnD'>
																<span className='sc-1vu0cyg-0 eJUwpB'>
																	<span className='kjj246-4 cBfhem'>$7,407</span>
																	/mth
																</span>
															</div>
															<div className='kjj246-5 eJzDyI'>Est. repayment</div>
															<button className='kjj246-7 leFmPT'>
																Calculate
																<span className='kjj246-8 dkyzgb'>
																	<span className='sc-1h490wc-0 cZohV icon-wrapper'><IoIosArrowForward /></span>
																</span>
															</button>
														</div>
													</div>
												</section>
											</div>
											<section className='dxisrb-0 fekefs'>
												<div className='nomtxg-0 rgCck'>
													<h2 className='sc-3fov70-0 lkPbBK'>House description</h2>
												</div>
												<div className='sc-3uk6xp-0 lisvtD'>
													<h3 className='lijua-0 kyeUMa'>“Coveted Camberwell charm on 715 sqm”</h3>
													<div className='sc-1x2lobo-0 loEOQp'>
														<div className='sc-14jy2p3-0 bmuAKP'>
															<div className='sc-14jy2p3-1 dSBSDA' style={{ height: "224px" }}>
																<div className="sc-14jy2p3-2 MEgea">
																	<p className="b1avnw-0 jRyFhN">
																		THE PROPERTY <br />Poised in a leafy Camberwell location, this three-bedroom
																		weatherboard residence represents a versatile opportunity for those looking
																		to invest in a tightly held pocket. With a remarkable almost 17-metre street
																		frontage and 715sqm (approx.) total land holding, the site is suited to those
																		wishing to build their dream home. With prospects of renovation, only your
																		imagination could limit the possibilities offered for your consideration.
																		Inside, discover a flexible single level floorplan comprising multiple
																		living and dining areas, an original kitchen, three spacious bedrooms,
																		one bathroom, entertaining alfresco, and space for three vehicles undercover.
																		<br /><br />THE FEATURES  <br />●	Endearing three-bedroom, one-bathroom
																		weatherboard residence<br />●	Coveted position at the heart of Camberwell
																		<br />●	Generous 715 sqm (approx.) allotment with 16.76m street frontage
																		<br />●	Modernise the existing property or demolish and build your dream
																		residence<br />●	Original kitchen decorated with timber features &amp;
																		an abundance of storage<br />●	Double car lock up garage with adjoining
																		carport<br />●	Secure off-street parking for additional vehicles <br />●
																		Large laundry room<br />●	Ample storage throughout<br />THE LOCATION
																		<br />However you decide to utilise this remarkable investment opportunity,
																		rest assured that the home boasts a premier position only moments from
																		Camberwell's shops &amp; cafes, trains and trams, Lynden Park, Wattle
																		Park and is zoned for Wattle Park Primary, and Camberwell High School.
																		<br /><br />THE TERMS: 90/120 days</p></div>
															</div>
														</div>
													</div>
												</div>
											</section>
										</div>
										<div className="col-lg-5">
											<div className='ezDMiP'>
												<div className='shadow'>
													<div className="floor-images">
														<div className='images'>
															<button className="onee" onClick={() => { setGallery(!gallery) }}>
																<IoImageOutline />
																14 Photos
															</button>
															<button className="twoo" onClick={() => { setGallery(!gallery) }}>

																<img src={floorplan} alt=""  />
																Floor plans
															</button>
														</div>
														<div className='asasas'>
															<div className='user-contact'>
																<div className="first">
																	<span>heavyinside</span>
																</div>
															</div>
														</div>
													</div>
													<div className='sc-19jf86-3'>
														<GoogleMapReact
															bootstrapURLKeys={{ key: "" }}
															defaultCenter={defaultProps.center}
															defaultZoom={defaultProps.zoom}
														>
															<AnyReactComponent
																lat={59.955413}
																lng={30.337844}
																text="My Marker"
															/>
														</GoogleMapReact>
														<div className='sc-19jf86-5'></div>
														<div className='sc-19jf86-4'></div>
														<div className='sc-19jf86-7'>
															<div className='sc-19jf86-8'>
																<div className='sc-19jf86-9'>
																	<div className='sc-19jf86-10'>3 Gilmour Road, Camberwell VIC 3124</div>
																	<ul className='rkh7f0-0'>
																		<li className='rkh7f0-1 ddpQTN'><span className='rkh7f0-2'><BiBed /></span>
																			3
																		</li>
																		<li className='rkh7f0-1 ddpQTN'><span className='rkh7f0-2'><TbBath /></span>
																			1
																		</li>
																		<li className='rkh7f0-1 ddpQTN'><span className='rkh7f0-2'><AiOutlineCar /></span>
																			3
																		</li>
																		<li className='rkh7f0-1 ddpQTN'><span className='rkh7f0-2'><BiArea /></span>
																			715m²
																		</li>
																	</ul>
																</div>
																<div className='sc-19jf86-11'>
																	<button className='sc-1lxqdjp-0 kDeHGi'>
																		<div className='sc-19jf86-12 dmXdaH'>
																			<AiOutlineHeart />
																			<div>Save</div>
																		</div>
																	</button>
																	<button className='sc-1lxqdjp-0 kDeHGi'>
																		<div className='sc-19jf86-12 dmXdaH'>
																			<FiShare />
																			<div>Share</div>
																		</div>
																	</button>
																</div>
															</div>

														</div>
													</div>
													<div className='sc-19jf86-13 goDvSz'>
														<div className='sc-19jf86-14 cWVrWM'>
															<div className='sc-49gvvo-0 elwrUp'>
																<div className='sc-49gvvo-2 GBMSv'>
																	<div className='sc-49gvvo-3 frsbOT'>
																		<a href="http://">
																			<img src={Tom} className="sc-54rm4c-0 ioOCUj" width={56} height={56} alt="" />
																		</a>
																	</div>
																	<div className='sc-49gvvo-1 hVYA-de'>
																		<h4 className='sc-49gvvo-4 izpQDo'>
																			<a href="http://">Tim Heavyside</a>
																			<h5 className='sc-49gvvo-5 kFDxKX'>HEAVYSIDE</h5>
																		</h4>
																	</div>
																</div>

																<div className='sc-49gvvo-6 fWimrS'>
																	<button className='fi0aeb-0 cHYcSr'>
																		<BsFillTelephoneFill />
																	</button>
																	<button className='fi0aeb-0 cHYcSr'>
																		<BsEnvelope />
																	</button>
																</div>
															</div>
															<div className='sc-49gvvo-0 elwrUp'>
																<div className='sc-49gvvo-2 GBMSv'>
																	<div className='sc-49gvvo-3 frsbOT'>
																		<a href="http://">
																			<img src={Tom} className="sc-54rm4c-0 ioOCUj" width={56} height={56} alt="" />
																		</a>
																	</div>
																	<div className='sc-49gvvo-1 hVYA-de'>
																		<h4 className='sc-49gvvo-4 izpQDo'>
																			<a href="http://">Tim Heavyside</a>
																			<h5 className='sc-49gvvo-5 kFDxKX'>HEAVYSIDE</h5>
																		</h4>
																	</div>
																</div>

																<div className='sc-49gvvo-6 fWimrS'>
																	<button className='fi0aeb-0 cHYcSr'>
																		<BsFillTelephoneFill />
																	</button>
																	<button className='fi0aeb-0 cHYcSr'>
																		<BsEnvelope />
																	</button>
																</div>
															</div>
														</div>

														<div className='sc-19jf86-14 cWVrWM'>
															<div className='sc-1e814mg-0 hWVCKM'>
																<div className='sc-1e814mg-1 dupSya'>
																	<div className='sc-1e814mg-2 lbbLRi'>Next inspection</div>
																	<div className='sc-1e814mg-3 clfdCX'>Sat 4 Mar 2:30pm</div>
																</div>
																<div className='sc-49gvvo-6 fWimrS'>
																	<button className='fi0aeb-0 cHYcSr'>
																		<BsEnvelope />
																	</button>
																</div>
															</div>

														</div>
														<div className='sc-19jf86-15 XFFKh'>
															<button className='sc-19jf86-16 gROasq'>Enquire about this property</button>
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

					:

					<div className='show-galary'>
						<section className='s-f'>
							<div className="container">
								<div className="row">
									<div className="col-lg-6 my-auto p-0">
										<div className='wela50-3 fKmhDN'>
											<button onClick={() => { setGallery(!gallery) }} className='sc-1lxqdjp-0 kDeHGi'><IoIosArrowBack /></button>
											<h2 className='wela50-4 hhKdKs'>3 Gilmour Road, Camberwell VIC 3124</h2>
										</div>
									</div>
									<div className="col-lg-6">

										<div className='imagess'>
											<button className="onee">
												<IoImageOutline />
												14 Photos
											</button>
											<button className="twoo">
												<img src={floorplan} alt=""  />
												Floor plans
											</button>
										</div>
									</div>
								</div>
							</div>
						</section>
						<section className='s-s'>
							<div>heavyside</div>
						</section>
						<section className='s-t'>
							<div className="container">
								<div className="row">
									<div className="col-lg-12">
										<div className="row ">
											<div className="col-lg-9 mx-auto">
												<div className='wela50-9 edKMZE'>
													<h2 className='sc-3fov70-0 lkPbBK'>13 Photos</h2>
												</div>
												<div className='wela50-13 bsdcKL'>
													<div className='hhxt6d-0 eOhVcc'>
														<img src={PropertyOne} alt=""  />
													</div>
												</div>
												<div className='wela50-13 bsdcKL'>
													<div className='hhxt6d-0 eOhVcc'>
														<img src={Propertytwo} alt=""  />
													</div>
												</div>
												<div className='wela50-13 bsdcKL'>
													<div className='hhxt6d-0 eOhVcc'>
														<img src={Propertythree} alt=""  />
													</div>
												</div>
												<div className='wela50-13 bsdcKL'>
													<div className='hhxt6d-0 eOhVcc'>
														<img src={Propertyfour} alt=""  />
													</div>
												</div>
												<div className='wela50-13 bsdcKL'>
													<div className='hhxt6d-0 eOhVcc'>
														<img src={Propertyfive} alt=""  />
													</div>
												</div>
												<div className='wela50-13 bsdcKL'>
													<div className='hhxt6d-0 eOhVcc'>
														<img src={Propertysix} alt=""  />
													</div>
												</div>
												<div className='wela50-13 bsdcKL'>
													<div className='hhxt6d-0 eOhVcc'>
														<img src={Propertyseven} alt=""  />
													</div>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						</section>

					</div>
			}

			        <Footer/>
		</>
	)
}

export default PropertiesDetails