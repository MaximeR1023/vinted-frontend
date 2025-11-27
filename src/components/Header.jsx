import "../css/Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";

import Home from "../pages/Home";

const Header = ({
  toggleLogin,
  setToggleLogin,
  toggleSignup,
  setToggleSignup,
  search,
  setSearch,
  togglePriceSorting,
  setTogglePriceSorting,
  searchMinPrice,
  setSearchMinPrice,
  searchMaxPrice,
  setSearchMaxPrice,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = Cookies.get("token");

  return (
    <header>
      <div className="container">
        <Link
          to="/"
          onClick={() => {
            setToggleSearchFilters(true);
          }}
        >
          <img src={logo} alt="Logo Vinted" />
        </Link>
        <section className="search">
          {/* barre et filtres de recherche */}
          <label>
            <input
              type="text"
              id="search"
              value={search}
              placeholder="Recherche des articles"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <FaSearch />
          </label>
          {location.pathname === "/" && (
            <article className="searchFilters">
              <div>
                <p>Trier par prix : </p>
                <input
                  type="checkbox"
                  id="togglePriceSorting"
                  checked={togglePriceSorting}
                  onChange={(event) => {
                    setTogglePriceSorting(event.target.checked);
                  }}
                />
              </div>
              <div>
                <p>Prix entre : </p>
                {/* Slider de prix */}
                <input
                  type="text"
                  id="searchMinPrice"
                  value={searchMinPrice || ""}
                  placeholder="0 €"
                  onChange={(event) => {
                    setSearchMinPrice(event.target.value);
                  }}
                />
                <input
                  type="text"
                  id="searchMaxPrice"
                  value={searchMaxPrice || ""}
                  placeholder="500 €"
                  onChange={(event) => {
                    setSearchMaxPrice(event.target.value);
                  }}
                />
              </div>
            </article>
          )}
        </section>
        <menu>
          <div className="account-actions">
            {!token ? (
              <>
                <button
                  onClick={() => {
                    setToggleSignup(!toggleSignup);
                  }}
                >
                  S'inscrire
                </button>
                <button
                  onClick={() => {
                    setToggleLogin(!toggleLogin);
                  }}
                >
                  Se connecter
                </button>
              </>
            ) : (
              <button
                className="disconnect"
                onClick={() => {
                  Cookies.remove("token");
                  navigate("/");
                }}
              >
                Se déconnecter
              </button>
            )}
          </div>
          <button
            onClick={() => {
              !token ? setToggleSignup(true) : navigate("/publish");
            }}
          >
            Vend tes articles
          </button>
        </menu>
      </div>
    </header>
  );
};

export default Header;
