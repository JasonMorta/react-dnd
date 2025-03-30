"use client";
import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#F1C40F', '#8E44AD', '#1F618D', '#E74C3C'];

const CardEl = () => {
  const [cards, setCards] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const numColumns = 3;

  useEffect(() => {
    // Generate random heights once the component is mounted
    const initialCards = colors.map((color, index) => ({
      id: index.toString(),
      color,
      height: Math.floor(Math.random() * 100) + 150, // random height
    }));
    setCards(initialCards);
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      const oldIndex = cards.findIndex(card => card.id === active.id);
      const newIndex = cards.findIndex(card => card.id === over?.id);

      setCards((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const masonryGridStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  };

  const columnStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    alignItems: 'stretch', // Ensure cards fill the column width
  };

  const getCardStyle = (color, height) => ({
    width: '100%',
    height: height,
    backgroundColor: color,
    marginBottom: '16px',
    cursor: 'grab',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
  });

  const columns = Array.from({ length: numColumns }, () => []);
  cards.forEach((card, index) => {
    columns[index % numColumns].push(card);
  });

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <div style={masonryGridStyle}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} style={columnStyle}>
            <SortableContext items={column.map(card => card.id)}>
              {column.map((card) => (
                <SortableCard
                  key={card.id}
                  id={card.id}
                  color={card.color}
                  height={card.height}
                  style={getCardStyle(card.color, card.height)}
                />
              ))}
            </SortableContext>
          </div>
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <div style={{
            width: 200,
            height: cards.find(card => card.id === activeId)?.height || 200,
            backgroundColor: cards.find(card => card.id === activeId)?.color,
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const SortableCard = ({ id, color, height, style }) => {
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
