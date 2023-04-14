import React, { useEffect } from 'react'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import bgTwo from '../../../assets/media/images/bg_2.jpg'
import workOne from '../../../assets/media/images/work-1.jpg'
import workTwo from '../../../assets/media/images/work-2.jpg'
import workThree from '../../../assets/media/images/work-3.jpg'
import about from '../../../assets/media/images/about.jpg'
import PersonOne from '../../../assets/media/images/person_1.jpg'
import PersonTwo from '../../../assets/media/images/person_2.jpg'
import PersonThree from '../../../assets/media/images/person_3.jpg'
import PersonFour from '../../../assets/media/images/person_4.jpg'
import imageOne from '../../../assets/media/images/image_1.jpg'
import imageTwo from '../../../assets/media/images/image_2.jpg'
import imageThree from '../../../assets/media/images/image_3.jpg'
import imageFour from '../../../assets/media/images/image_4.jpg'
import teamOne from '../../../assets/media/images/team-1.jpg'
import teamTwo from '../../../assets/media/images/team-2.jpg'
import teamThree from '../../../assets/media/images/team-3.jpg'
import teamFour from '../../../assets/media/images/team-4.jpg'
import {BsArrowDownShort} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import {CiBank} from 'react-icons/ci'
import {SlWallet} from 'react-icons/sl'
import {TfiFiles} from 'react-icons/tfi'
import {HiOutlineLockClosed} from 'react-icons/hi'
import {BsChatLeftDotsFill} from 'react-icons/bs'
import {BiBed} from 'react-icons/bi'
import {TbBath} from 'react-icons/tb'
import {MdOutlineMapsHomeWork} from 'react-icons/md'
import ClientCarousel from '../../../shared/ClientCarousel/ClientCarousel'
import Search from '../../../shared/Search/Search'
import Header from '../../../shared/Header/Header'
import Footer from '../../../shared/Footer/Footer'
import { useRef } from 'react'


