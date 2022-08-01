import React from "react";
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
            src="assets/images/donating.png"
            alt="donating medical supplies"
          />
        </div>
        <div className="home-description-text">
          <h3>An Acute Medical Emergency</h3>
          <p>
            <strong>
              Sri Lanka lacks a coordinated response to address the overall
              medical needs of hospitals. Given the limited resources it is
              essential to optimize the demand and distribution of supplies to
              help avoid possible duplication, address gaps and avoid
              detrimental outcomes to citizens most in need.
            </strong>
          </p>
          <h3>An Alternative Approach</h3>
          <p>
            <strong>
              ELIXIR is a platform designed to meet this need. It is operated by
              the Sri Lanka Red Cross along with a network of volunteers and
              professionals to help improve the efficacy of donations. In
              partnership with the Sri Lanka Medical Supplies Division we have
              compiled aid packages that aggregate needs across multiple
              hospitals to help achieve bulk price discounts from suppliers. Our
              volunteers help negotiate prices and coordinate invoicing and
              shipping logistics. ELIXIR facilitates transparency and
              accountability throughout the entire supply chain.
            </strong>
          </p>
          <h3>Please Donate</h3>
          <p>
            <strong>
              Together we can do more. We are accepting donations from both
              organizations and individuals. Check out our aid packages below
              and click on the Donate button to get started.
            </strong>
          </p>
        </div>
      </div>
    </Page>
  );
}
