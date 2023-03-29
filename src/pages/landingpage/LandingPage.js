import React from "react";
import "./home.css";
import Feature from "./Feature";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import Home from "./Home";

function LandingPage() {
  return (
    <>
      <Home />
      <Feature />
      <AboutUs />
      <ContactUs />
      <Footer />
    </>
  );
}

export default LandingPage;
