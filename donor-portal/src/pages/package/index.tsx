/**
 * main page for displaying aid package details
 */
import { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { AidPackageService } from "../../apis/AidPackageService";
import { SimpleProgressBar } from "../../components/progress-bar";
import { AidPackage } from "../../types/AidPackage";
import { Page } from "../layout/page";
import "./styles.css";

export function AidPackageDetailsPage() {
  /**
   * id of the package to load.
   */
  const { id: pkgId } = useParams();

  /**
   * holds package data when valid
   * pkgId is present and fetch succeeds
   */
  const [data, setData] = useState<AidPackage>();

  /**
   * flags when data fetching for package is in progress.
   * initialize to true to avoid 404 redirection.
   */
  const [isLoading, setIsLoading] = useState(true);
  /**
   * handle data fetch for package details here.
   */
  useEffect(() => {
    if (pkgId) {
      fetchPackageData(pkgId);
    }
  }, [pkgId]);

  async function fetchPackageData(pkgId: string) {
    setIsLoading(true);
    try {
      const packageDetails = await AidPackageService.getAidPackage(pkgId);
      setData(packageDetails.data);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * when fetch succeeds and no data is found
   * redirect to 404 (if any)
   */
  if (!isLoading && data === undefined) {
    return <Navigate replace to="/404"></Navigate>;
  }

  // TODO: use real data
  const pledged = 5000;
  const goal = 10000;

  /**
   * render page upon successful fetch.
   */
  return (
    <>
      {isLoading && (
        <Page>
          {/*FIXME:  Use loader here */}
          Loading...
        </Page>
      )}
      {!isLoading && data && (
        <Page>
          <div className="aid-package-container">
            <div className="aid-package-title-container">
              <h1>{data?.name}</h1>
            </div>
            <div className="aid-package-header-container">
              <div
                className="aid-package-header-image"
                style={{
                  backgroundImage: `url(https://picsum.photos/1200/300)`,
                }}
              ></div>
              <div className="aid-package-description-ribbon">Description</div>
            </div>
            <div>
              {/* TODO: May require rendering rich media or parsing html strings */}
              <p>{data?.description}</p>
            </div>
            <div className="aid-package-progress-container">
              <h3>
                {pledged.toLocaleString("en-us")} raised of $
                {goal.toLocaleString("en-us")} goal.
              </h3>
              <SimpleProgressBar
                current={pledged as number}
                max={goal as number}
                className="aid-pacakge-progress-bar"
              />
              <Link className="btn aid-package-donate-btn" to="/donate-now">
                Donate
              </Link>
            </div>
          </div>
        </Page>
      )}
    </>
  );
}
