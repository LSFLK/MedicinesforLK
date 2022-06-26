import React from "react";

import "./styles.css";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export function Page(props: PageProps) {
  const { children, className } = props;

  return <main className={`main-container ${className}`}>{children}</main>;
}
