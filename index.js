var express = require("express");
var app = express();
var { autor, livro } = require("./models");

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//autores
app.get("/autores", async function(req, res){
  var resultado = await autor.findAll();
  res.json(resultado);
});

app.post('/autores', async function(req, res){
  var resultado = await autor.create(req.body);
  res.json(resultado);
});

app.put('/autores/:id', async function(req,res) {
  var resultado = await autor.update(
    {
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      data_nascimento: req.body.data_nascimento,
    },
    {
      where:{
        id: req.params.id,
      },
    }
  )
  res.json(resultado);
}) ;

app.delete('/autores/:id', async function(req,res) {
var resultado = await autor.destroy(
    {
      where:{
        id: req.params.id,
      },
  });
  res.json(resultado);
}) ;

app.listen(3000, function(){
  console.log("O servidor funcionou!");
});