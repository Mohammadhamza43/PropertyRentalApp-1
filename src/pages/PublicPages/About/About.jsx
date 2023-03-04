import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import PersonOne from '../../../assets/media/images/person_1.jpg'
import PersonTwo from '../../../assets/media/images/person_2.jpg'
import PersonThree from '../../../assets/media/images/person_3.jpg'
import PersonFour from '../../../assets/media/images/person_4.jpg'
import about from '../../../assets/media/images/about.jpg'
import ClientCarousel from '../../../shared/ClientCarousel/ClientCarousel'

function About() {

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
            <section className="hero-wrap hero-wrap-2 ftco-degree-bg js-fullheight" style={{ backgroundImage: `url(${bgOne})` }} data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
                        <div className="col-md-9  pb-5 text-center">
                            <p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></a></span> <span>About us <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></span></p>
                            <h1 className="mb-3 bread">About Us</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ftco-section ftco-no-pb">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-md-6 p-md-5 img img-2 d-flex justify-content-center align-items-center" style={{backgroundImage: `url(${about})`}}>
                        </div>
                        <div className="col-md-6 wrap-about py-md-5 ">
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
                        <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ">
                            <div className="block-18 py-4 mb-4">
                                <div className="text text-border d-flex align-items-center">
                                    <strong className="number" data-number="305">0</strong>
                                    <span>Area <br />Population</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ">
                            <div className="block-18 py-4 mb-4">
                                <div className="text text-border d-flex align-items-center">
                                    <strong className="number" data-number="1090">0</strong>
                                    <span>Total <br />Properties</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ">
                            <div className="block-18 py-4 mb-4">
                                <div className="text text-border d-flex align-items-center">
                                    <strong className="number" data-number="209">0</strong>
                                    <span>Average <br />House</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ">
                            <div className="block-18 py-4 mb-4">
                                <div className="text d-flex align-items-center">
                                    <strong className="number" data-number="67">0</strong>
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

        </>
    )
}

export default About