const {Router} = require("express")
const garantirAuth = require("../pastaToken/garantirAuth")
const rotasUs = Router()

const ControleUs = require("../pastaCtrl/ctrlUser")
const controleUs = new ControleUs()

const multer = require("multer");
const uploadConfig =require("../pastaUpload/configUpload");
const upload = multer(uploadConfig.MULTER);

rotasUs.post("/",controleUs.incluirUs)
rotasUs.put("/",garantirAuth,controleUs.alterarUs)

const ControleAvatar = require("../pastaCtrl/ctrleAvatar")
const controleAvatar = new ControleAvatar();
rotasUs.patch("/avatar",garantirAuth,upload.single("avatar"),controleAvatar.altera)

module.exports = rotasUs


