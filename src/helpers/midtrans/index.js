const snap = require("../../config/midtrans");
require("dotenv").config();

module.exports = {
  postMidtrans: (id, totalPayment) =>
    new Promise((resolve, reject) => {
      const parameter = {
        transaction_details: {
          order_id: id,
          gross_amount: totalPayment,
        },
        credit_card: {
          secure: true,
        },
      };

      snap
        .createTransaction(parameter)
        .then((result) => {
          resolve(result.redirect_url);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  midtransNotification: (body) =>
    new Promise((resolve, reject) => {
      snap.transaction
        .notification(body)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    }),
};
