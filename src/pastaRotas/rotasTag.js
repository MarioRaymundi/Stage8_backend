const {Router} = require("express")
const rotasTg = Router()
const garantirAuth = require("../pastaToken/garantirAuth")

const ControleTags = require("../pastaCtrl/ctrlTags")
const controleTags = new ControleTags()

rotasTg.get("/",garantirAuth,controleTags.consultaTags)

module.exports = rotasTg