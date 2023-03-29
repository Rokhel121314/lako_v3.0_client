import React from "react";

function AboutUs() {
  return (
    <div className="about-container" id="about">
      <div className="about-header">About</div>

      <div className="about-content">
        <div className="image-container">
          <img
            className="about-image"
            src={require("../../assests/images/aboutus-img.jpg")}
            alt=""
          />
        </div>
        <div className="description-container">
          <div className="description-wrapper">
            <div className="description-content">
              We are a team of experienced professionals dedicated to providing
              high-quality and reliable point-of-sale solutions to businesses of
              all sizes. Our mission is to make it easy for businesses to accept
              payments and manage sales.
            </div>
            <div className="description-content">
              Our user-friendly Lako system requires minimal training and can be
              customized to fit your business needs. Our team provides
              exceptional customer service and support.
            </div>
            <div className="description-content">
              Choose Lako for an easy-to-use and efficient point-of-sale
              solution that will streamline your business operations and help
              improve your bottom line.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
