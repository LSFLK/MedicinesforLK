import "./styles.css";

export function InfoBox({ iconUrl, link, heading, text }: { iconUrl: string; link: string; heading: string; text: string}) {
      return (
        <div className={`info-box`}>
            <img src={iconUrl} alt="" />
            <h2>{heading}</h2>
            <p>{text}</p>
            {link!="#" && <a href={link}>
                  <button>Donate</button>
            </a> }
        </div>
      );
}