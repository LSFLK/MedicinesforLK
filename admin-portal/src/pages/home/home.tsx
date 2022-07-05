import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageSelection } from "../../types/pages";
import { Page } from "../../layout/page";
import { AidPackages } from "../../types/AidPackages";
import { TableRows } from "./tableRows/tableRows";
import "./home.css";
import { AidPackageService } from "../../apis/services/AidPackageService";

export function Home() {
  const [aidPackages, setAidPackages] = useState<AidPackages>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await AidPackageService.getAidPackages();
      if (response.data) {
        setAidPackages({ aidPackages: response.data });
      }
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Page selection={PageSelection.HOME}>
      <div className="pageContent">
        <header className="pageHeader">
          <h1>Aid Packages</h1>
        </header>
        <div className="packageTableSearch">
          <div className="searchContainer">
            <img src="/assets/svg/search_icon.svg" />
            <input placeholder="Search" className="textField" />
          </div>
        </div>
        <div className="packageTableContainer">
          <table>
            <tr>
              <th>Aid Package</th>
              <th>Status</th>
              <th>Pledges</th>
              <th>Supplier</th>
              <th></th>
            </tr>
            <TableRows aidPackages={aidPackages} />
          </table>
        </div>
      </div>
    </Page>
  );
}
