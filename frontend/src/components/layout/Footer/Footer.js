import React from "react";
import playstore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download</h4>
        <p>Download Aplikasi Andoid dan Ios</p>
        <img src={playstore} alt="playstore" />
        <img src={appStore} alt="appstore" />
      </div>
      <div className="midFooter">
        <h1>TOKO CARIAPA</h1>
        <p>High Quality</p>
        <p>Copyright 2022 &copy; Andra Wijaya</p>
      </div>
      <div className="rightFooter">
        <h4>Follow US</h4>
        <a href="https://web.facebook.com/andrawijaya170798">Facebook</a>
        <a href="https://www.instagram.com/andrawijyaa/">Instagram</a>
        <a href="https://www.linkedin.com/in/andra-wijaya-663582135/">
          LinkInd
        </a>
      </div>
    </footer>
  );
};

export default Footer;
