import React from "react";
import HeaderImage from "../layout/header-image";
import Page from "../layout/page";
import InfoBoxContainer from "../layout/info-box-container";
import InfoBox from "../layout/info-box";
import "./styles.css";

export default function Donors() {
  return (
    <Page className="donors">
      <HeaderImage imageUrl="/assets/images/header-imgs/donors.jpg">
        <h1>How to Donate</h1>
      </HeaderImage>
      <div className="text-section">
        <p>
          If you represent an organization please click on the ‘Login’ button to
          register an account on Elixir. After you complete login, select a
          desired aid package and enter a pledge amount. After the target
          donations for your aid package has been reached we will contact you to
          arrange payment.
        </p>
      </div>
      <InfoBoxContainer>
        <InfoBox
          iconUrl="assets/images/charity2.jpg"
          text="Navigate to the login page to begin registration"
          heading="Charities, Foundations and Corporations"
          link="/login"
          buttonText="Login"
        />
        <InfoBox
          iconUrl="/assets/images/individual_donor.jpg"
          text="Donate to Elixir via our partner donor organizations"
          heading="Individual Donors"
          link="/donors/individual"
          buttonText="Donate"
        />
        <p className="inquiry">
          For all inquiries, please email us at{" "}
          <a href="mailto: inquiries@redcross.lk">inquiries@redcross.lk</a>
        </p>
      </InfoBoxContainer>
    </Page>
  );
}
