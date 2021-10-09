import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cardHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProduct = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addtoCart={false}
            removeFromCart={true}
            reload={reload}
            setReload={setReload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Home page" description="Ready to checout ">
      <div className="row text-center">
        <div className="col-6">{loadAllProduct()}</div>
        <div className="col-6">
          <StripeCheckout
          products={products}
          setReload = {reload}
          />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
