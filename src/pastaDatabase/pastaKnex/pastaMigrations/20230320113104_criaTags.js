exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id")
  table.text("nome").notNullable()
  table.integer("id_us").references("id").inTable("usuarios")
  table.integer("id_notas").references("id").inTable("notas").onDelete("CASCADE")
  table.timestamp("alterado").default(knex.fn.now())
});



exports.down = knex => knex.schema.dropTable("tags");
