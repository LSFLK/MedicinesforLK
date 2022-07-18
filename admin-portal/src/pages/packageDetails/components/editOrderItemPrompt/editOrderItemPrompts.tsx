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
      if (
        e.response.data ==
        "Medical Need Remaining Amount Exceeds Aid Package Item Amount"
      )
        setErrorText(e.response.data);
      else setErrorText("Something went wrong. Couldn't edit the post.");
    }
    setIsSaving(false);
  };

  return (
    <div className="editOrderItemPrompt">
      <h4>Edit Order Item</h4>
      <div className="input">
        <label htmlFor="orderItemQty">Initial Quantity</label>
        <div>
          <input
            id="orderItemInitialQty"
            value={orderItem.initialQuantity}
            type="number"
            readOnly
          />
        </div>
        <label htmlFor="orderItemQty">Quantity</label>
        <div>
          <input
            id="orderItemQty"
            value={quantity}
            type="number"
            onChange={(event) =>
              setQuantity(parseInt(event.currentTarget.value))
            }
          />
        </div>
      </div>
      {errorText && <div className="errorText">{errorText}</div>}
      <div className="saveButton">
        <button disabled={isSaving} onClick={handleSaveButtonClick}>
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
