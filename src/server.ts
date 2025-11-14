// src/server.ts
import express from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

// Configurações básicas
app.use(cors()); // Permite que o Frontend acesse a API
app.use(express.json()); // Permite receber JSON no Body
app.use(router); // Usa nossas rotas

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando na porta ${PORT}`);
    console.log(`📡 Rotas disponíveis em http://localhost:${PORT}/cards`);
});