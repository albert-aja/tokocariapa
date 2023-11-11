import React, { Fragment } from "react";
import CartCard from "./CartCard";

const CartTable = ({ carts }) => {
  return (
    <Fragment>
      <div class="product">
        <div class="product-image">
          <p>Gambar</p>
        </div>
        <div class="product-details">
          <p>Detail Produk</p>
        </div>
        <div class="product-price">
          <p>Harga</p>
        </div>
        <div class="product-quantity">
          <p>Jumlah</p>
        </div>
        <div class="product-line-price">
          <p>Total</p>
        </div>
      </div>
      {carts.map((item) => (
        <CartCard key={item._id} item={item} />
      ))}
    </Fragment>
  );
};

export default CartTable;
