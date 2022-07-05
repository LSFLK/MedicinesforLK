import React, { useEffect, useState } from "react";
import { PageSelection } from "../../types/pages";
import { Page } from "../../layout/page";
import { AidPackage } from "../../types/AidPackage";
import { Link, useNavigate, useParams } from "react-router-dom";
import DonorTable from "./donorTable/donorTable";
import "./pledgeStatus.css";
import ContributionsChart from "../../components/contributionsChart/contributionsChart";
import { DonorAidPackagePledge } from "../../types/DonarAidPackagePledge";
import { AidPackageService } from "../../apis/services/AidPackageService";

const demoPledges: DonorAidPackagePledge[] = [
  {
    id: 1,
    name: "Suwasetha Charity",
    amount: 1000,
    status: "Created",
  },
  {
    id: 2,
    name: "Some Charity",
    amount: 875,
    status: "Created",
  },
];

export default function PledgeStatus() {
  const { packageId } = useParams<{ packageId: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [pledges, setPledges] = useState<DonorAidPackagePledge[]>(demoPledges);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAidPackage();
  }, []);

  const fetchAidPackage = async () => {
    const { data } = await AidPackageService.getAidPackage(packageId!);
    setAidPackage(data);
  };

  const handlePledgeEdit = (pledge: DonorAidPackagePledge) => {
    navigate(`pledges/${pledge.id}`);
  };

  const handlePledgeDelete = (pledge: DonorAidPackagePledge) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the pledge of ${pledge.name}?`
    );
    if (confirmed) {
      // Call the api
    }
  };

  return (
    <Page selection={PageSelection.HOME}>
      <>
        {!aidPackage && <p>Loading Aid Package...</p>}
        {aidPackage && (
          <div className="pledgeStatus">
            <div>
              <Link to="/">Aid Packages</Link> &gt;{" "}
              <Link to={`/packages/${packageId}`}>{aidPackage.name}</Link> &gt;
              Pledge Status
            </div>
            <h1 className="heading">{aidPackage.name} - Pledge Status</h1>
            <div className="contributionsSummary">
              <div>
                <ContributionsChart totalAmount={1000} pledgedPercentage={10} />
              </div>
              <div>
                <p>Goal: &1000</p>
                <p>Received: $100</p>
                <p>Status: Goal Pending</p>
              </div>
            </div>
            <DonorTable
              pledges={pledges}
              onPledgeEdit={handlePledgeEdit}
              onPledgeDelete={handlePledgeDelete}
            />
          </div>
        )}
      </>
    </Page>
  );
}
