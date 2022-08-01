import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AidPackage } from "../../types/AidPackage";
import PledgeSummary from "./components/pledgeSummary/pledgeSummary";
import PledgeActivities from "./components/pledgeActivities/pledgeActivities";
import { Pledge } from "../../types/Pledge";
import { PledgeActivity } from "../../types/PledgeActivity";
import Modal from "../../components/modal/modal";
import EditActivityPrompt from "./components/editActivityPrompt/editActivityPrompt";
import "./editPledge.css";
import AidPackageService from "../../apis/services/AidPackageService";
import PledgeService from "../../apis/services/PledgeService";

export default function EditPledge() {
  const { packageId } = useParams<{ packageId: string }>();
  const { pledgeId } = useParams<{ pledgeId: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [pledge, setPledge] = useState<Pledge>();
  const [activities, setActivities] = useState<PledgeActivity[]>([]);
  const [isEditActivityModalVisible, setIsEditActivityModalVisible] =
    useState(false);
  const activityToBeEdited = useRef<PledgeActivity | null>(null);

  const fetchAidPackage = async () => {
    const { data } = await AidPackageService.getAidPackage(packageId!);
    setAidPackage(data);
  };

  const fetchPledge = async () => {
    const { data } = await PledgeService.getPledge(pledgeId!);
    setPledge(data); // TODO: remove the array when the API is fixed
  };

  const fetchUpdateComments = async () => {
    const { data } = await PledgeService.getUpdateComments(pledgeId!);
    const sorteddata = data.sort((data1, data2) => {
      return (
        new Date(data2.dateTime).getTime() - new Date(data1.dateTime).getTime()
      );
    });
    setActivities(sorteddata);
  };

  useEffect(() => {
    fetchAidPackage();
    fetchPledge();
    fetchUpdateComments();
  }, []);

  const handleEditActivityClick = (activity: PledgeActivity) => {
    activityToBeEdited.current = activity;
    setIsEditActivityModalVisible(true);
  };

  const handleEditActivity = async (activity: PledgeActivity) => {
    await PledgeService.upsertUpdateComment(pledgeId!, activity);
    await fetchUpdateComments();
    setIsEditActivityModalVisible(false);
    activityToBeEdited.current = null;
  };

  const handleDeleteActivity = async (activity: PledgeActivity) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (confirmed) {
      await PledgeService.deleteUpdateComment(
        pledgeId!,
        activity.pledgeUpdateID
      );
      await fetchUpdateComments();
    }
  };

  const handleNewActivity = async (text: string) => {
    await PledgeService.upsertUpdateComment(pledgeId!, {
      pledgeID: parseInt(pledgeId!, 10),
      pledgeUpdateID: 0,
      updateComment: text,
      dateTime: "",
    });
    await fetchUpdateComments();
  };

  const handleStatusChange = async (newStatus: Pledge.Status) => {
    const confirmed = window.confirm(
      `Are you sure you want to change the status to ${newStatus}?`
    );
    if (confirmed) {
      try {
        await PledgeService.updatePledgeStatus(pledgeId!, newStatus);
        setPledge((prevPledge) => ({ ...prevPledge!, status: newStatus }));
      } catch (error) {
        alert("An error occurred when trying to change the status");
      }
    }
  };

  return (
    <>
      {(!aidPackage || !pledge) && <p>Loading Aid Package...</p>}
      {aidPackage && pledge && (
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
            {aidPackage.name}
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
          <PledgeSummary pledge={pledge} onStatusChange={handleStatusChange} />
          <PledgeActivities
            activities={activities}
            onEditActivityButtonClick={handleEditActivityClick}
            onDeleteActivityButtonClick={handleDeleteActivity}
            onNewActivity={handleNewActivity}
          />
        </div>
      )}
    </>
  );
}
