import { AxiosResponse } from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import MedicalNeedsService from "../../apis/services/MedicalNeedsService";
import { MedicalNeed, Need } from "../../types/MedicalNeeds";
import "./styles.css";

function Needs() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [lastUpdatedDate, setLastUpdatedDate] = useState<number>(0);

  useEffect(() => {
    MedicalNeedsService.getMedicalNeeds().then(
      (response: AxiosResponse<MedicalNeed>) => {
        setNeeds(response.data.medicalNeeds);
        setLastUpdatedDate(response.data.lastUpdatedDate);
      }
    );
  }, []);

  return (
    <div className="main-container needs-page">
      <h1 className="needs-heading">Latest Needs</h1>

      {needs.length ? (
        <>
          <p>
            This needs list from the Ministry of Health, Sri Lanka is up-to-date
            as of :{moment.unix(lastUpdatedDate).local().format("YYYY-MM-DD")}
          </p>
          <div className="needs-table">
            <table>
              <thead>
                <tr>
                  <th>Urgency</th>
                  <th>Period MM/DD/YYYY</th>
                  <th>Hospital / Beneficiary Institution</th>
                  <th>Item Name</th>
                  <th>Type</th>
                  <th>Unit</th>
                  <th>Total Qty Needed</th>
                </tr>
              </thead>
              <tbody>
                {needs.map((need) => (
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
                    <td>{need.neededQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>There are no urgent needs right now</p>
      )}
    </div>
  );
}

export default Needs;
