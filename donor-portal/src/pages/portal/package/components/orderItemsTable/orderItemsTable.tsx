import React from "react";
import "./orderItemsTable.css";
import {AidPackageItem} from "../../../../../types/DonorAidPackageOrderItem";

interface PackageItemsTableProps {
  items: AidPackageItem[];
}

export default function OrderItemsTable({
  items,
}: PackageItemsTableProps) {
  return (
    <div className="orderItemsTable">
    <table >
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.packageItemID}>
            <td>{item.quotation.brandName}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
