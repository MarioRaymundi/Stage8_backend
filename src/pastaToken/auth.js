module.exports = {
  jwt:{
    //Usa a variavel de ambiente ou usa a chave "outracoisa"
    chave:process.env.AUTH_CHAVE || "outracoisa",
    expiresIn:"1d"
  }
}