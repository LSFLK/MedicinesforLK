import React, {useState} from "react";
import {PageSelection} from "../../types/pages";
import {Page} from "../../layout/page";
import {AidPackage, DonorAidPackage} from "../../types/AidPackage";
import {Link, useNavigate, useParams} from "react-router-dom";
import DonorTable from "./donorTable/donorTable";
import './pledgeStatus.css'
import ContributionsChart from "../../components/contributionsChart/contributionsChart";
import {DonorAidPackagePledge} from "../../types/DonarAidPackagePledge";

const demoPackage: DonorAidPackage = {
  packageId: 0,
  name: "Aid Package 1",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  orderItems: [{
    orderItemId: 1,
    medicalItemName: "Paracetamol",
    quantity: 1000,
  },
    {
      orderItemId: 2,
      medicalItemName: "Methotrexate",
      quantity: 100,
    },
    {
      orderItemId: 3,
      medicalItemName: "Paracetamol",
      quantity: 500,
    },
    {
      orderItemId: 4,
      medicalItemName: "Paracetamol",
      quantity: 500,
    }
  ],
  pledgedPercentage: 40,
  status: AidPackage.Status.Ordered,
  supplierID: 0,
  totalAmount: 2500
}

const demoPledges: DonorAidPackagePledge[] = [
  {
    id: 1,
    name: 'Suwasetha Charity',
    amount: 1000,
    status: 'Created',
  },
  {
    id: 2,
    name: 'Some Charity',
    amount: 875,
    status: 'Created',
  }
]

export default function PledgeStatus() {
  const {packageId} = useParams<{ packageId: string }>()
  const [aidPackage, setAidPackage] = useState<DonorAidPackage>(demoPackage);
  const [pledges, setPledges] = useState<DonorAidPackagePledge[]>(demoPledges);
  const navigate = useNavigate();

  const handlePledgeEdit = (pledge: DonorAidPackagePledge) => {
    navigate(`pledges/${pledge.id}`)
  }

  const handlePledgeDelete = (pledge: DonorAidPackagePledge) => {
    const confirmed = window.confirm(`Are you sure you want to delete the pledge of ${pledge.name}?`);
    if (confirmed) {
      // Call the api
    }
  }

  return (
    <Page selection={PageSelection.HOME}>
      <div className="pledgeStatus">
        <div>
          <Link to='/'>Aid Packages</Link> &gt; <Link to={`/packages/${packageId}`}>{aidPackage.name}</Link> &gt; Pledge
          Status
        </div>
        <h1 className="heading">{aidPackage.name} - Pledge Status</h1>
        <div className="contributionsSummary">
          <div>
            <ContributionsChart totalAmount={1000} pledgedPercentage={10}/>
          </div>
          <div>
            <p>Goal: ${aidPackage.totalAmount}</p>
            <p>Received: ${(aidPackage.totalAmount * aidPackage.pledgedPercentage / 100).toFixed()}</p>
            <p>Status: Goal Pending</p>
          </div>
        </div>
        <DonorTable
          pledges={pledges}
          onPledgeEdit={handlePledgeEdit}
          onPledgeDelete={handlePledgeDelete}
        />
      </div>
    </Page>
  )
}
