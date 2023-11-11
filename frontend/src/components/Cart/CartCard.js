import React from "react";
import { Link } from "react-router-dom";
import { rupiah } from "../../utils/formatRupiah";

const CartCard = ({ item }) => {
  return (
    <Link
      className="cartCard"
      to={`/product/${item.product_id._id}`}
      key={item.product_id._id}
    >
      <div class="product">
        <div class="product-image">
          <img src={item.product_id.gambar[0].url} alt={item.product_id.nama} />
        </div>
        <div class="product-details">
          <div class="product-title">{item.product_id.nama}</div>
          <p class="product-description">{item.product_id.deskripsi}</p>
        </div>
        <div class="product-price">{rupiah(item.product_id.harga)}</div>
        <div class="product-quantity">
          <p>{item.jumlah}</p>
        </div>
        <div class="product-line-price">
          {rupiah(parseInt(item.product_id.harga) * parseInt(item.jumlah))}
        </div>
      </div>
    </Link>
  );
};

export default CartCard;
