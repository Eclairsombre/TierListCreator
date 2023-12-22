import React, { useEffect } from "react";
import { useState } from "react";
import "./TierList.scss";
import PopUp from "./PopUp";
import AddButton from "./AddButton";
import Row from "./Row";
import AddRowButton from "./AddRow";
import ModifyNameTierlist from "./ModifyNameTierlist";

function TierList() {
  const [Stockage, setStockage] = useState([]);
  const [draggedCard, setDraggedCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [rows, setRows] = useState([]);

  class RowTier {
    constructor(name, cards, color, id) {
      this.name = name;
      this.cards = cards;
      this.color = color;
      this.id = id;
    }
  }

  useEffect(() => {
    const row = JSON.parse(localStorage.getItem("rows"));
    if (row) {
      setRows(row);
    } else {
      const rows = [
        new RowTier("S", [], "red", 0),
        new RowTier("A", [], "orange", 1),
        new RowTier("B", [], "yellow", 2),
        new RowTier("C", [], "green", 3),
        new RowTier("D", [], "blue", 4),
      ];
      setRows(rows);
    }
  }, []);

  function handleDrop(e, tier) {
    e.preventDefault();

    const card = draggedCard;

    const oldTier = card.tier;
    console.log(oldTier);

    const newRows = rows.map((row) => {
      if (row.name === oldTier) {
        const newCards = row.cards.filter((c) => c.id !== card.id);
        return { ...row, cards: newCards };
      }
      if (row.name === tier) {
        return { ...row, cards: [...row.cards, card] };
      }
      return row;
    });
    if (oldTier === "Stockage") {
      const newStockage = Stockage.filter((c) => c.id !== card.id);
      setStockage(newStockage);
    }
    setRows(newRows);
    card.tier = tier;

    setDraggedCard(null);
  }

  function handleDragStart(e, card) {
    e.preventDefault();
    setDraggedCard(card);
  }

  function onClose() {
    console.log("close");
    setSelectedCard(null);
  }

  return (
    <div>
      <ModifyNameTierlist />

      {selectedCard && <PopUp card={selectedCard} onClose={onClose} id={1} />}
      <div className="TierList">
        <div className="Row">
          {rows.map((row) => (
            <Row
              {...row}
              onDrop={handleDrop}
              onDrag={handleDragStart}
              onClick={setSelectedCard}
              setRows={setRows}
              rows={rows}
            />
          ))}
        </div>

        <div className="Stockage">
          <div className="Tier">
            <p className="tierStockage">Stockage</p>
          </div>
          {Stockage.map((card) => (
            <div
              className="Card"
              key={card.id}
              onDrag={(e) => handleDragStart(e, card)}
              onClick={() => setSelectedCard(card)}
            >
              <img src={card.image} alt={card.name} />
            </div>
          ))}
          <AddButton Stockage={Stockage} setStockage={setStockage} />
        </div>
      </div>
      <AddRowButton rows={rows} setRows={setRows} />
    </div>
  );
}

export default TierList;
