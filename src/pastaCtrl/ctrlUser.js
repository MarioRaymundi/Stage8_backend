const AppError = require("../pastaUtil/appErros");
const knex = require("../pastaDatabase/pastaKnex")
const {hash, compare} = require('bcryptjs');
const { response } = require("express");


class ControleUs{
  //----------------------------------------------------------------------------
  async incluirUs(req,res){
    const {nome,email,senha} = req.body;
    const [usuario] = await knex("usuarios").select(["id"]).where({email});
    
    if(usuario){throw new AppError("Este email já esta em uso.")};

    const hashSenha = await hash(senha,8)
    const id_us = await knex("usuarios").insert({nome,email,senha:hashSenha});

    return res.status(201).json()
  };
  //-----------------------------------------------------------------------

  async alterarUs(req,response){
    const {nome,email,senha,senhaVelha} = req.body;
    const id = req.usuario.id;

    const [usuario] = await knex("usuarios").select().where({id});
    if(!usuario){throw new AppError("Usuario não encontrado.")};

    const [usEmail] = await knex("usuarios").select().where({email});

    if(usEmail && usEmail.id!==id){
      throw new AppError("Email ja cadastrado")
    }

    if(senhaVelha && senha){
      const checSenha= await compare(senhaVelha,usuario.senha);
      if(!checSenha){
        throw new AppError("Senha nao confere.")
      }
      usuario.senha = await hash(senha,8)
    }else{
      if(senhaVelha || senha){
        throw new AppError("Para alterar a senha, digite a nova e a atual.")
      }
    };
  
   

    const novaSenha= usuario.senha
    const nomeNovo = nome ?? usuario.nome
    const emailNovo= email ?? usuario.email


    await knex("usuarios").where({id}).update({
      nome: nomeNovo,
      email: emailNovo,
      senha: novaSenha,
      alterado: knex.fn.now()
    });

    return response.status(201).json({usuario})
  }
}
module.exports = ControleUs;
