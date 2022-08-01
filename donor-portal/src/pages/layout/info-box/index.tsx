import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function InfoBox({
  iconUrl,
  link,
  path,
  heading,
  text,
  buttonText,
}: {
  iconUrl: string;
  link?: string;
  path?: string;
  heading: string;
  text: React.ReactNode;
  buttonText?: string;
}) {
  return (
    <div className="info-box">
      <img src={iconUrl} alt="" />
      <h2>{heading}</h2>
      <p>{text}</p>
      {path && (
        <Link to={path}>
          <button type="button" className="btn">
            {buttonText}
          </button>
        </Link>
      )}
      {link && (
        <a href={link} target="_blank" rel="noreferrer">
          <button type="button" className="btn">
            {buttonText}
          </button>
        </a>
      )}
    </div>
  );
}
