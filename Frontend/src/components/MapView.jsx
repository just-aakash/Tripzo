import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { useEffect } from "react";

function RecenterMap({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    map.setView(
      [latitude, longitude],
      11,
      {
        animate: true,
      }
    );
  }, [latitude, longitude, map]);

  return null;
}

export default function MapView({
  latitude,
  longitude,
  name,
  attractions = [],
}) {
  return (
    <div className="h-[500px] overflow-hidden rounded-3xl border border-white/10">

      <MapContainer
        center={[latitude, longitude]}
        zoom={11}
        scrollWheelZoom={true}
        className="h-full w-full"
      >

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap
          latitude={latitude}
          longitude={longitude}
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>{name}</strong>
          </Popup>
        </Marker>

        {attractions.map((place) => {
          const coordinate =
            place.coordinates?.[0];

          if (!coordinate) return null;

          return (
            <Marker
              key={place.pageid}
              position={[
                coordinate.lat,
                coordinate.lon,
              ]}
            >
              <Popup>
                {place.title}
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>

    </div>
  );
}
