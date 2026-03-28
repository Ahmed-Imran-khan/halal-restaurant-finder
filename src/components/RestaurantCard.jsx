import { ForkIcons, PhoneIcons } from "../icons/icon";

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400",
  "https://images.unsplash.com/photo-1561626423-a51b45bef2b4?w=400",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
  "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400",
  "https://images.unsplash.com/photo-1561626423-a51b45bef2b4?w=400",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
];

function RestaurantCard({ restaurant, onClose }) {
  if (!restaurant) return null;

  const img = FOOD_IMAGES[Math.floor(Math.random() * FOOD_IMAGES.length)];
  const isFullyHalal = restaurant.halal_status?.toLowerCase().includes("fully");

  return (
    <div className="restaurant-card">
      <button className="close-btn" onClick={onClose}>
        ◀ 
      </button>

      <img className="card-image" src={img} alt="food" />

      <div className="card-body">
        <div>
          <span className="badge badge-halal">
            {isFullyHalal ? "✓ Fully Halal" : "◑ Halal Options"}
          </span>
          {/* <span className="badge badge-cuisine">{restaurant.cuisine}</span> */}
        </div>

        <h2 className="card-title">{restaurant.name}</h2>
        <span className="badge badge-cuisine">
          <ForkIcons /> {restaurant.cuisine}
        </span>

        <div className="address-body">
          <p className="card-address">
            <h4>Location</h4>
            {restaurant.address}, {restaurant.city}
            {restaurant.phone && <p>{restaurant.phone}</p>}
          </p>

          <div className="card-details">
            <h4>Opening hours</h4>
            {/* {restaurant.phone && <p>📞 {restaurant.phone}</p>} */}
            {restaurant.hours && <p>{restaurant.hours}</p>}
            {restaurant.website && (
              <p>
                <a href={restaurant.website} target="_blank" rel="noreferrer">
                  🌐 Visit Website
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
