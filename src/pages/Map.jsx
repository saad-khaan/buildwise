import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const Map = () => {
  const [position] = useState([56.1304, -106.3468]); // Center of Canada

  return (
    <div className="px-4 py-20 text-center">
      <h2 className="text-3xl font-semibold mb-4">Zoning Map</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter address..."
          className="w-full max-w-md px-4 py-2 text-black rounded"
        />
      </div>

      <div className="w-full max-w-5xl mx-auto h-[500px] z-0">
        <MapContainer
          center={position}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>BuildWise map center</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;