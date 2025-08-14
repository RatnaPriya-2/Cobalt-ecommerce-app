import React from "react";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";
import BestSellers from "../components/BestSellers";
import PolicySection from "../components/PolicySection";
import SubscribeSection from "../components/SubscribeSection";
import FooterSection from "../components/FooterSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSellers />
      <PolicySection />
      <SubscribeSection />
      <FooterSection />
    </div>
  );
};

export default Home;
