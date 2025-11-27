import { Link } from "react-router-dom";
import Offer from "../pages/Offer";

const Main = ({ data }) => {
  return (
    <main className="container">
      {data.offers.map((element) => {
        const offerBrand = element.product_details?.find(
          (detail) => detail.MARQUE
        );
        const offerSize = element.product_details?.find(
          (detail) => detail.TAILLE
        );
        return (
          <Link
            className="nostyle"
            to={`/offer/${element._id}`}
            key={element._id}
          >
            <section className="offer">
              <article className="offer-top">
                {element.owner.account.avatar !== undefined && (
                  <img
                    src={element.owner.account.avatar.url}
                    alt="Avatar du vendeur"
                    className="owner-avatar"
                  />
                )}
                <p>{element.owner.account.username}</p>
              </article>
              <img src={element.product_image.url} alt="Image de l'article" />
              <p>{element.product_price} €</p>
              {offerSize && <p className="offer-size">{offerSize.TAILLE}</p>}
              {offerBrand && <p className="offer-brand">{offerBrand.MARQUE}</p>}
            </section>
          </Link>
        );
      })}
    </main>
  );
};

export default Main;
