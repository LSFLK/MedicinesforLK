import React from "react";
import {DonorAidPackageOrderItem} from "../../../../types/DonorAidPackageOrderItem";
import './orderItemsTable.css';

interface PackageItemsTableProps {
  items: DonorAidPackageOrderItem[],
  onEditItemButtonClick: (item: DonorAidPackageOrderItem) => void;
  onDeleteButtonClick: (item: DonorAidPackageOrderItem) => void;
}

export default function OrderItemsTable({items, onEditItemButtonClick, onDeleteButtonClick}: PackageItemsTableProps) {
  return (
    <table className="orderItemsTable">
      <thead>
      <tr>
        <th>Item Name</th>
        <th>Quantity</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      {items.map((item) => (
        <tr key={item.orderItemId}>
          <td>{item.medicalItemName}</td>
          <td>{item.quantity}</td>
          <td className="actions">
            <button
              onClick={() => onEditItemButtonClick(item)}>
              Edit
            </button>
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
  )
}
