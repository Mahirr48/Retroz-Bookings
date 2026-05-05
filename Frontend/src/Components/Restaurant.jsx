import React, { useEffect, useState } from "react";
import API from "../services/api";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    API.get("/restaurants")
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>🍴 Restaurant List</h2>
      <ul>
        {restaurants.map(r => (
          <li key={r._id}>
            {r.name} - {r.cuisine} ({r.location})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Restaurant;
