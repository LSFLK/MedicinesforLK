import { Link } from "react-router-dom";
import "./styles.css";

export function InfoBox({
  iconUrl,
  link,
  heading,
  text,
}: {
  iconUrl: string;
  link: string;
  heading: string;
  text: string;
}) {
  return (
    <div className={`info-box`}>
      <img src={iconUrl} alt="" />
      <h2>{heading}</h2>
      <p>{text}</p>
      {link != "#" && (
        <Link to={link}>
          <button>Donate</button>
        </Link>
      )}
    </div>
  );
}
