import { useState } from "react";
import { Stepper, Step } from "components/stepper";
import { PageSelection } from "types/pages";
import { Page } from "layout/page";

import "./newAidPackage.css";

type Props = {};

function NewAidPackage({}: Props) {
  const [currentFormStep, setCurrentFormStep] = useState(0);

  return (
    <Page selection={PageSelection.PACKAGE_CREATION}>
      <main className="">
        <h1>Create an Aid Package</h1>
        <Stepper activeStep={currentFormStep}>
          <Step title="Assign Suppliers" />
          <Step title="Manage Aid Packages" />
        </Stepper>
      </main>
    </Page>
  );
}

// {
//   currentFormStep == 0 && (
//     <table>
//       <thead>
//         <tr>
//           <td>Need</td>
//           <td>Unit</td>
//           <td>Period</td>
//           <td>Quantity Needed</td>
//           <td>Remaining Needed</td>
//           <td>Supplier</td>
//           <td>Max</td>
//           <td>Order Quantity</td>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>{/** Enumerate over required items */}</tr>
//       </tbody>
//     </table>
//   );
// }

export default NewAidPackage;
