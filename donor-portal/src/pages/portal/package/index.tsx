import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useParams } from "react-router-dom";
import OrderItemsTable from "./components/orderItemsTable/orderItemsTable";
import PackageStatus from "./components/packageStatus/packageStatus";
import ContributionsChart from "./components/contributionsChart/contributionsChart";
import UpdateComments from "./components/updateComments/updateComments";
import { AidPackage } from "../../../types/AidPackage";
import { AidPackageUpdateComment } from "../../../types/AidPackageUpdateComment";
import { AidPackageService } from "../../../apis/services/AidPackageService";
import { Page } from "../../layout/page";

export default function PortalPackage() {
  const { packageID } = useParams<{ packageID: string }>();
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [posts, setPosts] = useState<AidPackageUpdateComment[]>([]);

  useEffect(() => {
    fetchAidPackage();
    fetchUpdateComments();
  }, []);

  const fetchAidPackage = async () => {
    const { data } = await AidPackageService.getAidPackage(packageID!);
    setAidPackage(data);
  };

  const fetchUpdateComments = async () => {
    const { data } = await AidPackageService.getUpdateComments(packageID!);
    setPosts(data);
  };

  return (
    <Page className="packageDetails">
      {!aidPackage && <p>Loading Aid Package...</p>}
      {aidPackage && (
        <div>
          <div>
            <Link to="/">Aid Packages</Link> &gt; {aidPackage.name}
          </div>
          <h1 className="packageName">{aidPackage.name}</h1>
          <div className="topContainer">
            <div className="descriptionArea">
              <p className="heading">Description</p>
              <p>{aidPackage.description}</p>
              <div>
                <OrderItemsTable items={aidPackage?.aidPackageItems} />
              </div>
            </div>
            <ContributionsChart totalAmount={100} pledgedPercentage={10} />
          </div>
          <PackageStatus currentStatus={aidPackage.status} />
          <UpdateComments posts={posts} />
        </div>
      )}
    </Page>
  );
}
