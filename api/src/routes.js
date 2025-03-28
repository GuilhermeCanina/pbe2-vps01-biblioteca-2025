const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca ACME' });
});

const aluno = require('./controllers/aluno');
const livro = require('./controllers/livros');
const emprestimo = require('./controllers/emprestimo');



//routes aluno

routes.post('/aluno', aluno.create);
routes.get('/aluno', aluno.getAll);
routes.get('/aluno/:ra', aluno.readOne);
routes.put('/aluno/:ra', aluno.update);
routes.delete('/aluno/:ra', aluno.remove);

//routes livro
routes.post('/livro', livro.create);
routes.get('/livro', livro.getAll);
routes.get('/livro/:id', livro.readone);
routes.put('/livro/:id', livro.update);
routes.delete('/livro/:id', livro.remove);

//routes emprestimo
routes.post('/emprestimo', emprestimo.create);
routes.get('/emprestimo', emprestimo.getAll);
routes.get('/emprestimo/:id', emprestimo.readOne);
routes.put('/emprestimo/:id', emprestimo.update);
routes.delete('/emprestimo/:id', emprestimo.remove);


module.exports = routes;