import React, { useState } from "react";
import { plans } from "../assets/assets";
import QRCode from "react-qr-code";

const UPI_ID = "9057294050@axl";
const NAME = "Manan Khanna";

const BuyCredit = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePayClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Choose a Plan & Pay with UPI</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border rounded-lg p-6 flex flex-col items-center bg-white shadow-md">
            <h3 className="text-lg font-semibold mb-2">{plan.id}</h3>
            <p className="mb-1">{plan.desc}</p>
            <p className="mb-1">
              Credits: <b>{plan.credits}</b>
            </p>
            <p className="mb-4">
              Price: <b>₹{plan.price}</b>
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-full mb-2"
              onClick={() => handlePayClick(plan)}>
              Pay
            </button>
          </div>
        ))}
      </div>
      {showModal && selectedPlan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center relative min-w-[300px]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={handleCloseModal}
              aria-label="Close">
              &times;
            </button>
            <h3 className="text-lg font-semibold mb-4">
              Pay for {selectedPlan.id} Plan
            </h3>
            <p className="mb-2">
              Amount: <b>₹{selectedPlan.price}</b>
            </p>
            <div className="flex flex-col gap-4 w-full items-center">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-full w-full"
                onClick={() =>
                  window.open(
                    `upi://pay?pa=${encodeURIComponent(
                      UPI_ID
                    )}&pn=${encodeURIComponent(NAME)}&am=${
                      selectedPlan.price
                    }&cu=INR`,
                    "_blank"
                  )
                }>
                Pay Direct (UPI App)
              </button>
              <div className="flex flex-col items-center w-full">
                <QRCode
                  value={`upi://pay?pa=${encodeURIComponent(
                    UPI_ID
                  )}&pn=${encodeURIComponent(NAME)}&am=${
                    selectedPlan.price
                  }&cu=INR`}
                  size={200}
                  bgColor="#fff"
                  style={{ background: "#fff", padding: 8 }}
                  className="mb-2 border"
                />
                <span className="text-xs text-gray-500">
                  Scan QR with any UPI app
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="text-xs mt-6 text-gray-500">
        After payment, contact support to get credits added to your account.
      </p>
    </div>
  );
};

export default BuyCredit;
