const fs = require("fs");
const path = require("path");
const upload =require("./configUpload");

class ManipArq {

  async salvaArq (MeuArq){
    await fs.promises.rename(
      path.resolve(upload.pathTemp,MeuArq),
      path.resolve(upload.pathUpload,MeuArq)
    );
    return MeuArq
  };

  async deletaArq(MeuArq){
    const pathArq = path.resolve(upload.pathUpload,MeuArq);
    
    try{
      await fs.promises.stat(pathArq);
    }catch{
      return;
    }

    await fs.promises.unlink(pathArq);
  }

}

module.exports = ManipArq 