import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/MedDisplay/FoodDisplay';
// import AppDownload from '../../components/AppDownload/AppDownload';
import Hfaq from '../../components/FAQ/Hfaq';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <Header />
      <ExploreMenu setCategory={setCategory} category={category} />
      <FoodDisplay category={category} />
      {/* <AppDownload /> */}
      {/* <Direction /> */}
      <Hfaq />
    </>
  );
};

export default Home;
