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
          <span>Mr. Naveendra Senarathne</span>
          <span>Media Focal Point</span>
          <span>[T] +94 71 433 3331</span>
          <span>
            [E]{" "}
            <a href="mailto:naveendra.senarathna@redcross.lk">
              naveendra.senarathna@redcross.lk
            </a>
          </span>
        </div>
        <div className="contact-section">
          <span>Sri Lanka Red Cross Society</span>
          <span>National Headquarters</span>
          <span>106, Dharmapala Mawatha,</span>
          <span>Colombo 07, Sri Lanka</span>
          <span>[T] +94 11 269 1095 , +94 11 269 1095</span>
          <span>[F] +94 11 268 2675</span>
          <span>
            [E] <a href="mailto:info@redcross.lk">info@redcross.lk </a>
          </span>
        </div>
        <div className="contact-section">
          <span>Zafran Packeerally</span>
          <span>[T] +94 70 378 8685</span>
          <span>
            [E]{""}
            <a href="mailto:zafran.packeerally@redcross.lk">
              zafran.packeerally@redcross.lk
            </a>
          </span>
        </div>
      </div>
      <div className="video-section">
        <iframe
          className="video"
          src="https://www.youtube.com/embed/eU9WY5fUs8w"
          title="For us, its about serving people (Progress Video 2022)"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
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
