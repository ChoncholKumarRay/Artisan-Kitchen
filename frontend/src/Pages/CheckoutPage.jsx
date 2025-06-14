import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CheckoutPage = () => {
  const { orderId } = useParams();
  

  
  return (
    <div>
      <h1>Checkout</h1>
      <p>Order ID: {orderId}</p>   

    </div>
  );
};

export default CheckoutPage;
