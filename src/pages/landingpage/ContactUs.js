import React from "react";
import "./home.css";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function ContactUs() {
  return (
    <div className="contact-container" id="contact">
      <div className="contact-header">Contact</div>
      <div className="contact-content">
        <div className="details-container">
          <div className="details-wrapper">
            <div className="detail-header">
              We value your feedback and strive to provide exceptional customer
              service. If you have any questions about our products or services,
              please don't hesitate to get in touch with us. We're here to help
              you and your business succeed.
            </div>
            <div className="contact-details">
              <div className="detail">
                <div className="detail-icontainer">
                  <FaMapMarkerAlt className="detail-icon" />
                </div>

                <div className="detail-text">
                  <div className="text text-header">Address</div>
                  <div className="text text-content">
                    #124 Brgy. Tebuel Manaoag Pangasinan
                  </div>
                </div>
              </div>

              <div className="detail">
                <div className="detail-icontainer">
                  <MdEmail className="detail-icon" />
                </div>

                <div className="detail-text">
                  <div className="text text-header">Email</div>
                  <div className="text text-content">
                    jerickddelacruzwebdev@gmail.com
                  </div>
                </div>
              </div>

              <div className="detail">
                <div className="detail-icontainer">
                  <FaPhone className="detail-icon" />
                </div>

                <div className="detail-text">
                  <div className="text text-header">Phone</div>
                  <div className="text text-content">+63 969 519 6128</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-container">
          <div className="form-header">Send Message</div>
          <form className="form-wrapper">
            <input
              className="input input-text"
              type="text"
              placeholder="Full Name"
              required={true}
            />
            <input
              className="input input-email"
              type="email"
              placeholder="@gmail.com"
              required={true}
            />
            <textarea
              className="input input-textarea"
              required={true}
              placeholder="Type your Message"></textarea>
            <button className="input-button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
