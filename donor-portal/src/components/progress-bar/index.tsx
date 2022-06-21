/**
 * a simple progress bar component
 */
import { createRef, useEffect, useRef, useState } from "react";
import "./styles.css";
interface ProgressBarProps {
  max: number;
  current: number;
  className?: string;
}

export function SimpleProgressBar(props: ProgressBarProps) {
  const [innerWidth, setInnerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * calculate the progress bar inner width
   */
  useEffect(() => {
    if (containerRef.current) {
      const _totalWidth = containerRef.current.clientWidth;
      setInnerWidth((_totalWidth / props.max) * props.current);
    }
  }, [props, containerRef.current]);

  return (
    <div
      className={`simple-progressbar ${props.className || ""}`}
      ref={containerRef}
    >
      <div
        className="simple-progressbar-inner"
        style={{ width: innerWidth + "px" }}
      ></div>
    </div>
  );
}
