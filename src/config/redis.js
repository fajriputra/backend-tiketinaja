const redis = require("redis");

const client = redis.createClient();

client.on("connect", () => {
  console.log("You're new connected redis database...");
});

module.exports = client;
