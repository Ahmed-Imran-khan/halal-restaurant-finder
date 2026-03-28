import { useState } from "react";

function Navbar({
  search,
  setSearch,
  cityFilter,
  setCityFilter,
  cuisineFilter,
  setCuisineFilter,
  cities,
  cuisines,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-brand">Halal Restaurant Finder Finland</div>

      {/* Toggle Button */}
      {/* <button className="navbar-toggle" onClick={() => setOpen(!open)}>
        ▼
      </button> */}

      {/* Controls */}
      <div className={`navbar-controls ${open ? "open" : ""}`}>
        <input
          type="text"
          placeholder="Search restaurant or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
        >
          <option value="">All Cuisines</option>
          {cuisines.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <button className="navbar-toggle" onClick={() => setOpen(!open)}>
        {open ? "▲" : "▼"}
      </button>
    </div>
  );
}

export default Navbar;
