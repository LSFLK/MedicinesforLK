/**
 * main page for displaying aid package details
 */
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { SimpleProgressBar } from "../../components/progress-bar";
//NOTE: import from actual data source helper once implemented.
import { fetchPackageData } from "../../data/package.mock.data";
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
      setIsLoading(true);
      fetchPackageData(pkgId)
        .then((data) => setData(data))
        .catch((err) => {
          setData(undefined);
          //handle error
        })
        .finally(() => setIsLoading(false));
    }
  }, [pkgId]);

  /**
   * click event handler for Donate button.
   */
  const handleDonateClick = () => {
    //TODO: Implement the expected behaviour
  };

  /**
   * when fetch succeeds and no data is found
   * redirect to 404 (if any)
   */
  if (!isLoading && data === undefined) {
    return <Navigate replace to="/404"></Navigate>;
  }
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
              <h1>{data?.title}</h1>
            </div>
            <div className="aid-package-header-container">
              <div
                className="aid-package-header-image"
                style={{ backgroundImage: `url(${data?.image})` }}
              ></div>
              <div className="aid-package-description-ribbon">Description</div>
            </div>
            <div>
              {/* TODO: May require rendering rich media or parsing html strings */}
              <p>{data?.description}</p>
            </div>
            <div className="aid-package-progress-container">
              <h3>
                {/* FIXME: is currency symbol always $? */}$
                {data.pledged.toLocaleString("en-us")} raised of $
                {data.goal.toLocaleString("en-us")} goal.
              </h3>
              <SimpleProgressBar
                current={data?.pledged as number}
                max={data?.goal as number}
                className="aid-pacakge-progress-bar"
              />
              <button
                className="btn aid-package-donate-btn"
                onClick={handleDonateClick}
              >
                Donate
              </button>
            </div>
          </div>
        </Page>
      )}
    </>
  );
}

/**
 *
 * TODO: Discuss the exact properties of an aid package
 * and make necessary changes here or where ever such
 * types are to be defined.
 */
export interface AidPackage {
  id: string;
  title: string;
  description: string;
  image: string;
  goal: number;
  pledged: number;
  items: { itemName: string; quantity: number }[];
}
