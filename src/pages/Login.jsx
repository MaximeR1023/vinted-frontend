import "../css/Modal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = ({ setToggleLogin, setToggleSignup, toggleLogin }) => {
  useEffect(() => {
    if (toggleLogin) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [toggleLogin]);

  if (!toggleLogin) return null;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("https://site--vinted-backend--sw2wxzy5rpkz.code.run/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.token) {
          Cookies.set("token", response.data.token);
          setToggleLogin(false);
        }
      })
      .catch((error) => {
        error.response
          ? setErrorMessage(error.response.data.message)
          : console.error(error);
      });
  };

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";

  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, []);

  return (
    <div
      className="modal-root"
      onClick={() => {
        setToggleLogin(false);
      }}
    >
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          onClick={(event) => {
            setToggleLogin(false);
          }}
        >
          X
        </button>
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            placeholder="Mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <button>Se connecter</button>
          <p
            className="redirect"
            onClick={() => {
              setToggleSignup(true);
              setToggleLogin(false);
            }}
          >
            Pas encore de compte ? Inscris-toi !
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
