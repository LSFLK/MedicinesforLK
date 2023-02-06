import React from "react";
import HeroSection from "../layout/hero-section";
import bannerImage from "./images/banner.jpg";
import pressReleaseEnglish from "./static/press-release-english.pdf";
import pressReleaseSinhala from "./static/press-release-sinhala.pdf";
import pressReleaseTamil from "./static/press-release-tamil.pdf";
import "./styles.css";
import kandyDonationImage from "./images/kandy_donation.jpg";
import microsoftDonation from "./images/microsoft_donation.jpg";
import singaporeRedCrossDonation from "./images/singapore_red_cross_donation.jpg";

const NewsRoom = React.memo(() => {
  return (
    <div className="news-room">
      <HeroSection title="News Room" image={bannerImage} />
      <div className="main-container">
        <div className="text-section">
          <h2>Media Contacts</h2>
          <p className="sub-title">
            <strong>For all media inquiries please contact us below:</strong>
          </p>
          <div className="contact-section">
            <span>Mr. Tharaka Samarasinghe</span>
            <span>Sri Lanka Red Cross Society</span>
            <span>National Headquarters</span>
            <span>106, Dharmapala Mawatha,</span>
            <span>Colombo 07, Sri Lanka</span>
            <span>[T] +94 11 269 1095 , +94 11 269 1095</span>
            <span>[F] +94 11 268 2675</span>
            <span>
              [E] <a href="mailto:elixir@redcross.lk">elixir@redcross.lk</a>
            </span>
          </div>
        </div>

        <div className="news-article-list">
          <h2 className="news-title">News </h2>
          <div className="news-article-list-item">
            <a
              href="https://www.facebook.com/133902706641597/posts/pfbid02vuZFpZdr6BVaGFtRTTfkWE3NnZKxcp3NtzLG9JKy1UhWvY2AxCTa2ZqYFzzxZ6mHl/?mibextid=Nif5oz"
              target="_blank"
              rel="noreferrer"
            >
              <span className="red">January 24, 2023</span>
              <p>
                The Singapore Red Cross recently donated medicine and medical
                equipment to the Ministry of Health valued at over USD 85,000
                towards resolving the ongoing crisis.
              </p>
              <img
                src={singaporeRedCrossDonation}
                alt="singapore_red_cross_donation"
                decoding="async"
                loading="lazy"
              />
            </a>
          </div>
          <div className="news-article-list-item">
            <a
              href="https://www.facebook.com/133902706641597/posts/pfbid0Cw9T4BJgc63CvAnieRpNF99GhKdJASpsT9xQKPBJtqPXsTQFoBfntRmd3GHBARhfl/?mibextid=Nif5oz"
              target="_blank"
              rel="noreferrer"
            >
              <span className="red">January 11th, 2023</span>
              <p>
                Vital surgical supplies valued at over 2 million rupees handed
                over to the Kandy National Hospital through the Sri Lanka Red
                Cross Society.
              </p>
              <img
                src={kandyDonationImage}
                alt="kandy_donation"
                decoding="async"
                loading="lazy"
              />
            </a>
          </div>
          <div className="news-article-list-item">
            <a
              href="https://www.facebook.com/133902706641597/posts/pfbid02puSRKL5kprdmM23t5gPqwN2jRDyGCqvU7LMRGJUeS99RqAwqtWJnzat6PyBciqnl/?sfnsn=mo"
              target="_blank"
              rel="noreferrer"
            >
              <span className="red">January 9th, 2023</span>
              <p>
                Microsoft donates medicines worth USD 20,000 through Elixir
                system, to help overcome the current medicine shortage in Sri
                Lanka.
              </p>
              <img
                src={microsoftDonation}
                alt="kandy_donation"
                decoding="async"
                loading="lazy"
              />
            </a>
          </div>
          <div className="news-article-list-item">
            <span className="red">October 19th 2022</span>
            <p>
              Sri Lanka Red Cross Society Launches Elixir – Sri Lanka’s First
              Ever Medical Donation Matching Platform
            </p>
            <div className="press-release">
              <a href={pressReleaseEnglish} target="_blank" rel="noreferrer">
                English
              </a>
              &nbsp;
              <a href={pressReleaseSinhala} target="_blank" rel="noreferrer">
                Sinhala
              </a>
              &nbsp;
              <a href={pressReleaseTamil} target="_blank" rel="noreferrer">
                Tamil
              </a>
            </div>
          </div>
          <div className="news-article-list-item">
            <a
              href="https://www.facebook.com/srilankaredcross/posts/pfbid0cC25DMKmdghvTXLhJBQxscS3buPkLuB3Fu5PLCPBDmmnuEQEZGoXFRdRDBfKuvnjl"
              target="_blank"
              rel="noreferrer"
            >
              <span className="red">July 29th 2022</span>
              <p>
                The International Committee of the Red Cross has donated a
                consignment of 10,000 blood bags to the National Blood Bank.
              </p>
            </a>
          </div>
          <div className="news-article-list-item">
            <a
              href="https://www.facebook.com/srilankaredcross/posts/pfbid02Lgtf7Zh6wLDjfgyBA53hPWxMDYKjR5TnbtDNY4RZD8sw6Rnd1Wj9HPfgCcfCzLTCl
              "
              target="_blank"
              rel="noreferrer"
            >
              <span className="red">June 9th 2022</span>
              <p>
                Sri Lanka Red Cross Society - Colombo Branch organised a blood
                donation camp in Colombo.
              </p>
            </a>
          </div>
          <div className="news-article-list-item">
            <span className="red">May 31st 2022</span>
            <a
              href="
              https://www.facebook.com/srilankaredcross/posts/pfbid0EdnJsD7qfC7Bc432CoTUtT2oBVM926G44gnTEqTfzJvGRGwRujtpajQivWpU6tHDl
              "
              target="_blank"
              rel="noreferrer"
            >
              <p>
                Singapore Red Cross donated medicines worth 68,500 SGD (approx.
                $50,000 USD).
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NewsRoom;
