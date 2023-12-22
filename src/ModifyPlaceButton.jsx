import React from "react";
import "./ModifyPlaceButton.scss";

function ModifyPlaceButton({ rows, setRows, indiceRows }) {
  function handleUp() {
    console.log(indiceRows);
    if (indiceRows !== 0) {
      const rowsCopy = [...rows];
      const rowToMove = rowsCopy[indiceRows];
      rowsCopy[indiceRows] = rowsCopy[indiceRows - 1];
      rowsCopy[indiceRows - 1] = rowToMove;
      rowToMove.id = indiceRows - 1;
      rowsCopy[indiceRows].id = indiceRows;

      setRows(rowsCopy);
    }
  }
  function handleDown() {
    if (indiceRows !== rows.length - 1) {
      const rowsCopy = [...rows];
      const rowToMove = rowsCopy[indiceRows];
      rowsCopy[indiceRows] = rowsCopy[indiceRows + 1];
      rowsCopy[indiceRows + 1] = rowToMove;
      rowToMove.id = indiceRows + 1;
      rowsCopy[indiceRows].id = indiceRows;
      setRows(rowsCopy);
    }
  }
  return (
    <div>
      <button className="Up" onClick={handleUp}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="12"
          viewBox="0 0 384 512"
        >
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </button>
      <button className="Down" onClick={handleDown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="12"
          viewBox="0 0 384 512"
        >
          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>
      </button>
    </div>
  );
}

export default ModifyPlaceButton;
