import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

//Main idea is again since we have properties in the context.js state and methods also which we evntually pass to ProductProvider
// we have cart property which is an array, empty one by default
// so if user already added anything in the cart then we return columns of components
// otherwise we are going to return emptycart component

// finally we pass as an arguments all context.js functions and properties via value to the CartList
export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {(provider) => {
            const { cart } = provider;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={provider} />
                  <CartTotals value={provider} />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}
