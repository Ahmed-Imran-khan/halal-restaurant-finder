import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const FINLAND_CENTER = [64.9631, 25.7482];

function MapView({ restaurants, onSelectRestaurant }) {
  return (
    <MapContainer
      center={FINLAND_CENTER}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {restaurants.map((r, index) =>
        r.lat && r.lng ? (
          <Marker
            key={index}
            position={[r.lat, r.lng]}
            eventHandlers={{ click: () => onSelectRestaurant(r) }}
          >
            <Popup>
              <strong>{r.name}</strong>
              <br />
              {r.city}
            </Popup>
          </Marker>
        ) : null,
      )}
    </MapContainer>
  );
}

export default MapView;
