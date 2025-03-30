import Image from "next/image";
import jug1 from "./Juggernaut.jpg";
import jug2 from "./jj.jpg";
import jug3 from "./portrait_uncanny.jpg";
import "./Card.css";

function CardEl() {

  const allPics = [jug1, jug2, jug3];


  return (
    allPics.map((pic, index) => {
      return (
        <div key={index} className="custom-card">
          <Image src={pic} alt="Juggernaut"  />
          <div className="custom-container">
            <h4>
              <b>Juggernaut</b>
            </h4>
            <p>Strength: 1,000,000</p>
            <p>Speed: 100</p>
          </div>
        </div>
      );
    })
  );
}

export default CardEl;
