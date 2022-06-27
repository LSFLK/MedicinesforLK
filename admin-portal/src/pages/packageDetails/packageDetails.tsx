import React, {useRef, useState} from "react";
import {PageSelection} from "../../types/pages";
import './packageDetails.css'
import {Page} from "../../layout/page";
import OrderItemsTable from "./components/orderItemsTable/orderItemsTable";
import {DonorAidPackage} from "../../types/DonarAidPackage";
import StatusPosts from "./components/statusPosts/statusPosts";
import {DonorAidPackageStatusPost} from "../../types/DonorAidPackageStatusPost";
import Modal from "../../components/modal/modal";
import EditStatusPostPrompt from "./components/editStatusPostPrompt/editStatusPostPrompt";
import {DonorAidPackageOrderItem} from "../../types/DonorAidPackageOrderItem";
import EditOrderItemPrompt from "./components/editOrderItemPrompt/editOrderItemPrompts";
import {Link, useParams} from "react-router-dom";
import PackageStatus from "./components/packageStatus/packageStatus";
import ContributionsChart from "../../components/contributionsChart/contributionsChart";

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

const demoPosts: DonorAidPackageStatusPost[] = [
  {
    postID: 1,
    createdAt: 1655720893,
    text: 'This is still in pending status',
  },
  {
    postID: 2,
    createdAt: 1651700893,
    text: 'This is to fulfill an urgent need',
  }
]

export function PackageDetails() {
  const {packageId} = useParams<{packageId: string}>();
  const [aidPackage, setAidPackage] = useState<DonorAidPackage | null>(demoPackage);
  const [posts, setPosts] = useState<DonorAidPackageStatusPost[]>(demoPosts)
  const [isEditPostModalVisible, setIsEditPostModalVisible] = useState(false);
  const [isEditOrderItemModalVisible, setIsEditOrderItemModalVisible] = useState(false);
  const postToBeEdited = useRef<DonorAidPackageStatusPost | null>(null)
  const orderItemToBeEdited = useRef<DonorAidPackageOrderItem | null>(null)

  const handleEditOrderItemButtonClick = (item: DonorAidPackageOrderItem) => {
    orderItemToBeEdited.current = item;
    setIsEditOrderItemModalVisible(true);
  }

  const handleOrderItemEdit = async (editedOrderItem: DonorAidPackageOrderItem) => {
    // Call the API
    setIsEditOrderItemModalVisible(false);
  }

  const handleStatusChange = async (statusToBeChanged: DonorAidPackage.Status, label: string) => {
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

  const handleOrderItemDelete = (item: DonorAidPackageOrderItem) => {
    const confirmed = window.confirm(`Are you sure you want to delete item ${item.medicalItemName}?`);
    if (confirmed) {
      // Call the API
    }
  }

  const handleDeletePostButtonClick = (post: DonorAidPackageStatusPost) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      // Call the API
    }
  }

  const handleEditPostButtonClick = (post: DonorAidPackageStatusPost) => {
    postToBeEdited.current = post;
    setIsEditPostModalVisible(true);
  }

  const handleStatusPostEdit = async (post: DonorAidPackageStatusPost) => {
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
                    items={aidPackage?.orderItems}
                    onEditItemButtonClick={handleEditOrderItemButtonClick}
                    onDeleteButtonClick={handleOrderItemDelete}
                  />
                </div>
              </div>
              <div className="contributionsChart">
                <p className="heading">Contributions</p>
                <div className="chart">
                  <ContributionsChart totalAmount={aidPackage.totalAmount} pledgedPercentage={aidPackage.pledgedPercentage}/>
                </div>
                <p>Goal: ${aidPackage.totalAmount}</p>
                <p>Received: ${(aidPackage.totalAmount * (aidPackage.pledgedPercentage/100)).toFixed()}</p>
                <Link to={`/packages/${packageId}/pledge-status`}>See pledge status</Link>
              </div>
            </div>
            <PackageStatus
              currentStatus={aidPackage.status}
              onStatusChange={handleStatusChange}
            />
            <StatusPosts
              posts={posts}
              onNewPost={handleNewPost}
              onEditPostButtonClick={handleEditPostButtonClick}
              onDeletePostButtonClick={handleDeletePostButtonClick}/>
          </div>
        )}
      </>
    </Page>
  );
}
