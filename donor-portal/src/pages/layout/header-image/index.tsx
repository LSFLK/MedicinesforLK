import { FullBleedContainer } from "../full-bleed-container";
import "./styles.css";

export function HeaderImage({ imageUrl }: { imageUrl: string }) {
  return (
    <FullBleedContainer
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="header-image"
    />
  );
}
