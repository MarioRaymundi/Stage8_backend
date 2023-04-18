const {Router} = require("express");
const rotaSecao = Router();

const ControleSecao = require("../pastaCtrl/ctrlSecao");

const ctrlSecao =  new ControleSecao();

rotaSecao.post("/",ctrlSecao.GeraTok)

module.exports = rotaSecao