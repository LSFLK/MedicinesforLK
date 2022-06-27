import React, {useEffect, useState} from "react";
import {DonorAidPackageOrderItem} from "../../../../types/DonorAidPackageOrderItem";
import './editOrderItemPrompt.css';

interface EditOrderItemPromptProps {
  orderItem: DonorAidPackageOrderItem;
  onSave: (editedOrderItem: DonorAidPackageOrderItem) => Promise<void>;
}

export default function EditOrderItemPrompt({orderItem, onSave}: EditOrderItemPromptProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [errorText, setErrorText] = useState('')


  useEffect(() => {
    if (orderItem) {
      setName(orderItem.medicalItemName);
      setQuantity(orderItem.quantity);
    }
    setErrorText('');
  }, [orderItem])

  const handleSaveButtonClick = async () => {
    setIsSaving(true);
    setErrorText('');
    try {
      const editedItem: DonorAidPackageOrderItem = {
        ...orderItem,
        medicalItemName: name,
        quantity
      }
      await onSave(editedItem);
    } catch (e) {
      setErrorText('Something went wrong. Couldn\' edit the post.')
    }
    setIsSaving(false);
  }

  return (
    <div className="editOrderItemPrompt">
      <h4>Edit Order Item</h4>
      <div className="input">
        <label htmlFor="orderItemName">Item Name</label>
        <div>
          <input id="orderItemName" value={name}/>
        </div>
      </div>
      <div className="input">
        <label htmlFor="orderItemQty">Quantity</label>
        <div>
          <input id="orderItemQty" value={quantity} type="number"/>
        </div>
      </div>
      {errorText && (
        <div className="errorText">{errorText}</div>
      )}
      <div className="saveButton">
        <button
          disabled={isSaving}
          onClick={handleSaveButtonClick}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}
