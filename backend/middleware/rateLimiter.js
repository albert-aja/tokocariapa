const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minutes
  max: 5, //limit each IP to 10 requests per windowMs
});

// user hanya diizinkan untuk melakukan request list barang sebanyak 5 kali per 10 menit
