import { useEffect, useState } from "react";
import { HeaderImage } from "../layout/header-image";
import { Page } from "../layout/page";
import "./styles.css";

type DonarAidPackage = {
  packageID: number;
  name: string;
  hospital: string;
  description: string;
  totalAmount: number;
  pledgedPercentage: number;
};

enum GoalStatus {
  GOAL_PENDING,
  GOAL_REACHED,
}

const packageList = [
  {
    packageID: 1,
    name: "Medical Supplies | Anuradpura",
    hospital: "General Hospital : Fight for their Lives in Anuradapura",
    description:
      "Kole Intellectual Forum intends to influence the ideas of policy makers at all levels, educationists, community and youth in Uganda to inclu... read more",
    totalAmount: 150000,
    pledgedPercentage: 78,
  },
  {
    packageID: 2,
    name: "Medical Supplies | Anuradpura",
    hospital: "General Hospital : Fight for their Lives in Anuradapura",
    description:
      "Kole Intellectual Forum intends to influence the ideas of policy makers at all levels, educationists, community and youth in Uganda to inclu... read more",
    totalAmount: 150000,
    pledgedPercentage: 20,
  },
  {
    packageID: 3,
    name: "Medical Supplies | Anuradpura",
    hospital: "General Hospital : Fight for their Lives in Anuradapura",
    description:
      "Kole Intellectual Forum intends to influence the ideas of policy makers at all levels, educationists, community and youth in Uganda to inclu... read more",
    totalAmount: 150000,
    pledgedPercentage: 100,
  },
  {
    packageID: 4,
    name: "Medical Supplies | Anuradpura",
    hospital: "General Hospital : Fight for their Lives in Anuradapura",
    description:
      "Kole Intellectual Forum intends to influence the ideas of policy makers at all levels, educationists, community and youth in Uganda to inclu... read more",
    totalAmount: 150000,
    pledgedPercentage: 78,
  },
  {
    packageID: 5,
    name: "Medical Supplies | Anuradpura",
    hospital: "General Hospital : Fight for their Lives in Anuradapura",
    description:
      "Kole Intellectual Forum intends to influence the ideas of policy makers at all levels, educationists, community and youth in Uganda to inclu... read more",
    totalAmount: 150000,
    pledgedPercentage: 2,
  },
  {
    packageID: 6,
    name: "Medical Supplies | Anuradpura",
    hospital: "General Hospital : Fight for their Lives in Anuradapura",
    description:
      "Kole Intellectual Forum intends to influence the ideas of policy makers at all levels, educationists, community and youth in Uganda to inclu... read more",
    totalAmount: 150000,
    pledgedPercentage: 50,
  },
];

export function Home() {
  const [aidPackages, setAidPackages] = useState<Array<DonarAidPackage>>();
  const [goalFilter, setGoalFilter] = useState<GoalStatus>(
    GoalStatus.GOAL_PENDING
  );

  useEffect(() => {
    setAidPackages(
      packageList.filter((donorPackage) => {
        if (goalFilter === GoalStatus.GOAL_PENDING) {
          return donorPackage.pledgedPercentage !== 100;
        } else {
          return donorPackage.pledgedPercentage === 100;
        }
      })
    );
  });

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
        {aidPackages?.map((donorPackage) => (
          <PackageCard donorPackage={donorPackage} />
        ))}
      </div>
    </Page>
  );
}

function PackageCard({ donorPackage }: { donorPackage: DonarAidPackage }) {
  const {
    packageID,
    description,
    totalAmount,
    pledgedPercentage,
    name,
    hospital,
  } = donorPackage;
  const currentAmount = Math.round(totalAmount * (100 / pledgedPercentage));

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
            <p>{hospital}</p>
          </div>
          <a href="#" className="btn">
            Donate
          </a>
        </div>
        <p className="card_details__description">{description}</p>
        <div className="card_details__package_progress">
          <p className="card_details__package_progress_text">
            ${currentAmount} raised of ${totalAmount} goal
          </p>
          <div className="card_details__package_progress_bar">
            <span style={{ width: pledgedPercentage + "%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
