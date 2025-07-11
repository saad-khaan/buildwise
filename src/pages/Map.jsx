import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import Header from "../components/Header";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Initialize map
  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12", // Light style (can be changed)
      center: [-123.3656, 48.4284], // Victoria, BC
      zoom: 12,
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  // Autocomplete
  const fetchSuggestions = async (query) => {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?autocomplete=true&access_token=${mapboxgl.accessToken}`
      );
      setSuggestions(res.data.features);
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 2) fetchSuggestions(query);
    else setSuggestions([]);
  };

  const handleSearch = async (placeName) => {
    const query = placeName || searchQuery;
    if (!query) return;

    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${mapboxgl.accessToken}`
      );

      const feature = res.data.features[0];
      if (feature) {
        const [lng, lat] = feature.center;

        map.flyTo({ center: [lng, lat], zoom: 14 });

        if (marker) marker.remove();
        const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        setMarker(newMarker);
        setSuggestions([]);
        setSearchQuery(feature.place_name);
      } else {
        alert("Address not found.");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      alert("Failed to search address.");
    }
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      <Header />
      <div className="flex justify-center items-center px-4 py-8">
        <div className="relative w-full max-w-6xl h-[80vh] rounded-xl overflow-hidden shadow-2xl">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-lg">
            <input
              type="text"
              placeholder="Search address..."
              value={searchQuery}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-md text-black"
            />
            {suggestions.length > 0 && (
              <ul className="bg-white text-black border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto mt-1">
                {suggestions.map((sug) => (
                  <li
                    key={sug.id}
                    onClick={() => handleSearch(sug.place_name)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {sug.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Map;