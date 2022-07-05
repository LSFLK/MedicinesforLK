import React, { useEffect, useRef, useState } from "react";
import { Page } from "../../layout/page";
import { PageSelection } from "../../types/pages";
import { Link, useParams } from "react-router-dom";
import { AidPackage } from "../../types/AidPackage";
import PledgeSummary from "./components/pledgeSummary/pledgeSummary";
import PledgeActivities from "./components/pledgeActivities/pledgeActivities";
import { Pledge } from "../../types/Pledge";
import { Donor } from "../../types/Donor";
import { PledgeActivity } from "../../types/PledgeActivity";
import Modal from "../../components/modal/modal";
import EditActivityPrompt from "./components/editActivityPrompt/editActivityPrompt";
import "./editPledge.css";
import { AidPackageService } from "../../apis/services/AidPackageService";

const demoDonor: Donor = {
  donorID: 0,
  email: "",
  orgLink: "",
  orgName: "Suwasetha Charity",
  phone: 0,
  quotationID: 0,
};

const demoPledge: Pledge = {
  aidPackageID: 0,
  amount: 1000,
  donorID: 0,
  status: Pledge.Status.Created,
};

const demoActivities: PledgeActivity[] = [
  {
    pledgeID: 0,
    pledgeUpdateID: 0,
    updateComment: "Created the invoice for this pledge",
    dateTime: 1655720893,
  },

  {
    pledgeID: 0,
    pledgeUpdateID: 0,
    updateComment: "Lorem Ipsum dollar sit amet",
    dateTime: 1654720893,
  },
];

export default function EditPledge() {
  const { packageId } = useParams<{ packageId: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [pledge, setPledge] = useState<Pledge>(demoPledge);
  const [donor, setDonor] = useState<Donor>(demoDonor);
  const [activities, setActivities] =
    useState<PledgeActivity[]>(demoActivities);
  const [isEditActivityModalVisible, setIsEditActivityModalVisible] =
    useState(false);
  const activityToBeEdited = useRef<PledgeActivity | null>(null);

  useEffect(() => {
    fetchAidPackage();
  }, []);

  const fetchAidPackage = async () => {
    const { data } = await AidPackageService.getAidPackage(packageId!);
    setAidPackage(data);
  };

  const handleEditActivityClick = (activity: PledgeActivity) => {
    activityToBeEdited.current = activity;
    setIsEditActivityModalVisible(true);
  };

  const handleEditActivity = async (activity: PledgeActivity) => {
    // Call the API
    setIsEditActivityModalVisible(false);
    activityToBeEdited.current = null;
  };

  const handleDeleteActivity = (activity: PledgeActivity) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (confirmed) {
      // Call the API
    }
  };

  const handleNewActivity = async (text: string) => {};

  const handleStatusChange = (status: Pledge.Status, label: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the status to ${label}?`
    );
    if (confirmed) {
      // Call the API
      setPledge((prevPledge) => ({ ...prevPledge, status })); // Demo
    }
  };

  return (
    <Page selection={PageSelection.HOME}>
      <>
        {!aidPackage && <p>Loading Aid Package...</p>}
        {aidPackage && (
          <div className="editPledge">
            <div>
              <Link to="/">Aid Packages</Link>&nbsp;&gt;&nbsp;
              <Link to={`/packages/${aidPackage.packageID}`}>
                {aidPackage.name}
              </Link>
              &nbsp;&gt;&nbsp;
              <Link to={`/packages/${aidPackage.packageID}/pledge-status`}>
                Pledge Status
              </Link>
              &nbsp;&gt;&nbsp;
              {donor?.orgName}
            </div>
            <Modal
              show={isEditActivityModalVisible}
              onClose={() => setIsEditActivityModalVisible(false)}
            >
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
            <PledgeActivities
              activities={activities}
              onEditActivityButtonClick={handleEditActivityClick}
              onDeleteActivityButtonClick={handleDeleteActivity}
              onNewActivity={handleNewActivity}
            />
          </div>
        )}
      </>
    </Page>
  );
}
