import React from 'react';
import './Footer.css';
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <a href="#"><img src="logo.png" alt="Medingen Logo" className="footer-logo" /></a>
          <p>
            Medingen <br />
            Saves you health and wealth
          </p>
        </div>
        <div className="footer-content-center">
          <h4>Website</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="/home">Features</a></li>
            <li><a href="/contact">How it Works</a></li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h4>Our Policies</h4>
          <ul>
            <li><a href="#">Privacy Policies</a></li>
            <li><a href="/about">Terms and Conditions</a></li>
            <li><a href="/contact">Grievance Redressal Policy</a></li>
            <li>Return Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h4>More</h4>
          <ul>
            <li><a href="/contact">About Us</a></li>
            <li><a href="/contact">Help Center</a></li>
          </ul>
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/"><FaFacebook className="social-icon" /></a>
            <a href="https://www.twitter.com/"><FaXTwitter className="social-icon" /></a>
            <a href="https://www.instagram.com/"><FaInstagram className="social-icon" /></a>
          </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies.
        All trademarks are properties of their respective owners. Copyright 2024 © Medingen.com - All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
