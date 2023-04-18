const knex = require("../pastaDatabase/pastaKnex");

class ControleTags{

  async consultaTags(req,res){
    const id_us = req.usuario.id;

    const tagsCad = await knex("tags")
    .select(["id_us","nome","id_notas"])
    .where({id_us})
    .groupBy("nome")

    return res.json(tagsCad);
  }

}

module.exports = ControleTags