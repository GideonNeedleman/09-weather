import api_key from "../api_key";

function GpsButton({ setIsPressed }) {
  const apikey = api_key();

  async function handlePressed() {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=${apikey}`
    );
    const data = await res.json();
    console.log(data);
    setIsPressed(true);
  }
  return (
    <button className="btn-gps" onClick={handlePressed}>
      <i className="fa-solid fa-crosshairs"></i>
    </button>
  );
}

export default GpsButton;
