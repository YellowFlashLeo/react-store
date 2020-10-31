import React from "react";
import CartItem from "./CartItem";

// here we get array of cart which has all products which user added to the cart
// for each of those products we return cart item compoenent to which we pass all properties(item) and methods(value) we got from ProductProvider
export default function CartList({ value }) {
  const { cart } = value;
  return (
    <div className="container-fluid">
      {cart.map((item) => {
        return <CartItem key={item.id} item={item} value={value} />;
      })}
    </div>
  );
}
