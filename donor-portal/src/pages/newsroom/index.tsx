import React from "react";
import HeroSection from "../layout/hero-section";
import bannerImage from "./images/banner.jpg";
import "./styles.css";

export default function NewsRoom() {
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
}