function Home() {
	const myRef = useRef(null)
	useEffect(() =>{
		window.scrollTo(0, 0);
	})
	const executeScroll = () => myRef.current.scrollIntoView()

	const carouselData = [
		{p1 : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
		image : PersonOne,
		p2 : 'Roger Scott',
		span : 'Marketing Manager'
		},
		{p1 : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
		image : PersonOne,
		p2 : 'Roger Scott',
		span : 'Marketing Manager'
		},
		{p1 : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
		image : PersonThree,
		p2 : 'Roger Scott',
		span : 'Marketing Manager'
		},
		{p1 : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
		image : PersonFour,
		p2 : 'Roger Scott',
		span : 'Marketing Manager'
		},
		{p1 : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
		image : PersonOne,
		p2 : 'Roger Scott',
		span : 'Marketing Manager'
		},
		{p1 : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
		image : PersonTwo,
		p2 : 'Roger Scott',
		span : 'Marketing Manager'
		},
	] 

	return (
		<>
		<Header/>
			<div className="hero-wrap ftco-degree-bg" style={{backgroundImage: `url(${bgOne})`}} data-stellar-background-ratio="0.5">
				<div className="overlay"></div>
				<div className="container">
					<div className="row no-gutters slider-text justify-content-center align-items-center">
						<div className="col-lg-12 col-md-12 d-flex align-items-end">
							<div className="text text-center mx-auto">
								<h1 className="mb-4">Find Your Best Property</h1>
								<Search/>
							</div>
						</div>
					</div>
				</div>
				<div className="mouse" onClick={executeScroll}>
					<a className="mouse-icon">
						<div className="mouse-wheel"><BsArrowDownShort/></div>
					</a>
				</div>
			</div>

			<section className="ftco-section ftco-no-pb" ref={myRef}>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-12 heading-section text-center mb-5">
							<span className="subheading">Our Services</span>
							<h2 className="mb-2">The smartest way to buy a home</h2>
						</div>
					</div>
					<div className="row d-flex" ref={myRef}>
						<div className="col-md-3 d-flex align-self-stretch">
							<div className="media block-6 services d-block text-center">
								<div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-piggy-bank"><CiBank/></span></div>
								<div className="media-body py-md-4">
									<h3>No Downpayment</h3>
									<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
								</div>
							</div>
						</div>
						<div className="col-md-3 d-flex align-self-stretch">
							<div className="media block-6 services d-block text-center">
								<div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-wallet"><SlWallet/></span></div>
								<div className="media-body py-md-4">
									<h3>All Cash Offer</h3>
									<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
								</div>
							</div>
						</div>
						<div className="col-md-3 d-flex align-self-stretch">
							<div className="media block-6 services d-block text-center">
								<div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-file"><TfiFiles/></span></div>
								<div className="media-body py-md-4">
									<h3>Experts in Your Corner</h3>
									<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
								</div>
							</div>
						</div>
						<div className="col-md-3 d-flex align-self-stretch">
							<div className="media block-6 services d-block text-center">
								<div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-locked"><HiOutlineLockClosed/></span></div>
								<div className="media-body py-md-4">
									<h3>Locked in Pricing</h3>
									<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="ftco-section goto-here">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-12 heading-section text-center mb-5">
							<span className="subheading">What we offer</span>
							<h2 className="mb-2">Exclusive Offer For You</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							<div className="property-wrap">
								<a href="#" className="img" style={{ backgroundImage: `url(${workOne})` }}></a>
								<div className="text">
									<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
									<ul className="property_list">
										<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
										<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
										<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
									</ul>
									<h3><a href="#">The Blue Sky Home</a></h3>
									<span className="location">Oakland</span>
									<a href="#" className="d-flex align-items-center justify-content-center btn-custom">
										<span className="ion-ios-link"></span>
									</a>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="property-wrap">
								<a href="#" className="img" style={{ backgroundImage: `url(${workTwo})` }}></a>
								<div className="text">
									<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
									<ul className="property_list">
									<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
										<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
										<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
									</ul>
									<h3><a href="#">The Blue Sky Home</a></h3>
									<span className="location">Oakland</span>
									<a href="#" className="d-flex align-items-center justify-content-center btn-custom">
										<span className="ion-ios-link"></span>
									</a>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="property-wrap">
								<a href="#" className="img" style={{ backgroundImage: `url(${workThree})` }}></a>
								<div className="text">
									<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
									<ul className="property_list">
									<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
									<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
									<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
									</ul>
									<h3><a href="#">The Blue Sky Home</a></h3>
									<span className="location">Oakland</span>
									<a href="#" className="d-flex align-items-center justify-content-center btn-custom">
										<span className="ion-ios-link"></span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="ftco-section ftco-degree-bg services-section img mx-md-5" style={{ backgroundImage: `url(${bgTwo})` }}>
				<div className="overlay"></div>
				<div className="container">
					<div className="row justify-content-start mb-5">
						<div className="col-md-6 text-center heading-section heading-section-white">
							<span className="subheading">Work flow</span>
							<h2 className="mb-3">How it works</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="row">
								<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
									<div className="media block-6 services services-2">
										<div className="media-body py-md-4 text-center">
											<div className="icon mb-3 d-flex align-items-center justify-content-center"><span>01</span></div>
											<h3>Evaluate Property</h3>
											<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
										</div>
									</div>
								</div>
								<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
									<div className="media block-6 services services-2">
										<div className="media-body py-md-4 text-center">
											<div className="icon mb-3 d-flex align-items-center justify-content-center"><span>02</span></div>
											<h3>Meet Your Agent</h3>
											<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
										</div>
									</div>
								</div>
								<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
									<div className="media block-6 services services-2">
										<div className="media-body py-md-4 text-center">
											<div className="icon mb-3 d-flex align-items-center justify-content-center"><span>03</span></div>
											<h3>Close the Deal</h3>
											<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
										</div>
									</div>
								</div>
								<div className="col-md-12 col-lg-6 d-flex align-self-stretch">
									<div className="media block-6 services services-2">
										<div className="media-body py-md-4 text-center">
											<div className="icon mb-3 d-flex align-items-center justify-content-center"><span>04</span></div>
											<h3>Have Your Property</h3>
											<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="ftco-section ftco-no-pb">
				<div className="container">
					<div className="row no-gutters">
						<div className="col-md-6 p-md-5 img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${about})` }}>
						</div>
						<div className="col-md-6 wrap-about py-md-5">
							<div className="heading-section p-md-5">
								<h2 className="mb-4">We Put People First.</h2>

								<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
								<p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="ftco-counter img" id="section-counter">
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-lg-3 justify-content-center counter-wrap">
							<div className="block-18 py-4 mb-4">
								<div className="text text-border d-flex align-items-center">
									<strong className="number" data-number="305">305</strong>
									<span>Area <br />Population</span>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-3 justify-content-center counter-wrap">
							<div className="block-18 py-4 mb-4">
								<div className="text text-border d-flex align-items-center">
									<strong className="number" data-number="1090">1090</strong>
									<span>Total <br />Properties</span>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-3 justify-content-center counter-wrap">
							<div className="block-18 py-4 mb-4">
								<div className="text text-border d-flex align-items-center">
									<strong className="number" data-number="209">209</strong>
									<span>Average <br />House</span>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-3 justify-content-center counter-wrap">
							<div className="block-18 py-4 mb-4">
								<div className="text d-flex align-items-center">
									<strong className="number" data-number="67">67</strong>
									<span>Total <br />Branches</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="ftco-section testimony-section">
				<div className="container">
					<div className="row justify-content-center mb-5">
						<div className="col-md-7 text-center heading-section">
							<span className="subheading">Testimonial</span>
							<h2 className="mb-3">Happy Clients</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="carousel-testimony owl-carousel ftco-owl">
							<ClientCarousel  carouselData={carouselData}/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="ftco-section ftco-agent ftco-no-pt">
				<div className="container">
					<div className="row justify-content-center pb-5">
						<div className="col-md-12 heading-section text-center">
							<span className="subheading">Agents</span>
							<h2 className="mb-4">Our Agents</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<div className="agent">
								<div className="img">
									<img src={teamOne} loading='lazy' className="img-fluid" alt="Colorlib Template" />
								</div>
								<div className="desc">
									<h3><a href="properties.html">James Stallon</a></h3>
									<p className="h-info"><span className="location">Listing</span> <span className="details">&mdash; 10 Properties</span></p>
								</div>
							</div>
						</div>
						<div className="col-md-3">
							<div className="agent">
								<div className="img">
									<img src={teamTwo} loading='lazy' className="img-fluid" alt="Colorlib Template" />
								</div>
								<div className="desc">
									<h3><a href="properties.html">James Stallon</a></h3>
									<p className="h-info"><span className="location">Listing</span> <span className="details">&mdash; 10 Properties</span></p>
								</div>
							</div>
						</div>
						<div className="col-md-3">
							<div className="agent">
								<div className="img">
									<img src={teamThree} loading='lazy' className="img-fluid" alt="Colorlib Template" />
								</div>
								<div className="desc">
									<h3><a href="properties.html">James Stallon</a></h3>
									<p className="h-info"><span className="location">Listing</span> <span className="details">&mdash; 10 Properties</span></p>
								</div>
							</div>
						</div>
						<div className="col-md-3">
							<div className="agent">
								<div className="img">
									<img src={teamFour} loading='lazy' className="img-fluid" alt="Colorlib Template" />
								</div>
								<div className="desc">
									<h3><a href="properties.html">James Stallon</a></h3>
									<p className="h-info"><span className="position">Listing</span> <span className="details">&mdash; 10 Properties</span></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>


			<section className="ftco-section ftco-no-pt">
				<div className="container">
					<div className="row justify-content-center mb-5">
						<div className="col-md-7 heading-section text-center">
							<span className="subheading">Blog</span>
							<h2>Recent Blog</h2>
						</div>
					</div>
					<div className="row d-flex">
						<div className="col-md-3 d-flex">
							<div className="blog-entry justify-content-end">
								<div className="text">
									<h3 className="heading"><a href="#">Why Lead Generation is Key for Business Growth</a></h3>
									<div className="meta mb-3">
										<div><a href="#">July. 24, 2019</a></div>
										<div><a href="#">Admin</a></div>
										<div><a href="#" className="meta-chat"><span className="icon-chat three-margin-icon"><BsChatLeftDotsFill/></span> 3</a></div>
									</div>
									<a href="blog-single.html" className="block-20 img" style={{ backgroundImage: `url(${imageOne})` }}>
									</a>
									<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
								</div>
							</div>
						</div>
						<div className="col-md-3 d-flex">
							<div className="blog-entry justify-content-end">
								<div className="text">
									<h3 className="heading"><a href="#">Why Lead Generation is Key for Business Growth</a></h3>
									<div className="meta mb-3">
										<div><a href="#">July. 24, 2019</a></div>
										<div><a href="#">Admin</a></div>
										<div><a href="#" className="meta-chat"><span className="icon-chat three-margin-icon"><BsChatLeftDotsFill/></span> 3</a></div>
									</div>
									<a href="blog-single.html" className="block-20 img" style={{ backgroundImage: `url(${imageTwo})` }}>
									</a>
									<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
								</div>
							</div>
						</div>
						<div className="col-md-3 d-flex">
							<div className="blog-entry justify-content-end">
								<div className="text">
									<h3 className="heading"><a href="#">Why Lead Generation is Key for Business Growth</a></h3>
									<div className="meta mb-3">
										<div><a href="#">July. 24, 2019</a></div>
										<div><a href="#">Admin</a></div>
										<div><a href="#" className="meta-chat"><span className="icon-chat three-margin-icon"><BsChatLeftDotsFill/></span> 3</a></div>
									</div>
									<a href="blog-single.html" className="block-20 img" style={{ backgroundImage: `url(${imageThree})` }}>
									</a>
									<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
								</div>
							</div>
						</div>
						<div className="col-md-3 d-flex">
							<div className="blog-entry justify-content-end">
								<div className="text">
									<h3 className="heading"><a href="#">Why Lead Generation is Key for Business Growth</a></h3>
									<div className="meta mb-3">
										<div><a href="#">July. 24, 2019</a></div>
										<div><a href="#">Admin</a></div>
										<div><a href="#" className="meta-chat"><span className="icon-chat three-margin-icon"><BsChatLeftDotsFill/></span> 3</a></div>
									</div>
									<a href="blog-single.html" className="block-20 img" style={{ backgroundImage: `url(${imageFour})` }}>
									</a>
									<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer/>
			
		</>
	)
}

export default Home