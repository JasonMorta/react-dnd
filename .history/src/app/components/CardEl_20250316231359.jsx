"use client";
import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';

// Sample colors for cards
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#F1C40F', '#8E44AD', '#1F618D', '#E74C3C'];

// Main Component
const CardEl = () => {
  // State to keep track of card positions
  const [cards, setCards] = useState(
    colors.map((color, index) => ({ id: index.toString(), color }))
  );

  // Drag event handlers
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const activeIndex = cards.findIndex(card => card.id === active.id);
      const overIndex = cards.findIndex(card => card.id === over?.id);

      const newCards = [...cards];
      // Swap the positions of the cards
      [newCards[activeIndex], newCards[overIndex]] = [newCards[overIndex], newCards[activeIndex]];

      setCards(newCards);
    }
  };

  // Masonry grid layout
  const getCardStyle = (index) => ({
    width: 200,
    height: 200,
    backgroundColor: cards[index].color,
    marginBottom: '16px',
    cursor: 'move',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  });

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={gridStyle}>
        {cards.map((card, index) => (
          <DraggableCard key={card.id} index={index} id={card.id} style={getCardStyle(index)} />
        ))}
      </div>
    </DndContext>
  );
};

// Draggable card component
const DraggableCard = ({ id, index, style }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...style, position: 'absolute', top: `${Math.floor(index / 3) * 220}px`, left: `${(index % 3) * 220}px` }}
    />
  );
};

// Simple masonry grid style
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
  gap: '16px',
  position: 'relative',
  padding: '20px',
};

export default CardEl;
