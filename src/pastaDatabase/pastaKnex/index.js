const config = require("../../../knexfile");
const knex = require("knex");
const conexaoKnex = knex(config.development);

module.exports = conexaoKnex;