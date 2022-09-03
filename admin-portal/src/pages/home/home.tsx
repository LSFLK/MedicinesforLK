import React, { useEffect, useState } from "react";

import { useAuthContext } from "@asgardeo/auth-react";

import "./home.css";
import { AidPackage } from "../../types/AidPackage";
import AidPackageService from "../../apis/services/AidPackageService";
import EmptyRow from "./components/emptyRow/emptyRow";
import Table from "./components/table/table";

export default function Home() {
  const [aidPackages, setAidPackages] = useState<AidPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredAidPackages, setFilteredAidPackages] = useState<AidPackage[]>(
    []
  );
  const { state } = useAuthContext();

  useEffect(() => {
    if (state.isAuthenticated) {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await AidPackageService.getAidPackages();
        if (response && response.data) {
          setAidPackages(response.data);
          setFilteredAidPackages(response.data);
        }
        setIsLoading(false);
      };

      fetchData().catch((reason: any) => {
        if (reason) {
          console.error(reason);
        }
        setIsLoading(false);
      });
    }
  }, [state?.isAuthenticated]);

  function handleSearch(keyword: string) {
    const searchText = keyword.trim().toLowerCase();
    const newlyFilteredPackages = aidPackages.filter((aidPackage) => {
      const supplier = aidPackage.aidPackageItems[0]?.quotation.supplier.name;
      return (
        aidPackage.name.toLowerCase().includes(searchText) ||
        aidPackage.status.toLowerCase().includes(searchText) ||
        supplier?.toLowerCase().includes(searchText)
      );
    });
    setFilteredAidPackages(newlyFilteredPackages);
  }

  return (
    <div className="pageContent">
      <header className="pageHeader">
        <h1>Aid Packages</h1>
      </header>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !aidPackages.length && <p>There are no aid packages</p>}
      {aidPackages && aidPackages.length > 0 && (
        <>
          <div className="packageTableSearch">
            <div className="searchContainer">
              <img src="/assets/svg/search_icon.svg" alt="search-icon" decoding="async" />
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
