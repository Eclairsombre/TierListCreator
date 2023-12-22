import React from "react";
import RowCreate from "./RowCreate";
import { useState } from "react";
import "./AddButton.scss";

function AddRowButton({ rows, setRows }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const handleClose = () => {
    setIsPopUpOpen(false);
  };
  return (
    <div className="AddButtonRow">
      <button onClick={() => setIsPopUpOpen(true)} className="AddRow">
        +
      </button>
      {isPopUpOpen && (
        <RowCreate
          onClose={handleClose}
          rows={rows}
          setRows={setRows}
          modify={false}
        />
      )}
    </div>
  );
}

export default AddRowButton;
