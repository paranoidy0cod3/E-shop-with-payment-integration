import React from "react";
import aba from "../assets/images/aba.png";
import alipay from "../assets/images/alipay.png";
import bakong from "../assets/images/bakong.png";
import master from "../assets/images/master.png";
import visa from "../assets/images/visa.png";
import wechat from "../assets/images/wechat.png";

const Footer = () => {
  return (
    <footer>
      <p className="footer-note">made with ❤️ in Sisophoan, Cambodia.</p>
      <div className="bank-promo">
        <p>We Accept:</p>
        <img src={aba} alt="aba logo" />
        <img src={alipay} alt="alipay logo" />
        <img src={bakong} alt="bakong logo" />
        <img src={master} alt="master logo" />
        <img src={visa} alt="visa logo" />
        <img src={wechat} alt="wechat logo" />
      </div>
    </footer>
  );
};

export default Footer;
