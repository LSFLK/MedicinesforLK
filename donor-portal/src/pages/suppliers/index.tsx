import React from "react";
import HeroSection from "../layout/hero-section";
import InfoBoxContainer from "../layout/info-box-container";
import InfoBox from "../layout/info-box";
import bannerImage from "./images/banner.jpg";
import hospitalIcon from "./images/doctor.jpg";
import supplierIcon from "./images/pharmacy.jpg";
import "./styles.css";

export default function Suppliers() {
  return (
    <div className="suppliers">
      <HeroSection title="Hospitals & Suppliers" image={bannerImage} />
      <div className="main-container">
        <div className="text-section">
          <p>
            We are continuously growing our network of hospitals and
            pharmaceutical suppliers. Please contact us at{" "}
            <a href="mailto: elixir@redcross.lk ">elixir@redcross.lk </a> for
            details on how to participate.
          </p>
        </div>
        <InfoBoxContainer>
          <InfoBox
            iconUrl={hospitalIcon}
            text="Elixir provides an easy to use application to manage all your urgent supply needs. Contact us for details on how
                        to create an account."
            heading="Hospitals & Doctors"
            link="mailto:elixir@redcross.lk"
            buttonText="Email us"
          />
          <InfoBox
            iconUrl={supplierIcon}
            text="Elixir would like to partner with you to source the needs of our hospitals and doctors. Contact us to onboard your
                        inventory."
            heading="Pharmaceutical Suppliers"
            link="mailto:elixir@redcross.lk"
            buttonText="Email us"
          />
          <p className="inquiry">
            For all inquiries, please email us at{" "}
            <a href="mailto: elixir@redcross.lk">elixir@redcross.lk</a>
          </p>
        </InfoBoxContainer>
      </div>
    </div>
  );
}
