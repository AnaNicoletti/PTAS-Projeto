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

app.get("/autores/:id/livros", async function(req,res) {
  var resultado = await autor.findByPk(req.params.id, { include: 'livros' });
  res.json(resultado.livros)
}) ;

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

//livros
app.get("/livros", async function(req,res){
    var resultado = await livro.findAll();
    res.json(resultado)
});

app.get("/livros/:id/autor", async function(req,res) {
  var resultado = await livro.findByPk(req.params.id, { include: 'autor' });
  res.json(resultado.autor)
}) ;

app.post('/livros', async function(req,res) {
  var resultado = await livro.create(req.body);
  res.json(resultado)
}) ;

app.put('/livros/:id', async function(req,res) {
  var resultado = await livro.update(
    {
      autorId: req.body.autorId,
      titulo: req.body.titulo,
      editora: req.body.editora,
      data_publicacao: req.body.data_publicacao,
      preco: req.body.preco
    },
    {
      where:{
        id: req.params.id,
      },
    }
  )
  res.json(resultado);
}) ;

app.delete('/livros/:id', async function(req,res) {
var resultado = await livro.destroy(
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