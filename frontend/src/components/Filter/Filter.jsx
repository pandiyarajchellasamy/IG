import React, { useState, useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './Filter.css'
const Filter = ({ category = "All" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { food_list } = useContext(StoreContext);  // Get food_list from context

  const filteredFoodList = food_list
    .filter((item) => {
      // Filter based on search term (case-insensitive)
      if (searchTerm === "") {
        return true;  // Return all items if no search term
      } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      return false;
    })
    .filter((item) => category === "All" || category === item.category); // Filter based on category

  return (
    <div className="templateContainer">
      <div className="searchInput_Container">
        <input
          id="searchInput"
          type="text"
          placeholder="Search here..."
          onChange={(event) => setSearchTerm(event.target.value)}  // Update search term
        />
      </div>
      <div className="template_Container">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item) => (
            <FoodItem
              key={item._id}  // Unique key for each FoodItem
              image={item.image}
              name={item.name}
              desc={item.description}
              price={item.price}
              id={item._id}
            />
          ))
        ) : (
          <p>No items found</p>  // Show message if no items match the filter
        )}
      </div>
    </div>
  );
};

export default Filter;
