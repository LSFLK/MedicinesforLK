import React, { useEffect, useState } from "react";
import { PageSelection } from "../../types/pages";
import { Page } from "../../layout/page";
import "./home.css";
import { AidPackageService } from "../../apis/services/AidPackageService";
import {AidPackage} from "../../types/AidPackage";
import {useNavigate} from "react-router-dom";

export function Home() {
  const [aidPackages, setAidPackages] = useState<AidPackage[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await AidPackageService.getAidPackages();
      if (response.data) {
        setAidPackages(response.data);
      }
    };

    fetchData().catch(console.error);
  }, []);

  function handlePledgesButton(packageId: number) {
    navigate(`/packages/${packageId}`)
  }

  function handleDetailsButton(packageId: number) {
    navigate(`/packages/${packageId}/pledge-status`)
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
            {aidPackages.length == 0 && (
                <div>No data found</div>
            )}
            {aidPackages.map((aidPackage) => {
              return (
                  <tr>
                    <td>{aidPackage.name}</td>
                    <td>{aidPackage.status}</td>
                    <td>
                      {(
                          (aidPackage.receivedAmount / aidPackage.goalAmount || 0) * 100
                      ).toFixed(0)}
                      %
                    </td>
                    <td>--</td>
                    <td>
                      <button
                          onClick={() => handleDetailsButton(aidPackage.packageID)}
                      >
                        Details
                      </button>
                      <button
                          onClick={() => handlePledgesButton(aidPackage.packageID)}
                      >
                        Pledges
                      </button>
                    </td>
                  </tr>
              );
            })}
          </table>
        </div>
      </div>
    </Page>
  );
}
