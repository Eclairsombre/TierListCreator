import React from "react";
import "./AddButton.scss";
import AddCardPopUp from "./CardCreate";
import { useState } from "react";

function AddButton({ setStockage }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handleClose = () => {
    setIsPopUpOpen(false);
  };

  return (
    <div className="Tier AddButton">
      <button onClick={() => setIsPopUpOpen(true)} className="Add">
        +
      </button>
      {isPopUpOpen && (
        <AddCardPopUp onClose={handleClose} setStockage={setStockage} />
      )}
    </div>
  );
}

export default AddButton;
