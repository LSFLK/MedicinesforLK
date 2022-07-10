import { useContext, useEffect, useState } from "react";
import { HeaderImage } from "../layout/header-image";
import { Page } from "../layout/page";
import "./styles.css";
import UserContext from "../../userContext";
import { Link } from "react-router-dom";

type DonorAidPackage = {
  packageID: number;
  name: string;
  hospital: string;
  description: string;
  totalAmount: number;
  pledgedPercentage: number;
};

enum TabItems {
  GOAL_PENDING,
  GOAL_REACHED,
  MY_PLEDGES,
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

const pledgedPackages = [
  {
    packageID: 2,
    name: "Medical Supplies | Anuradpura",
    hospital: "General Hospital : Fight for their Lives in Anuradapura",
    description:
      "Kole Intellectual Forum intends to influence the ideas of policy makers at all levels, educationists, community and youth in Uganda to inclu... read more",
    totalAmount: 150000,
    pledgedPercentage: 20,
  },
];

export function Home() {
  const userId = useContext(UserContext);
  const [goalPendingAidPackages, setGoalPendingAidPackages] = useState<
    DonorAidPackage[]
  >([]);
  const [alreadyPledgedAidPackages, setAlreadyPledgedAidPackages] = useState<
    DonorAidPackage[]
  >([]);
  const [goalReachedAidPackages, setGoalReachedAidPackages] = useState<
    DonorAidPackage[]
  >([]);
  const [activeTabItem, setActiveTabItem] = useState<TabItems>(
    TabItems.GOAL_PENDING
  );

  useEffect(() => {
    if (userId != null) {
      setActiveTabItem(TabItems.MY_PLEDGES);
      setAlreadyPledgedAidPackages(pledgedPackages);
    }
  }, [userId]);

  useEffect(() => {
    const aidPackages = packageList;
    setGoalReachedAidPackages(
      aidPackages.filter((aidPackage) => aidPackage.pledgedPercentage == 100)
    );
    setGoalPendingAidPackages(
      aidPackages.filter((aidPackage) => aidPackage.pledgedPercentage != 100)
    );
  }, [])

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
          {userId && (
            <button
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
        <>
          {activeTabItem == TabItems.GOAL_PENDING &&
            goalPendingAidPackages.map((aidPackage) => {
              return <PackageCard donorPackage={aidPackage} />;
            })}
        </>
        <>
          {activeTabItem == TabItems.GOAL_REACHED &&
            goalReachedAidPackages.map((aidPackage) => {
              return <PackageCard donorPackage={aidPackage} />;
            })}
        </>
        <>
          {userId &&
            activeTabItem == TabItems.MY_PLEDGES &&
            alreadyPledgedAidPackages.map((aidPackage) => {
              return <PackageCard donorPackage={aidPackage} />;
            })}
        </>
      </div>
    </Page>
  );
}

function PackageCard({ donorPackage }: { donorPackage: DonorAidPackage }) {
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
      <div className="card-details">
        <div className="card-details__heading">
          <div className="card-details__heading__text">
            <h2>{name}</h2>
            <p>{hospital}</p>
          </div>
          <Link to={`/package/${packageID}`} className="btn">
            Donate
          </Link>
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
