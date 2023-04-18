const  conectaDb = require("../conecta");
const criaTabUser =require("./criaTabUser");


async function migrationsRun(){
  const criaEstruturas = [criaTabUser].join("");
  
  conectaDb()
  .then(db => db.exec(criaEstruturas))
  .catch(error => console.error(error));
};

module.exports = migrationsRun;
