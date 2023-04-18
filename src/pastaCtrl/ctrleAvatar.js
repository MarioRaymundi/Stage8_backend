
const knex = require("../pastaDatabase/pastaKnex")
const AppErros = require("../pastaUtil/appErros")

const ManipArq = require("../pastaUpload/manipArq")


class ControleAvatar {

  async altera(req,res){
    const id_us= req.usuario.id;
    const avatarArq = req.file.filename;

    const [dadosUs]= await knex("usuarios").where({id: id_us})

    if(!dadosUs){throw new AppErros("Usuario não encontrado",401)}

    const manipArq = new ManipArq()
    if(dadosUs.avatar){
      await manipArq.deletaArq(dadosUs.avatar)
    }

    const filename = await manipArq.salvaArq(avatarArq);
    dadosUs.avatar = filename;

    await knex("usuarios").where({id: id_us}).update({avatar:filename})

    return res.json(dadosUs)

  }


}

module.exports = ControleAvatar