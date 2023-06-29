const rateLimit = require("express-rate-limit");

exports.rateLimitProduct = rateLimit({
  windowMs: 1 * 60 * 1000, //1 minutes
  max: 10, //limit each IP to 10 requests per windowMs
});

exports.rateLimitLogin = rateLimit({
  windowMs: 5 * 60 * 1000, //5 minutes
  max: 5, //limit each IP to 5 requests per windowMs
  message:
    "Terlalu banyak upaya untuk login, silahkan coba lagi setelah 5 menit", //pesan saat sudah mencapai limit
});

// module.exports = rateLimit({
//   windowMs: 1 * 60 * 1000, //1 minutes
//   max: 10, //limit each IP to 10 requests per windowMs
// });

// user hanya diizinkan untuk melakukan request list barang sebanyak max kali per windowMs
// apabila request sudah melebihi, list barang tidak akan ditampilkan dan user akan mendapatkan pesan error
