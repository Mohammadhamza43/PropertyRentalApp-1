import React from 'react'
import {HiArrowLongRight} from 'react-icons/hi2'
import {BsTwitter} from 'react-icons/bs'
import {GrFacebookOption} from 'react-icons/gr'
import {BsInstagram} from 'react-icons/bs'
import {MdLocationPin} from 'react-icons/md'
import {FaPhoneAlt} from 'react-icons/fa'
import {FaEnvelope} from 'react-icons/fa'

function Footer() {
  return (
    <footer className="ftco-footer ftco-section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-md section-1">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Uptown</h2>
            <p>Far far away, behind the word mountains, far from the countries.</p>
            <ul className="ftco-footer-social list-unstyled mt-5">
              <li ><a href="#"><span className=""><BsTwitter/></span></a></li>
              <li ><a href="#"><span className=""><GrFacebookOption/></span></a></li>
              <li ><a href="#"><span className=""><BsInstagram/></span></a></li>
            </ul>
          </div>
        </div>
        <div className="col-md section-2">
          <div className="ftco-footer-widget mb-4 ml-md-4">
            <h2 className="ftco-heading-2">Community</h2>
            <ul className="list-unstyled">
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>Search Properties</a></li>
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>For Agents</a></li>
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>Reviews</a></li>
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>FAQs</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md section-3">
          <div className="ftco-footer-widget mb-4 ml-md-4">
            <h2 className="ftco-heading-2">About Us</h2>
            <ul className="list-unstyled">
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>Our Story</a></li>
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>Meet the team</a></li>
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md section-4">
           <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Company</h2>
            <ul className="list-unstyled">
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>About Us</a></li>
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>Press</a></li>
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>Contact</a></li>
              <li><a href="#"><span className="mr-2"><HiArrowLongRight/></span>Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md section-5">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Have a Questions?</h2>
            <div className="block-23 mb-3">
              <ul>
                <li><span className="icon"><MdLocationPin/></span><span className="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                <li><a href="#"><span className="icon"><FaPhoneAlt/></span><span className="text">+2 392 3929 210</span></a></li>
                <li><a href="#"><span className="icon pr-4"><FaEnvelope/></span><span className="text">info@yourdomain.com</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">

          <p>Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved by <a href="" target="_blank">Homely</a></p>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer