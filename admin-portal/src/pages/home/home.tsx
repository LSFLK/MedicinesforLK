import React, { ReactElement, useEffect, useState } from "react";

import { useAuthContext, HttpRequestConfig } from "@asgardeo/auth-react";

import { PageSelection } from "../../types/pages";
import { Page } from "../../layout/page";
import AdminService from "../../apis/services";

import "./home.css";
import { AidPackage } from "types/AidPackage";
import { TableRow } from "./tableRow/tableRow";
import { TableRows } from "./tableRows/tableRows";
import { EmptyRow } from "./emptyRow";

interface HomePageProps { }

export function Home(params: HomePageProps) {

  const [aidPackages, setAidPackages] = useState<AidPackage[]>();
  const {
    state,
    httpRequest
  } = useAuthContext();

  useEffect(() => {
    if (state.isAuthenticated) {
      const fetchData = async () => {
        const config: HttpRequestConfig = {
          headers: {
            "accept": "application/json"
          },
          method: "GET",
          url: "https://9d2b57ae-4349-44f2-971c-106ae09d244d-dev.e1-us-east-azure.choreoapis.dev/qmov/admin-api/0.1.0/aidpackages"
        };
        const response = await httpRequest(config);
        if (response && response.data) {
          setAidPackages(response.data);
        }
      }

      fetchData().catch((reason: any) => {
        if (reason) {
          console.error(reason);
        }
      });
    }
  }, [state?.isAuthenticated]);

  return (
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
          {aidPackages && aidPackages.length > 0 && <TableRows aidPackages={aidPackages} />}
        </table>
      </div>
      <div className="noDataMessage">
        {(!aidPackages || aidPackages.length <= 0) && <EmptyRow />}
      </div>
    </div>
  );
}
