import { useState, useMemo } from "react";
import { useRestaurants } from "./hooks/useRestaurants";
import MapView from "./components/MapView";
import Navbar from "./components/Navbar";
import RestaurantCard from "./components/RestaurantCard";

function App() {
  const { restaurants, loading, error } = useRestaurants();
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const cities = useMemo(
    () => [...new Set(restaurants.map((r) => r.city).filter(Boolean))],
    [restaurants],
  );
  const cuisines = useMemo(
    () => [...new Set(restaurants.map((r) => r.cuisine).filter(Boolean))],
    [restaurants],
  );

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.city.toLowerCase().includes(search.toLowerCase());
      const matchCity = cityFilter ? r.city === cityFilter : true;
      const matchCuisine = cuisineFilter ? r.cuisine === cuisineFilter : true;
      return matchSearch && matchCity && matchCuisine;
    });
  }, [restaurants, search, cityFilter, cuisineFilter]);
  console.log("Restaurants:", restaurants);
  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f0f4f0",
        }}
      >
        <dotlottie-wc
          src="https://lottie.host/b6d6360b-458a-4c87-8a93-5b49f03b6788/bVex5yHDoM.lottie"
          style={{ width: "300px", height: "300px" }}
          autoplay
          loop
        />

      </div>
    );
  if (error) return <h2 style={{ padding: "20px" }}>Error: {error}</h2>;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Navbar
        search={search}
        setSearch={setSearch}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        cuisineFilter={cuisineFilter}
        setCuisineFilter={setCuisineFilter}
        cities={cities}
        cuisines={cuisines}
      />
      <RestaurantCard restaurant={selected} onClose={() => setSelected(null)} />
      <div style={{ height: "100%" }}>
        <MapView restaurants={filtered} onSelectRestaurant={setSelected} />
      </div>
    </div>
  );
}

export default App;
