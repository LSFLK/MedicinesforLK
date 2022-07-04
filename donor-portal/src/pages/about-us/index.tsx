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
      {/* <FullBleedContainer className="info-links-section">
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
      </FullBleedContainer> */}
      <div className="leadership-section">
        <h2>Leadership</h2>
        <div className="profile-card-container">
          <div className="profile-card">
            <a href="https://www.linkedin.com/in/helani?originalSubdomain=lk">
              <img src="https://media-exp2.licdn.com/dms/image/C4E03AQFmqtvBrcTr7Q/profile-displayphoto-shrink_200_200/0/1517701214013?e=1661990400&v=beta&t=GZEGYiLe7Sw8b4qZwObptBAUjluXFeuriDULhrVDlKg" alt="" />
              <h3>Dr. Mahesh Gunasekara</h3>
              <p>Director General</p>
              <p>Sri Lanka Red Cross Society</p>
            </a>
          </div>
          <div className="profile-card">
            <a href="https://www.linkedin.com/in/helani?originalSubdomain=lk">
              <img src="https://media-exp2.licdn.com/dms/image/C4D03AQFJv69f--kU_A/profile-displayphoto-shrink_200_200/0/1516265094644?e=1661990400&v=beta&t=U3SB5Wv5EdTMTP5p9CN8Gq3h4wg9W9uBFkHX45nTOmg" alt="" />
              <h3>Helani Galpaya</h3>
              <p>Citizen Volunteer</p>
            </a>
          </div>
          <div className="profile-card">
            <a href="https://www.linkedin.com/in/ashokvasa/?originalSubdomain=ca">
              <img src="https://media-exp2.licdn.com/dms/image/C4E03AQHUMd0WcP3Trw/profile-displayphoto-shrink_200_200/0/1516242037146?e=1661990400&v=beta&t=I-6Lrm27tqvPE2eZd79lCkr3i6Pi9TjiUDxoJ8UVuFY" alt="" />
              <h3>Ashok Vasa</h3>
              <p>Founder/CEO</p>
              <p>Vasa Digital Architects</p>
            </a>
          </div>
        </div>
      </div>
      <FullBleedContainer className="leadership-image-section">
        <img src="/assets/images/about-us/leadership-images.jpg" />
      </FullBleedContainer>
      <div className="partner-section">
        <h2>Partners</h2>
        <div className="partner-card-container">
          <div className="partner-section-card">
            <a href="https://www.redcross.lk/">
              <img src="/assets/images/about-us/sl-red-cross-logo.jpg" alt="" />
            </a>
            <p>
              LSF has been building large-scale open source systems for more than 
              15 years, with government and communities, to address a range of 
              challenges from disaster management to elections, education to the 
              environment.
            </p>
          </div>
          <div className="partner-section-card">
            <a href="https://longform.watchdog.team/about-us">
              <img src="/assets/images/about-us/lsf-logo.png" alt="" />
            </a>
            <p>
              Watchdog is a multidisciplinary team of fact checkers, journalists, 
              researchers and software engineers. We hunt hoaxes and misinformation, 
              investigate matters of public welfare, and build software tools that 
              help operations like ours.
            </p>
          </div>
          <div className="partner-section-card">
            <a href="https://wearethelastword.com/">
              <img src="/assets/images/about-us/the-last-word-logo.png" alt="" /> 
            </a>
            <p>
              We are creatives and brand strategists whose work spans the breadth of 
              brand architecture, design, digital marketing communications and user 
              experience.
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