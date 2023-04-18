const multer = require("multer");
const crypto = require("crypto");

const path = require("path");


const pathTemp = path.resolve(__dirname,"..","..","pastaTemp");
const pathUpload = path.resolve(pathTemp,"pastaImg");

const MULTER = {
  storage: multer.diskStorage({
    destination:pathTemp,
    filename: (req,file,cb) => {
      const hash = crypto.randomBytes(10).toString("hex");
      const nomeArq = `${hash}-${file.originalname}`;
      return cb(null,nomeArq);
    }
  })
};

module.exports = {pathTemp, pathUpload, MULTER}