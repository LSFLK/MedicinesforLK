import React, { useEffect, useRef, useState } from "react";
import "./packageDetails.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import OrderItemsTable from "./components/orderItemsTable/orderItemsTable";
import { AidPackage } from "../../types/AidPackage";
import UpdateComments from "./components/updateComments/updateComments";
import { AidPackageUpdateComment } from "../../types/AidPackageUpdateComment";
import Modal from "../../components/modal/modal";
import EditUpdateCommentPrompt from "./components/editUpdateCommentPrompt/editUpdateCommentPrompt";
import { AidPackageItem } from "../../types/DonorAidPackageOrderItem";
import EditOrderItemPrompt from "./components/editOrderItemPrompt/editOrderItemPrompts";
import PackageStatus from "./components/packageStatus/packageStatus";
import ContributionsChart from "../../components/contributionsChart/contributionsChart";
import AidPackageService from "../../apis/services/AidPackageService";
import EditDescriptionPrompt from "./components/editDescriptionPrompt/editDescriptionPrompt";
import DeleteAidPackagePrompt from "./components/deleteAidPackagePrompt/editUpdateCommentPrompt";
import PledgeService from "../../apis/services/PledgeService";
import { Pledge } from "../../types/Pledge";
import DonorTable from "./components/donorTable/donorTable";
import EditThumbnailUrlPrompt from "./components/editThumbnaiUrlPrompt/editThumbnailUrlPrompt";

