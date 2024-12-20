import React, { useState, useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ category = "All" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { food_list } = useContext(StoreContext);  // Get food_list from context

  // Filter the food list based on search term and category
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
    <div className='food-display' id='food-display'>
      <h2>Search your medicine</h2>
      
      <div className="searchInput_Container d-flex justify-content-center">
        <input className='w-50 rounded-4 border-1 p-2' 
          id="searchInput"
          type="text"
          placeholder="          Search here..."
          onChange={(event) => setSearchTerm(event.target.value)}  // Update search term
        />
      </div>

      <div className='food-display-list' >
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

export default FoodDisplay;
