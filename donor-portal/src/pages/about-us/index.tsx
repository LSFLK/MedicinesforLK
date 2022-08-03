import React from "react";
import HeroSection from "../layout/hero-section";
import bannerImage from "./images/banner.jpg";
import ourApproachImage from "./images/our-approach.png";
import lsfLogo from "./images/lsf-logo.png";
import sefLogo from "./images/SEF_Logo.png";
import watchDogLogo from "./images/watchdog-logo.png";
import lastWordLogo from "./images/the-last-word-logo.png";
import "./styles.css";

export default function AboutUs() {
  return (
    <div className="about-us">
      <HeroSection image={bannerImage} title="About Us" />
      <div className="main-container">
        <h2>Our Approach</h2>
        <img src={ourApproachImage} alt="our-approach" />

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
              elixir@redcross.lk should you have any questions or feedback for
              us.
            </p>
          </div>
        </div>

        <div className="leadership-section">
          <h2>Leadership Team</h2>
          <div className="profile-card-container">
            <div className="profile-card">
              <a href="https://www.linkedin.com/in/helani?originalSubdomain=lk">
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
              {/* TODO: Add linkedin link */}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">
                <h3>Tharaka Samarasinghe</h3>
                <p>HR Assistant</p>
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
          </div>
        </div>

        <div className="partner-section">
          <h2>Partners</h2>
          <div className="partner-card-container">
            <div className="partner-section-card">
              <a href="https://opensource.lk/">
                <img src={lsfLogo} alt="LSF Logo" />
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
                <img src={sefLogo} alt="SEF Logo" />
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
                <img src={watchDogLogo} alt="Watchdog Logo" />
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
                <img src={lastWordLogo} alt="Last Word Logo" />
              </a>
              <p>
                The Last Word are creatives and brand strategists whose work
                spans the breadth of brand architecture, design, digital
                marketing communications and user experience.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2>Volunteers</h2>
          <div className="volunteers-section">
            <p>Anupama Pathirage</p>
            <p>Marcus Chandradasa</p>
            <p>Sanjiva Weerawarana</p>
            <p>Jayasanka Weerasinghe</p>
            <p>Samisa Abeysinghe</p>
            <p>Nipuna Gunathilake</p>
            <p>Randila Premarathne</p>
            <p>Kalsha Samarajeewa</p>
            <p>Heshan Andrews</p>
            <p>Amila Jayasekara</p>
            <p>Manuranga Perera</p>
            <p>Joys Chokatte</p>
            <p>Shehan Kulathilake</p>
            <p>Ratnajothy Sangeethanan</p>
            <p>Srinath Perera</p>
            <p>Anjula Samarasinghe</p>
            <p>Manoj Lakshan</p>
            <p>Yujith Isura</p>
            <p>Kavishka Timashan</p>
            <p>Thisaru Guruge</p>
            <p>Tharindu Udupitiya</p>
            <p>Ayesh Almeida</p>
            <p>Dinuka Piyadigama</p>
            <p>Ramindu Deshapriya</p>
            <p>Kajendran Alagaratnam</p>
            <p>Kanushka Gayan</p>
            <p>Madusha Gunasekara</p>
            <p>Charuka Karunanayake</p>
            <p>Nipun Sampath</p>
            <p>Sameera Jayasoma</p>
            <p>Ruhaim Izmeth</p>
            <p>Deepali Mody</p>
            <p>Yatin Mody</p>
            <p>Madri Perera</p>
            <p>Harindra Rajapakse</p>
            <p>Donny Surtani</p>
            <p>Priya Vasa</p>
            <p>Lakshitha Surasinghe</p>
            <p>Namali Premawardhana</p>
            <p>Krishni Ratnayaka</p>
            <p>Avanthi Gunatilake</p>
            <p>Ryan Kuruppu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
