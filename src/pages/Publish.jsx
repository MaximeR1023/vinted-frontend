import "../css/Publish.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [trade, setTrade] = useState(false);

  useEffect(() => {
    if (!token) navigate("/");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("price", price);
    formData.append("trade", trade);

    try {
      const response = await axios.post(
        "https://site--vinted-backend--sw2wxzy5rpkz.code.run/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
    } catch (error) {
      if (error.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(error.response.data.msg);
      }
    }
  };

  return (
    <main className="main-publish">
      <div className="container">
        <form className="form-publish" onSubmit={handleSubmit}>
          <h1>Vends ton article</h1>
          <article className="photo-upload">
            <label htmlFor="picture">Ajoute une photo</label>
            <input
              type="file"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
          </article>
          <article>
            <section>
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </section>
            <hr />
            <section>
              <label htmlFor="description">Décris ton article</label>
              <input
                type="text"
                placeholder="ex: porté quelques fois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </section>
          </article>
          <article>
            <section>
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                placeholder="ex: Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </section>
            <hr />
            <section>
              <label htmlFor="size">Taille</label>
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </section>
            <hr />
            <section>
              <label htmlFor="color">Couleur</label>
              <input
                type="text"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </section>
            <hr />
            <section>
              <label htmlFor="condition">État</label>
              <input
                type="text"
                placeholder="Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </section>
            <hr />
            <section>
              <label htmlFor="city">Lieu</label>
              <input
                type="text"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </section>
          </article>
          <article>
            <section>
              <label htmlFor="price">Prix</label>
              <div className="item-pricing-col2">
                <input
                  type="text"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="item-trade">
                  <input
                    type="checkbox"
                    checked={trade}
                    onChange={(event) => {
                      setTrade(event.target.checked);
                    }}
                  />
                  <label htmlFor="trade">
                    Je suis intéressé(e) par les échanges
                  </label>
                </div>
              </div>
            </section>
          </article>
          <button>Ajouter</button>
        </form>
      </div>
    </main>
  );
};

export default Publish;
