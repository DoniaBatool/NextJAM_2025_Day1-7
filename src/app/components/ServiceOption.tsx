"use client";

import React, { useState } from "react";

interface ServiceOptionsProps {
  productPrice: number;
  productName: string;
}

const ServiceOptions = ({ productPrice, productName }: ServiceOptionsProps) => {
  const [isPurchaseChecked, setIsPurchaseChecked] = useState(true);
  const [isCustomizeChecked, setIsCustomizeChecked] = useState(false);
  const [isRenovateChecked, setIsRenovateChecked] = useState(false);
  const [totalAmount, setTotalAmount] = useState(productPrice);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handlePurchaseChange = () => {
    setIsPurchaseChecked(true);
    setIsCustomizeChecked(false);
    setIsRenovateChecked(false);
    setTotalAmount(productPrice);
    setAlertMessage(null);
  };

  const handleCustomizeChange = () => {
    setIsPurchaseChecked(false);
    setIsCustomizeChecked(true);
    setIsRenovateChecked(false);
    const newAmount = productPrice + (productPrice * 0.05); // Add 5%
    setTotalAmount(newAmount);
    setAlertMessage("Our team will soon contact you for further details.");
  };

  const handleRenovateChange = () => {
    setIsPurchaseChecked(false);
    setIsCustomizeChecked(false);
    setIsRenovateChecked(true);
    const newAmount = productPrice - (productPrice * 0.25); // Deduct 25%
    setTotalAmount(newAmount);
    setAlertMessage("Our team will soon contact you for further details.");
  };

  return (
    <div className="service-options-container">
      <h2 className="service-heading text-xl font-bold">Service Options for {productName}</h2>

      {/* Checkbox options */}
      <div className="options flex gap-4 mt-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isPurchaseChecked}
            onChange={handlePurchaseChange}
            id="purchase"
            className="mr-2"
          />
          <label htmlFor="purchase" className="font-satoshi text-lg">Purchase</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isCustomizeChecked}
            onChange={handleCustomizeChange}
            id="customize"
            className="mr-2"
          />
          <label htmlFor="customize" className="font-satoshi text-lg">Customize</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isRenovateChecked}
            onChange={handleRenovateChange}
            id="renovate"
            className="mr-2"
          />
          <label htmlFor="renovate" className="font-satoshi text-lg">Renovate</label>
        </div>
      </div>

      {/* Display total amount */}
      <div className="total-amount mt-6">
        <p className="font-satoshi text-lg">Total Amount: £{totalAmount.toFixed(2)}</p>
      </div>

      {/* Show alert message */}
      {alertMessage && (
        <div className="alert mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 font-satoshi">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default ServiceOptions;
