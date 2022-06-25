import { NeedsInfo } from "data/medical-needs.mock.data";
import { NeedAssignments } from "../aidPackage";

export function ManageAidPackages({
  medicalNeeds,
  needAssignments,
  setNeedAssignments,
}: {
  medicalNeeds: Array<NeedsInfo>;
  needAssignments: NeedAssignments;
  setNeedAssignments: (needAssignments: NeedAssignments) => void;
}) {
  return (
    <pre>
      TODO:
      <ul>
        <li>create packages based on needAssignments passed in</li>
        <li>allow editing package details</li>
        <li>submit edited package details in a POST request</li>
      </ul>
      <h4>Needs Assignments</h4>
      <code>
        {Object.keys(needAssignments).map((needID) => (
          <>
            <h5>Need ID: {needID}</h5>
            <span>
              {"Format: [[supplierID, quanity], ...]"}
              <br />
              {JSON.stringify(Array.from(needAssignments[needID].entries()))}
            </span>
          </>
        ))}
      </code>
      <h4>Needs List</h4>
      <code>{JSON.stringify(medicalNeeds, null, 2)}</code>
    </pre>
  );
}
