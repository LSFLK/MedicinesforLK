import { FullBleedContainer } from "../layout/full-bleed-container";
import { HeaderImage } from "../layout/header-image";
import { Page } from "../layout/page";
import "./styles.css";

export function AboutUs() {
  return (
    <Page className="about-us">
      <HeaderImage imageUrl="https://images.unsplash.com/photo-1566140967404-b8b3932483f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">
        <h1>About Us</h1>
      </HeaderImage>
      <div className="video-section">
        <iframe
          className="video"
          height="315"
          src="https://www.youtube.com/embed/OKqIxmyZNTI"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-section">
        <h2>About Us</h2>
        <p>
          We are a group of volunteers from around the world supporting the Sri 
          Lanka Red Cross to address the acute medical supply shortage in our 
          motherland. Collectively we bring our skills in software development, 
          pharmaceutical supply chain logistics and disaster aid management to 
          develop a unique solution that can provide transparency for donors and 
          efficiency for medical providers. 
        </p>
        <p>
          In partnership with the Lanka Software Foundation, Watchdog, The Last Word, 
          the Ministry of Health, and the Medical Supply Division we are developing 
          an online platform to match financial contributions from the Sri Lankan diaspora, 
          charity organizations and businesses with the pharmaceutical demand needs from 
          hospitals across the nation. 
        </p>
        <p>  
          The Sri Lanka Red Cross serves to coordinate distribution activities on the ground 
          and helps perform auditing and monitoring actions to ensure donors receive 
          end-to-end visibility of shipments from suppliers  to those in need.
        </p>
      </div>
      <FullBleedContainer className="world-map-section">
        <img src="/assets/images/about-us/about-us-map.jpg" />
      </FullBleedContainer>
      <FullBleedContainer className="info-links-section">
        <InfoCard
          imageUrl="/assets/images/about-us/how-it-works.jpg"
          link="#"
        />
        <InfoCard
          imageUrl="/assets/images/about-us/join-our-team.jpg"
          link="#"
        />
        <InfoCard
          imageUrl="/assets/images/about-us/post-your-project.jpg"
          link="#"
        />
      </FullBleedContainer>
      <div className="text-section">
        <h2>Leadership</h2>
        <p>
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </p>
      </div>
      <FullBleedContainer className="leadership-image-section">
        <img src="/assets/images/about-us/leadership-images.jpg" />
      </FullBleedContainer>
      <div className="partner-section">
        <h2>Partners</h2>
        <div className="partner-card-container">
          <div className="partner-section-card">
            <img src="/assets/images/about-us/sl-red-cross-logo.jpg" alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis
            </p>
          </div>
          <div className="partner-section-card">
            <img src="/assets/images/about-us/lsf-logo.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis
            </p>
          </div>
          <div className="partner-section-card">
            <img src="/assets/images/about-us/the-last-word-logo.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis
            </p>
          </div>
        </div>
      </div>
      <FullBleedContainer className="full-width-section">
        <div className="full-width-section__inner_container">
          <p className="full-width-section__feature-text">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
      </FullBleedContainer>
    </Page>
  );
}

function InfoCard({ imageUrl, link }: { imageUrl: string; link: string }) {
  return (
    <a
      href={link}
      className="info-link-card"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="info-link-card__link-text">
        <span className="info-link-card__link-text__heading">How it</span>
        <span className="info-link-card__link-text__sub-heading">Works</span>
      </div>
      <span className="info-card__circle-arrow">&gt;</span>
    </a>
  );
}
