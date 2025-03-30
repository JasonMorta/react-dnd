import Image from "next/image";
import profilePic from './Ushdpi.png'

import "./Card.css";

function CardEl() {
  return (
    <div className="custom-card">
      <Image
        src={profilePic}
        alt="Picture of the author"
      />
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
