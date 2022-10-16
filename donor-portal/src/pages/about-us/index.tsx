import React from "react";
import HeroSection from "../layout/hero-section";
import bannerImage from "./images/banner.jpg";
import ourApproachImage from "./images/our-approach.png";
import slRedCrossLogo from "./images/sl-redcross-logo.png";
import lsfLogo from "./images/lsf-logo.png";
import sefLogo from "./images/SEF_Logo.png";
import hardTalkLogo from "./images/hardTalk.jpeg";
import watchDogLogo from "./images/watchdog-logo.png";
import lastWordLogo from "./images/the-last-word-logo.png";
import wso2logo from "./images/wso2.png";
import "./styles.css";

const volunteers = [
  "Anupama Pathirage",
  "Marcus Chandradasa",
  "Dr. Sanjiva Weerawarana",
  "Jayasanka Weerasinghe",
  "Samisa Abeysinghe",
  "Nipuna Gunathilake",
  "Randila Premarathne",
  "Kalsha Samarajeewa",
  "Heshan Andrews",
  "Amila Jayasekara",
  "Manuranga Perera",
  "Joys Chokatte",
  "Shehan Kulathilake",
  "Ratnajothy Sangeethanan",
  "Srinath Perera",
  "Anjula Samarasinghe",
  "Manoj Lakshan",
  "Yujith Isura",
  "Kavishka Timashan",
  "Thisaru Guruge",
  "Tharindu Udupitiya",
  "Ayesh Almeida",
  "Dinuka Piyadigama",
  "Kanushka Gayan",
  "Madusha Gunasekara",
  "Nipun Sampath",
  "Sameera Jayasoma",
  "Ruhaim Izmeth",
  "Deepali Mody",
  "Yatin Mody",
  "Madri Perera",
  "Donny Surtani",
  "Priya Vasa",
  "Lakshitha Surasinghe",
  "Namali Premawardhana",
  "Avanthi Gunatilake",
  "Ryan Kuruppu",
  "Dr. Natasha Perera",
  "Buddhi Weerasekera",
  "Dllina Bandara",
  "Sasindu Alahakoon",
  "Nilesh Jayanandana",
  "Ryan Kuruppu",
];

