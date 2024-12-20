import React, { useState } from 'react';
import './About.css';
import faq1 from '../../assets/cust3.jpg';
import faq2 from '../../assets/cust2.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div>
      <div className='container-fluid bgimg mb-1'>
        <div className='fw-bold position-absolute h1 text-center centered-text text-shadow'>
          About ByteBuddy
        </div>
      </div>

      <div className="container-fluid px-5">
        <div className='row'>
          <div className="col-12 col-md-7 col-lg-7">
            <p className='h1 py-5'>From Your Favorite Meals to Instant Convenience.</p>
            <p>
              {showFullText
                ? `Medingen is an innovative online platform dedicated to providing affordable, high-quality generic medicines to people across India. Founded with the vision of making healthcare more accessible, Medingen simplifies the process of purchasing medicines by offering doorstep delivery, ensuring that customers receive essential medications no matter their location.
                The platform prioritizes affordability without compromising quality, ensuring that all medicines available meet the highest standards.
                What sets Medingen apart is its user-friendly approach. The platform allows customers to easily compare different generic medicine options, helping them make informed decisions based on both cost and efficacy. Orders can be placed through multiple channels, including the Medingen app, via a simple phone call, or even through WhatsApp, making the process seamless for users of all levels of digital proficiency.
                Medingen is committed to transparency, customer service, and accessibility, aiming to reshape how people in India access their medicines. By combining technology with healthcare expertise, Medingen offers a modern solution to a widespread problem, striving to improve lives by enhancing access to affordable medicines while fostering trust and reliability in the process.`
                : `Medingen is an innovative online platform dedicated to providing affordable, high-quality generic medicines to people across India. Founded with the vision of making healthcare more accessible...`}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowFullText(!showFullText)}
            >
              {showFullText ? 'Read Less' : 'Read More'}
            </button>
          </div>
          <div className="col-12 col-md-5 col-lg-5 d-none d-md-block">
            <img
              className="img-fluid"
              src={faq1}
              alt="aboutus"
              style={{ display: showFullText ? 'block' : 'none' }}
            />
          </div>
        </div>
      </div>

      <div className="container-fluid px-5">
        <div className="row">
          <div className="col-12 col-md-5 col-lg-5">
            <div className="image-hover">
              <img className="img-fluid rounded-5" src={faq2} alt="aboutus" />
            </div>
          </div>
          <div className="col-12 col-md-7 col-lg-7 my-5">
            <p className='h2 py-3'>Our riders are our heroes</p>
            <p>
            At Medingen, our delivery professionals are the backbone of our service. We believe in providing them with meaningful opportunities and empowering them with the flexibility to work on their terms. Whether it's delivering life-saving medications or essential healthcare supplies, our team plays a vital role in ensuring that every order is delivered with care and precision.
Join our team and become a hero in the Medingen journey. Whether you're looking for full-time or part-time opportunities, we offer the freedom and flexibility to work when it suits you. Be a part of a mission that makes a difference in people's lives every day! Learn more about their journey and see how you can contribute to our vision of accessible healthcare today.
            </p>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default About;
