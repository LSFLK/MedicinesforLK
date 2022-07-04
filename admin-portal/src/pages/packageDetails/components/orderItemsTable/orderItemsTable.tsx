import React from "react";
import { AidPackageItem } from "../../../../types/DonorAidPackageOrderItem";
import "./orderItemsTable.css";

interface PackageItemsTableProps {
  items: AidPackageItem[];
  onEditItemButtonClick: (item: AidPackageItem) => void;
  onDeleteButtonClick: (item: AidPackageItem) => void;
}

export default function OrderItemsTable({
  items,
  onEditItemButtonClick,
  onDeleteButtonClick,
}: PackageItemsTableProps) {
  return (
    <table className="orderItemsTable">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.packageItemID}>
            <td>
              {/*{item.quotation.brandName} TODO: Uncomment when the field is there on the response */}
            </td>
            <td>{item.quantity}</td>
            <td className="actions">
              <button onClick={() => onEditItemButtonClick(item)}>Edit</button>
              <button
                className="deleteButton"
                onClick={() => onDeleteButtonClick(item)}
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
