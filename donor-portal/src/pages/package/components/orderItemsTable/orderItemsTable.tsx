import React from "react";
import { AidPackageItem } from "../../../../types/DonorAidPackageOrderItem";
import "./styles.css";

interface PackageItemsTableProps {
  items: AidPackageItem[];
}

export default function OrderItemsTable({ items }: PackageItemsTableProps) {
  return (
    <div className="orderItemsTable">
      <p className="heading">Package Items</p>
      <table>
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
