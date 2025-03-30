'use client'
import {DndContext} from '@dnd-kit/core';

import {Draggable} from './Droppable';
import {Droppable} from './Droppable';

function CardEl() {
  return (
    <DndContext>
      <Draggable />
      <Droppable />
    </DndContext>
  )
}

export default CardEl;