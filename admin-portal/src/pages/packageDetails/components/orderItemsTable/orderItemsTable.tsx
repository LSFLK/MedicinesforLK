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
              <button type="button" onClick={() => onEditItemButtonClick(item)}>
                Edit
              </button>
              <button
                type="button"
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
