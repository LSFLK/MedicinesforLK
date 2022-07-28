/**
 * a simple progress bar component
 */
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

interface ProgressBarProps {
  max: number;
  current: number;
  className?: string;
}

export default function SimpleProgressBar({
  max,
  current,
  className,
}: ProgressBarProps) {
  const [innerWidth, setInnerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * calculate the progress bar inner width
   */
  useEffect(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.clientWidth;
      setInnerWidth(Math.min(totalWidth * (current / max), totalWidth));
    }
  }, [max, current, className, containerRef.current]);

  return (
    <div className={`simple-progressbar ${className || ""}`} ref={containerRef}>
      <div
        className="simple-progressbar-inner"
        style={{ width: `${innerWidth}px` }}
      />
    </div>
  );
}
