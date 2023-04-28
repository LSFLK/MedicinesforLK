import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../layout/hero-section";
import bannerImage from "./images/banner.jpg";
import governmentLogo from "./images/government-logo.jpeg";
import icrcLogo from "./images/icrc_logo.png";
import ifrcLogo from "./images/ifrc_logo.png";
import singaporeRCLogo from "./images/Singapore_Red_Cross.jpg";
import canadianRCLogo from "./images/canada_rc.png";
import qatarRCLogo from "./images/qatar-red-crescent-logo.png";
import microsoftLogo from "./images/microsoft-logo.png";
import uberLogo from "./images/uber-logo.png";
import payPalLogo from "./images/paypal-logo.png";
import "./styles.css";
import introductionVideo from "./video/introduction_to_elixir_video.mp4";
import quoteleft from "./images/quoteleft.svg";
import quoteright from "./images/quoteright.svg";

export default function Home() {
  return (
    <div className="home-page">
      <div>
        <HeroSection
          title="Coordinated donations for Sri&nbsp;Lanka’s medical supply needs"
          image={bannerImage}
        />
      </div>
      <div className="main-container introduction-video">
        <video src={introductionVideo} controls muted autoPlay width={720}>
          <track kind="captions" />
        </video>
      </div>
      <div className="main-container">
        <div className="home-description">
          <div className="image-container">
            <img
              src={governmentLogo}
              alt="SL Red Cross Logo"
              decoding="async"
            />
            <p>With support from the</p>
            <h2>Ministry of Health</h2>
          </div>
          <div className="home-description-text">
            <h3>An Acute Medical Emergency</h3>
            <p>
              Sri Lanka needs a coordinated response to address the overall
              medical needs of hospitals. Given limited resources, it is
              essential to improve the distribution of supplies to help avoid
              possible duplication, address gaps and avoid detrimental outcomes
              to citizens most in need. We believe that donor cooperation is
              essential to help Sri Lanka accelerate a return to normalcy.
            </p>
            <h3>An Alternative Approach</h3>
            <p>
              Elixir is a platform designed to meet this need by serving as a
              central hub to coordinate donations from around the world. It is
              operated by the Sri Lanka Red Cross along with a network of
              volunteers and professionals to help improve the effectiveness of
              donations. In partnership with the Sri Lanka Medical Supplies
              Division, we have compiled aid packages that collect the needs
              across multiple hospitals to help achieve bulk price discounts
              from suppliers. Our volunteers help negotiate prices and
              coordinate invoicing and shipping logistics. Elixir facilitates
              transparency and accountability throughout the entire supply
              chain.
            </p>
            <h3>Please Donate</h3>
            <p>
              By aligning our efforts we can do more. We are accepting donations
              from both organizations and individuals. Check out our{" "}
              <Link to="/donate-now">aid packages</Link> to get started.
            </p>
          </div>
        </div>
        <div className="testimonial">
          <img alt="quote" src={quoteleft} />
          <div className="slide">
            <p>
              We are grateful to the Sri Lanka Red Cross Society for donating
              Sevoflurane to our hospital; with their assistance, we were able
              to treat patients in all operating rooms for more than three
              months. Because of the ongoing crisis, operations were temporarily
              halted, causing issues with our service to our patients. SLRCS
              &apos; s contribution made things easier and allowed almost all of
              the hospital &apos; s operating rooms to continue. The donated
              medication is a critical medication that must be available in
              hospitals. The donation totaled two million rupees, and we used it
              to treat over 100 patients. We are extremely grateful for the
              assistance provided,
            </p>
          </div>

          <div className="details">
            <div className="quote">
              <img alt="quote" src={quoteright} />
            </div>
            <div className="info">
              <span className="name">Sri Ranganayake Bandara</span>
              <span className="job">The Ward Master</span>
              <span className="job">National Hospital in Kandy</span>
            </div>
          </div>
        </div>
        <div className="current-donors">
          <h2>Current Donors</h2>
          <p>
            We would like to acknowledge the generous support of our donors
            below.
          </p>
          <div className="logo-container">
            <div className="donor-logo">
              <a
                href="https://www.icrc.org/en"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={icrcLogo}
                  alt="icrc-logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="donor-logo">
              <a href="https://www.ifrc.org/" target="_blank" rel="noreferrer">
                <img
                  src={ifrcLogo}
                  alt="ifrc-logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="donor-logo">
              <a
                href="https://www.redcross.sg/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={singaporeRCLogo}
                  decoding="async"
                  loading="lazy"
                  alt="singapore-rc-logo"
                />
              </a>
            </div>
            <div className="donor-logo">
              <a
                href="https://www.redcross.ca/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={canadianRCLogo}
                  alt="canada-rc-logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="donor-logo">
              <a
                href="https://www.qrcs.org.qa/en/Pages/default.aspx"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={qatarRCLogo}
                  alt="qatar-rc-logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="donor-logo">
              <a
                href="https://www.microsoft.com/en-lk"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={microsoftLogo}
                  alt="microsoft-logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="donor-logo">
              <a
                href="https://www.uber.com/lk/en/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={uberLogo}
                  alt="uber-logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="donor-logo">
              <a href="https://paypal.com/" target="_blank" rel="noreferrer">
                <img
                  src={payPalLogo}
                  alt="paypal-logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
