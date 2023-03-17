import React from 'react'
import {MdKeyboardArrowRight} from 'react-icons/md'
import bgOne from '../../../../assets/media/images/bg_1.jpg'
import workOne from '../../../../assets/media/images/work-1.jpg'
import workTwo from '../../../../assets/media/images/work-2.jpg'
import workThree from '../../../../assets/media/images/work-3.jpg'
import workFour from '../../../../assets/media/images/work-4.jpg'
import workFive from '../../../../assets/media/images/work-5.jpg'
import workSix from '../../../../assets/media/images/work-6.jpg'
import {BiBed} from 'react-icons/bi'
import {TbBath} from 'react-icons/tb'
import {MdOutlineMapsHomeWork} from 'react-icons/md'
import Header from '../../../../shared/Header/Header'
import Footer from '../../../../shared/Footer/Footer'

function Properties() {
  return (
    <>
	<Header/>
    <section className="hero-wrap hero-wrap-2 ftco-degree-bg js-fullheight" style={{backgroundImage: `url(${bgOne})`}} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
          <div className="col-md-9 pb-5 text-center">
          	<p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></a></span> <span>Properties <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></span></p>
            <h1 className="mb-3 bread">Choose <br/>Your Desired Home</h1>
          </div>
        </div>
      </div>
    </section>

		<section className="ftco-section">
    	<div className="container">
        <div className="row">
        	<div className="col-md-4">
        		<div className="property-wrap" >
        			<a href="properties/1" className="img" style={{backgroundImage: `url(${workOne})`}}></a>
        			<div className="text">
        				<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
        				<ul className="property_list">
        					<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
									<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
									<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
        				</ul>
        				<h3><a href="properties/1">The Blue Sky Home</a></h3>
        				<span className="location">Oakland</span>
        				<a href="properties/1" className="d-flex align-items-center justify-content-center btn-custom">
        					<span className="ion-ios-link"></span>
        				</a>
        			</div>
        		</div>
        	</div>
        	<div className="col-md-4">
        		<div className="property-wrap">
        			<a href="properties/1" className="img" style={{backgroundImage: `url(${workTwo})`}}></a>
        			<div className="text">
        				<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
        				<ul className="property_list">
        					<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
									<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
									<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
        				</ul>
        				<h3><a href="properties/1">The Blue Sky Home</a></h3>
        				<span className="location">Oakland</span>
        				<a href="properties/1" className="d-flex align-items-center justify-content-center btn-custom">
        					<span className="ion-ios-link"></span>
        				</a>
        			</div>
        		</div>
        	</div>
        	<div className="col-md-4">
        		<div className="property-wrap">
        			<a href="properties/1" className="img" style={{backgroundImage: `url(${workThree})`}}></a>
        			<div className="text">
        				<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
        				<ul className="property_list">
        					<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
									<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
									<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
        				</ul>
        				<h3><a href="properties/1">The Blue Sky Home</a></h3>
        				<span className="location">Oakland</span>
        				<a href="properties/1" className="d-flex align-items-center justify-content-center btn-custom">
        					<span className="ion-ios-link"></span>
        				</a>
        			</div>
        		</div>
        	</div>

        	<div className="col-md-4">
        		<div className="property-wrap">
        			<a href="properties/1" className="img" style={{backgroundImage: `url(${workFour})`}}></a>
        			<div className="text">
        				<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
        				<ul className="property_list">
        					<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
									<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
									<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
        				</ul>
        				<h3><a href="properties/1">The Blue Sky Home</a></h3>
        				<span className="location">Oakland</span>
        				<a href="properties/1" className="d-flex align-items-center justify-content-center btn-custom">
        					<span className="ion-ios-link"></span>
        				</a>
        			</div>
        		</div>
        	</div>
        	<div className="col-md-4">
        		<div className="property-wrap">
        			<a href="properties/1" className="img" style={{backgroundImage: `url(${workFive})`}}></a>
        			<div className="text">
        				<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
        				<ul className="property_list">
        					<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
									<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
									<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
        				</ul>
        				<h3><a href="properties/1">The Blue Sky Home</a></h3>
        				<span className="location">Oakland</span>
        				<a href="properties/1" className="d-flex align-items-center justify-content-center btn-custom">
        					<span className="ion-ios-link"></span>
        				</a>
        			</div>
        		</div>
        	</div>
        	<div className="col-md-4">
        		<div className="property-wrap">
        			<a href="properties/1" className="img" style={{backgroundImage: `url(${workSix})`}}></a>
        			<div className="text">
        				<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
        				<ul className="property_list">
        					<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
									<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
									<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
        				</ul>
        				<h3><a href="properties/1">The Blue Sky Home</a></h3>
        				<span className="location">Oakland</span>
        				<a href="properties/1" className="d-flex align-items-center justify-content-center btn-custom">
        					<span className="ion-ios-link"></span>
        				</a>
        			</div>
        		</div>
        	</div>

        	<div className="col-md-4">
        		<div className="property-wrap">
        			<a href="properties/1" className="img" style={{backgroundImage: `url(${workOne})`}}></a>
        			<div className="text">
        				<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
        				<ul className="property_list">
        					<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
									<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
									<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
        				</ul>
        				<h3><a href="properties/1">The Blue Sky Home</a></h3>
        				<span className="location">Oakland</span>
        				<a href="properties/1" className="d-flex align-items-center justify-content-center btn-custom">
        					<span className="ion-ios-link"></span>
        				</a>
        			</div>
        		</div>
        	</div>
        	<div className="col-md-4">
        		<div className="property-wrap">
        			<a href="properties/1" className="img" style={{backgroundImage: `url(${workTwo})`}}></a>
        			<div className="text">
        				<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
        				<ul className="property_list">
        					<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
									<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
									<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
        				</ul>
        				<h3><a href="properties/1">The Blue Sky Home</a></h3>
        				<span className="location">Oakland</span>
        				<a href="properties/1" className="d-flex align-items-center justify-content-center btn-custom">
        					<span className="ion-ios-link"></span>
        				</a>
        			</div>
        		</div>
        	</div>
        	<div className="col-md-4">
        		<div className="property-wrap">
        			<a href="properties/1" className="img" style={{backgroundImage: `url(${workThree})`}}></a>
        			<div className="text">
        				<p className="price"><span className="old-price">800,000</span><span className="orig-price">$3,050<small>/mo</small></span></p>
        				<ul className="property_list">
        					<li><span className="flaticon-bed three-margin-icon"><BiBed/></span>3</li>
									<li><span className="flaticon-bathtub three-margin-icon"><TbBath/></span>2</li>
									<li><span className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork/></span>1,878 sqft</li>
        				</ul>
        				<h3><a href="properties/1">The Blue Sky Home</a></h3>
        				<span className="location">Oakland</span>
        				<a href="properties/1" className="d-flex align-items-center justify-content-center btn-custom">
        					<span className="ion-ios-link"></span>
        				</a>
        			</div>
        		</div>
        	</div>
        </div>
        <div className="row mt-5">
          <div className="col text-center">
            <div className="block-27">
              <ul>
                <li className='p-1'><a href="#">&lt;</a></li>
                <li className="active p-1"><span>1</span></li>
                <li className='p-1'><a href="#">2</a></li>
                <li className='p-1'><a href="#">3</a></li>
                <li className='p-1'><a href="#">4</a></li>
                <li className='p-1'><a href="#">5</a></li>
                <li className='p-1'><a href="#">&gt;</a></li>
              </ul>
            </div>
          </div>
        </div>
    	</div>
    </section>
	<Footer/>
    </>
  )
}

export default Properties