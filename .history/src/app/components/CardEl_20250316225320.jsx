import React from 'react';
import {DndContext} from '@dnd-kit/core';

import {Draggable} from './Draggable';
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