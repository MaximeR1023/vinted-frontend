import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Header from "../components/Header";
import "../css/Offer.css";

const Offer = ({ toggleSignup, setToggleSignup }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--vinted-backend--sw2wxzy5rpkz.code.run/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setData(null);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <span>En cours de chargement...</span>;
  if (!data) return <Navigate to="/" />;

  console.log(data);

  return (
    <main className="offer-main">
      <div className="container">
        <img src={data.product_image.url} alt={data.product_name} />
        <section className="details-box">
          <article>
            <p className="price">{data.product_price} €</p>
            {data.product_details.map((detail, index) => {
              const key = Object.keys(detail)[0];
              return (
                <div key={index} className="article-detail">
                  <p>{key}</p>
                  <p>{detail[key]}</p>
                </div>
              );
            })}
          </article>
          <hr />
          <article>
            <p className="article-name">{data.product_name}</p>
            <p className="article-description">{data.product_description}</p>
            <div className="seller-details">
              {data.owner.account.avatar && (
                <img
                  src={data.owner.account.avatar.url}
                  alt={data.owner.account.username}
                />
              )}
              <p>{data.owner.account.username}</p>
            </div>
          </article>
          <button
            onClick={() => {
              !token
                ? setToggleSignup(true)
                : navigate("/payment", { state: { data } });
            }}
          >
            Acheter
          </button>
        </section>
      </div>
    </main>
  );
};

export default Offer;
