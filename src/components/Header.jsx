import "../css/Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import Cookies from "js-cookie";

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
  token,
  setToken,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>
        <section className="search">
          <label>
            <input
              type="text"
              value={search}
              placeholder="Recherche des articles"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch />
          </label>

          {location.pathname === "/" && (
            <article className="searchFilters">
              <div>
                <p>Trier par prix : </p>
                <input
                  type="checkbox"
                  checked={togglePriceSorting}
                  onChange={(e) => setTogglePriceSorting(e.target.checked)}
                />
              </div>
              <div>
                <p>Prix entre : </p>
                <input
                  type="text"
                  value={searchMinPrice || ""}
                  placeholder="0 €"
                  onChange={(e) => setSearchMinPrice(e.target.value)}
                />
                <input
                  type="text"
                  value={searchMaxPrice || ""}
                  placeholder="500 €"
                  onChange={(e) => setSearchMaxPrice(e.target.value)}
                />
              </div>
            </article>
          )}
        </section>

        <menu>
          <div className="account-actions">
            {!token ? (
              <>
                <button onClick={() => setToggleSignup(!toggleSignup)}>
                  S'inscrire
                </button>
                <button onClick={() => setToggleLogin(!toggleLogin)}>
                  Se connecter
                </button>
              </>
            ) : (
              <button
                className="disconnect"
                onClick={() => {
                  Cookies.remove("token");
                  setToken(null);
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