const AboutUs = React.memo(() => {
  return (
    <div className="about-us">
      <HeroSection image={bannerImage} title="About Us" position="top left" />
      <div className="main-container">
        <p>
          <br />
          We are a team of volunteers from around the world working to address
          the acute medical supply shortage in our motherland. Collectively we
          have brought our skills in software development, pharmaceutical supply
          chain logistics and disaster aid management to develop a unique
          solution that provides transparency to donors and efficiency for
          medical service providers.
        </p>
        <h2>Our Approach</h2>
        <p>
          In partnership with the Sri Lanka Red Cross, Ministry of Health, the
          Medical Supply Division, Medical Colleges, Lanka Software Foundation,
          and The Last Word, we have developed Elixir, an online platform that
          matches financial contributions from individuals, charity
          organizations and businesses with the pharmaceutical needs from
          hospitals across the nation. Elixir coordinates the activities of our
          partners throughout the lifecycle of an aid package as shown below.
        </p>

        <div>
          <img
            src={ourApproachImage}
            alt="our-approach"
            className="our-approach"
            decoding="async"
          />
        </div>

        <div className="accountability-and-transparency-section">
          <div className="accountability-and-transparency">
            <h2>Accountability</h2>
            <p>
              The Elixir team is motivated by the singular goal of alleviating
              the medical crisis in Sri Lanka. We are accountable internally, to
              one another and our partner organizations and to a multitude of
              volunteers who have invested considerable time and effort to
              create Elixir. We are also accountable to you, our donors, both
              individuals and organizations alike in executing our fiduciary
              responsibility to maximize the utility of your donations.
            </p>
          </div>
          <div className="accountability-and-transparency">
            <h2>Transparency</h2>
            <p>
              Elixir&apos;s primary design goal is transparency. While the Sri
              Lanka Red Cross will monitor the flow of aid packages and provide
              daily status updates, we have also contracted the services of KPMG
              Sri Lanka, to perform an end-to-end audit of the Elixir process
              and finances. Our financial team will also publish the monthly
              statement of accounts on the Elixir website. We are committed to
              continuously improving our processes. Please contact us at
              <a href="mailto: elixir@redcross.lk "> elixir@redcross.lk </a>
              should you have any questions or feedback for us.
            </p>
          </div>
        </div>

        <div className="leadership-section">
          <h2>Leadership Team</h2>
          <div className="profile-card-container">
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/dr-mahesh-gunasekara-2b38526/">
                <h3>Dr. Mahesh Gunasekara</h3>
                <p>Director General</p>
                <p>Sri Lanka Red Cross Society</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/helani?originalSubdomain=lk">
                <h3>Helani Galpaya</h3>
                <p>Citizen Volunteer</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/tharaka-samarasinghe-3b7819a8/">
                <h3>Tharaka Samarasinghe</h3>
                <p>Coordinator to the Director General&apos;s Office</p>
                <p>Sri Lanka Red Cross Society</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/ashokvasa/?originalSubdomain=ca">
                <h3>Ashok Vasa</h3>
                <p>Founder/CEO</p>
                <p>Vasa Digital Architects</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/krishni-ratnayaka-9a977916b/">
                <h3>Krishni Ratnayaka</h3>
                <p>Consultant Legal Affairs</p>
                <p>Sri Lanka Red Cross Society</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/sherazadhamit/">
                <h3>Sherazad Hamit</h3>
                <p>Executive Director</p>
                <p>Lanka Software Foundation</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/akbandara/">
                <h3>Prof. Arosha Bandara</h3>
                <p>Professor of Software Engineering </p>
                <p>The Open University, UK</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/sanithw/">
                <h3>Dr. Sanith Wijesinghe</h3>
                <p>Technical Fellow</p>
                <p>The MITRE Corporation, USA.</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/mushthak">
                <h3>Mushthak Ahamed</h3>
                <p>Chief Operating Officer</p>
                <p>HardTalk PR</p>
              </a>
            </div>
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/sanjivaweerawarana/">
                <h3>Sanjiva Weerawarana, PhD</h3>
                <p>Founder, Chairman & CEO</p>
                <p>WSO2</p>
              </a>
            </div>
            <div className="profile-card">
              <h3>Dr. Natasha Perera</h3>
              <p>Medical Coordinator</p>
              <p>Red Cross Elixir Project</p>
            </div>
          </div>
        </div>

        <div className="partner-section">
          <h2>Partners</h2>
          <div className="partner-card-container">
            <div className="partner-section-card">
              <a href="https://www.redcross.lk/">
                <img
                  src={slRedCrossLogo}
                  alt="SL Red Cross Logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
              <p>
                The Sri Lanka Red Cross Society has operated since 1936. We
                focus on Disaster Management, Health, Organization Development,
                Humanitarian Values, Communication, Finance, and Transportation.
                The SLRCS covers all 25 administrative Districts of the country
                and has 25 branches a total membership of 100,000 and 6,500
                volunteers.
              </p>
            </div>
            <div className="partner-section-card">
              <a href="https://opensource.lk/">
                <img
                  src={lsfLogo}
                  alt="LSF Logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
              <p>
                LSF has been building large-scale open source systems for more
                than 15 years, with government and communities, to address a
                range of challenges from disaster management to elections,
                education to the environment.
              </p>
            </div>
            <div className="partner-section-card">
              <a href="https://sefglobal.org/">
                <img
                  src={sefLogo}
                  alt="SEF Logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
              <p>
                Sustainable Education Foundation (SEF) helps local students
                connect with industry experts and academics around the world for
                mentoring and career opportunities. SEF also supports Sri Lankan
                researchers by popularising their work and connecting them with
                undergraduate researchers for collaborations.
              </p>
            </div>
            <div className="partner-section-card">
              <a href="https://longform.watchdog.team/about-us">
                <img
                  src={watchDogLogo}
                  alt="Watchdog Logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
              <p>
                Watchdog is a multidisciplinary team of fact checkers,
                journalists, researchers and software engineers. We hunt hoaxes
                and misinformation, investigate matters of public welfare, and
                build software tools that help operations like ours.
              </p>
            </div>
            <div className="partner-section-card">
              <a href="https://wearethelastword.com/">
                <img
                  src={lastWordLogo}
                  alt="Last Word Logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
              <p>
                The Last Word are creatives and brand strategists whose work
                spans the breadth of brand architecture, design, digital
                marketing communications and user experience.
              </p>
            </div>
            <div className="partner-section-card">
              <a href="https://wso2.com/">
                <img
                  src={wso2logo}
                  alt="WSO2 Logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
              <p>
                Founded in 2005, WSO2 enables the composable enterprise. WSO2’s
                open source, API-first, and decentralized approach helps
                developers and architects to be more productive and rapidly
                build digital products to meet demand.
              </p>
            </div>
            <div className="partner-section-card">
              <a href="https://www.hardtalk.lk/">
                <img
                  src={hardTalkLogo}
                  alt="HardTalk Logo"
                  decoding="async"
                  loading="lazy"
                />
              </a>
              <p>
                HardTalk is a specialized Public Relations company, operating in
                strategic communications (traditional /digital). HardTalk pairs
                local insights with global best practices to deliver customized
                solutions and ensure organizations build the right bridges with
                the desired audiences. We are in the business of impactful
                persuasion and meaningful relationships.
              </p>
            </div>
          </div>
          <h2>Volunteers</h2>
          <ul className="volunteers-section">
            {volunteers.map((volunteer) => (
              <li key={volunteer}>{volunteer}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default AboutUs;
