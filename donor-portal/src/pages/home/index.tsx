import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../layout/hero-section";
import bannerImage from "./images/banner.jpg";
import slRCLogo from "./images/slredcross_logo.png";
import icrcLogo from "./images/icrc_logo.png";
import ifrcLogo from "./images/ifrc_logo.png";
import singaporeRCLogo from "./images/Singapore_Red_Cross.jpg";
import canadianRCLogo from "./images/canada_rc.png";
import qatarRCLogo from "./images/qatar-red-crescent-logo.png";
import microsoftLogo from "./images/microsoft-logo.png";
import uberLogo from "./images/uber-logo.png";
import "./styles.css";

export default function Home() {
  return (
    <div className="home-page">
      <div>
        <HeroSection
          title="Contribute to alleviate Sri Lanka’s medical supply needs. "
          image={bannerImage}
        />
      </div>
      <div className="main-container">
        <div className="home-description">
          <div className="image-container">
            <img src={slRCLogo} alt="SL Red Cross Logo" />
          </div>
          <div className="home-description-text">
            <h3>An Acute Medical Emergency</h3>
            <p>
              Sri Lanka lacks a coordinated response to address the overall
              medical needs of hospitals. Given the limited resources it is
              essential to optimize the demand and distribution of supplies to
              help avoid possible duplication, address gaps and avoid
              detrimental outcomes to citizens most in need.
            </p>
            <h3>An Alternative Approach</h3>
            <p>
              Elixir is a platform designed to meet this need. It is operated by
              the Sri Lanka Red Cross along with a network of volunteers and
              professionals to help improve the efficacy of donations. In
              partnership with the Sri Lanka Medical Supplies Division we have
              compiled aid packages that aggregate needs across multiple
              hospitals to help achieve bulk price discounts from suppliers. Our
              volunteers help negotiate prices and coordinate invoicing and
              shipping logistics. Elixir facilitates transparency and
              accountability throughout the entire supply chain.
            </p>
            <h3>Please Donate</h3>
            <p>
              Together we can do more. We are accepting donations from both
              organizations and individuals. Check out{" "}
              <Link to="/donate-now">medical needs</Link> and click on the
              Donate button to get started.
            </p>
          </div>
        </div>
        <div className="current-donors">
          <h2>Current Donors</h2>
          <div className="logo-container">
            <div className="donor-logo">
              <a
                href="https://www.icrc.org/en"
                target="_blank"
                rel="noreferrer"
              >
                <img src={icrcLogo} alt="icrc-logo" />
              </a>
            </div>
            <div className="donor-logo">
              <a href="https://www.ifrc.org/" target="_blank" rel="noreferrer">
                <img src={ifrcLogo} alt="ifrc-logo" />
              </a>
            </div>
            <div className="donor-logo">
              <a
                href="https://www.redcross.sg/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={singaporeRCLogo} alt="singapore-rc-logo" />
              </a>
            </div>
            <div className="donor-logo">
              <a
                href="https://www.redcross.ca/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={canadianRCLogo} alt="canada-rc-logo" />
              </a>
            </div>
            <div className="donor-logo">
              <a
                href="https://www.qrcs.org.qa/en/Pages/default.aspx"
                target="_blank"
                rel="noreferrer"
              >
                <img src={qatarRCLogo} alt="qatar-rc-logo" />
              </a>
            </div>
            <div className="donor-logo">
              <a
                href="https://www.microsoft.com/en-lk"
                target="_blank"
                rel="noreferrer"
              >
                <img src={microsoftLogo} alt="microsoft-logo" />
              </a>
            </div>
            <div className="donor-logo">
              <a
                href="https://www.uber.com/lk/en/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={uberLogo} alt="uber-logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
