import React, { useEffect, useRef, useState } from "react";
import { PageSelection } from "../../types/pages";
import "./packageDetails.css";
import { Page } from "../../layout/page";
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

export function PackageDetails() {
  const { packageId } = useParams<{ packageId: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [posts, setPosts] = useState<AidPackageUpdateComment[]>([]);
  const [isEditPostModalVisible, setIsEditPostModalVisible] = useState(false);
  const [isEditOrderItemModalVisible, setIsEditOrderItemModalVisible] =
    useState(false);
  const postToBeEdited = useRef<AidPackageUpdateComment | null>(null);
  const orderItemToBeEdited = useRef<AidPackageItem | null>(null);

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
    setPosts(data);
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
      debugger;
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

  const handleStatusPostEdit = async (comment: AidPackageUpdateComment) => {
    await AidPackageService.upsertUpdateComment(packageId!, comment);
    await fetchUpdateComments();
    setIsEditPostModalVisible(false);
  };

  return (
    <Page selection={PageSelection.HOME}>
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
            <div>
              <Link to="/">Aid Packages</Link> &gt; {aidPackage.name}
            </div>
            <h1 className="packageName">{aidPackage.name}</h1>
            <div className="topContainer">
              <div className="descriptionArea">
                <p className="heading">Description</p>
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
                <p>Goal: ${aidPackage.goalAmount}</p>
                <p>Received: ${aidPackage.receivedAmount}</p>
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
    </Page>
  );
}
