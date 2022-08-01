import React from "react";
import { AidPackage } from "../../../../types/AidPackage";
import { AidPackageItem } from "../../../../types/DonorAidPackageOrderItem";
import "./orderItemsTable.css";

interface PackageItemsTableProps {
  items: AidPackageItem[];
  onEditItemButtonClick: (item: AidPackageItem) => void;
  onDeleteButtonClick: (item: AidPackageItem) => void;
  aidPackageStatus: AidPackage.Status;
}

export default function OrderItemsTable({
  items,
  onEditItemButtonClick,
  onDeleteButtonClick,
  aidPackageStatus,
}: PackageItemsTableProps) {
  const disableBtns = !(
    aidPackageStatus === AidPackage.Status.Draft ||
    aidPackageStatus === AidPackage.Status.Published
  );

  return (
    <table className="orderItemsTable">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Supplier</th>
          <th>Period</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.packageItemID}>
            <td>{item.quotation.brandName}</td>
            <td>{item.quantity}</td>
            <td>{item.quotation.supplier.name}</td>
            <td>
              {item.period.day}/{item.period.month}/{item.period.year}
            </td>
            <td className="actions">
              <button
                type="button"
                onClick={() => onEditItemButtonClick(item)}
                disabled={disableBtns}
              >
                Edit
              </button>
              <button
                type="button"
                className="deleteButton"
                onClick={() => onDeleteButtonClick(item)}
                disabled={disableBtns}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
