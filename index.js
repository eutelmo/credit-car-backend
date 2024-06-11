const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3100;

app.use(bodyParser.json());

// Carregar dados do arquivo JSON
const loadData = () => {
  const data = fs.readFileSync('data.json');
  return JSON.parse(data);
};

const saveData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

app.get('/divida', (req, res) => {
  const data = loadData();
  res.json({ divida: data.divida });
});

app.post('/pagamento', (req, res) => {
  const data = loadData();
  const novoPagamento = {
    data: req.body.data,
    valor: req.body.valor
  };
  data.pagamentos.push(novoPagamento);
  data.divida -= novoPagamento.valor;
  saveData(data);
  res.json({ message: 'Pagamento registrado com sucesso' });
});


app.get('/pagamentos', (req, res) => {
  const data = loadData();
  res.json(data.pagamentos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
