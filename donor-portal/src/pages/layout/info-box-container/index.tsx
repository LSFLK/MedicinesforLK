import React from "react";
import "./styles.css";

export function InfoBoxContainer({children, style = {}, className}: {children?: React.ReactNode, style?: React.CSSProperties, className?: string}) {
  return (
    <div className={`info-box-container ${className}`} style={style}>{children}</div>
  );
}
