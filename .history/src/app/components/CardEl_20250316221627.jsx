import Image from "next/image";
import cardImage from "./Ushdpi.png"

function CardEl() {
  return (
    <div className="card">
      <Image src={cardImage} alt="Avatar" style="width:100%" />
      <div className="container">
        <h4>
          <b>John Doe</b>
        </h4>
        <p>Architect & Engineer</p>
      </div>
    </div>
  );
}

export default CardEl;
