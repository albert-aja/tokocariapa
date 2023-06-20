const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  infoPengiriman: {
    alamat: {
      type: String,
      required: true,
    },
    kota: {
      type: String,
      required: true,
    },
    provinsi: {
      type: String,
      required: true,
    },
    negara: {
      type: String,
      required: true,
    },
    kodePos: {
      type: Number,
      required: true,
    },
    nomorTelp: {
      type: Number,
      required: true,
    },
  },
  pesananBarang: [
    {
      nama: {
        type: String,
        required: true,
      },
      harga: {
        type: Number,
        required: true,
      },
      jumlah: {
        type: Number,
        required: true,
      },
      gambar: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  infoPembayaran: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  tanggalPesanan: {
    type: Date,
    required: true,
  },
  hargaSatuan: {
    type: Number,
    required: true,
    default: 0,
  },
  ongkir: {
    type: Number,
    required: true,
    default: 0,
  },
  estimasi: {
    type: Number,
    required: true,
    default: 0,
  },
  totalHarga: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
