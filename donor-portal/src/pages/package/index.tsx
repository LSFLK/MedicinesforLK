/**
 * main page for displaying aid package details
 */
import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { SimpleProgressBar } from "../../components/progress-bar";
import { Page } from "../layout/page";
import "./styles.css";
import { AidPackageService } from "../../apis/services/AidPackageService";
import { AidPackage } from "../../types/AidPackage";
import OrderItemsTable from "./components/orderItemsTable/orderItemsTable";
import PackageStatus from "./components/packageStatus";
import UpdateComments from "./components/updateComments";
import { AidPackageUpdateComment } from "../../types/AidPackageUpdateComment";

export function AidPackageDetailsPage() {
  const { id: packageId } = useParams<{ id: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [updateComments, setUpdateComments] = useState<
    AidPackageUpdateComment[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAidPackage();
    fetchUpdateComments();
  }, []);

  const fetchAidPackage = async () => {
    setIsLoading(true);
    const { data } = await AidPackageService.getAidPackage(packageId);
    setAidPackage(data);
    setIsLoading(false);
  };

  const fetchUpdateComments = async () => {
    const { data } = await AidPackageService.getUpdateComments(packageId);
    setUpdateComments(data);
  };

  const handleDonateClick = () => {
    //TODO: Implement the expected behaviour
  };

  return (
    <>
      {isLoading && (
        <Page>
          {/*FIXME:  Use loader here */}
          Loading...
        </Page>
      )}
      {aidPackage && (
        <Page>
          <div className="aid-package-container">
            <div className="aid-package-title-container">
              <h1>{aidPackage.name}</h1>
            </div>
            <div>
              <p>{aidPackage.description}</p>
            </div>
            <div className="aid-package-progress-container">
              <h3>
                $
                {aidPackage.receivedAmount.toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                raised of $
                {aidPackage.goalAmount.toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                goal.
              </h3>
              <SimpleProgressBar
                current={aidPackage.receivedAmount as number}
                max={aidPackage.goalAmount as number}
                className="aid-pacakge-progress-bar"
              />
              <button
                className="btn aid-package-donate-btn"
                onClick={handleDonateClick}
              >
                Donate
              </button>
            </div>
            <OrderItemsTable items={aidPackage.aidPackageItems} />
            <PackageStatus currentStatus={aidPackage.status} />
            <UpdateComments comments={updateComments} />
          </div>
        </Page>
      )}
    </>
  );
}
