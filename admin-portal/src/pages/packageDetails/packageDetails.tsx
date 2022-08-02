import React, { useEffect, useRef, useState } from "react";
import "./packageDetails.css";
import { Link, useParams } from "react-router-dom";
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

export default function PackageDetails() {
  const { packageId } = useParams<{ packageId: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [aidPackageStatus, setAidPackageStatus] = useState<AidPackage.Status>();
  const [posts, setPosts] = useState<AidPackageUpdateComment[]>([]);
  const [isEditPostModalVisible, setIsEditPostModalVisible] = useState(false);
  const [isEditOrderItemModalVisible, setIsEditOrderItemModalVisible] =
    useState(false);
  const [isEditDescriptionModalVisible, setIsEditDescriptionModalVisible] =
    useState(false);
  const postToBeEdited = useRef<AidPackageUpdateComment | null>(null);
  const orderItemToBeEdited = useRef<AidPackageItem | null>(null);
  const aidPackageToBeEdited = useRef<AidPackage | null>(null);

  const statusToLevel = {
    Draft: 1,
    Published: 2,
    "Awaiting Payment": 3,
    Ordered: 4,
    Shipped: 5,
    "Received at MoH": 6,
    Delivered: 7,
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
        new Date(data2.dateTime).getTime() - new Date(data1.dateTime).getTime()
      );
    });
    setPosts(sorteddata);
  };

  useEffect(() => {
    fetchAidPackage();
    fetchUpdateComments();
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
      if (statusToLevel[statusToBeChanged] > 3) {
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

  const handleDescriptionEdit = async (editedAidPackage: AidPackage) => {
    await AidPackageService.updateAidPackage({
      ...aidPackage!,
      description: editedAidPackage.description,
    });
    await fetchAidPackage();
    setIsEditDescriptionModalVisible(false);
  };

  const handleNewComment = async (comment: string) => {
    await AidPackageService.upsertUpdateComment(packageId!, {
      packageUpdateID: 0,
      packageID: parseInt(packageId!, 10),
      updateComment: comment,
      dateTime: "",
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

  const handleStatusPostEdit = async (comment: AidPackageUpdateComment) => {
    await AidPackageService.upsertUpdateComment(packageId!, comment);
    await fetchUpdateComments();
    setIsEditPostModalVisible(false);
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
            show={isEditDescriptionModalVisible}
            onClose={() => setIsEditDescriptionModalVisible(false)}
          >
            <EditDescriptionPrompt
              aidPackage={aidPackageToBeEdited.current!}
              onSave={handleDescriptionEdit}
            />
          </Modal>
          <div>
            <Link to="/">Aid Packages</Link> &gt; {aidPackage.name}
          </div>
          <h1 className="packageName">{aidPackage.name}</h1>
          <div className="topContainer">
            <div className="descriptionArea">
              <div className="edit-desc">
                <p className="heading">Description</p>

                <FiEdit3
                  className="desc-edit-icon"
                  onClick={() => handleEditDescriptionButtonClick(aidPackage)}
                />
              </div>

              <p>{aidPackage.description}</p>
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
              <Link to={`/packages/${packageId}/pledge-status`}>
                See pledge status
              </Link>
            </div>
          </div>
          <PackageStatus
            currentStatus={aidPackageStatus}
            onStatusChange={handleStatusChange}
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
