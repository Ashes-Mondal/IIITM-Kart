import React from "react";

const Footer = () => {
  return (
    <footer style={{}} className="footer">
      <div className="grid-container">
        <div>
          <b>Get To Know Us</b>
          <div>
            <b>Developers:</b>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/ashes-mondal-31690319a"
              className="text-white"
            >
              Ashes Mondal
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/subodh-rajpopat-644a81167"
              className="text-white"
            >
              Subodh Rajpopat
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/utkarsh-agnihotri-275731193"
              className="text-white"
            >
              Utkarsh Agnihotri
            </a>
          </div>
        </div>
        <div>
          <b>Sell On IIITM-Kart</b>
          <div>Mail us at:</div>
          <div>
            <a href="mailto:iiitmkart.help@gmail.com" className="text-white">
              iiitmkart.help@gmail.com
            </a>
          </div>
        </div>
        <div>
          <b>Connect With Us</b>
          <div>Facebook</div>
          <div>Twitter</div>
          <div>Instagram</div>
          <div>Linkedin</div>
        </div>
      </div>
      <div className="copyright">Copyright © IIITM Kart 2021.</div>
    </footer>
  );
};

export default Footer;
