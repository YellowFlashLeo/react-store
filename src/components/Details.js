import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./common/Button";

// first we do object destructering of all properties we have in detailProduct which we get from ProductProvider
// then we return jsx as container with padding top-bottom
// mx-auto puts it in the center
// img-fluid to make sure that image is inside the container

// in product info we have 2 columns : one first image another for text
// when we click on Add to cart button we use addToCart method from ProductProvider
export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(provider) => {
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart,
          } = provider.detailProduct;
          return (
            <div className="container py-5">
              {/*title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* end title */}

              {/* product info*/}
              <div classname="row">
                {/* product image*/}
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="product" />
                </div>
                {/* product text*/}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h1>model:{title}</h1>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    made by : <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      {" "}
                      price : <span>$</span> {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0 ">
                    some info about product:
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/* buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    {/* cart is used to change colors in Button.js depending on whether we already added product to cart or not*/}
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        provider.addToCart(id);
                        provider.openModel(id);
                      }}
                    >
                      {inCart ? "inCart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
