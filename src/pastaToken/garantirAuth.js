const {verify} = require("jsonwebtoken");
const AppError = require("../pastaUtil/appErros");
const authToken = require("./auth");

function garantirAuth(req,res,next){
  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new AppError("JWT - Token inválido",401);
  }

  const [,token] = authHeader.split(" ");

  try{
    const {sub:us_id} = verify(token,authToken.jwt.chave);
    req.usuario = { id:Number(us_id) };

    return next()
  }catch{
    throw new AppError("JWT - Token não informado",401);
  }
}

module.exports = garantirAuth


