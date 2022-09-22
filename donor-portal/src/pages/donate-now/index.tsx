import React, { useContext, useEffect, useState, useTransition } from "react";
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

  return (
    <div className="package-card" key={packageID}>
      <img
        className="package-image"
        src={donorPackage?.thumbnail ? donorPackage.thumbnail : packageImage}
        alt="packageImage"
        decoding="async"
      />
      <div className="card-details">
        <div className="card-details__heading">
          <div className="card-details__heading__text">
            <h2>{name}</h2>
          </div>
          <Link to={`/package/${packageID}`} className="btn">
            {buttonText}
          </Link>
        </div>
        <p className="card_details__description">{description}</p>
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
  const [isPending, startTransition] = useTransition();
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
  const [concurrentActiveTabItem, setConcurrentActiveTabItem] =
    useState<TabItems>(TabItems.GOAL_PENDING);

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
              concurrentActiveTabItem !== TabItems.GOAL_PENDING && "secondary"
            }`}
            onClick={() => {
              setConcurrentActiveTabItem(TabItems.GOAL_PENDING);
              startTransition(() => {
                setActiveTabItem(TabItems.GOAL_PENDING);
              });
            }}
          >
            Goal Pending
          </button>
          {state.isAuthenticated && userId && (
            <button
              type="button"
              className={`btn ${
                concurrentActiveTabItem !== TabItems.MY_PLEDGES && "secondary"
              }`}
              onClick={() => {
                setConcurrentActiveTabItem(TabItems.MY_PLEDGES);
                startTransition(() => {
                  setActiveTabItem(TabItems.MY_PLEDGES);
                });
              }}
            >
              My Pledges
            </button>
          )}
          <button
            type="button"
            className={`btn ${
              concurrentActiveTabItem !== TabItems.GOAL_REACHED && "secondary"
            }`}
            onClick={() => {
              setConcurrentActiveTabItem(TabItems.GOAL_REACHED);
              startTransition(() => {
                setActiveTabItem(TabItems.GOAL_REACHED);
              });
            }}
          >
            Goal Reached
          </button>
        </div>
      </div>
      {isLoading && <SpinnerLoader loaderText="Loading..." />}
      <div className="package-list" style={{ opacity: isPending ? 0.5 : 1 }}>
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
            <p className="empty-state-text">
              You have not yet pledged towards aid packages. Please check the{" "}
              <button
                type="button"
                className="text-blue"
                onClick={() => {
                  setConcurrentActiveTabItem(TabItems.GOAL_PENDING);
                  startTransition(() => {
                    setActiveTabItem(TabItems.GOAL_PENDING);
                  });
                }}
              >
                Goal Pending tab
              </button>{" "}
              to find aid packages you can pledge towards.
            </p>
          )}
        {!isLoading &&
          activeTabItem === TabItems.GOAL_PENDING &&
          !goalPendingAidPackages.length && (
            <p className="empty-state-text">
              There are no aid packages which can receive donors pledges at
              present. However, this page is updated regularly. Please visit
              this page again to view updates.
            </p>
          )}
        {activeTabItem === TabItems.GOAL_REACHED &&
          !goalReachedAidPackages.length && (
            <p className="empty-state-text">
              There are no aid packages that have reached their goal at present.
              Please check the{" "}
              <button
                type="button"
                className="text-blue"
                onClick={() => {
                  setConcurrentActiveTabItem(TabItems.GOAL_PENDING);
                  startTransition(() => {
                    setActiveTabItem(TabItems.GOAL_PENDING);
                  });
                }}
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
