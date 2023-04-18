const {Router} = require("express")
const rotasNt = Router()
const garantirAuth = require("../pastaToken/garantirAuth")

const ControleNotas = require("../pastaCtrl/ctrlNotas")
const controleNotas = new ControleNotas()

rotasNt.use(garantirAuth)

rotasNt.post("/",controleNotas.incluirNota)
rotasNt.get("/:id",controleNotas.mostrarNota)
rotasNt.delete("/:id",controleNotas.excluirNota)
rotasNt.get("/",controleNotas.consultarNotaUs)

module.exports = rotasNt


