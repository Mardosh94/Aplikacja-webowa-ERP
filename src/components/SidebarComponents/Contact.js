import React from "react";
import "../../styles/Dashboard.css";
import facebookIcon from "../../styles/assets/facebook.svg";
import emailIcon from "../../styles/assets/email.svg";
import twitterIcon from "../../styles/assets/twitter.svg";

const Contact = () => (
  <section className="contact-section">
    <h2>KONTAKT:</h2>
    <p>+48 415-555-017</p>
    <p>szef@email.com</p>
    <p>43-430 Skoczów, Sosnowa 1</p>

    <div
      className="icons-contact"
      style={{ textAlign: "center", marginTop: "20px" }}
    >
      <img src={facebookIcon} alt="Facebook" style={{ marginRight: "10px" }} />
      <img src={twitterIcon} alt="Twitter" style={{ marginRight: "10px" }} />
      <img src={emailIcon} alt="Email" />
    </div>
  </section>
);

export default Contact;
