import React from "react";
import HeaderImage from "../../layout/header-image";
import Page from "../../layout/page";
import "./styles.css";

export default function IndividualDonors() {
  return (
    <Page className="donors">
      <HeaderImage imageUrl="/assets/images/header-imgs/donors.jpg">
        <h1>Medicines for Sri Lanka</h1>
      </HeaderImage>
    </Page>
  );
}
