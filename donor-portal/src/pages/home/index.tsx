import React from "react";
import { Link } from "react-router-dom";
import HeaderImage from "../layout/header-image";
import Page from "../layout/page";
import "./styles.css";

export default function Home() {
  return (
    <Page className="home-page">
      <HeaderImage imageUrl="https://images.unsplash.com/photo-1516826435551-36a8a09e4526?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">
        <div className="header-image__text-container">
          <p>
            <strong>
              Sri Lanka is going through an unprecedented economic crisis. It
              has left the country facing a severe shortage of life-saving
              medicines and medical supplies. <br /> <br />
              The Elixir platform facilitates matches donations with the most
              urgent and provides transparency.
            </strong>
          </p>
        </div>
        <div className="header-image_logo">
          <img src="assets/images/elixirLogo4.png" alt="elixir-logo" />
        </div>
      </HeaderImage>
      <div className="home-description">
        <div className="image-container">
          <img
            src="assets/images/slredcross_logo.png"
            alt="donating medical supplies"
          />
        </div>
        <div className="home-description-text">
          <h3>An Acute Medical Emergency</h3>
          <p>
            Sri Lanka lacks a coordinated response to address the overall
            medical needs of hospitals. Given the limited resources it is
            essential to optimize the demand and distribution of supplies to
            help avoid possible duplication, address gaps and avoid detrimental
            outcomes to citizens most in need.
          </p>
          <h3>An Alternative Approach</h3>
          <p>
            Elixir is a platform designed to meet this need. It is operated by
            the Sri Lanka Red Cross along with a network of volunteers and
            professionals to help improve the efficacy of donations. In
            partnership with the Sri Lanka Medical Supplies Division we have
            compiled aid packages that aggregate needs across multiple hospitals
            to help achieve bulk price discounts from suppliers. Our volunteers
            help negotiate prices and coordinate invoicing and shipping
            logistics. Elixir facilitates transparency and accountability
            throughout the entire supply chain.
          </p>
          <h3>Please Donate</h3>
          <p>
            Together we can do more. We are accepting donations from both
            organizations and individuals. Check out{" "}
            <Link to="/medical-needs">medical needs</Link> and click on the
            Donate button to get started.
          </p>
        </div>
      </div>
      <div className="current-donors">
        <h2>Current Donors</h2>
        <div className="logo-container">
          <div className="donor-logo">
            <a href="https://www.icrc.org/en" target="_blank" rel="noreferrer">
              <img
                src="assets/images/current-donors/icrc_logo.png"
                alt="icrc-logo"
              />
            </a>
          </div>
          <div className="donor-logo">
            <a href="https://www.ifrc.org/" target="_blank" rel="noreferrer">
              <img
                src="assets/images/current-donors/ifrc_logo.png"
                alt="ifrc-logo"
              />
            </a>
          </div>
          <div className="donor-logo">
            <a href="https://www.redcross.sg/" target="_blank" rel="noreferrer">
              <img
                src="assets/images/current-donors/Singapore_Red_Cross.jpg"
                alt="singapore-rc-logo"
              />
            </a>
          </div>
          <div className="donor-logo">
            <a href="https://www.redcross.ca/" target="_blank" rel="noreferrer">
              <img
                src="assets/images/current-donors/canada_rc.png"
                alt="canada-rc-logo"
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
                src="assets/images/current-donors/qatar-red-crescent-logo.png"
                alt="qatar-rc-logo"
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
                src="assets/images/current-donors/microsoft-logo.png"
                alt="microsoft-logo"
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
                src="assets/images/current-donors/uber-logo.png"
                alt="uber-logo"
              />
            </a>
          </div>
        </div>
      </div>
    </Page>
  );
}
