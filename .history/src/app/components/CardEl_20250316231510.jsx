"use client";
import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';

// Sample colors for cards
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#F1C40F', '#8E44AD', '#1F618D', '#E74C3C'];

// Main Component
const CardEl = () => {
  // State to keep track of card positions
  const [cards, setCards] = useState(
    colors.map((color, index) => ({ id: index.toString(), color }))
  );

  const [activeId, setActiveId] = useState(null);

  // Drag event handlers
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      const oldIndex = cards.findIndex(card => card.id === active.id);
      const newIndex = cards.findIndex(card => card.id === over?.id);

      setCards((items) => {
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems;
      });
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  // Masonry grid layout
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
    padding: '20px',
  };

  const getCardStyle = (color) => ({
    width: '100%',
    height: 200,
    backgroundColor: color,
    marginBottom: '16px',
    cursor: 'grab',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
  });

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <SortableContext items={cards.map(card => card.id)}>
        <div style={gridStyle}>
          {cards.map((card, index) => (
            <SortableCard key={card.id} id={card.id} color={card.color} style={getCardStyle(card.color)} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <div style={{
            width: 200,
            height: 200,
            backgroundColor: cards.find(card => card.id === activeId)?.color,
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

// Draggable card component
const DraggableCard = ({ id, color, style }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const draggableStyle = {
    ...style,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.7 : 1,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={draggableStyle}
      {...listeners}
      {...attributes}
    >
      {/* You can add content inside the card if needed */}
    </div>
  );
};

const SortableCard = ({ id, color, style }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const sortableStyle = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={sortableStyle}
      {...attributes}
      {...listeners}
    />
  );
};

export default CardEl;