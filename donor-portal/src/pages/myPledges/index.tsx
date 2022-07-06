import "./styles.css";
import { useEffect, useState } from "react";
import { AidPackage } from "../../types/AidPackage";
import { Page } from "../layout/page";

// Function to add some dummy data
function fetchAidPackages(): Promise<AidPackage[]> {
  const aidPackages: AidPackage[] = [];
  for (let i = 1; i <= 5; i++) {
    aidPackages.push({
      packageId: i,
      name: `Aid Pack ${i}`,
      description: "",
      supplierId: i,
      status: AidPackage.Status.Delivered,
      aidPackageItems: [],
    });
  }
  return new Promise((resolve) => {
    resolve(aidPackages);
  });
}

export function MyPledges() {
  const [aidPackages, setAidPackages] = useState<AidPackage[]>([]);
  const [pledgedPackages, setPledgedPackages] = useState<AidPackage[]>([]);

  function handlePledge(packageId: number) {
    // TODO: handle pledge of the selected aid package
  }

  function handleDetailCheck(packageId: number) {
    // TODO: handle detail check of the selected pledged package
  }

  useEffect(() => {
    fetchAidPackages()
      .then((packages) => {
        setAidPackages(packages);
        setPledgedPackages(packages);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Page>
      <div className="pageContent">
        <div className="content">
          <div>
            <header className="pageHeader">
              <h1>Aid Packages</h1>
            </header>
            <div className="tableSearch">
              <div className="searchContainer">
                <img src="/assets/svg/search_icon.svg" alt="search" />
                <input placeholder="Search" className="textField" />
              </div>
            </div>
            <div className="tableContainer">
              <table>
                <tr>
                  <th>Aid Package</th>
                  <th>Status</th>
                  <th>Pledges</th>
                  <th>Supplier</th>
                  <th></th>
                </tr>
                {aidPackages.length == 0 && (
                  <div className="emptyTableContent">No data</div>
                )}
                {aidPackages.map((aidPackage) => {
                  return (
                    <tr>
                      <td>{aidPackage.name}</td>
                      <td>{aidPackage.status}</td>
                      <td>75%</td>
                      <td>Pharma {aidPackage.supplierId}</td>
                      <td>
                        <button
                          onClick={() => handlePledge(aidPackage.packageId)}
                        >
                          Pledge
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          <div>
            <header className="pageHeader">
              <h1>My Pledges</h1>
            </header>
            <div className="tableContainer">
              <table>
                <tr>
                  <th>Aid Package</th>
                  <th>Status</th>
                  <th>Pledges</th>
                  <th>Supplier</th>
                  <th>Pledged Amount</th>
                  <th></th>
                </tr>
                {pledgedPackages.length == 0 && (
                  <div className="emptyTableContent">No data</div>
                )}
                {pledgedPackages.map((aidPackage) => {
                  return (
                    <tr>
                      <td>{aidPackage.name}</td>
                      <td>{aidPackage.status}</td>
                      <td>75%</td>
                      <td>Pharma {aidPackage.supplierId}</td>
                      <td>$1000</td>
                      <td>
                        <button
                          onClick={() =>
                            handleDetailCheck(aidPackage.packageId)
                          }
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
