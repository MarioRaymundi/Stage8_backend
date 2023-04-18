const knex = require("../pastaDatabase/pastaKnex");
const AppError = require("../pastaUtil/appErros");
const {compare} = require("bcryptjs");
const authToken = require("../pastaToken/auth")
const {sign} = require("jsonwebtoken");

 class ControleSecao{

    async GeraTok(req,res){
      const {email, senha} = req.body

      const [usuario] = await knex("usuarios").where({email})

      const verifSenha= await compare(senha, usuario.senha)

      if(!usuario || !verifSenha){
        throw new AppError("E-mail ou senha não confere.")
      }

      const {chave,expiresIn} = authToken.jwt;

      //cria o token
      const token = sign({},chave,{
        subject:String(usuario.id),
        expiresIn
      })


      return res.json({usuario, token})

    }
  
 }

 module.exports = ControleSecao