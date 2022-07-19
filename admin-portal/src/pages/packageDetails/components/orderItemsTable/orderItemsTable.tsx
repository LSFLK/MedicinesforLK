import React from "react";
import { AidPackageItem } from "../../../../types/DonorAidPackageOrderItem";
import "./orderItemsTable.css";

interface PackageItemsTableProps {
  items: AidPackageItem[];
  onEditItemButtonClick: (item: AidPackageItem) => void;
  onDeleteButtonClick: (item: AidPackageItem) => void;
  status: string;
}

export default function OrderItemsTable({
  items,
  onEditItemButtonClick,
  onDeleteButtonClick,
  status,
}: PackageItemsTableProps) {
  return (
    <table className="orderItemsTable">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
          {status == "Draft" && <th />}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.packageItemID}>
            <td>{item.quotation.brandName}</td>
            <td>{item.quantity}</td>
            {status == "Draft" && (
              <td className="actions">
                <button onClick={() => onEditItemButtonClick(item)}>
                  Edit
                </button>
                <button
                  className="deleteButton"
                  onClick={() => onDeleteButtonClick(item)}
                >
                  delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
