import { FullBleedContainer } from "../layout/full-bleed-container";
import { HeaderImage } from "../layout/header-image";
import { Page } from "../layout/page";
import { InfoBoxContainer } from "../layout/info-box-container";
import { InfoBox } from "../layout/info-box" 
import "./styles.css";

export function Suppliers() {
  return (
    <Page className="suppliers">
      <HeaderImage imageUrl="http://www.thebetterindia.com/wp-content/uploads/2017/06/15392982_1463889036969736_4194093088591265874_o.jpg">
        <h1>Hospitals and Suppliers</h1>
      </HeaderImage>
      <div className="text-section">
        <p>
        We are continuously growing our network of hospitals and pharmaceutical 
        suppliers. Please contact us at <a href="mailto: inquiries@redcross.lk">inquiries@redcross.lk</a>  for details on 
        how to participate.
        </p>
      </div>
      <InfoBoxContainer>
            <InfoBox 
                  iconUrl="/assets/images/doctor.jpg"
                  text="ELIXIR provides an easy to use application to manage all your urgent supply needs. Contact us for details on how 
                        to create an account"
                  heading="Hospitals/Doctors"
                  link=""
            ></InfoBox>
            <InfoBox 
                  iconUrl="/assets/images/pharmacy.jpg"
                  text="ELIXIR would like to partner with you to source the needs of our hospitals and doctors. Contact us to onboard your 
                        inventory."
                  heading="Pharmaceutical Suppliers"
                  link=""
            ></InfoBox>
            <p className="inquiry">For all inquiries please emails us at  <a href="mailto: inquiries@redcross.lk">inquires@redcross.lk</a></p>

            

      </InfoBoxContainer>
      
    
    </Page>
  );
}


