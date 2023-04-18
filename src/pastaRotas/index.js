const {Router} = require('express');
const indiceRotas = Router()

const rotasUs = require('./rotasUser');
indiceRotas.use("/usuarios",rotasUs);


const rotasNt = require("./rotasNota");
indiceRotas.use("/notas", rotasNt);

const rotasTg = require("./rotasTag");
indiceRotas.use("/tags",rotasTg)

const rotaSecao = require("./rotasSecao")
indiceRotas.use("/secao",rotaSecao)





module.exports = indiceRotas;