import React from 'react'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import bgTwo from '../../../assets/media/images/bg_2.jpg'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {CiBank} from 'react-icons/ci'
import {SlWallet} from 'react-icons/sl'
import {TfiFiles} from 'react-icons/tfi'
import {HiOutlineLockClosed} from 'react-icons/hi'
import Header from '../../../shared/Header/Header'

function Services() {
  return (
    <>
    <Header/>
    <section className="hero-wrap hero-wrap-2 ftco-degree-bg js-fullheight" style={{backgroundImage: `url(${bgOne})`}} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
          <div className="col-md-9  pb-5 text-center">
          	<p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></a></span> <span>Services <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></span></p>
            <h1 className="mb-3 bread">Services</h1>
          </div>
        </div>
      </div>
    </section>

    <section className="ftco-section">
      <div className="container">
      	<div className="row justify-content-center">
          <div className="col-md-12 heading-section text-center  mb-5">
          	<span className="subheading">Our Services</span>
            <h2 className="mb-2">The smartest way to buy a home</h2>
          </div>
        </div>
        <div className="row d-flex">
          <div className="col-md-3 d-flex align-self-stretch ">
            <div className="media block-6 services d-block text-center">
            	<div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-piggy-bank"><CiBank/></span></div>
              <div className="media-body py-md-4">
                <h3>No Downpayment</h3>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              </div>
            </div>      
          </div>
          <div className="col-md-3 d-flex align-self-stretch ">
            <div className="media block-6 services d-block text-center">
            	<div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-wallet"><SlWallet/></span></div>
              <div className="media-body py-md-4">
                <h3>All Cash Offer</h3>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              </div>
            </div>      
          </div>
          <div className="col-md-3 d-flex align-self-stretch ">
            <div className="media block-6 services d-block text-center">
            	<div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-file"><TfiFiles/></span></div>
              <div className="media-body py-md-4">
                <h3>Experts in Your Corner</h3>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              </div>
            </div>      
          </div>
          <div className="col-md-3 d-flex align-self-stretch ">
            <div className="media block-6 services d-block text-center">
            	<div className="icon d-flex justify-content-center align-items-center"><span className="flaticon-locked"><HiOutlineLockClosed/></span></div>
              <div className="media-body py-md-4">
                <h3>Lokced in Pricing</h3>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              </div>
            </div>      
          </div>
        </div>
      </div>
    </section>

		<section className="ftco-section ftco-degree-bg services-section img mx-md-5" style={{backgroundImage: `url(${bgTwo})`}}>
    	<div className="overlay"></div>
    	<div className="container">
    		<div className="row justify-content-start mb-5">
          <div className="col-md-6 text-center heading-section heading-section-white ">
          	<span className="subheading">Work flow</span>
            <h2 className="mb-3">How it works</h2>
          </div>
        </div>
    		<div className="row">
    			<div className="col-md-6">
    				<div className="row">
		    			<div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
		            <div className="media block-6 services services-2">
		              <div className="media-body py-md-4 text-center">
		              	<div className="icon mb-3 d-flex align-items-center justify-content-center"><span>01</span></div>
		                <h3>Evaluate Property</h3>
		                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
		              </div>
		            </div>      
		          </div>
		          <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
		            <div className="media block-6 services services-2">
		              <div className="media-body py-md-4 text-center">
		              	<div className="icon mb-3 d-flex align-items-center justify-content-center"><span>02</span></div>
		                <h3>Meet Your Agent</h3>
		                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
		              </div>
		            </div>      
		          </div>
		          <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
		            <div className="media block-6 services services-2">
		              <div className="media-body py-md-4 text-center">
		              	<div className="icon mb-3 d-flex align-items-center justify-content-center"><span>03</span></div>
		                <h3>Close the Deal</h3>
		                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
		              </div>
		            </div>      
		          </div>
		          <div className="col-md-12 col-lg-6 d-flex align-self-stretch ">
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

    <section className="ftco-section">
    	<div className="container">
    		<div className="row justify-content-end">
    			<div className="col-md-8">
    				<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
    			</div>
    		</div>
    	</div>
    </section>
    </>
  )
}

export default Services