"use client";

import { DndContext, useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import jug1 from "./Juggernaut.jpg";
import jug2 from "./jj.jpg";
import jug3 from "./portrait_uncanny.jpg";
import "./Card.css";

function DraggableCard({ pic, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

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

function CardEl() {
  const allPics = [jug1, jug2, jug3];

  return (
    <DndContext>
      {allPics.map((pic, index) => (
        <DraggableCard key={index} id={`card-${index}`} pic={pic} />
      ))}
    </DndContext>
  );
}

export default CardEl;
