"use client";

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import Image from "next/image";
import { useState } from "react";
import jug1 from "./Juggernaut.jpg";
import jug2 from "./jj.jpg";
import jug3 from "./portrait_uncanny.jpg";
import "./Card.css";

function DraggableCard({ pic, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="custom-card">
      <Image src={pic} alt="Juggernaut" width={200} height={200} />
      <div className="custom-container">
        <h4>
          <b>Juggernaut</b>
        </h4>
        <p>Strength: 1,000,000</p>
        <p>Speed: 100</p>
      </div>
    </div>
  );
}

function DroppableZone({ id, children }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="droppable-zone">
      <h3>{id.replace("-", " ")}</h3>
      {children}
    </div>
  );
}

function CardEl() {
  const [availableCards, setAvailableCards] = useState([
    { id: "card-0", pic: jug1 },
    { id: "card-1", pic: jug2 },
    { id: "card-2", pic: jug3 },
  ]);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeCard = availableCards.find((card) => card.id === active.id) ||
      selectedCards.find((card) => card.id === active.id);

    if (over.id === "selected-cards" && activeCard) {
      setAvailableCards((prev) => prev.filter((card) => card.id !== active.id));
      setSelectedCards((prev) => [...prev, activeCard]);
    }

    if (over.id === "available-cards" && activeCard) {
      setSelectedCards((prev) => prev.filter((card) => card.id !== active.id));
      setAvailableCards((prev) => [...prev, activeCard]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container">
        <DroppableZone id="available-cards">
          {availableCards.map((card) => (
            <DraggableCard key={card.id} id={card.id} pic={card.pic} />
          ))}
        </DroppableZone>

        <DroppableZone id="selected-cards">
          {selectedCards.map((card) => (
            <DraggableCard key={card.id} id={card.id} pic={card.pic} />
          ))}
        </DroppableZone>
      </div>
    </DndContext>
  );
}

export default CardEl;
