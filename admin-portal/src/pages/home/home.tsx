import React, { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuthContext, HttpRequestConfig } from "@asgardeo/auth-react";

import "./home.css";
import { AidPackage } from "types/AidPackage";
import { EmptyRow } from "./components/emptyRow/emptyRow";
import { Table } from "./components/table/table";
import { AidPackageService } from "apis/services/AidPackageService";

interface HomePageProps {}

export function Home(params: HomePageProps) {
  const [aidPackages, setAidPackages] = useState<AidPackage[]>([]);
  const [filteredAidPackages, setFilteredAidPackages] = useState<AidPackage[]>(
    []
  );
  const { state } = useAuthContext();

  useEffect(() => {
    if (state.isAuthenticated) {
      const fetchData = async () => {
        const response = await AidPackageService.getAidPackages();
        if (response && response.data) {
          setAidPackages(response.data);
          setFilteredAidPackages(response.data);
        }
      };

      fetchData().catch((reason: any) => {
        if (reason) {
          console.error(reason);
        }
      });
    }
  }, [state?.isAuthenticated]);

  function handleSearch(keyword: string) {
    keyword = keyword.trim().toLowerCase();
    const newlyFilteredPackages = aidPackages.filter((aidPackage) => {
      const supplier = aidPackage.aidPackageItems[0]?.quotation.supplier.name;
      return (
        aidPackage.name.toLowerCase().includes(keyword) ||
        aidPackage.status.toLowerCase().includes(keyword) ||
        supplier?.toLowerCase().includes(keyword)
      );
    });
    setFilteredAidPackages(newlyFilteredPackages);
  }

  return (
    <div className="pageContent">
      {(!aidPackages || aidPackages.length <= 0) && (
        <p>Loading Aid Packages...</p>
      )}
      {aidPackages && aidPackages.length > 0 && (
        <>
          <header className="pageHeader">
            <h1>Aid Packages</h1>
          </header>
          <div className="packageTableSearch">
            <div className="searchContainer">
              <img src="/assets/svg/search_icon.svg" />
              <input
                placeholder="Search"
                className="textField"
                onChange={(event) => handleSearch(event.target.value)}
              />
            </div>
          </div>
          <div className="packageTableContainer">
            <Table aidPackages={filteredAidPackages} />
          </div>
          <div className="noDataMessage">
            {(!filteredAidPackages || filteredAidPackages.length <= 0) && (
              <EmptyRow />
            )}
          </div>
        </>
      )}
    </div>
  );
}
