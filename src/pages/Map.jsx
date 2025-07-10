import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 15);
  return null;
};

const Map = () => {
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState([56.1304, -106.3468]); // Default to Canada
  const [found, setFound] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: address,
          format: "json",
        },
      });

      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
        setFound(true);
      } else {
        alert("Address not found.");
        setFound(false);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      alert("Error finding location.");
      setFound(false);
    }
  };

  return (
    <div className="px-4 py-20 text-center">
      <h2 className="text-3xl font-semibold mb-4">Zoning Map</h2>

      <div className="mb-6 flex justify-center gap-2">
        <input
          type="text"
          placeholder="Enter address..."
          className="w-80 px-4 py-2 text-black rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="w-full max-w-5xl mx-auto h-[500px] z-0">
        <MapContainer center={coords} zoom={5} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {found && <Marker position={coords}><Popup>{address}</Popup></Marker>}
          <ChangeMapView coords={coords} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;