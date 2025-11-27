import "../css/Payment.css";
import { useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51SXMuRL83BP0YMsaOTX6EaqSMuEPf59EgVA6HcXjSOjqzVBqZ3nzu0FHVJC2gZ6mIDLMbEF6qAjmU5q7hN8AKzzd00hd3jva41"
);

const Payment = () => {
  const location = useLocation();
  if (!location.state || !location.state.data) return <Navigate to="/" />;
  const data = location.state.data;
  const price = Number(data.product_price);
  const totalToPay = Math.round((price + 0.5) * 100);

  const options = {
    mode: "payment",
    amount: totalToPay,
    title: data.product_name,
    currency: "eur",
  };

  return (
    <main className="payment-main">
      <div className="container receipt">
        <article className="receipt-top">
          <h1>Résumé de la commande</h1>
          <section>
            <h2>Commande</h2>
            <p>{Number(data.product_price).toFixed(2)} €</p>
          </section>
          <section>
            <h2>Frais protection acheteurs</h2>
            <p>0.50 €</p>
          </section>
          <section>
            <h2>Frais de port</h2>
            <p>1.00 €</p>
          </section>
        </article>
        <article className="receipt-bottom">
          <section className="total">
            <p>Total</p>
            <p>{Number(totalToPay / 100).toFixed(2)} €</p>
          </section>
          <p>
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <span>{data.product_name}</span>. Vous allez payer{" "}
            <span>{Number(totalToPay / 100).toFixed(2)} €</span> (frais de
            protection et frais de port inclus).
          </p>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              totalToPay={totalToPay}
              productTitle={data.product_name}
            />
          </Elements>
        </article>
      </div>
    </main>
  );
};

export default Payment;
