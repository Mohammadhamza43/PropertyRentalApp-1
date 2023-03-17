import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md'
import {ImMap2} from 'react-icons/im'
import {RxEnvelopeClosed} from 'react-icons/rx'
import {BsPhone} from 'react-icons/bs'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import GoogleMapReact from 'google-map-react';
import Header from '../../../shared/Header/Header'
import Footer from '../../../shared/Footer/Footer'


const AnyReactComponent = ({ text }) => <div>{text}</div>;


function Contact() {

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
    <section className="hero-wrap hero-wrap-2 ftco-degree-bg js-fullheight" style={{backgroundImage: `url(${bgOne})`}} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
          <div className="col-md-9 pb-5 text-center">
          	<p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></a></span> <span>Contact <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></span></p>
            <h1 className="mb-3 bread">Contact us</h1>
          </div>
        </div>
      </div>
    </section>

		<section className="ftco-section contact-section">
      <div className="container">
        <div className="row d-flex mb-5 contact-info justify-content-center">
        	<div className="col-md-8">
        		<div className="row mb-5">
		          <div className="col-md-4 text-center py-4">
		          	<div className="icon">
		          		<span className="icon-map-o"><ImMap2/></span>
		          	</div>
		            <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
		          </div>
		          <div className="col-md-4 text-center border-height py-4">
		          	<div className="icon">
		          		<span className="icon-mobile-phone"><BsPhone/></span>
		          	</div>
		            <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
		          </div>
		          <div className="col-md-4 text-center py-4">
		          	<div className="icon">
		          		<span className="icon-envelope-o"><RxEnvelopeClosed/></span>
		          	</div>
		            <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
		          </div>
		        </div>
          </div>
        </div>
        <div className="row block-9 justify-content-center mb-5">
          <div className="col-md-8 mb-md-5">
          	<h2 className="text-center">If you got any questions <br/>please do not hesitate to send us a message</h2>
            <form action="#" className="bg-light p-5 contact-form">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Name"/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Email"/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Subject"/>
              </div>
              <div className="form-group">
                <textarea name="" id="" cols="30" rows="7" className="form-control" placeholder="Message"></textarea>
              </div>
              <div className="form-group">
                <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5"/>
              </div>
            </form>
          
          </div>
        </div>
        <div className="row justify-content-center">
        	<div className="col-md-10">
          <div style={{ height: '100vh', width: '100%' }}>
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
    </div>
        	</div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default Contact