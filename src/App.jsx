// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
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
    return <h2 style={{ padding: "20px" }}>Loading restaurants...</h2>;
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
      <div style={{ paddingTop: "60px", height: "100%" }}>
        <MapView restaurants={filtered} onSelectRestaurant={setSelected} />
      </div>
    </div>
  );
}

export default App;
