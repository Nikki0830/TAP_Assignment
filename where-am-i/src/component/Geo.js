import React, { useEffect, useState, useRef } from "react";
import "./Geo.css";

function Geo() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [connectionType, setConnectionType] = useState("Unknown");
  const [locationHistory, setLocationHistory] = useState([]);

  //  Ref to avoid infinite re-render
  const historyRef = useRef([]);

  //  1. Get current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  //  2. Get network connection
  useEffect(() => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      setConnectionType(connection.effectiveType);

      const updateConnectionStatus = () =>
        setConnectionType(connection.effectiveType);
      connection.addEventListener("change", updateConnectionStatus);

      return () =>
        connection.removeEventListener("change", updateConnectionStatus);
    }
  }, []);

  //  3. Background save task with fixed history logic
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("locationHistory")) || [];
    setLocationHistory(saved);
    historyRef.current = saved;

    const interval = setInterval(() => {
      if (location.latitude && location.longitude) {
        const newEntry = {
          latitude: location.latitude,
          longitude: location.longitude,
          timestamp: new Date().toLocaleString(),
        };

        let updated = [newEntry, ...historyRef.current];

        if (updated.length >= 5) {
          localStorage.removeItem("locationHistory");
          setLocationHistory([]);
          historyRef.current = [];
        } else {
          localStorage.setItem("locationHistory", JSON.stringify(updated));
          setLocationHistory(updated);
          historyRef.current = updated;
        }
      }
    }, 10000); //  every 10s

    return () => clearInterval(interval);
  }, [location]); // only runs when location updates

  return (
    <div className="container">
      <h1 className="title">🌍 Where Am I?</h1>

      {/* 📍 Location */}
      <div className="card">
        <h3>📍 Current Location</h3>
        <p>
          <strong>Latitude:</strong> {location.latitude || "Loading..."}
        </p>
        <p>
          <strong>Longitude:</strong> {location.longitude || "Loading..."}
        </p>
      </div>

      {/* 🌐 Network */}
      <div className="card">
        <h3>🌐 Network Status</h3>
        <p>
          <strong>Connection Type:</strong> {connectionType}
        </p>
      </div>

      {/* 🕒 Location History */}
      <div className="card">
        <h3>🕒 Location History (last 5)</h3>
        {locationHistory.length === 0 ? (
          <p>Location history cleared or no entries yet.</p>
        ) : (
          //   <ul>
          //     {locationHistory.map((entry, index) => (
          //       <li key={index}>
          //         📍 {entry.latitude}, {entry.longitude} –{" "}
          //         <em>{entry.timestamp}</em>
          //       </li>
          //     ))}
          //   </ul>
          <ul>
            {locationHistory.map((entry, index) => (
              <li key={index} style={{ marginBottom: "1rem" }}>
                <p>
                  📍{" "}
                  <strong>
                    {entry.latitude}, {entry.longitude}
                  </strong>{" "}
                  – <em>{entry.timestamp}</em>
                </p>
                <iframe
                  title={`map-${index}`}
                  width="100%"
                  height="500"
                  frameBorder="0"
                  style={{ border: 0, borderRadius: "8px" }}
                  src={`https://www.google.com/maps?q=${entry.latitude},${entry.longitude}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>

                {/*  View on Google Maps link */}
                <a
                  href={`https://www.google.com/maps?q=${entry.latitude},${entry.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔎 View on Google Maps
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="note">
        ⏳ Location auto-saves every 10 seconds and clears after 5 entries.
      </p>
    </div>
  );
}

export default Geo;
