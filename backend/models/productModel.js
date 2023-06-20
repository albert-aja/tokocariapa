const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  nama: {
    type: String,
    required: [true, "Harap Masukan Nama Produk"],
    trim: true,
  },
  deskripsi: {
    type: String,
    required: [true, "Harap Masukan Deskripsi Produk"],
  },
  harga: {
    type: Number,
    required: [true, "Harap Masukan Harga Produk"],
    maxLength: [8, "Harga tidak boleh melebihi 8 karakter"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  kategori: {
    type: String,
    required: [true, "Harap Masukan kategori Produk"],
  },
  gambar: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  Stock: {
    type: Number,
    required: [true, "Harap Masukan Stok Produk"],
    maxLength: [4, "Stock tidak boleh melebihi 4 karakter"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      nama: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  dibuat: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
