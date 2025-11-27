import "../css/Modal.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";

const Signup = ({ setToggleSignup, setToggleLogin, toggleSignup }) => {
  useEffect(() => {
    if (toggleSignup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [toggleSignup]);

  if (!toggleSignup) return null;

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("https://site--vinted-backend--sw2wxzy5rpkz.code.run/user/signup", {
        email: email,
        username: username,
        password: password,
        newsletter: newsletter,
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

  return (
    <div
      className="modal-root"
      onClick={() => {
        setToggleSignup(false);
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
            setToggleSignup(false);
          }}
        >
          X
        </button>
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nom d'utilisateur"
            type="text"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          <input
            placeholder="Mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <div className="newsletter">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(event) => {
                setNewsletter(event.target.checked);
              }}
            />{" "}
            <p>S'inscrire à notre newsletter</p>
          </div>
          <p className="terms-of-use">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button>S'inscrire</button>
          <p
            className="redirect"
            onClick={() => {
              setToggleSignup(false);
              setToggleLogin(true);
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
