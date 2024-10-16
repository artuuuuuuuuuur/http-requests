const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const objetos = require("./objetos");

// Middleware para interpretar JSON
app.use(express.json());

// Dados de exemplo

// Rota para obter todos os objetos
app.get("/objetos", (req, res) => {
  res.json(objetos);
});

// Rota para obter um objeto por ID
app.get("/objetos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const objeto = objetos.find((obj) => obj.id === id);
  if (objeto) {
    res.json(objeto);
  } else {
    res.status(404).json({ error: "Objeto não encontrado" });
  }
});

// Rota para criar um novo objeto
app.post('/objetos', (req, res) => {
  const novoObjeto = req.body;
  novoObjeto.id = objetos.length + 1; // Atribuir um novo ID
  objetos.push(novoObjeto);
  res.status(201).json(novoObjeto);
});

// Rota para atualizar um objeto por ID
app.put('/objetos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = objetos.findIndex(obj => obj.id === id);

  if (index !== -1) {
    objetos[index] = { ...objetos[index], ...req.body };
    res.json(objetos[index]);
  } else {
    res.status(404).json({ error: 'Objeto não encontrado' });
  }
});

// Rota para atualizar parcialmente um objeto por ID
app.patch('/objetos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = objetos.findIndex(obj => obj.id === id);

  if (index !== -1) {
    objetos[index] = { ...objetos[index], ...req.body };
    res.json(objetos[index]);
  } else {
    res.status(404).json({ error: 'Objeto não encontrado' });
  }
});

// Rota para deletar um objeto por ID
app.delete('/objetos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = objetos.findIndex(obj => obj.id === id);

  if (index !== -1) {
    const objetoRemovido = objetos.splice(index, 1);
    res.json(objetoRemovido);
  } else {
    res.status(404).json({ error: 'Objeto não encontrado' });
  }
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
