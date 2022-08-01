import React from "react";
import FullBleedContainer from "../layout/full-bleed-container";
import HeaderImage from "../layout/header-image";
import Page from "../layout/page";
import "./styles.css";

export default function AboutUs() {
  return (
    <Page className="about-us">
      <HeaderImage imageUrl="/assets/images/about-us/header.jpg">
        <div className="about-us-container">
          <h1>About Us</h1>
        </div>
      </HeaderImage>

      <h2>Our Approach</h2>
      <img src="/assets/images/about-us/our-approach.png" alt="our-approach" />

      <div className="container">
        <div className="accountability-and-transparency">
          <img
            src="/assets/images/about-us/accountability.png"
            alt="accountability"
          />

          <h2>Accountability</h2>
          <p>
            The Elixir team is motivated by the singular goal of alleviating the
            medical crisis in Sri Lanka. We are accountable internally, to one
            another and our partner organizations and to a multitude of
            volunteers who have invested considerable time and effort to create
            Elixir. We are also accountable to you, our donors, both individuals
            and organizations alike in executing our fiduciary responsibility to
            maximize the utility of your donations.
          </p>
        </div>
        <div className="middle-text-container">
          <span className="middle-text">&</span>
        </div>
        <div className="accountability-and-transparency">
          <img
            src="/assets/images/about-us/transparency.png"
            alt="transparency"
          />

          <h2>Transparency</h2>
          <p>
            Elixir&apos;s primary design goal is transparency. While the Sri
            Lanka Red Cross will monitor the flow of aid packages and provide
            daily status updates, we have also contracted the services of KPMG
            Sri Lanka, to perform an end-to-end audit of the Elixir process and
            finances. Our financial team will also publish the monthly statement
            of accounts on the Elixir website. We are committed to continuously
            improving our processes. Please contact us at elixir@redcross.lk
            should you have any questions or feedback for us.
          </p>
        </div>
      </div>

      <div className="leadership-section">
        <h2>Leadership Team</h2>
        <div className="profile-card-container">
          <div className="profile-card">
            <a href="https://www.linkedin.com/in/helani?originalSubdomain=lk">
              <img
                src="https://media-exp2.licdn.com/dms/image/C4E03AQFmqtvBrcTr7Q/profile-displayphoto-shrink_200_200/0/1517701214013?e=1661990400&v=beta&t=GZEGYiLe7Sw8b4qZwObptBAUjluXFeuriDULhrVDlKg"
                alt=""
              />
              <h3>Dr. Mahesh Gunasekara</h3>
              <p>Director General</p>
              <p>Sri Lanka Red Cross Society</p>
            </a>
          </div>
          <div className="profile-card">
            <a href="https://www.linkedin.com/in/helani?originalSubdomain=lk">
              <img
                src="https://media-exp2.licdn.com/dms/image/C4D03AQFJv69f--kU_A/profile-displayphoto-shrink_200_200/0/1516265094644?e=1661990400&v=beta&t=U3SB5Wv5EdTMTP5p9CN8Gq3h4wg9W9uBFkHX45nTOmg"
                alt=""
              />
              <h3>Helani Galpaya</h3>
              <p>Citizen Volunteer</p>
            </a>
          </div>
          <div className="profile-card">
            <a href="https://www.linkedin.com/in/ashokvasa/?originalSubdomain=ca">
              <img
                src="https://media-exp2.licdn.com/dms/image/C4E03AQHUMd0WcP3Trw/profile-displayphoto-shrink_200_200/0/1516242037146?e=1661990400&v=beta&t=I-6Lrm27tqvPE2eZd79lCkr3i6Pi9TjiUDxoJ8UVuFY"
                alt=""
              />
              <h3>Ashok Vasa</h3>
              <p>Founder/CEO</p>
              <p>Vasa Digital Architects</p>
            </a>
          </div>
        </div>
      </div>

      <div className="image-section">
        <img src="/assets/images/about-us/banner-two.jpg" alt="children" />
        <img src="/assets/images/about-us/banner-one.jpg" alt="people" />
      </div>

      <div className="partner-section">
        <h2>Partners</h2>
        <div className="partner-card-container">
          <div className="partner-section-card">
            <a href="https://opensource.lk/">
              <img src="/assets/images/about-us/lsf-logo.png" alt="" />
            </a>
            <p>
              LSF has been building large-scale open source systems for more
              than 15 years, with government and communities, to address a range
              of challenges from disaster management to elections, education to
              the environment.
            </p>
          </div>
          <div className="partner-section-card">
            <a href="https://sefglobal.org/">
              <img src="/assets/images/about-us/SEF_Logo.png" alt="" />
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
              <img src="/assets/images/about-us/watchdog-logo.png" alt="" />
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
                src="/assets/images/about-us/the-last-word-logo.png"
                alt=""
              />
            </a>
            <p>
              The Last Word are creatives and brand strategists whose work spans
              the breadth of brand architecture, design, digital marketing
              communications and user experience.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2>Volunteers</h2>
        <div className="container">
          <div className="volunteer-names">
            <p>Jayasanka Weerasinghe </p>
            <p>Nipuna Gunathilake</p>
            <p>Kalsha Samarajeewa</p>
            <p>Heshan Andrews</p>
            <p>Manoj Lakshan</p>
            <p>Randila Premarathne</p>
            <p>Anupama Pathirage</p>
            <p>Amila Jayasekara</p>
            <p>Marcus Chandradasa</p>
            <p>Ryan Kuruppu</p>
            <p>Shehan Kulathilake</p>
            <p>Ratnajothy Sangeethanan</p>
            <p>Sherazad Hamit</p>
            <p>Srinath Perera</p>
            <p>Samisa Abeysinghe</p>
            <p>Sanjiva Weerawarana</p>
            <p>Yujith Isura</p>
            <p>Kavishka Timashan</p>
            <p>Thisaru Guruge</p>
            <p>Tharindu Udupitiya</p>
            <p>Ayesh Almeida</p>
            <p>Dinuka Piyadigama</p>
          </div>
          <div className="volunteer-img-container">
            <img
              className="volunteer-img"
              src="/assets/images/about-us/volunteers.jpg"
              alt="our-approach"
            />
          </div>
          <div className="volunteer-names">
            <p>Ramindu Deshapriya</p>
            <p>Kajendran Alagaratnam</p>
            <p>Kanushka Gayan</p>
            <p>Madusha Gunasekara</p>
            <p>Charuka Karunanayake</p>
            <p>Nipun Sampath</p>
            <p>Manuranga Perera</p>
            <p>Sameera Jayasoma</p>
            <p>Ruhaim Izmeth</p>
            <p>Arosha Bandara</p>
            <p>Joys Chokatte</p>
            <p>Deepal Mody</p>
            <p>Yatin Mody</p>
            <p>Madri Perera</p>
            <p>Harindra Rajapakse</p>
            <p>Donny Surtani</p>
            <p>Priya Vasa</p>
            <p>Sanith Wijesinghe</p>
            <p>Lakshitha Surasinghe</p>
            <p>Namali Premawardhana</p>
            <p>Krishni Ratnayaka</p>
            <p>Avanthi Gunatilake</p>
          </div>
        </div>
      </div>

      <FullBleedContainer className="leadership-image-section">
        <img src="/assets/images/about-us/banner.jpg" alt="banner" />
      </FullBleedContainer>
    </Page>
  );
}
