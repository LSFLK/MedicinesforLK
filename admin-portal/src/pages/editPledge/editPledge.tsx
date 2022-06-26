import React, {useRef, useState} from "react";
import {Page} from "../../layout/page";
import {PageSelection} from "../../types/pages";
import {Link} from "react-router-dom";
import {DonorAidPackage} from "../../types/DonarAidPackage";
import PledgeSummary from "./components/pledgeSummary/pledgeSummary";
import PledgeActivities from "./components/pledgeActivities/pledgeActivities";
import {Pledge} from "../../types/Pledge";
import {Donor} from "../../types/Donor";
import {PledgeActivity} from "../../types/PledgeActivity";
import Modal from "../../components/modal/modal";
import EditActivityPrompt from "./components/editActivityPrompt/editActivityPrompt";

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
  status: DonorAidPackage.Status.Ordered,
  supplierID: 0,
  totalAmount: 2500
}

const demoDonor: Donor = {
  donorID: 0,
  email: "",
  orgLink: "",
  orgName: "Suwasetha Charity",
  phone: 0,
  quotationID: 0
}

const demoPledge: Pledge = {
  aidPackageID: 0,
  amount: 1000,
  donorID: 0,
  status: Pledge.Status.Created,
}

const demoActivities: PledgeActivity[] = [
  {
    activityID: 0,
    text: "Created the invoice for this pledge",
    createdAt: 1655720893,
  },

  {
    activityID: 0,
    text: "Lorem Ipsum dollar sit amet",
    createdAt: 1654720893,
  },
]

export default function EditPledge() {
  const [aidPackage, setAidPackage] = useState<DonorAidPackage>(demoPackage);
  const [pledge, setPledge] = useState<Pledge>(demoPledge);
  const [donor, setDonor] = useState<Donor>(demoDonor);
  const [activities, setActivities] = useState<PledgeActivity[]>(demoActivities);
  const [isEditActivityModalVisible, setIsEditActivityModalVisible] = useState(false);
  const activityToBeEdited = useRef<PledgeActivity | null>(null)

  const handleEditActivityClick = (activity: PledgeActivity) => {
    activityToBeEdited.current = activity;
    setIsEditActivityModalVisible(true);
  }

  const handleEditActivity = async (activity: PledgeActivity) => {
    // Call the API
    setIsEditActivityModalVisible(false);
    activityToBeEdited.current = null;
  }

  const handleDeleteActivity = (activity: PledgeActivity) => {
    const confirmed = window.confirm('Are you sure you want to delete this activity?');
    if (confirmed) {
      // Call the API
    }
  }

  const handleNewActivity = async (text: string) => {

  }

  const handleStatusChange = (status: Pledge.Status, label: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the status to ${label}?`);
    if (confirmed) {
      // Call the API
      setPledge(prevPledge =>({...prevPledge, status}) ); // Demo
    }
  }

  return (
    <Page selection={PageSelection.HOME}>
      <div>
        <div>
          <Link to='/'>Aid Packages</Link>&nbsp;&gt;&nbsp;
          <Link to={`/packages/${aidPackage.packageId}`}>{aidPackage.name}</Link>&nbsp;&gt;&nbsp;
          <Link to={`/packages/${aidPackage.packageId}/pledge-status`}>Pledge Status</Link>&nbsp;&gt;&nbsp;
          {donor?.orgName}
        </div>
        <Modal show={isEditActivityModalVisible} onClose={() => setIsEditActivityModalVisible(false)}>
          <EditActivityPrompt
            activity={activityToBeEdited.current!}
            onSave={handleEditActivity}
          />
        </Modal>
        <PledgeSummary
          donor={donor}
          pledge={pledge}
          onStatusChange={handleStatusChange}
        />
        <PledgeActivities activities={activities}
                          onEditActivityButtonClick={handleEditActivityClick}
                          onDeleteActivityButtonClick={handleDeleteActivity}
                          onNewActivity={handleNewActivity}
        />
      </div>
    </Page>
  )
}
