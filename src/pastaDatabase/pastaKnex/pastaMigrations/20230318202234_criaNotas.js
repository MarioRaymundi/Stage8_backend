
exports.up = knex => knex.schema.createTable("notas", table => {
  table.increments("id")
  table.text("titulo")
  table.text("descricao")
  table.integer("id_us").references("id").inTable("usuarios")
  table.timestamp("criado").default(knex.fn.now())
  table.timestamp("alterado").default(knex.fn.now())
});



exports.down = knex => knex.schema.dropTable("notas");

