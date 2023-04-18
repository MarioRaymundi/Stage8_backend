require("express-async-errors")
require("dotenv/config")

const migrationsRun =require("./pastaDatabase/pastaSqlite/pastaMigration")
const AppError = require("./pastaUtil/appErros")
const express = require('express');
const cors = require("cors");
const indiceRotas = require('./pastaRotas');
const uploadConfig = require("./pastaUpload/configUpload")

migrationsRun();

const app  = express();
app.use(cors());
app.use(express.json())

app.use("/files",express.static(uploadConfig.pathUpload));

app.use(indiceRotas)





//---middlewere -------------------
app.use(( error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status:"error",
    message: "Internal server error"
  });

})


const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT,() => console.log(`Servidor rodando em: LOCALHOST:${PORT}`));