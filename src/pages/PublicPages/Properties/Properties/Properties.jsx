import React, { useEffect } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import bgOne from '../../../../assets/media/images/bg_1.jpg'
import workOne from '../../../../assets/media/images/work-1.jpg'
import { BiBed } from 'react-icons/bi'
import { TbBath } from 'react-icons/tb'
import { MdOutlineMapsHomeWork } from 'react-icons/md'
import Header from '../../../../shared/Header/Header'
import Footer from '../../../../shared/Footer/Footer'
import Loading from '../../../../shared/Loading/Loading'
import axiosInstance from '../../../../shared/HttpClient/axiosInstance'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Search from '../../../../shared/Search/Search'

function Properties() {
	const [list, setList] = useState([])
	const [loader, setLoader] = useState(true)
	const [formLoader, setFormLoader] = useState(false)
	const [proData, setProData] = useState('')
	const location = useLocation()
	// let filteredData;

	const updateState = async (newValue) => {
		console.log(newValue);
		 setProData(async (prev)  => {await newValue});
		await logJSONData(newValue)
	};


	async function logJSONData(newValue) {
		console.log(newValue);
		const response = await fetch("https://walrus-app-ovpy2.ondigitalocean.app/property/list");
		const Data = await response.json();
		// console.log(jsonData);

		setLoader(false)
		if (location.state !== null || newValue !== undefined) {

			console.log(newValue);
			if (newValue !== undefined) {
				 const filteredData = await Data.data.filter(item => {
					const purpose = newValue.purpose;
					const city = newValue.city;
					const country = newValue.country;

					return item.purpose === purpose || item.location.city === city || item.location.country === country
				})
				if(filteredData){
					setList(filteredData)
					console.log(JSON.stringify(filteredData)  + 'product data succes');
				}else{
					console.log(filteredData + 'product data fail');
					setList([])
					console.log('property');
				}

			}

			else if (location.state !== null) {

				const filteredData = await Data.data.filter(item => {
				  const purpose = location.state.purpose;
				  const city = location.state.city;
				  const country = location.state.country;
				  return item.purpose === purpose || item.location.city === city || item.location.country === country
			  })
			  
			  if(filteredData){
				  console.log(filteredData + 'search data succes');
				  setList(filteredData)
			  }else{
				  console.log(filteredData + 'search data fail');
				  setList([])
			  }
			  console.log('search');

		  }
			
			// else{
			// 	return setList([])
			// 	console.log('not data found')
			// }
			// console.log(filteredData);

		} else{
			console.log('empty');

			setLoader(false)
			setList(Data.data)
		}
	}



	const getPropertyList = async () => {
		// const response = await axiosInstance.get('property/list')
		// const data = await response.data
		// console.log(data);

		// setLoader(false)
		// setList(data.data)
	}

	useEffect(() => {
		logJSONData()
	}, [])

	return (
		<>
			<Header />
			<section className="hero-wrap hero-wrap-2 ftco-degree-bg js-fullheight" style={{ backgroundImage: `url(${bgOne})` }} data-stellar-background-ratio="0.5">
				<div className="overlay"></div>
				<div className="container">
					<div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
						<div className="col-md-9 pb-5 text-center">
							{/* <p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight /></i></a></span> <span>Properties <i className="ion-ios-arrow-forward"><MdKeyboardArrowRight /></i></span></p>
							<h1 className="mb-3 bread">Choose <br />Your Desired Home</h1> */}
							<Search updateState={updateState} />
						</div>
					</div>
				</div>
			</section>

			{/* <section className="ftco-section">
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
    </section> */}
			<>
				{loader ?
					<Loading />
					:
					<>
						<section className="ftco-section">
							<div className="container">
								<div className="row" style={{ position: 'relative' }}>
									{list && list.length > 0 ?
										(list.map((x, index) => {
											return (
												<div className="col-md-4" key={index}>
													<div className="property-wrap" style={{ position: 'relative' }}>
														{(x.photos.length > 0) ?
															<a className="img"
																style={{ backgroundImage: `url(${x.photos[0]})` }}></a> :
															<a className="img"
																style={{ backgroundImage: `url(${workOne})` }}></a>}
														<div className="text">
															<p className="price">
																{/* <span className="old-price">800,000</span> */}
																<span
																	className="orig-price">${x.price !== null ? x.price.toLocaleString() : ''}<small>{x.purpose.includes('rent') ? ' / month' : ''}</small></span>
															</p>
															<ul className="property_list">
																<li><span
																	className="flaticon-bed three-margin-icon"><BiBed /></span>{x[x.type + 'Amenities']?.kitchen}
																</li>
																<li><span
																	className="flaticon-bathtub three-margin-icon"><TbBath /></span>{x[x.type + 'Amenities']?.bath}
																</li>
																<li><span
																	className="flaticon-floor-plan three-margin-icon"><MdOutlineMapsHomeWork /></span>{x?.area?.value.toLocaleString() + ' ' + x?.area?.unit}
																</li>
															</ul>
															<h3><a href="properties/1">{x.title}</a></h3>
															<span className="location">{x.location.pinLocation}</span>
															{/*<a href="properties/1"
                                                       className="d-flex align-items-center justify-content-center btn-custom">
                                                        <span className="ion-ios-link"></span>
                                                    </a>*/}
														</div>
													</div>
												</div>
											)
										}))
										: (<p className="no-property">No records to show</p>)
									}
								</div>
								{/* <div className="row mt-5">
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
        </div> */}
							</div>
						</section>
					</>
				}
			</>
			<Footer />
		</>
	)
}

export default Properties