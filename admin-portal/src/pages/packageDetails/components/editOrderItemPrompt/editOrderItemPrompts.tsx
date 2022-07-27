import React, { useEffect, useState } from "react";
import { AidPackageItem } from "../../../../types/DonorAidPackageOrderItem";
import "./editOrderItemPrompt.css";

interface EditOrderItemPromptProps {
  orderItem: AidPackageItem;
  onSave: (editedOrderItem: AidPackageItem) => Promise<void>;
}

export default function EditOrderItemPrompt({
  orderItem,
  onSave,
}: EditOrderItemPromptProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (orderItem) {
      setQuantity(orderItem.quantity);
    }
    setErrorText("");
  }, [orderItem]);

  const handleSaveButtonClick = async () => {
    setIsSaving(true);
    setErrorText("");
    try {
      const editedItem: AidPackageItem = {
        ...orderItem,
        quantity,
      };
      await onSave(editedItem);
    } catch (e: any) {
      setErrorText(
        e.response.data || "Something went wrong. Couldn't edit the item."
      );
    }
    setIsSaving(false);
  };

  return (
    <div className="editOrderItemPrompt">
      <h4>Edit Order Item</h4>
      <div className="input">
        <label htmlFor="orderItemQty">
          Quantity
          <input
            id="orderItemQty"
            value={quantity}
            type="number"
            onChange={(event) =>
              setQuantity(parseInt(event.currentTarget.value, 10))
            }
          />
        </label>
      </div>
      {errorText && <div className="errorText">{errorText}</div>}
      <div className="saveButton">
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSaveButtonClick}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
