import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import HeaderImage from "../layout/header-image";
import Page from "../layout/page";
import "./styles.css";
import UserContext from "../../userContext";
import { AidPackage } from "../../types/AidPackage";
import AidPackageService from "../../apis/services/AidPackageService";

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
  const { packageID, description, receivedAmount, goalAmount, name } =
    donorPackage;

  return (
    <div className="package-card" key={packageID}>
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

export default function Home() {
  const userId = useContext(UserContext);
  const { state } = useAuthContext();
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
  };

  useEffect(() => {
    if (userId !== null && state.isAuthenticated) {
      fetchPledgedAidPackages(userId);
      setActiveTabItem(TabItems.MY_PLEDGES);
    }
  }, [userId, state.isAuthenticated]);

  useEffect(() => {
    fetchAidPackages();
  }, []);

  return (
    <Page className="home-page">
      <HeaderImage imageUrl="https://images.unsplash.com/photo-1516826435551-36a8a09e4526?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">
        <div className="header-image__text-container">
          <p>
            Sri lanka is going through an unprecedented economic crisis. It has
            left the country facing a severe shortage of life-saving medicines
            and medical supplies. The Elixir platform facilitates matching of
            donations to the most urgent supplies while providing transparency.
          </p>
        </div>
      </HeaderImage>

      <div className="home-heading">
        <h1>Aid Packages</h1>

        <div className="goal-filter">
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
              activeTabItem !== TabItems.GOAL_PENDING && "secondary"
            }`}
            onClick={() => {
              setActiveTabItem(TabItems.GOAL_PENDING);
            }}
          >
            Goal Pending
          </button>
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
              No pledged packages found. Check{" "}
              <button
                type="button"
                className="text-blue"
                onClick={() => setActiveTabItem(TabItems.GOAL_PENDING)}
              >
                goal pending tab
              </button>{" "}
              to find pledge-able aid packages.
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
    </Page>
  );
}
