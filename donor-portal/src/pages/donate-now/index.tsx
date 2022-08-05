import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import UserContext from "../../userContext";
import { AidPackage } from "../../types/AidPackage";
import AidPackageService from "../../apis/services/AidPackageService";
import SpinnerLoader from "../../components/spinnerLoader/spinnerLoader";
import packageImage from "./images/package.jpg";

import "./styles.css";

enum TabItems {
  GOAL_PENDING,
  GOAL_REACHED,
  MY_PLEDGES,
}

function PackageCard({
  donorPackage,
  buttonText,
}: {
  donorPackage: AidPackage;
  buttonText: string;
}) {
  const { packageID, receivedAmount, description, goalAmount, name } =
    donorPackage;
  const CHARACTER_LIMIT = 350;

  return (
    <div className="package-card" key={packageID}>
      <img className="package-image" src={packageImage} alt="packageImage" />
      <div className="card-details">
        <div className="card-details__heading">
          <div className="card-details__heading__text">
            <h2>{name}</h2>
          </div>
          <Link to={`/package/${packageID}`} className="btn">
            {buttonText}
          </Link>
        </div>
        <p className="card_details__description">
          {description.length > CHARACTER_LIMIT ? (
            <>
              {description.substring(0, CHARACTER_LIMIT).concat("...")}
              <Link to={`/package/${packageID}`}>read more</Link>
            </>
          ) : (
            description
          )}
        </p>
        <div className="card_details__package_progress">
          <p className="card_details__package_progress_text">
            $
            {receivedAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            raised of $
            {goalAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            goal
          </p>
          <div className="card_details__package_progress_bar">
            <span
              style={{
                width: `${
                  (Math.min(receivedAmount, goalAmount) / goalAmount) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonateNowPage() {
  const userId = useContext(UserContext);
  const { state } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [goalPendingAidPackages, setGoalPendingAidPackages] = useState<
    AidPackage[]
  >([]);
  const [alreadyPledgedAidPackages, setAlreadyPledgedAidPackages] = useState<
    AidPackage[]
  >([]);
  const [goalReachedAidPackages, setGoalReachedAidPackages] = useState<
    AidPackage[]
  >([]);
  const [activeTabItem, setActiveTabItem] = useState<TabItems>(
    TabItems.GOAL_PENDING
  );

  const fetchPledgedAidPackages = async (donorId: string) => {
    const returnedPledgedPackages =
      await AidPackageService.getPledgedAidPackages(donorId);
    setAlreadyPledgedAidPackages(returnedPledgedPackages.data);
  };

  const fetchAidPackages = async () => {
    const { data }: { data: AidPackage[] } =
      await AidPackageService.getAidPackages();
    setGoalReachedAidPackages(
      data.filter(
        (aidPackage) =>
          aidPackage.status !== AidPackage.Status.Published &&
          aidPackage.status !== AidPackage.Status.Draft
      )
    );
    setGoalPendingAidPackages(
      data.filter(
        (aidPackage) => aidPackage.status === AidPackage.Status.Published
      )
    );
    setIsLoading(false);
  };

  useEffect(() => {
    if (userId !== null && state.isAuthenticated) {
      fetchPledgedAidPackages(userId);
    }
  }, [userId, state.isAuthenticated]);

  useEffect(() => {
    fetchAidPackages();
  }, []);

  return (
    <div className="main-container medical-needs-page">
      <div className="medical-needs-heading">
        <h1>Medical Needs</h1>

        <div className="goal-filter">
          <button
            type="button"
            className={`btn ${
              activeTabItem !== TabItems.GOAL_PENDING && "secondary"
            }`}
            onClick={() => {
              setActiveTabItem(TabItems.GOAL_PENDING);
            }}
          >
            Goal Pending
          </button>
          {state.isAuthenticated && userId && (
            <button
              type="button"
              className={`btn ${
                activeTabItem !== TabItems.MY_PLEDGES && "secondary"
              }`}
              onClick={() => {
                setActiveTabItem(TabItems.MY_PLEDGES);
              }}
            >
              My Pledges
            </button>
          )}
          <button
            type="button"
            className={`btn ${
              activeTabItem !== TabItems.GOAL_REACHED && "secondary"
            }`}
            onClick={() => {
              setActiveTabItem(TabItems.GOAL_REACHED);
            }}
          >
            Goal Reached
          </button>
        </div>
      </div>
      {isLoading && <SpinnerLoader loaderText="Loading..." />}
      <div className="package-list">
        {activeTabItem === TabItems.GOAL_PENDING &&
          goalPendingAidPackages.map((aidPackage) => (
            <PackageCard
              key={aidPackage.packageID}
              donorPackage={aidPackage}
              buttonText={userId != null ? "Pledge" : "Donate"}
            />
          ))}
        {activeTabItem === TabItems.GOAL_REACHED &&
          goalReachedAidPackages.map((aidPackage) => (
            <PackageCard
              key={aidPackage.packageID}
              donorPackage={aidPackage}
              buttonText="Details"
            />
          ))}
        {userId &&
          state.isAuthenticated &&
          activeTabItem === TabItems.MY_PLEDGES &&
          alreadyPledgedAidPackages.length === 0 && (
            <p>
              You have not yet pledged towards aid packages. Please check the{" "}
              <button
                type="button"
                className="text-blue"
                onClick={() => setActiveTabItem(TabItems.GOAL_PENDING)}
              >
                Goal Pending tab
              </button>{" "}
              to find aid packages you can pledge towards.
            </p>
          )}
        {!isLoading &&
          activeTabItem === TabItems.GOAL_PENDING &&
          !goalPendingAidPackages.length && (
            <p>
              There are no aid packages which can receive donors pledges at
              present. However, this page is updated regularly. Please visit
              this page again to view updates.
            </p>
          )}
        {activeTabItem === TabItems.GOAL_REACHED &&
          !goalReachedAidPackages.length && (
            <p>
              There are no aid packages that have reached their goal at present.
              Please check the{" "}
              <button
                type="button"
                className="text-blue"
                onClick={() => setActiveTabItem(TabItems.GOAL_PENDING)}
              >
                Goal Pending tab
              </button>{" "}
              to view open aid packages.
            </p>
          )}
        {userId &&
          state.isAuthenticated &&
          activeTabItem === TabItems.MY_PLEDGES &&
          alreadyPledgedAidPackages.map((aidPackage) => (
            <PackageCard
              key={aidPackage.packageID}
              donorPackage={aidPackage}
              buttonText="Details"
            />
          ))}
      </div>
    </div>
  );
}
