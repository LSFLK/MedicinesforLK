import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import "./styles.css";

export default function HeroSection({
  image,
  title,
  position,
}: {
  image: string;
  title: string;
  position?: string;
}) {
  return (
    <div
      className="hero-image"
      style={{
        backgroundImage: `linear-gradient(270deg,transparent,rgba(0,0,0,0.8)), url(${image})`,
        backgroundPosition: position || "center",
      }}
    >
      <div className="container">
        <div className="hero-text">
          <div className="title">{title}</div>

          <a
            href=" https://give.asia/campaign/medicince-for-sri-lanka-poject-elixir/donate?#/amount"
            className="btn"
          >
            Donate Now <FaAngleRight className="icon" />{" "}
          </a>
        </div>
      </div>
    </div>
  );
}
