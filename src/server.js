const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    data: {
      status: 'online',
      mensagem: 'API Connect está funcionando'
    },
    error: null
  });
});

app.use('/usuarios', userRoutes);

app.use((req, res) => {
  return res.status(404).json({
    data: null,
    error: {
      codigo: 'ROTA_NAO_ENCONTRADA',
      mensagem: 'Rota não encontrada'
    }
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor executando em http://localhost:${PORT}`);
});
