import { FullBleedContainer } from "../layout/full-bleed-container";
import { HeaderImage } from "../layout/header-image";
import { Page } from "../layout/page";
import { InfoBoxContainer } from "../layout/info-box-container";
import { InfoBox } from "../layout/info-box";
import "./styles.css";

export function Donors() {
  return (
    <Page className="donors">
      <HeaderImage imageUrl="https://media.capc.org/images/AdobeStock_274131656.original.original.jpg">
        <h1>Donors</h1>
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
          heading="Charities"
          link="/login"
          buttonText="Login"
        ></InfoBox>
        <InfoBox
          iconUrl="assets/images/gov.jpg"
          text="Navigate to the login page to begin registration"
          heading="Government Embassies"
          link="/login"
          buttonText="Login"
        ></InfoBox>
        <InfoBox
          iconUrl="/assets/images/corporation.jpg"
          text="Navigate to the login page to begin registration"
          heading="Foundations / Corporations"
          link="/login"
          buttonText="Login"
        ></InfoBox>
        <InfoBox
          iconUrl="/assets/images/individual_donor.jpg"
          text="Donate to Elixir via our partner donor organizations"
          heading="Individual Donors"
          link="/donate-now"
          buttonText="Donate"
        ></InfoBox>
        <p className="inquiry">
          For all inquiries, please email us at{" "}
          <a href="mailto: inquiries@redcross.lk">inquiries@redcross.lk</a>
        </p>
      </InfoBoxContainer>
    </Page>
  );
}
