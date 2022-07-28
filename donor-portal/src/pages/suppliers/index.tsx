import React from "react";
import HeaderImage from "../layout/header-image";
import Page from "../layout/page";
import InfoBoxContainer from "../layout/info-box-container";
import InfoBox from "../layout/info-box";
import "./styles.css";

export default function Suppliers() {
  return (
    <Page className="suppliers">
      <HeaderImage imageUrl="/assets/images/header-imgs/medical-suppliers-pills.jpg">
        <h1>Doctors and Suppliers</h1>
      </HeaderImage>
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
          iconUrl="/assets/images/doctor.jpg"
          text="ELIXIR provides an easy to use application to manage all your urgent supply needs. Contact us for details on how
                        to create an account"
          heading="Hospitals/Doctors"
          link="#"
        />
        <InfoBox
          iconUrl="/assets/images/pharmacy.jpg"
          text="ELIXIR would like to partner with you to source the needs of our hospitals and doctors. Contact us to onboard your
                        inventory."
          heading="Pharmaceutical Suppliers"
          link="#"
        />
        <p className="inquiry">
          For all inquiries, please email us at{" "}
          <a href="mailto: inquiries@redcross.lk">inquiries@redcross.lk</a>
        </p>
      </InfoBoxContainer>
    </Page>
  );
}
