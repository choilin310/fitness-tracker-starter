const { Client } = require("pg");

const client = new Client("postgres://localhost:5432/fitness-dev");

module.exports = client;
