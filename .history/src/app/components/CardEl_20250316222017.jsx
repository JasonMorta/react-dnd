import Image from "next/image";
import cardImage from "./Ushdpi.png"
import "./Card.css"


function CardEl() {
  return (
    <div className="custom-card">
      <Image src={cardImage} alt="Avatar" />
      <div className="custom-container">
        <h4>
          <b>John Doe</b>
        </h4>
        <p>Architect & Engineer</p>
      </div>
    </div>
  );
}

export default CardEl;
