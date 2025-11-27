import "../css/Hero.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Hero = ({ setToggleSignup }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  return (
    <section className="hero">
      <div className="container">
        <section className="hero-box">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button
            onClick={() => {
              !token ? setToggleSignup(true) : navigate("/publish");
            }}
          >
            Commencer à vendre
          </button>
        </section>
      </div>
    </section>
  );
};

export default Hero;
