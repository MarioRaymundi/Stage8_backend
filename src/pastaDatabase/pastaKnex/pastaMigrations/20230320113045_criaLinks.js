exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id")
  table.text("url").notNullable()
  table.integer("id_notas").references("id").inTable("notas").onDelete("CASCADE")
  table.timestamp("criado").default(knex.fn.now())
});



exports.down = knex => knex.schema.dropTable("links");
