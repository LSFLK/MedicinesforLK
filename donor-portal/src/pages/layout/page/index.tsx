import React from "react";

import "./styles.css";

interface PageProps {
  children: React.ReactNode;
}

export function Page(props: PageProps) {
  const { children } = props;

  return (
    <main className="main-container">{children}</main>
  );
}
