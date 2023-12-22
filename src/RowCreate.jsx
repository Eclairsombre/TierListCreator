import React, { useEffect, useState } from "react";
import "./PopUp.scss";

function RowCreate({ onClose, rows, setRows, modify, rowName, rowColor }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [putColor, setPutColor] = useState(false);
  const [putName, setPutName] = useState(false);

  const [allColors, setAllColors] = useState(["#000000"]);
  const [allNames, setAllNames] = useState(["Stockage"]);

  useEffect(() => {
    rows.map((row) => {
      if (checkName(row.name)) {
        setAllNames((prevAllNames) => [...prevAllNames, row.name]);
      }
      if (checkColor(row.color)) {
        setAllColors((prevAllColors) => [...prevAllColors, row.color]);
      }
    });
    if (modify) {
      setName(rowName);
      setColor(rowColor);
      setAllColors((prevColors) =>
        prevColors.filter((color) => color !== rowColor)
      );
      setAllNames((prevNames) => prevNames.filter((name) => name !== rowName));
    }
  }, [rows, modify, rowColor, rowName]);

  class RowTier {
    constructor(name, cards, color, id) {
      this.name = name;
      this.cards = cards;
      this.color = color;
      this.id = id;
    }
  }

  function addRow(name, color) {
    if (!putColor && !putName) {
      if (modify) {
        deleteRow(rowName);
      }

      const newRow = new RowTier(name, [], color, rows.length + 1);

      setRows((prevRows) => [...prevRows, newRow]);
      onClose();
    }
  }

  const handleColorChange = (event) => {
    if (!checkColor(event.target.value)) {
      setPutColor(true);
    } else {
      setPutColor(false);
    }
    setColor(event.target.value);
  };

  const handleNameChange = (event) => {
    if (!checkName(event.target.value)) {
      setPutName(true);
    } else {
      setPutName(false);
    }
    setName(event.target.value);
  };

  function checkName(name) {
    if (allNames.includes(name)) {
      return false;
    } else {
      return true;
    }
  }

  function checkColor(color) {
    if (allColors.includes(color)) {
      return false;
    } else {
      return true;
    }
  }

  function deleteRow(name) {
    const newRows = rows.filter((row) => row.name !== name);
    setRows(newRows);
  }

  return (
    <div>
      {modify && (
        <div className="PopUpRow">
          <h1 className="nameCard">Modify a Tier</h1>
          <button className="close" onClick={onClose}>
            X
          </button>
          <p>Enter a Name: </p>
          <input type="text" name="name" onChange={handleNameChange} />
          {putName && <p className="Color">Name already taken</p>}
          <p className="Color">Choose a color :</p>
          <input type="color" value={color} onChange={handleColorChange} />
          {putColor && <p className="Color">Color already taken</p>}

          <div>
            <button
              onClick={() => addRow(name, color)}
              className="ButtonCreateCard"
            >
              Create
            </button>
            <button className="delete" onClick={() => deleteRow(rowName)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {!modify && (
        <div className="PopUpRow">
          <h1 className="nameCard">Create a Tier</h1>
          <button className="close" onClick={onClose}>
            X
          </button>
          <p>Enter a Name: </p>
          <input type="text" name="name" onChange={handleNameChange} />
          {putName && <p className="Color">Name already taken</p>}
          <p className="Color">Choose a color :</p>
          <input type="color" value={color} onChange={handleColorChange} />
          {putColor && <p className="Color">Color already taken</p>}

          <div>
            <button
              onClick={() => addRow(name, color)}
              className="ButtonCreateCard"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RowCreate;
