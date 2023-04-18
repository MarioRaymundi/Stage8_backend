const knex = require("../pastaDatabase/pastaKnex")
// const AppError = require("../pastaUtil/appErros");

class ControleNotas{

  async incluirNota(req,res){
    const {titulo,descricao,tags,links} = req.body;
    const id_us = req.usuario.id

    console.log(id_us)


    const [id_notas] = await knex("notas").insert({titulo,descricao,id_us });

    const mapLinks = links.map(link => {return{id_notas, url:link}})
    // console.log(mapLinks)
    await knex("links").insert(mapLinks);

    const mapTags = tags.map(nome => {return{id_notas,nome,id_us}})
    // console.log(mapTags)
    await knex("tags").insert(mapTags);

    res.json();

  };

  //----------------------------------------------------------------------------

  async mostrarNota(req,res){
    const {id} = req.params;

    const [nota] = await knex("notas").select().where({id});
    const tags = await knex("tags").where({id_notas:id}).orderBy("nome");
    const links= await knex("links").where({id_notas:id}).orderBy("url");

    return res.json({
      nota,
      tags,
      links
    });
  };

  //------------------------------------------------------
  async excluirNota(req,res){
    const {id} = req.params;
    await knex("notas").where({id}).delete();
    return res.json("exclusao ok")
  }

  //-------------------------------------------------------

  async consultarNotaUs(req,res){
    const {titulo, tags} = req.query
    const id_us = req.usuario.id

    let notas

    if(tags){
      const filterTags = tags.split(',').map(tag =>tag.trim())

      notas= await knex("tags")
      .innerJoin("notas","notas.id","tags.id_notas")
      .whereIn("nome",filterTags)
      .where("notas.id_us",id_us)
      .whereLike("notas.titulo",`%${titulo}%`)
      .groupBy("notas.id")
      .select(["notas.id","notas.titulo","notas.id_us","nome"])

    }else{
      notas  = await knex("notas")
      .where({id_us})
      .whereLike("titulo",`%${titulo}%`)
      .orderBy("titulo")
    }

    const userTags = await knex("tags").where({id_us});

    const notasComTags = notas.map(nota => {
      const notaTags = userTags.filter(tag => tag.id_notas === nota.id);
      return {...nota, tags: notaTags}
    });   

    return res.json(notasComTags)
  }
}

module.exports = ControleNotas

