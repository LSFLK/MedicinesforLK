import { FullBleedContainer } from "../layout/full-bleed-container";
import { HeaderImage } from "../layout/header-image";
import { Page } from "../layout/page";
import "./styles.css";

export function NewsRoom() {
  return (
    <Page className="news-room">
      <HeaderImage imageUrl="https://images.unsplash.com/photo-1544991936-9464fa9919d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80">
        <div className="news-room__container">
          <h1>News Room</h1>
        </div>
      </HeaderImage>
      <div className="text-section">
        <h1>Media &amp; News</h1>

        <h2>Media Contacts</h2>

        <p>
          <strong>
            If you are looking for information or resources to help with
            COVID-19, please visit
          </strong>{" "}
          <a href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/coronavirus-safety.html">
            COVID-19 – Novel Coronavirus information page.
          </a>
        </p>
        <p>
          When personal disasters strike, the Red Cross provides food, shelter,
          clothing and essential supplies for up to 72 hours.
        </p>
        <p>
          <strong>
            If you have been affected by a personal disaster and require
            assistance, contact us:
          </strong>
        </p>
        <div className="contact-section">
          <strong>Colombo</strong>
          <span className="red">+94 xxxxxxxxxxx</span>
        </div>
        <div className="contact-section">
          <strong>Colombo</strong>
          <span className="red">+94 xxxxxxxxxxx</span>
        </div>
        <div className="contact-section">
          <strong>Colombo</strong>
          <span className="red">+94 xxxxxxxxxxx</span>
        </div>
      </div>
      <FullBleedContainer className="news-grid">
        <div
          className="news-grid__large-item"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1509099342178-e323b1717dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80")',
          }}
        >
          <h3>A News Article Title</h3>
        </div>
        <div
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1509099342178-e323b1717dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80")',
          }}
        >
          <h4>A News Article Title</h4>
        </div>
        <div
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1509099342178-e323b1717dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80")',
          }}
        >
          <h4>A News Article Title</h4>
        </div>
        <div
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1509099342178-e323b1717dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80")',
          }}
        >
          <h4>A News Article Title</h4>
        </div>
        <div
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1509099342178-e323b1717dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80")',
          }}
        >
          <h4>A News Article Title</h4>
        </div>
      </FullBleedContainer>
      <div className="news-article-list">
        <div className="news-article-list-item">
          <strong>
            Pension Fund Coalition for Inclusive Capitalism Releases Resource to
            Focus Investments on Long-term Value Creation
          </strong>
          <span className="red">May 16, 2022</span>
        </div>
        <div className="news-article-list-item">
          <strong>
            BCI Receives 2021 Pension Leadership Award for Sustainable Investing
          </strong>
          <span className="red">May 16, 2022</span>
        </div>
        <div className="news-article-list-item">
          <strong>
            BlackRock Subscribes to the Sustainable Development Goals Dataset of
            the
          </strong>
          <span className="red">May 16, 2022</span>
        </div>
        <div className="news-article-list-item">
          <strong>Paul Finch Reappointed to Board of Directors </strong>
          <span className="red">May 16, 2022</span>
        </div>
        <div className="news-article-list-item">
          <strong>BCI’s Return to Office Plan – Phase 4</strong>
          <span className="red">May 16, 2022</span>
        </div>
      </div>
    </Page>
  );
}
