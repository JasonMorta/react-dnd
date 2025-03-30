import Image from "next/image";

function CardEl() {
  return (
    <div className="card">
      <Image src="img_avatar.png" alt="Avatar" style="width:100%" />
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
