import React from "react";
import "./styles.css";

export function FullBleedContainer({
  children,
  style = {},
  className,
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div className={`full-bleed-container ${className}`} style={style}>
      {children}
    </div>
  );
}
