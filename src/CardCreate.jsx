import React, { useState } from "react";
import "./PopUp.scss";

function AddCardPopUp({ onClose, setStockage }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);

  class Card {
    constructor(name, image, id, tier) {
      this.name = name;
      this.image = image;
      this.id = id;
      this.tier = tier;
    }
  }

  function createCard(name, image) {
    if (name !== "" || image !== null) {
      const newCard = new Card(
        name,
        image,
        Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        "Stockage"
      );
      setStockage((prevStockage) => [...prevStockage, newCard]);
      onClose();
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="PopUpCard">
      <h1 className="nameCard">Create a Card</h1>
      <button className="close" onClick={onClose}>
        X
      </button>
      <p>Enter a Name: </p>
      <input type="text" name="name" onChange={handleNameChange} />
      <p>Put an Image :</p>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {img && <img src={img} alt="User uploaded" />}

      <button
        onClick={() => createCard(name, img)}
        className="ButtonCreateCard"
      >
        Create
      </button>
    </div>
  );
}

export default AddCardPopUp;
