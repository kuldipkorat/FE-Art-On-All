import React from "react";
import HomePage from "./HomePage";
import TopProduct from "./TopProduct";
import MainImage from "./MainImage";
import LatestDesigns from "./LatestDesigns";

const LandingPage = () => {
  return (
    <>
      <HomePage />
      <TopProduct />
      <MainImage />
      <LatestDesigns/>
    </>
  );
};

export default LandingPage;
