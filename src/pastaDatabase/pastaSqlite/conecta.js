const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");


async function conectaSqlite(){
  const banco = await sqlite.open({
    filename: path.resolve(__dirname,"..","baseDados.db"),
    driver:sqlite3.Database
  })
  return banco

}
module.exports = conectaSqlite