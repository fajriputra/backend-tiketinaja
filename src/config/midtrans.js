const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_PRODUCTION === "true",
  clientKey: process.env.MIDTRANS_CLIENTKEY,
  serverKey: process.env.MIDTRANS_SERVERKEY,
});

module.exports = snap;
