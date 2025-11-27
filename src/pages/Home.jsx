import "../css/Home.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Main from "../components/Main";

const Home = ({
  search,
  togglePriceSorting,
  searchMinPrice,
  searchMaxPrice,
  setToggleSignup,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let priceSorting = "";
  if (togglePriceSorting) priceSorting = "price-desc";
  else if (togglePriceSorting === false) priceSorting = "price-asc";

  let filters = "";
  let sort = togglePriceSorting ? "price-desc" : "price-asc";
  filters += (filters ? "&" : "?") + "sort=" + sort;
  if (search) {
    filters += (filters ? "&" : "?") + "title=" + search;
  }
  if (searchMinPrice) {
    filters += (filters ? "&" : "?") + "priceMin=" + searchMinPrice;
  }
  if (searchMaxPrice) {
    filters += (filters ? "&" : "?") + "priceMax=" + searchMaxPrice;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--vinted-backend--sw2wxzy5rpkz.code.run/offers${filters}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, togglePriceSorting, searchMinPrice, searchMaxPrice]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <Hero setToggleSignup={setToggleSignup} />
      <Main data={data} />
    </>
  );
};

export default Home;