export default function PackageDetails() {
  const { packageId } = useParams<{ packageId: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [aidPackageStatus, setAidPackageStatus] = useState<AidPackage.Status>();
  const [posts, setPosts] = useState<AidPackageUpdateComment[]>([]);
  const [isEditPostModalVisible, setIsEditPostModalVisible] = useState(false);
  const [isDeleteAidPackageModalVisible, setIsDeleteAidPackageModalVisible] =
    useState(false);
  const [isEditOrderItemModalVisible, setIsEditOrderItemModalVisible] =
    useState(false);
  const [isEditDescriptionModalVisible, setIsEditDescriptionModalVisible] =
    useState(false);
  const [isEditThumbnailUrlModalVisible, setIsEditThumbnailUrlModalVisible] =
    useState(false);
  const postToBeEdited = useRef<AidPackageUpdateComment | null>(null);
  const orderItemToBeEdited = useRef<AidPackageItem | null>(null);
  const aidPackageToBeEdited = useRef<AidPackage | null>(null);
  const [pledges, setPledges] = useState<Pledge[]>([]);

  const statusToLevel = {
    Draft: 1,
    Published: 2,
    "Awaiting Payment": 3,
    Ordered: 4,
    Shipped: 5,
    "Received at MoH": 6,
    Delivered: 7,
  };

  const completedStatuses = [
    AidPackage.Status.Ordered,
    AidPackage.Status.Shipped,
    AidPackage.Status.ReceivedAtMOH,
    AidPackage.Status.Delivered,
  ];

  const history = useHistory();
  const navigate = (path: string) => {
    history.push(path);
  };

  const fetchAidPackage = async () => {
    const { data } = await AidPackageService.getAidPackage(packageId!);
    setAidPackage(data);
    setAidPackageStatus(data.status);
  };

  const fetchUpdateComments = async () => {
    const { data } = await AidPackageService.getUpdateComments(packageId!);
    const sorteddata = data.sort((data1, data2) => {
      return (
        //  dateTime has to be *1000 to get the correct datetime in JS Date
        //  https://stackoverflow.com/a/847196/11005638
        new Date(data2.dateTime * 1000).getTime() -
        new Date(data1.dateTime * 1000).getTime()
      );
    });
    setPosts(sorteddata);
  };

  const handleAidPackageDelete = async () => {
    await AidPackageService.deleteAidPackage(packageId!);
  };

  const fetchPledges = async () => {
    const { data } = await AidPackageService.getPledges(packageId!);
    setPledges(data);
  };

  useEffect(() => {
    fetchAidPackage();
    fetchUpdateComments();
    fetchPledges();
  }, []);

  const handleEditOrderItemButtonClick = (item: AidPackageItem) => {
    orderItemToBeEdited.current = item;
    setIsEditOrderItemModalVisible(true);
  };

  const handleOrderItemEdit = async (editedOrderItem: AidPackageItem) => {
    await AidPackageService.updateAidPackageItem(packageId!, editedOrderItem);
    await fetchAidPackage();
    setIsEditOrderItemModalVisible(false);
  };

  const handleStatusChange = async (statusToBeChanged: AidPackage.Status) => {
    if (statusToBeChanged === aidPackageStatus) {
      return;
    }
    if (aidPackageStatus) {
      if (statusToLevel[statusToBeChanged] < statusToLevel[aidPackageStatus]) {
        alert("Sorry, you cannot change back to a previous status");
        return;
      }
    }
    const confirmed = window.confirm(
      `Are you sure you want to change the status to ${statusToBeChanged}?`
    );
    if (confirmed) {
      if (
        aidPackageStatus &&
        !completedStatuses.includes(aidPackageStatus) &&
        completedStatuses.includes(statusToBeChanged)
      ) {
        const orderCompletionConfirmation = window.confirm(
          "You are trying to move this package into a 'completion' status!"
        );

        if (!orderCompletionConfirmation) return; // don't update the status
      }

      const { data } = await AidPackageService.updateAidPackage({
        ...aidPackage!,
        status: statusToBeChanged,
      });
      setAidPackageStatus(data.status);
      if (statusToBeChanged === AidPackage.Status.Published) {
        AidPackageService.commentPublishedAidPackage(data);
      }
    }
  };

  // TODO: all these handle modal functions could be generatlized & refactored to use the same funcs/ components
  const handleDescriptionEdit = async (editedAidPackage: AidPackage) => {
    await AidPackageService.updateAidPackage({
      ...aidPackage!,
      status: aidPackageStatus!,
      description: editedAidPackage.description,
    });
    setAidPackage({
      ...aidPackage!,
      status: aidPackageStatus!,
      description: editedAidPackage.description,
    });
    setIsEditDescriptionModalVisible(false);
  };

  const handleThumbnailUrlUpdate = async (editedAidPackage: AidPackage) => {
    await AidPackageService.updateAidPackage({
      ...aidPackage!,
      status: aidPackageStatus!,
      thumbnail: editedAidPackage.thumbnail,
    });
    setAidPackage({ ...aidPackage!, thumbnail: editedAidPackage.thumbnail });
    setIsEditThumbnailUrlModalVisible(false);
  };

  const handleNewComment = async (comment: string) => {
    await AidPackageService.upsertUpdateComment(packageId!, {
      packageUpdateID: 0,
      packageID: parseInt(packageId!, 10),
      updateComment: comment,
    });
    await fetchUpdateComments();
  };

  const handlePackageItemDelete = async (item: AidPackageItem) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete item ${item.quotation.brandName}?`
    );
    if (confirmed) {
      await AidPackageService.deleteAidPackageItem(
        packageId!,
        item.packageItemID
      );
      await fetchAidPackage();
    }
  };

  const handleDeleteCommentButtonClick = async (
    updateComment: AidPackageUpdateComment
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      await AidPackageService.deleteUpdateComment(
        packageId!,
        updateComment.packageUpdateID
      );
      fetchUpdateComments();
    }
  };

  const handleEditPostButtonClick = (post: AidPackageUpdateComment) => {
    postToBeEdited.current = post;
    setIsEditPostModalVisible(true);
  };

  const handleEditDescriptionButtonClick = (selectedAidPackage: AidPackage) => {
    aidPackageToBeEdited.current = selectedAidPackage;
    setIsEditDescriptionModalVisible(true);
  };

  const handleEditThumbnailUrlButtonClick = () => {
    aidPackageToBeEdited.current = aidPackage!;
    setIsEditThumbnailUrlModalVisible(true);
  };

  const handleStatusPostEdit = async (comment: AidPackageUpdateComment) => {
    await AidPackageService.upsertUpdateComment(packageId!, comment);
    await fetchUpdateComments();
    setIsEditPostModalVisible(false);
  };

  const handlePledgeEdit = (pledge: Pledge) => {
    navigate(`${packageId}/pledges/${pledge.pledgeID}`);
  };

  const handlePledgeDelete = async (pledge: Pledge) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the pledge of ${pledge.donorID}?`
    );
    if (confirmed) {
      await PledgeService.deletePledge(pledge.pledgeID);
      fetchPledges();
    }
  };

  return (
    <>
      {!aidPackage && <p>Loading Aid Package...</p>}
      {aidPackage && aidPackageStatus && (
        <div className="packageDetails">
          <Modal
            show={isEditOrderItemModalVisible}
            onClose={() => setIsEditOrderItemModalVisible(false)}
          >
            <EditOrderItemPrompt
              orderItem={orderItemToBeEdited.current!}
              onSave={handleOrderItemEdit}
            />
          </Modal>
          <Modal
            show={isEditPostModalVisible}
            onClose={() => setIsEditPostModalVisible(false)}
          >
            <EditUpdateCommentPrompt
              comment={postToBeEdited.current!}
              onSave={handleStatusPostEdit}
            />
          </Modal>
          <Modal
            show={isDeleteAidPackageModalVisible}
            onClose={() => setIsDeleteAidPackageModalVisible(false)}
          >
            <DeleteAidPackagePrompt
              aidPackage={aidPackage}
              onSave={handleAidPackageDelete}
            />
          </Modal>
          <Modal
            show={isEditDescriptionModalVisible}
            onClose={() => setIsEditDescriptionModalVisible(false)}
          >
            <EditDescriptionPrompt
              aidPackage={aidPackageToBeEdited.current!}
              onSave={handleDescriptionEdit}
            />
          </Modal>
          <Modal
            show={isEditThumbnailUrlModalVisible}
            onClose={() => setIsEditThumbnailUrlModalVisible(false)}
          >
            <EditThumbnailUrlPrompt
              aidPackage={aidPackageToBeEdited.current!}
              onSave={handleThumbnailUrlUpdate}
            />
          </Modal>
          <div>
            <Link to="/">Aid Packages</Link> &gt; {aidPackage.name}
          </div>
          <h1 className="packageName">{aidPackage.name}</h1>
          <div className="topContainer">
            <div className="descriptionArea">
              <div className="deleteButtonContainer">
                <div className="edit-desc">
                  <p className="heading">Description</p>

                  <FiEdit3
                    className="desc-edit-icon"
                    onClick={() => handleEditDescriptionButtonClick(aidPackage)}
                  />
                </div>
                {aidPackage.status === AidPackage.Status.Draft && (
                  <button
                    type="button"
                    onClick={() => setIsDeleteAidPackageModalVisible(true)}
                  >
                    Delete Package
                  </button>
                )}
              </div>

              <p>{aidPackage.description}</p>

              <div className="edit-desc">
                <p className="heading">Thumbnail Image Link</p>
                <FiEdit3
                  className="desc-edit-icon"
                  onClick={() => handleEditThumbnailUrlButtonClick()}
                />
              </div>
              {/* TODO: check if thumbnail exists - display current thumbnail, if available? in modal? */}
              <a href={aidPackage?.thumbnail} target="_blank" rel="noreferrer">
                {aidPackage?.thumbnail}
              </a>

              <div>
                <OrderItemsTable
                  items={aidPackage?.aidPackageItems}
                  onEditItemButtonClick={handleEditOrderItemButtonClick}
                  onDeleteButtonClick={handlePackageItemDelete}
                  aidPackageStatus={aidPackageStatus}
                />
              </div>
            </div>
            <div className="contributionsChart">
              <p className="heading">Contributions</p>
              <div className="chart">
                <ContributionsChart
                  goalAmount={aidPackage.goalAmount}
                  receivedAmount={aidPackage.receivedAmount}
                />
              </div>
              <p>
                Goal: $
                {aidPackage.goalAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p>
                Received: $
                {aidPackage.receivedAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <PackageStatus
            currentStatus={aidPackageStatus}
            onStatusChange={handleStatusChange}
          />
          <DonorTable
            pledges={pledges}
            setPledges={setPledges}
            onPledgeEdit={handlePledgeEdit}
            onPledgeDelete={handlePledgeDelete}
            aidPackageStatus={aidPackageStatus}
          />
          <UpdateComments
            posts={posts}
            onNewComment={handleNewComment}
            onEditPostButtonClick={handleEditPostButtonClick}
            onDeletePostButtonClick={handleDeleteCommentButtonClick}
          />
        </div>
      )}
    </>
  );
}
