/**
 * main page for displaying aid package details
 */
import React, {FormEvent, useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {SimpleProgressBar} from "../../components/progress-bar";
import {Page} from "../layout/page";
import "./styles.css";
import {AidPackageService} from "../../apis/services/AidPackageService";
import {AidPackage} from "../../types/AidPackage";
import OrderItemsTable from "./components/orderItemsTable/orderItemsTable";
import PackageStatus from "./components/packageStatus";
import UpdateComments from "./components/updateComments";
import {AidPackageUpdateComment} from "../../types/AidPackageUpdateComment";
import UserContext from "../../userContext";
import {Pledge} from "../../types/Pledge";

export function AidPackageDetailsPage() {
  const {id: packageId} = useParams<{ id: string }>();
  const userId = useContext(UserContext);
  const [aidPackage, setAidPackage] = useState<AidPackage>();
  const [pledge, setPledge] = useState<Pledge | null>(null);
  const [updateComments, setUpdateComments] = useState<AidPackageUpdateComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const navigate = (path: string) => {
    history.push(path);
  };

  useEffect(() => {
    fetchAidPackage();
    fetchUpdateComments();
  }, []);

  useEffect(() => {
    if (userId != null) fetchPledge(userId, packageId);
  }, [userId])

  const fetchAidPackage = async () => {
    setIsLoading(true);
    const {data} = await AidPackageService.getAidPackage(packageId);
    setAidPackage(data);
    setIsLoading(false);
  };

  const fetchUpdateComments = async () => {
    const {data} = await AidPackageService.getUpdateComments(packageId);
    setUpdateComments(data);
  };

  const fetchPledge = async (donorId: string, packageId: string) => {
    const { data } = await AidPackageService.getDonorPledgesByAidPackage(donorId, packageId);
    if (data.length != 0) setPledge(data[0]);
  }

  const handleDonateClick = () => {
    navigate('/donate-now');
  };

  const handlePledgeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const amount = form.get("amount")?.toString();
    if (amount == undefined || userId == null || amount === "") return;
    if (!window.confirm(`Please confirm your pledge of ${amount}`)) return;
    const newPledge: Pledge = {
      pledgeID: 0,
      donorID: parseInt(userId),
      packageID: parseInt(packageId),
      amount: parseInt(amount),
      status: Pledge.Status.Pledged,
      donor: null
    };
    await AidPackageService.postPledge(userId, packageId, newPledge);
    fetchPledge(userId, packageId);
    fetchAidPackage();
  };

  const handlePledgeUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const amount = form.get("amount")?.toString();
    if (amount == undefined || userId == null || pledge == null) return;
    if (!window.confirm(`Please confirm your pledge of ${amount}`)) return;
    const updatedPledge: Pledge = {
      pledgeID: pledge.pledgeID,
      donorID: parseInt(userId),
      packageID: parseInt(packageId),
      amount: parseInt(amount),
      status: pledge.status,
      donor: null
    };
    await AidPackageService.updatePledge(userId, packageId, pledge.pledgeID, updatedPledge);
    fetchPledge(userId, packageId);
    fetchAidPackage();
  }

  return (
    <>
      {isLoading && (
        <Page>
          {/*FIXME:  Use loader here */}
          Loading...
        </Page>
      )}
      {aidPackage && (
        <Page>
          <div className="aid-package-container">
            <div className="aid-package-title-container">
              <h1>{aidPackage.name}</h1>
            </div>
            <div>
              <p>{aidPackage.description}</p>
            </div>
            <div className="aid-package-progress-container">
              <h3>
                $
                {aidPackage.receivedAmount.toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                raised of $
                {aidPackage.goalAmount.toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                goal.
              </h3>
              <SimpleProgressBar
                current={aidPackage.receivedAmount as number}
                max={aidPackage.goalAmount as number}
                className="aid-pacakge-progress-bar"
              />
              { userId == null && (
                <button
                  className="btn aid-package-donate-btn"
                  onClick={handleDonateClick}
                >
                  Donate
                </button>
              )}
            </div>
            <div>
              {userId != null &&
                (
                  <>
                    {pledge != null ? (
                      <>
                        <p>You've pledged {pledge.amount} on this package</p>
                        {aidPackage.status == AidPackage.Status.Published && (
                            <form onSubmit={handlePledgeUpdate}>
                              <input type="number" name="amount" defaultValue={pledge.amount}/>
                              <button>Update pledge</button>
                            </form>
                        )}
                      </>
                    ) : (
                      <>
                        {aidPackage.status == AidPackage.Status.Published && (
                          <form onSubmit={handlePledgeSubmit}>
                            <input type="number" name="amount" placeholder="1000"/>
                            <button>Pledge</button>
                          </form>
                        )}
                      </>
                    )}
                  </>
                )
              }
            </div>
            <OrderItemsTable items={aidPackage.aidPackageItems}/>
            <PackageStatus currentStatus={aidPackage.status}/>
            <UpdateComments comments={updateComments}/>
          </div>
        </Page>
      )}
    </>
  );
}
