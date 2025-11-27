import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(false);
  const [search, setSearch] = useState("");
  const [togglePriceSorting, setTogglePriceSorting] = useState(false);
  const [searchMinPrice, setSearchMinPrice] = useState();
  const [searchMaxPrice, setSearchMaxPrice] = useState();

  let token = Cookies.get("token");

  return (
    <Router>
      <Header
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
        toggleSignup={toggleSignup}
        setToggleSignup={setToggleSignup}
        search={search}
        setSearch={setSearch}
        togglePriceSorting={togglePriceSorting}
        setTogglePriceSorting={setTogglePriceSorting}
        searchMinPrice={searchMinPrice}
        setSearchMinPrice={setSearchMinPrice}
        searchMaxPrice={searchMaxPrice}
        setSearchMaxPrice={setSearchMaxPrice}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              togglePriceSorting={togglePriceSorting}
              searchMinPrice={searchMinPrice}
              searchMaxPrice={searchMaxPrice}
              setToggleSignup={setToggleSignup}
            />
          }
        />
        <Route
          path="/offer/:id"
          element={
            <Offer
              toggleSignup={toggleSignup}
              setToggleSignup={setToggleSignup}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      {toggleSignup && (
        <Signup
          setToggleSignup={setToggleSignup}
          setToggleLogin={setToggleLogin}
          toggleSignup={toggleSignup}
        />
      )}
      {toggleLogin && (
        <Login
          setToggleLogin={setToggleLogin}
          setToggleSignup={setToggleSignup}
          toggleLogin={toggleLogin}
        />
      )}
    </Router>
  );
}

export default App;
