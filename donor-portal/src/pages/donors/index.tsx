import { FullBleedContainer } from "../layout/full-bleed-container";
import { HeaderImage } from "../layout/header-image";
import { Page } from "../layout/page";
import { InfoBoxContainer } from "../layout/info-box-container";
import { InfoBox } from "../layout/info-box" 
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
          register an account on Elixir. After you complete login, select a desired 
          aid package and enter a pledge amount. After the target donations for your 
          aid package has been reached we will contact you to arrange payment.
        </p>
      </div>
      <InfoBoxContainer>
            <InfoBox 
                  iconUrl="assets/images/charity2.jpg"
                  text="Click the login page to begin registration."
                  heading="Charities"
                  link="#"
            ></InfoBox>
            <InfoBox 
                  iconUrl="assets/images/gov.jpg"
                  text="Click the login page to begin registration."
                  heading="Government Embassies"
                  link="#"
            ></InfoBox>
            <InfoBox 
                  iconUrl="/assets/images/corporation.jpg"
                  text="Click the login page to begin registration."
                  heading="Foundations / Corporations"
                  link="#"
            ></InfoBox>
            <InfoBox 
                  iconUrl="/assets/images/individual_donor.jpg"
                  text="Donate to Elixir via our partner donor organizations"
                  heading="Individual Donors"
                  link="#"
            ></InfoBox>
            <p className="inquiry">For all inquiries please emails us at  <a href="mailto: inquires@redcross.lk">inquires@redcross.lk</a></p>

            

      </InfoBoxContainer>
    
    </Page>
  );
}


