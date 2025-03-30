"use client";

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import Image from "next/image";
import { useState } from "react";
import jug1 from "./Juggernaut.jpg";
import jug2 from "./jj.jpg";
import jug3 from "./portrait_uncanny.jpg";
import "./Card.css";

// DraggableCard Component: Represents a draggable card
function DraggableCard({ pic, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  // Style for smooth dragging movement
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

// DroppableZone Component: Defines an area where items can be dropped
function DroppableZone({ id, children }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="droppable-zone">
      <h3>{id === "available-cards" ? "Available Cards" : "Selected Cards"}</h3>
      <div className="card-container">{children}</div>
    </div>
  );
}

// Main CardEl Component: Handles state and drag logic
function CardEl() {
  const [availableCards, setAvailableCards] = useState([
    { id: "card-0", pic: jug1 },
    { id: "card-1", pic: jug2 },
    { id: "card-2", pic: jug3 },
  ]);
  const [selectedCards, setSelectedCards] = useState([]);

  // Handles logic when a card is dropped
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // Do nothing if not dropped in a valid area

    // Find the dragged card
    const activeCard =
      availableCards.find((card) => card.id === active.id) ||
      selectedCards.find((card) => card.id === active.id);

    if (!activeCard) return; // Safety check

    // Move card to the correct section
    if (over.id === "selected-cards" && availableCards.includes(activeCard)) {
      setAvailableCards(availableCards.filter((card) => card.id !== active.id));
      setSelectedCards([...selectedCards, activeCard]);
    } else if (over.id === "available-cards" && selectedCards.includes(activeCard)) {
      setSelectedCards(selectedCards.filter((card) => card.id !== active.id));
      setAvailableCards([...availableCards, activeCard]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container">
        {/* Droppable area for available cards */}
        <DroppableZone id="available-cards">
          {availableCards.map((card) => (
            <DraggableCard key={card.id} id={card.id} pic={card.pic} />
          ))}
        </DroppableZone>

        {/* Droppable area for selected cards */}
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
