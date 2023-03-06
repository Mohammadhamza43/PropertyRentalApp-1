import React from 'react'
import teamOne from '../../../assets/media/images/team-1.jpg'
import teamTwo from '../../../assets/media/images/team-2.jpg'
import teamThree from '../../../assets/media/images/team-3.jpg'
import teamFour from '../../../assets/media/images/team-4.jpg'
import teamFive from '../../../assets/media/images/team-5.jpg'
import teamSix from '../../../assets/media/images/team-6.jpg'
import teamSeven from '../../../assets/media/images/team-7.jpg'
import teamEight from '../../../assets/media/images/team-8.jpg'
import bgOne from '../../../assets/media/images/bg_1.jpg'
import {MdKeyboardArrowRight} from 'react-icons/md'
import Header from '../../../shared/Header/Header'



function Agent() {
  return (
    <>
	<Header/>
    <section className="hero-wrap hero-wrap-2 ftco-degree-bg js-fullheight" style={{backgroundImage: `url(${bgOne})`}} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
          <div className="col-md-9 pb-5 text-center">
          	<p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></a></span> <span>Agent <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight/></i></span></p>
            <h1 className="mb-3 bread">Agent</h1>
          </div>
        </div>
      </div>
    </section>

		<section className="ftco-section ftco-agent">
    	<div className="container">
        <div className="row">
        	<div className="col-md-3">
        		<div className="agent">
    					<div className="img">
		    				<img src={teamOne} loading='lazy' className="img-fluid" alt="Colorlib Template"/>
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
		    				<img src={teamTwo} loading='lazy' className="img-fluid" alt="Colorlib Template"/>
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
		    				<img src={teamThree} loading='lazy' className="img-fluid" alt="Colorlib Template"/>
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
		    				<img src={teamFour} loading='lazy' className="img-fluid" alt="Colorlib Template"/>
	    				</div>
	    				<div className="desc">
	    					<h3><a href="properties.html">James Stallon</a></h3>
								<p className="h-info"><span className="position">Listing</span> <span className="details">&mdash; 10 Properties</span></p>
	    				</div>
    				</div>
        	</div>

        	<div className="col-md-3">
        		<div className="agent">
    					<div className="img">
		    				<img src={teamFive} loading='lazy' className="img-fluid" alt="Colorlib Template"/>
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
		    				<img src={teamSix} loading='lazy' className="img-fluid" alt="Colorlib Template"/>
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
		    				<img src={teamSeven} loading='lazy' className="img-fluid" alt="Colorlib Template"/>
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
		    				<img src={teamEight} loading='lazy' className="img-fluid" alt="Colorlib Template"/>
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
    </>
  )
}

export default Agent