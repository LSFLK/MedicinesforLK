import React, { useEffect, useRef, useState } from "react";
import "./packageDetails.css";
import OrderItemsTable from "./components/orderItemsTable/orderItemsTable";
import { AidPackage } from "../../types/AidPackage";
import UpdateComments from "./components/updateComments/updateComments";
import { AidPackageUpdateComment } from "../../types/AidPackageUpdateComment";
import Modal from "../../components/modal/modal";
import EditUpdateCommentPrompt from "./components/editUpdateCommentPrompt/editUpdateCommentPrompt";
import { AidPackageItem } from "../../types/DonorAidPackageOrderItem";
import EditOrderItemPrompt from "./components/editOrderItemPrompt/editOrderItemPrompts";
import { Link, useParams } from "react-router-dom";
import PackageStatus from "./components/packageStatus/packageStatus";
import ContributionsChart from "../../components/contributionsChart/contributionsChart";
import { AidPackageService } from "../../apis/services/AidPackageService";
import EditDescriptionPrompt from "./components/editDescriptionPrompt/editDescriptionPrompt";
import { FiEdit3 } from "react-icons/fi";
import DeleteAidPackagePrompt from "./components/deleteAidPackagePrompt/editUpdateCommentPrompt";

export function PackageDetails() {
  const { packageId } = useParams<{ packageId: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [posts, setPosts] = useState<AidPackageUpdateComment[]>([]);
  const [isEditPostModalVisible, setIsEditPostModalVisible] = useState(false);
  const [isDeleteAidPackageModalVisible, setIsDeleteAidPackageModalVisible] =
    useState(false);
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
    "Received At MOH": 6,
    Delivered: 7,
  };

  useEffect(() => {
    fetchAidPackage();
    fetchUpdateComments();
  }, []);

  const fetchAidPackage = async () => {
    const { data } = await AidPackageService.getAidPackage(packageId!);
    setAidPackage(data);
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

  const handleAidPackageDelete = async () => {
    await AidPackageService.deleteAidPackage(packageId!);
  };

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
    if (statusToBeChanged === aidPackage?.status) {
      return;
    }
    if (aidPackage?.status) {
      if (statusToLevel[statusToBeChanged] < statusToLevel[aidPackage.status]) {
        alert("Sorry, you cannot change back to a previous status");
        return;
      }
    }
    const confirmed = window.confirm(
      `Are you sure you want to change the status to ${statusToBeChanged}?`
    );
    if (confirmed) {
      const { data } = await AidPackageService.updateAidPackage({
        ...aidPackage!,
        status: statusToBeChanged,
      });
      setAidPackage(data);
    }
  };

  const handleDescriptionEdit = async (editedAidPackage: AidPackage) => {
    const { data } = await AidPackageService.updateAidPackage({
      ...aidPackage!,
      description: editedAidPackage.description,
    });
    setAidPackage(data);
    setIsEditDescriptionModalVisible(false);
  };

  const handleNewComment = async (comment: string) => {
    await AidPackageService.upsertUpdateComment(packageId!, {
      packageUpdateID: 0,
      packageID: parseInt(packageId!),
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

  const handleEditDescriptionButtonClick = (aidPackage: AidPackage) => {
    aidPackageToBeEdited.current = aidPackage;
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
      {aidPackage && (
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
              <div>
                <OrderItemsTable
                  items={aidPackage?.aidPackageItems}
                  onEditItemButtonClick={handleEditOrderItemButtonClick}
                  onDeleteButtonClick={handlePackageItemDelete}
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
            currentStatus={aidPackage.status}
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
