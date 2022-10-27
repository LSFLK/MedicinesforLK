import { AxiosResponse } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import MedicalNeedsService from "../../apis/services/MedicalNeedsService";
import SpinnerLoader from "../../components/spinnerLoader/spinnerLoader";
import { MedicalNeed } from "../../types/MedicalNeeds";
import "./styles.css";

function Needs() {
  const [medicalNeeds, setMedicalNeeds] = useState<MedicalNeed>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    MedicalNeedsService.getMedicalNeeds()
      .then((response: AxiosResponse<MedicalNeed>) => {
        setMedicalNeeds(response.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="main-container needs-page">
      <h1 className="needs-heading">Latest Needs</h1>
      {isLoading && <SpinnerLoader loaderText="Loading the latest needs" />}
      {!isLoading && medicalNeeds?.medicalNeeds.length && (
        <>
          <p>
            This needs list from the Ministry of Health, Sri Lanka is up-to-date
            as of :{" "}
            {moment
              .unix(medicalNeeds.lastUpdatedTime / 1000)
              .local()
              .format("YYYY-MM-DD")}
          </p>
          <div className="needs-table">
            <table>
              <thead>
                <tr>
                  <th>Urgency</th>
                  <th>Date required by MM/DD/YYYY</th>
                  <th>Hospital / Beneficiary Institution</th>
                  <th>Item Name</th>
                  <th>Type</th>
                  <th>Unit</th>
                  <th>Total Qty Needed</th>
                </tr>
              </thead>
              <tbody>
                {medicalNeeds.medicalNeeds
                  .filter((need) => need.neededQuantity)
                  .map((need) => (
                    <tr key={need.needID}>
                      <td>{need.urgency}</td>
                      <td>
                        {moment(
                          `${need.period.month}/${need.period.day}/${need.period.year}`
                        ).format("MM/DD/YYYY")}
                      </td>
                      <td>{need.beneficiary.name}</td>
                      <td>{need.item.name}</td>
                      <td>{need.item.type}</td>
                      <td>{need.item.unit}</td>
                      <td>{need.neededQuantity.toLocaleString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {!isLoading && !medicalNeeds?.medicalNeeds.length && (
        <p>There are no urgent needs right now</p>
      )}
    </div>
  );
}

export default Needs;
