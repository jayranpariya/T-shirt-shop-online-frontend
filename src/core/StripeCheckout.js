import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cardHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";



const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };

  const makePayment = (token) => {
    //
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        //call method 

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51JiYJVSDDRNqDUQuQ9Ga26Z6RPqfIrbsfaE77Hv9tYJWJMF5VRq8DfILWLyIReOLzomMY6NMem5AOuJ4lCV4eNja00P7huZfCj"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy T-shirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success"> pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">sign in</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout loaded {getFinalPrice()} </h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
