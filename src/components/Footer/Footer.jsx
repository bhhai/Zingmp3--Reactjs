import React from "react";
import PropTypes from "prop-types";
import "./Footer.css";

Footer.propTypes = {};

const imgSrc = [
  {
    id: 1,
    src: "https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/Kakao-M.png",
  },
  {
    id: 2,
    src: "https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/FUGA.png",
  },
  {
    id: 3,
    src: "https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/beggers.png",
  },
  {
    id: 4,
    src: "https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/yg.png",
  },
  {
    id: 5,
    src: "https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/SM-Entertainment.png",
  },
];

function Footer(props) {
  return (
    <div className="footer-container">
      <h2 className="footer__title">đối tác âm nhạc</h2>
      <div className="footer">
        {imgSrc.map((item, i) => (
          <div className="footer__item" key={item.id}>
            <img src={item.src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
