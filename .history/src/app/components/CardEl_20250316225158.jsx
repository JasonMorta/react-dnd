"use client";

import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { useState } from "react";
import jug1 from "./Juggernaut.jpg";
import jug2 from "./jj.jpg";
import jug3 from "./portrait_uncanny.jpg";
import "./Card.css";

// SortableCard: A draggable card that remembers its position
function SortableCard({ id, pic }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // Smooth snapping and movement
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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

// DroppableZone: Defines a section where items can be dropped
function DroppableZone({ id, items, children }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="droppable-zone">
      <h3>{id === "available-cards" ? "Available Cards" : "Selected Cards"}</h3>
      <SortableContext items={items}>{children}</SortableContext>
    </div>
  );
}

// Main Component: Manages card movement & position
function CardEl() {
  const [availableCards, setAvailableCards] = useState([
    { id: "card-0", pic: jug1 },
    { id: "card-1", pic: jug2 },
    { id: "card-2", pic: jug3 },
  ]);
  const [selectedCards, setSelectedCards] = useState([]);

  // Handle when an item is dropped
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return; // If dropped outside, do nothing

    const activeId = active.id;
    const overId = over.id;

    if (!activeId || !overId) return; // Prevent undefined errors

    // Check if the dragged card is in availableCards or selectedCards
    const isInAvailable = availableCards.some((card) => card.id === activeId);
    const isInSelected = selectedCards.some((card) => card.id === activeId);

    // Moving between lists
    if (isInAvailable && overId === "selected-cards") {
      const movingCard = availableCards.find((card) => card.id === activeId);
      if (!movingCard) return;

      setAvailableCards((prev) => prev.filter((card) => card.id !== activeId));
      setSelectedCards((prev) => [...prev, movingCard]);
    } else if (isInSelected && overId === "available-cards") {
      const movingCard = selectedCards.find((card) => card.id === activeId);
      if (!movingCard) return;

      setSelectedCards((prev) => prev.filter((card) => card.id !== activeId));
      setAvailableCards((prev) => [...prev, movingCard]);
    }

    // Sorting within the same list
    if (overId === activeId) {
      setAvailableCards((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === activeId);
        const newIndex = prev.findIndex((item) => item.id === overId);
        return arrayMove(prev, oldIndex, newIndex);
      });

      setSelectedCards((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === activeId);
        const newIndex = prev.findIndex((item) => item.id === overId);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="container">
        {/* Available Cards Section */}
        <DroppableZone id="available-cards" items={availableCards}>
          {availableCards
            .filter((card) => card) // Ensure no undefined values
            .map((card) => (
              <SortableCard key={card.id} id={card.id} pic={card.pic} />
            ))}
        </DroppableZone>

        {/* Selected Cards Section */}
        <DroppableZone id="selected-cards" items={selectedCards}>
          {selectedCards
            .filter((card) => card) // Ensure no undefined values
            .map((card) => (
              <SortableCard key={card.id} id={card.id} pic={card.pic} />
            ))}
        </DroppableZone>
      </div>
    </DndContext>
  );
}

export default CardEl;
