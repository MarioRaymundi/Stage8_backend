const criaTabUser = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR,
    email VARCHAR,
    senha VARCHAR,
    avatar VARCHAR NULL,
    criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    alterado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

module.exports = criaTabUser;
