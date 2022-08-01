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
          We have a unique approach to receiving donations that is geared to
          help maximize transparency and accountability. Each aid package has a
          target donation goal that must be reached before being submitted as a
          purchase order to our suppliers. The Elixir platform tracks the aid
          package throughout its lifecycle and provides status at each stage of
          invoicing, shipping and delivery.
        </p>
      </div>
      <InfoBoxContainer>
        <InfoBox
          iconUrl="assets/images/charity2.jpg"
          text={
            <span>
              We have a 2-step process that allows you to first pledge your
              support to a specific aid package and then arrange for payment
              once the target threshold is reached. Please email us at:
              <a href="mailto:elixir@redcross.lk">elixir@redcross.lk</a> so that
              we can create your Elixir account.
            </span>
          }
          heading="For Organizations
          "
          path="/login"
          buttonText="Login"
        />
        <InfoBox
          iconUrl="/assets/images/individual_donor.jpg"
          text={
            <span>
              Please donate using our secure site:{" "}
              <a href="https://slredcross.give.asia/">
                https://slredcross.give.asia/
              </a>
              We are currently accepting donations to a general fund that will
              support multiple aid packages.
            </span>
          }
          heading="For Individuals"
          path="/donors/individual"
          buttonText="Donate"
        />
        <p className="inquiry">
          For all inquiries, please email us at{" "}
          <a href="mailto: elixir@redcross.lk">elixir@redcross.lk</a>
        </p>
      </InfoBoxContainer>
    </Page>
  );
}
