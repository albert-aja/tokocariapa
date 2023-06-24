const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 1 * 60 * 1000, //1 minutes
  max: 10, //limit each IP to 10 requests per windowMs
});

// user hanya diizinkan untuk melakukan request list barang sebanyak max kali per windowMs
// apabila request sudah melebihi, list barang tidak akan ditampilkan dan user akan mendapatkan pesan error
