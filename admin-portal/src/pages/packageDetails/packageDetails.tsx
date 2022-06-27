import React, {useEffect, useRef, useState} from "react";
import {PageSelection} from "../../types/pages";
import './packageDetails.css'
import {Page} from "../../layout/page";
import OrderItemsTable from "./components/orderItemsTable/orderItemsTable";
import {AidPackage} from "../../types/AidPackage";
import UpdateComments from "./components/updateComments/updateComments";
import {AidPackageUpdateComments} from "../../types/AidPackageUpdateComments";
import Modal from "../../components/modal/modal";
import EditStatusPostPrompt from "./components/editStatusPostPrompt/editStatusPostPrompt";
import {AidPackageItem} from "../../types/DonorAidPackageOrderItem";
import EditOrderItemPrompt from "./components/editOrderItemPrompt/editOrderItemPrompts";
import {Link, useParams} from "react-router-dom";
import PackageStatus from "./components/packageStatus/packageStatus";
import ContributionsChart from "../../components/contributionsChart/contributionsChart";
import {AidPackageService} from "../../apis/services/AidPackageService";

export function PackageDetails() {
  const {packageId} = useParams<{ packageId: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [posts, setPosts] = useState<AidPackageUpdateComments[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isEditPostModalVisible, setIsEditPostModalVisible] = useState(false);
  const [isEditOrderItemModalVisible, setIsEditOrderItemModalVisible] = useState(false);
  const postToBeEdited = useRef<AidPackageUpdateComments | null>(null)
  const orderItemToBeEdited = useRef<AidPackageItem | null>(null)

  useEffect(() => {
    fetchAidPackage();
    fetchUpdateComments();
  }, [])

  const fetchAidPackage = async () => {
    const {data} = await AidPackageService.getAidPackage(packageId!);
    setAidPackage(data);
    setTotalAmount(calculateTotalAmount(data));
  }

  const fetchUpdateComments = async () => {
    const {data} = await AidPackageService.getUpdateComments(packageId!);
    setPosts(data);
  }

  const calculateTotalAmount = (aidPackage: AidPackage) => {
    let total = 0;
    aidPackage.aidPackageItems.forEach((item) => {
      total += item.totalAmount;
    });
    return total;
  }

  const handleEditOrderItemButtonClick = (item: AidPackageItem) => {
    orderItemToBeEdited.current = item;
    setIsEditOrderItemModalVisible(true);
  }

  const handleOrderItemEdit = async (editedOrderItem: AidPackageItem) => {
    // Call the API
    setIsEditOrderItemModalVisible(false);
  }

  const handleStatusChange = async (statusToBeChanged: AidPackage.Status, label: string) => {
    if (statusToBeChanged === aidPackage?.status) {
      return;
    }
    const confirmed = window.confirm(`Are you sure you want to change the status to ${label}?`);
    if (confirmed) {
      // Call the API
      setAidPackage({...aidPackage!, status: statusToBeChanged}) // Demo
    }
  }

  const handleNewPost = async (text: string) => {
    // Call the API
  }

  const handleOrderItemDelete = (item: AidPackageItem) => {
    const confirmed = window.confirm(`Are you sure you want to delete item ${item.quotation.brandName}?`);
    if (confirmed) {
      // Call the API
    }
  }

  const handleDeletePostButtonClick = (post: AidPackageUpdateComments) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      // Call the API
    }
  }

  const handleEditPostButtonClick = (post: AidPackageUpdateComments) => {
    postToBeEdited.current = post;
    setIsEditPostModalVisible(true);
  }

  const handleStatusPostEdit = async (post: AidPackageUpdateComments) => {
    setIsEditPostModalVisible(false);
  }

  return (
    <Page selection={PageSelection.HOME}>
      <>
        {!aidPackage && (
          <p>Loading Aid Package...</p>
        )}
        {aidPackage && (
          <div className="packageDetails">
            <Modal show={isEditOrderItemModalVisible} onClose={() => setIsEditOrderItemModalVisible(false)}>
              <EditOrderItemPrompt
                orderItem={orderItemToBeEdited.current!}
                onSave={handleOrderItemEdit}
              />
            </Modal>
            <Modal show={isEditPostModalVisible} onClose={() => setIsEditPostModalVisible(false)}>
              <EditStatusPostPrompt post={postToBeEdited.current!} onSave={handleStatusPostEdit}/>
            </Modal>
            <div>
              <Link to='/'>Aid Packages</Link> &gt; {aidPackage.name}
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
                    onDeleteButtonClick={handleOrderItemDelete}
                  />
                </div>
              </div>
              <div className="contributionsChart">
                <p className="heading">Contributions</p>
                <div className="chart">
                  <ContributionsChart totalAmount={totalAmount} pledgedPercentage={0}/>
                </div>
                <p>Goal: ${totalAmount}</p>
                <p>Received: ${totalAmount}</p>
                <Link to={`/packages/${packageId}/pledge-status`}>See pledge status</Link>
              </div>
            </div>
            <PackageStatus
              currentStatus={aidPackage.status}
              onStatusChange={handleStatusChange}
            />
            <UpdateComments
              posts={posts}
              onNewComment={handleNewPost}
              onEditPostButtonClick={handleEditPostButtonClick}
              onDeletePostButtonClick={handleDeletePostButtonClick}/>
          </div>
        )}
      </>
    </Page>
  );
}
