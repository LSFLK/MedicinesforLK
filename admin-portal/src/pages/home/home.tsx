import React, { useEffect, useRef, useState } from "react";
import { PageSelection } from "../../types/pages";
import { Page } from "../../layout/page";
import "./home.css";
import { AidPackageService } from "../../apis/services/AidPackageService";
import { AidPackage } from "../../types/AidPackage";
import { useNavigate } from "react-router-dom";

export function Home() {
  const aidPackages = useRef<AidPackage[]>([]);
  const [filteredAidPackages, setFilteredAidPackages] = useState<AidPackage[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await AidPackageService.getAidPackages();
      if (response.data) {
        aidPackages.current = response.data;
        setFilteredAidPackages(response.data);
      }
    };

    fetchData().catch(console.error);
  }, []);

  function handlePledgesButton(packageId: number) {
    navigate(`/packages/${packageId}`);
  }

  function handleDetailsButton(packageId: number) {
    navigate(`/packages/${packageId}/pledge-status`);
  }

  function handleSearch(keyword: string) {
    keyword = keyword.trim().toLowerCase();
    const newlyFilteredPackages = aidPackages.current.filter((aidPackage) => {
      return (
        aidPackage.name.toLowerCase().includes(keyword) ||
        aidPackage.status.toLowerCase().includes(keyword)
      );
    });
    setFilteredAidPackages(newlyFilteredPackages);
  }

  return (
    <Page selection={PageSelection.HOME}>
      <div className="pageContent">
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
          <table>
            <thead>
              <tr>
                <th>Aid Package</th>
                <th>Status</th>
                <th>Pledges</th>
                <th>Supplier</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredAidPackages.length == 0 && (
                <tr>
                  <td colSpan={5}>No data found</td>
                </tr>
              )}
              {filteredAidPackages.map((aidPackage) => {
                return (
                  <tr key={aidPackage.packageID}>
                    <td>{aidPackage.name}</td>
                    <td>{aidPackage.status}</td>
                    <td>
                      {(
                        (aidPackage.receivedAmount / aidPackage.goalAmount ||
                          0) * 100
                      ).toFixed(0)}
                      %
                    </td>
                    <td>--</td>
                    <td>
                      <button
                        onClick={() =>
                          handleDetailsButton(aidPackage.packageID)
                        }
                      >
                        Details
                      </button>
                      <button
                        onClick={() =>
                          handlePledgesButton(aidPackage.packageID)
                        }
                      >
                        Pledges
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
