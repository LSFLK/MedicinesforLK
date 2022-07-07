import { useEffect, useState } from "react";
import { AidPackageService } from "../../apis/AidPackageService";
import { HeaderImage } from "../layout/header-image";
import { Page } from "../layout/page";
import { AidPackage } from "../../types/AidPackage";
import "./styles.css";
import { Link } from "react-router-dom";

enum GoalStatus {
  GOAL_PENDING,
  GOAL_REACHED,
}

export function Home() {
  const [aidPackages, setAidPackages] = useState<Array<AidPackage>>();
  const [filteredAidPackages, setFilteredAidPackages] =
    useState<Array<AidPackage>>();
  const [goalFilter, setGoalFilter] = useState<GoalStatus>(
    GoalStatus.GOAL_PENDING
  );

  async function fetchPackages() {
    const packages = await AidPackageService.getAidPackages();
    setAidPackages(packages.data);
  }

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (!aidPackages) return;

    setFilteredAidPackages(
      aidPackages.filter((donorPackage) => {
        return donorPackage;

        // TODO: add filter once the API is done
        // if (goalFilter === GoalStatus.GOAL_PENDING) {
        //   return donorPackage.pledgedPercentage !== 100;
        // } else {
        //   return donorPackage.pledgedPercentage === 100;
        // }
      })
    );
  }, [aidPackages]);

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
          <button
            className={`btn ${
              goalFilter !== GoalStatus.GOAL_PENDING && "secondary"
            }`}
            onClick={() => {
              setGoalFilter(GoalStatus.GOAL_PENDING);
            }}
          >
            Goal Pending
          </button>
          <button
            className={`btn ${
              goalFilter !== GoalStatus.GOAL_REACHED && "secondary"
            }`}
            onClick={() => {
              setGoalFilter(GoalStatus.GOAL_REACHED);
            }}
          >
            Goal Reached
          </button>
        </div>
      </div>

      <div className="package-list">
        {filteredAidPackages?.map((donorPackage) => (
          <PackageCard donorPackage={donorPackage} />
        ))}
      </div>
    </Page>
  );
}

function PackageCard({ donorPackage }: { donorPackage: AidPackage }) {
  const {
    packageID,
    description,
    // totalAmount,
    // pledgedPercentage,
    name,
    // hospital,
  } = donorPackage;

  // TODO: replace with real values
  const goalAmount = donorPackage.goalAmount;
  const receivedAmount = donorPackage.receivedAmount;
  const pledgedPercentage = Math.round((receivedAmount / goalAmount) * 100);

  return (
    <div className="package-card" key={packageID}>
      <img
        src="https://images.unsplash.com/photo-1562243061-204550d8a2c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
        alt=""
        className="package-card__image"
      />
      <div className="card-details">
        <div className="card-details__heading">
          <div className="card-details__heading__text">
            <h2>{name}</h2>
          </div>
          <Link to={`/package/${packageID}`} className="btn">
            Donate
          </Link>
        </div>
        <p className="card_details__description">{description}</p>
        <div className="card_details__package_progress">
          <p className="card_details__package_progress_text">
            ${receivedAmount} raised of ${goalAmount} goal
          </p>
          <div className="card_details__package_progress_bar">
            <span style={{ width: pledgedPercentage + "%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
